import axios from "axios";

const destroy = (id) =>
  axios({
    method: "DELETE",
    url: `/friends/${id}`,
    crossorigin: true,
  });
const create = (data) => {
  return axios({
    url: "/friends",
    method: "POST",
    data,
    crossorigin: true,
  });
};
const update = (data) => {
  return axios({
    url: `/friends/${data.id}`,
    method: "PUT",
    data: data,
    crossorigin: true,
  });
};

const index = (page) => {
  return axios({
    url: `/friends?pageIndex=${page}&pageSize=6`,
    method: "GET",
    crossorigin: true,
  });
};
export default { destroy, create, update, index };
