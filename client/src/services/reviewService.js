import { axiosInstance as axios } from "../utils/helper";

const getReviews = async () => {
  try {
    return await axios.get(`/api/reviews`);
  } catch (err) {
    console.log(err.response);
    return err.response;
  }
};

const postReview = async (jwt, review) => {
  try {
    return await axios.post(`/api/reviews`, review, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  } catch (err) {
    console.log(err.response);
    return err.response;
  }
};

const deleteReview = async (jwt, id) => {
  try {
    return await axios.delete(`/api/reviews/${id}`, {
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
export default { getReviews, postReview, deleteReview };
