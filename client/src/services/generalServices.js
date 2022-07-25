import { axiosInstance as axios } from "../utils/helper";

export const getAction = async (route, callback) => {
  try {
    const res = await axios.get(route);
    if (callback) callback(res);
    return res;
  } catch (err) {
    console.log(err);
    return err.response;
  }
};

export const postAction = async (route, data, callback) => {
  try {
    const res = await axios.post(route, data);
    console.log(res);
    if (callback) callback(res);
    return res;
  } catch (err) {
    console.log(err.response);
    return err.response;
  }
};

export const patchAction = async (route, data, callback) => {
  try {
    const res = await axios.patch(route, data);
    if (callback) callback(res);
    return res;
  } catch (err) {
    console.log(err);
    return err.response;
  }
};

export const deleteAction = async (route, callback) => {
  try {
    const res = await axios.delete(route);
    if (callback) callback(res);
    return res;
  } catch (err) {
    console.log(err.response);
    return err.response;
  }
};
