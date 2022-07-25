import { axiosInstance as axios } from "../utils/helper";

const getTeachers = async (jwt) => {
  try {
    return await axios.get(`/api/teachers`);
  } catch (err) {
    console.log(err.response);
    return err.response;
  }
};

const getTeacher = async (jwt, id) => {
  try {
    return await axios.get(`/api/teachers/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  } catch (err) {
    console.log(err.response);
    return err.response;
  }
};

const updateTeacher = async (jwt, id, teacher) => {
  try {
    return await axios.post(`/api/teachers/${id}`, teacher, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  } catch (err) {
    console.log(err.response);
    return err.response;
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getTeachers,
  getTeacher,
  updateTeacher,
};
