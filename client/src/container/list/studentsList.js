/* eslint-disable array-callback-return */
import React, { useEffect } from "react";
import { isAuth } from "../../utils/helper";
import withAuth from "../../utils/withAuth";
import { useState } from "react";
import Layout from "../layout/Layout";
import FindStudents from "../../components/list/FindStudents";
import { SearchBar } from "../../components/utils/other";
import { connect } from "react-redux";
import { auth } from "../../redux/actions";
import { getAction } from "../../services/generalServices";
import ReactPaginate from "react-paginate";
import "../../style/other/pagination.css";
import Loading from "../../components/utils/LoadingSign";

const StudentList = (props) => {
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
  const [studentsPerPage, setStudentsPerPage] = useState(10);

  const svalues = isAuth()
    ? searchValues.filter((value) => value._id !== isAuth()._id)
    : searchValues;
  //Get Current studentList
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = svalues.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );
  //Change Page

  const paginate = ({ selected: selectedPage }) =>
    setCurrentPage(selectedPage + 1);
  const pageCount = Math.ceil(svalues.length / studentsPerPage);
  let render = <Loading />;
  //const limit = 20;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    let studentsList = [];

    if (isAuth()) {
      const s = await getAction(`/students?isRegistered=true&sort=name`);
      if (s && s.status === 200)
        if (s.data.data.data && s.data.data.data.length)
          studentsList = s.data.data.data;
      setValues(studentsList);
      setSearchValues(studentsList);
      let names = Array.from(
        new Set(
          studentsList
            .filter((value) => value._id !== isAuth()._id)
            .map((o) => o.name)
        )
      );

      setNameList(names);
    } else {
      props.history.push("/");
    }
    // eslint-disable-next-line
  }, []);

  const searchName = (newList) => {
    setSearchValues(newList);
    if (currentPage !== 1) setCurrentPage(1);
  };
  if (nameList) {
    render = (
      <Layout rightSidebar={true} students={true}>
        <div className="col-lg-6 mt-2">
          <SearchBar
            role="Student"
            list={values}
            nameList={nameList}
            searchName={searchName}
          />
          <FindStudents
            history={props.history}
            searchValues={currentStudents}
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
    onAuth: (callback) => dispatch(auth.auth(callback)),
  };
};
export default connect(null, mapDispatchtoProps)(withAuth("")(StudentList));
