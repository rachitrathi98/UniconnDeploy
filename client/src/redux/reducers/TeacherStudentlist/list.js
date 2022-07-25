// import { updateObject } from "../../utils/helper";
// import { toast } from "react-toastify";

// export const failed = (state, action) => {
//     console.error("ERROR 💥 Failed", action.error);
//     toast.error(action.error);
//     return updateObject(state, { error: true, loading: false });
// };

// export const successStudentList = (state, {response}) => {
//     if (response && response.status===200)
//         return updateObject(state, { studentsList: response.data.data.data, loading: false });
//     else
//         return state //TODO: Add error handling later
// };
// export const successTeacherList = (state, {response}) => {
//     if (response && response.status===200)
//         return updateObject(state, { teachersList: response.data.data.data, loading: false });
//     else
//         return state //TODO: Add error handling later
// };
// export const loading = (state, action) => {
//     return updateObject(state, { loading: true });
// };

