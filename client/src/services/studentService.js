import { axiosInstance as axios } from "../utils/helper";

const getStudents = async (jwt) => {
  try {
    return await axios.get(`/api/students`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  } catch (err) {
    console.log(err.response);
    return err.response;
  }
};

const getStudent = async (jwt, id) => {
  try {
    return await axios.get(`/api/students/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  } catch (err) {
    console.log(err.response);
    return err.response;
  }
};

const updateStudent = async (jwt, id, student) => {
  try {
    return await axios.post(`/students/${id}`, student, {
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
export default { getStudents, getStudent, updateStudent };
