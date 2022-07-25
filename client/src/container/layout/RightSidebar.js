import React from "react";
import RightSidebarItem from "../../components/utils/RightSidebarItem";
import TopAnsQuestions from "../../components/forums/TopAnsQuestions";
import useStudentTeacherList from "../../components/utils/studentTeacherList";

export default function RightSidebar(props) {
  const isPrivate = window.location.href.includes("private"); //checks if forum is private
  const { student, teacher } = useStudentTeacherList(true, true);
  // const [showMore, setshowMore] = useState(false);
  // const [buttonText, setButtonText] = useState("ShowMore");
  // console.log("rightSidebar props", props);
  // console.log("Sorted questions",recommendedQuestions.sort((a, b) => (a.answers.length > b.answers.length) ? -1 : 1));
  const {
    teachers: { bool: teachers, recommendedTeachers },
    students: { bool: students, recommendedStudents },
    projects: { bool: projects, recommendedProjects },
    questions: { bool: questions, recommendedQuestions },
  } = props;
  if (projects)
    return (
      // Manage zero length array
      <div className="col-lg-3 mb-5 mt-5 mt-lg-4">
        <h3 className="text-center">Projects you might be interested in</h3>
        {recommendedProjects ? (
          recommendedProjects.length ? (
            recommendedProjects
              .slice(0, 10)
              .map((project) => <RightSidebarItem project={project} />)
          ) : (
            <RightSidebarItem project={{}} />
          )
        ) : (
          <RightSidebarItem />
        )}
      </div>
    );
  else if (questions)
    return (
      // Manage zero length array
      <div className="col-lg-3 mb-5 mt-5 mt-lg-4">
        <h4 style={{ textAlign: "center" }}>Top Answered Questions</h4>
        {recommendedQuestions ? (
          recommendedQuestions.length ? (
            recommendedQuestions
              .filter((number, index) => index < 6)
              .map((question) =>
                question.isPrivate === isPrivate ? (
                  <TopAnsQuestions
                    check={true}
                    key={question._id}
                    question={question}
                    student={student}
                    teacher={teacher}
                  />
                ) : null
              )
          ) : (
            <RightSidebarItem project={{}} />
          )
        ) : (
          <RightSidebarItem />
        )}
      </div>
    );
  else if (teachers)
    return (
      <div className="col-lg-3 mb-5 mt-5 mt-lg-2">
        <h3 className="text-center">Teachers you may want to connect with</h3>
        {recommendedTeachers ? (
          recommendedTeachers.length ? (
            recommendedTeachers
              .slice(0, 10)
              .map((teacher) => <RightSidebarItem teacher={teacher} />)
          ) : (
            <RightSidebarItem teacher={{}} />
          )
        ) : (
          <RightSidebarItem />
        )}
      </div>
    );
  else if (students)
    return (
      <div className="col-lg-3 mb-5 mt-5 mt-lg-4">
        <h3 className="text-center">Students you may want to connect with</h3>
        {recommendedStudents ? (
          recommendedStudents.length ? (
            recommendedStudents
              .slice(0, 10)
              .map((student) => <RightSidebarItem student={student} />)
          ) : (
            <RightSidebarItem student={{}} />
          )
        ) : (
          <RightSidebarItem />
        )}
      </div>
    );
}
