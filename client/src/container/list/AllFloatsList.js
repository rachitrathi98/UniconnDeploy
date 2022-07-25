/* eslint-disable array-callback-return */
import React, { useEffect } from "react";
import { isAuth } from "../../utils/helper";
import withAuth from "../../utils/withAuth";
import { getAction } from "../../services/generalServices";
import { useState } from "react";
import Layout from "../layout/Layout";
import { SearchBar } from "../../components/utils/other";
import useStudentTeacherList from "../../components/utils/studentTeacherList";
import FindCollaborators from "../../components/list/FloatList";
import ReactPaginate from "react-paginate";
import "../../style/other/pagination.css";
import Loading from "../../components/utils/LoadingSign";

const Collaborators = (props) => {
  const [nameList, setNameList] = useState([]);
  const [searchValues, setSearchValues] = useState([]);
  const [searchMainValues, setSearchMainValues] = useState(null);
  const { student, teacher } = useStudentTeacherList(true, true);

  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [floatsPerPage, setFloatsPerPage] = useState(10);

  //Get Current FloatList
  const indexOfLastFloat = currentPage * floatsPerPage;
  const indexOfFirstFloat = indexOfLastFloat - floatsPerPage;
  const currentFloats = searchValues.slice(indexOfFirstFloat, indexOfLastFloat);

  //Change Page

  const paginate = ({ selected: selectedPage }) =>
    setCurrentPage(selectedPage + 1);
  const pageCount = Math.ceil(searchValues.length / floatsPerPage);
  let render = <Loading />;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (isAuth()) {
      if (Object.keys(teacher).length > 0 && Object.keys(student).length > 0) {
        let searchValues = [];
        let nameList = [];
        const projects = await getAction("/projects");
        if (projects && projects.status === 200) {
          if (projects.data.data.data && projects.data.data.data.length > 0) {
            searchValues = projects.data.data.data
              .filter(
                (d) =>
                  d.status === "Ongoing | Assistance-needed" ||
                  d.status === "Float"
              )
              .map((doc) => ({
                ...doc,
                mentors: doc.teacherId.map((id) => ({
                  id: String(id),
                  name: teacher[String(id)],
                })), //List of teacher names mentoring the project
              }));
            nameList = Array.from(
              new Set(projects.data.data.data.map((o) => o.name))
            );
            console.log("123354", nameList);
            console.log("12335asasa", searchValues);
          }
        }
        setNameList(nameList);
        setSearchValues(searchValues);
        setSearchMainValues(searchValues);
      }
    } else {
      props.history.push("/");
    }
    // eslint-disable-next-line
  }, [student, teacher]);

  if (searchMainValues)
    render = (
      <Layout rightSidebar={true} projects={true}>
        <div className="col-lg-6 mt-4">
          <SearchBar
            role="Collaborator / Project"
            list={searchMainValues}
            nameList={nameList}
            searchName={(newlist) => {
              setSearchValues(newlist);
              if (currentPage !== 1) setCurrentPage(1);
            }}
            s
          />
          <FindCollaborators searchValues={currentFloats} />
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

  return render;
};

export default withAuth("")(Collaborators);
