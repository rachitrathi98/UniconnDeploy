// import * as actionTypes from "../actionTypes";
// import { axiosInstance as axios } from "../../utils/helper";

// export const failed = (err) => {
//   let error;
//   if (err.response && err.response.data.error) {
//     error = err.response.data.error;
//   }
//   return {
//     type: actionTypes.FAILED,
//     error: error,
//   };
// };

// export const successTeacherList = (response) => {
//   return {
//     type: actionTypes.SUCCESS_TEACHER_LIST,
//     response: response,
//   };
// };

// export const successStudentList = (response) => {
//     return {
//       type: actionTypes.SUCCESS_STUDENT_LIST,
//       response: response,
//     };
//   };

// export const loading = () => {
//   return {
//     type: actionTypes.LOADING,
//   };
// };

// export const getStudentList = (route, next) => {
//   return (dispatch) => {
//     dispatch(loading());
//     axios
//       .get(route)
//       .then((response) => {
//         dispatch(successStudentList(response));
//         if (next) next();
//       })
//       .catch((error) => {
//         dispatch(failed(error));
//       });
//   };
// };

// export const getTeacherList = (route, next) => {
//     return (dispatch) => {
//       dispatch(loading());
//       axios
//         .get(route)
//         .then((response) => {
//           dispatch(successTeacherList(response));
//           if (next) next();
//         })
//         .catch((error) => {
//           dispatch(failed(error));
//         });
//     };
//   };