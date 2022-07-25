import { axiosInstance as axios } from "../utils/helper";

const getReviews = async (jwt) => {
  try {
    return await axios.get(`/api/admin/reviews`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  } catch (err) {
    console.log(err.response);
    return err.response;
  }
};

const getDetailedReview = async (jwt, id) => {
  try {
    return await axios.get(`/api/admin/reviews/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  } catch (err) {
    console.log(err.response);
    return err.response;
  }
};

const updateReview = async (jwt, id, update) => {
  try {
    return await axios.post(`/api/admin/reviews/${id}`, update, {
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
export default { getReviews, getDetailedReview, updateReview };
