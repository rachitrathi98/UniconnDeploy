/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from "react";
import { options } from "./options";
import { getAction } from "../../services/generalServices";
import { isAuth } from "../../utils/helper";

export default function useStudentTeacherList(allowSelf = false, dict = false) {
  // allowSelf: true , Include the current user's name
  const [studentsOptions, setStudentOptions] = useState([]);    // multiDropdownOptions alternate
  const [studentsInfo, setStudentsInfo] = useState([]);         // multiDropdownOptions alternate
  const [teachersOptions, setTeacherOptions] = useState([]);    // multiDropdownOptions alternate
  const [teachersInfo, setTeachersInfo] = useState([]);         // multiDropdownOptions alternate
  const [field_of_interest, setFieldOfInterest] = useState([]); // multiDropdownOptions alternate
  const [student, setStudents] = useState({});                  // dictionary output student[id]=name
  const [teacher, setTeachers] = useState({});
  const [student2, setStudents2] = useState({});                // dictionary output student[id]=name
  const [teacher2, setTeachers2] = useState({});                // dictionaty output teacher[id]=name

  let students = {}, teachers = {};
  let students2 = {}, teachers2 = {};
  let teachersList = [], studentsList = [];
  useEffect(async () => {
    const t = await getAction(`/teachers?isRegistered=true&sort=name`);
    if (t && t.status === 200)
      if (t.data.data.data && t.data.data.data.length)
        teachersList = t.data.data.data;

    if (teachersList && teachersList.length) {
      setTeacherOptions(
        teachersList
          .filter(({ id, name }) =>
            name // do not allow undefined or empty names
              ? isAuth() && id === isAuth()._id
                ? allowSelf // do not include the current user's name in drop-down, it is a part by default
                : true
              : false,
          )
          .map(
            ({
              name,
              _id,
              notificationId,
              emailId,
              position,
              department,
              collegeId,
            }) => {
              const id = String(_id);
              const optionName = `${name} | ${emailId}` 
              if (dict) teachers[id] = name;
              else return { optionName, name, value: id, notificationId: notificationId };
            },
          ),
      );

      setTeachersInfo(
        teachersList
          .filter(({ id, name }) =>
            name // do not allow undefined or empty names
              ? isAuth() && id === isAuth()._id
                ? allowSelf // do not include the current user's name in drop-down, it is a part by default
                : true
              : false,
          )
          .map(
            ({
              name,
              _id,
              role,
              position,
              department,
              collegeId,
              notificationId,
            }) => {
              const id = String(_id);
              if (dict)
                teachers2[id] = {
                  name,
                  role,
                  position,
                  department,
                  notificationId,
                  _id: id,
                  college_name: collegeId ? collegeId.name : null,
                };
              // if (dict) teachers[id] = name;
              else return { name, value: id };
            },
          ),
      );
    }

    const s = await getAction(`/students?isRegistered=true&sort=name`);
    if (s && s.status === 200)
      if (s.data.data.data && s.data.data.data.length)
        studentsList = s.data.data.data;

    if (studentsList && studentsList.length) {
      setStudentOptions(
        studentsList
          .filter(({ _id, name }) =>
            name // do not allow undefined or empty names
              ? isAuth() && _id === isAuth()._id
                ? allowSelf // do not include the current user's name in drop-down, it is a part by default
                : true
              : false,
          )
          .map(({ notificationId, emailId, name, _id }) => {
            const id = String(_id);
            const optionName = `${name} | ${emailId}` 
            // if (dict) students[id] = {name:name, branch:branch, college_name:(collegeId?collegeId.name:null), role:role};
            if (dict) students[id] = name;
            else return { optionName, name, value: id, notificationId: notificationId };
          }),
      );

      setStudentsInfo(
        studentsList
          .filter(({ id, name }) =>
            name // do not allow undefined or empty names
              ? isAuth() && id === isAuth()._id
                ? allowSelf // do not include the current user's name in drop-down, it is a part by default
                : true
              : false,
          )
          .map(
            ({ role, collegeId, branch, name, _id, batch, notificationId }) => {
              const id = String(_id);
              if (dict)
                students2[id] = {
                  batch,
                  name,
                  branch,
                  _id: id,
                  college_name: collegeId ? collegeId.name : null,
                  role,
                  notificationId,
                };
              // if (dict) students[id] = name
              else return { name, value: id };
            },
          ),
      );
    }

    setStudents(students);
    setTeachers(teachers);
    setStudents2(students2);
    setTeachers2(teachers2);

    if (options && options.length) setFieldOfInterest(options);

    // Check for options as a precautionary step
  }, []);
  if (dict) return { student, teacher, student2, teacher2 };
  else
    return {
      studentsOptions,
      teachersOptions,
      field_of_interest,
      studentsInfo,
      teachersInfo,
    };
}
