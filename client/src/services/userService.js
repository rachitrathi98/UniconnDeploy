import { axiosInstance as axios } from "../utils/helper";

const getUser = async () => {
  try {
    return await axios.get(`/api/auth/me`);
  } catch (err) {
    console.log("error in userService", err);
    return err.response;
  }
};

const getUserReviews = async (jwt) => {
  try {
    return await axios.get(`/api/user/reviews`, {
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
export default { getUser, getUserReviews };
