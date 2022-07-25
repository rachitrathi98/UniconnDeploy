/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { SearchBar } from "../../components/utils/other";
import Layout from "../layout/Layout";
import { getAction } from "../../services/generalServices";
import { connect } from "react-redux";
import { auth } from "../../redux/actions";
import FindTeachers from "../../components/list/FindTeachers";
import ReactPaginate from "react-paginate";
import "../../style/other/pagination.css";
import { isAuth } from "../../utils/helper";
import Loading from "../../components/utils/LoadingSign";

const TeacherList = (props) => {
  const linkStyles = {
    textDecoration: "none",
    textUnderlinePosition: "none",
    color: "black",
  };

  const [values, setValues] = useState([]);
  const [nameList, setNameList] = useState(null);
  const [searchValues, setSearchValues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [teachersPerPage, setTeachersPerPage] = useState(10);

  const svalues = isAuth()
    ? searchValues.filter((value) => value._id !== isAuth()._id)
    : searchValues;
  //Get Current TeacherList
  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = svalues.slice(
    indexOfFirstTeacher,
    indexOfLastTeacher,
  );

  let render = <Loading />;
  const paginate = ({ selected: selectedPage }) =>
    setCurrentPage(selectedPage + 1);
  const pageCount = Math.ceil(svalues.length / teachersPerPage);

  // incomplete pagination

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    let teachersList = [];
    const t = await getAction(`/teachers?isRegistered=true&sort=name`);
    if (t && t.status === 200)
      if (t.data.data.data && t.data.data.data.length)
        teachersList = t.data.data.data;
    setValues(teachersList);
    setSearchValues(teachersList);

    let names = Array.from(
      new Set(
        teachersList
          .filter((value) => {
            if (isAuth()) return value._id !== isAuth()._id;
          })
          .map((o) => o.name),
      ),
    );
    setNameList(names);

    // eslint-disable-next-line
  }, []);

  const searchName = (newList) => {
    setSearchValues(newList);
    if (currentPage !== 1) setCurrentPage(1);
  };
  if (nameList) {
    render = (
      <Layout rightSidebar={true} teachers={true}>
        <div className="col-lg-6 mt-2">
          <SearchBar
            role="Teacher"
            list={values}
            nameList={nameList}
            searchName={searchName}
          />
          <FindTeachers
            history={props.history}
            searchValues={currentTeachers}
            linkStyles={linkStyles}
          />
          <div className="center">
            <ReactPaginate
              onPageChange={paginate}
              pageCount={pageCount}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              containerClassName={"pagination"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </Layout>
    );
  }
  return render;
};

const mapDispatchtoProps = (dispatch) => {
  return {
    onLogout: (next) => dispatch(auth.logout(next)),
    onAuth: (callback) => dispatch(auth.auth(callback)),
  };
};
export default connect(null, mapDispatchtoProps)(TeacherList);
