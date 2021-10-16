import axios from "axios";
import * as yup from "yup";
import { imageType } from "./constants";

const TechCompanySchema = yup.object().shape({
  name: yup.string().min(2, "Too short").max(120).required("required"),
  profile: yup.string().min(2).max(2147483647).required("required"),
  summary: yup.string().max(255).min(2).required("required"),
  headline: yup.string().max(120).min(2).required("required"),
  contactInformation: yup.string().max(1000).required("required"),
  slug: yup.string().notRequired(),
  status: yup.string(),
  urls: yup.array().of(yup.string().url("Not a valid url")).notRequired(),
  // friendIds: yup.array().of(yup.number()),
  logo: yup.string().notRequired(),
});

const show = (id) => {
  return axios({
    url: "/techcompanies/" + id,
  });
};

const index = (page) => {
  return axios({
    method: "GET",
    url: `/techcompanies?pageIndex=${page}&pageSize=6`,
    headers: { "Content-Type": "application/json" },
    crossdomain: true,
  });
};

const store = (data) => {
  const { logo, ...rest } = data;
  const newModifiedData = { ...rest };
  if (logo.length > 0) {
    newModifiedData.images = [{ imageTypeId: imageType.LOGO, imageUrl: logo }];
  }
  return axios({
    method: "POST",
    url: "/techcompanies",
    data: newModifiedData,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  });
};

const update = ({ id, data }) => {
  const { logo, ...rest } = data;
  const newModifiedData = { ...rest };
  if (logo.length > 0) {
    newModifiedData.images = [{ imageTypeId: imageType.LOGO, imageUrl: logo }];
  }
  return axios({
    method: "PUT",
    url: `/techcompanies/${id}`,
    data,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  });
};

export default { index, TechCompanySchema, update, store, show };
