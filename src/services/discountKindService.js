import axios from "axios";
import {
  GetDateStringFromDate,
  GetDateTimeStringFromDate,
} from "../constants/GlobalFunctions";

const base_url = process.env.REACT_APP_API_URL + "/discount-kind";

const checkName = async (name) => {
  try {
    const response = await axios.post(base_url + "/check-name", {
      kind_name: name,
    });

    return response.data.exist;
  } catch (e) {
    return e;
  }
};

const create = async (body) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  var data = {
    brand_id: body.brand_id,
    kind_name: body.kind_name,
    kind_detail: body.kind_detail,
    s_date: GetDateStringFromDate(new Date(body.s_date)),
    e_date: GetDateStringFromDate(new Date(body.e_date)),

    created_at: GetDateTimeStringFromDate(new Date()),
    created_by: token.idx,
    updated_at: GetDateTimeStringFromDate(new Date()),
    updated_by: token.idx,
    is_deleted: false,
  };

  try {
    const response = await axios.post(base_url, data);

    return response.data;
  } catch (e) {
    return e;
  }
};

const update = async (body) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  var data = {
    brand_id: body.brand_id,
    kind_name: body.kind_name,
    kind_detail: body.kind_detail,
    s_date: GetDateStringFromDate(new Date(body.s_date)),
    e_date: GetDateStringFromDate(new Date(body.e_date)),

    created_at: GetDateTimeStringFromDate(new Date(body.created_at)),
    created_by: body.created_by,
    updated_at: GetDateTimeStringFromDate(new Date()),
    updated_by: token.idx,
    is_deleted: body.is_deleted,
  };

  try {
    const response = await axios.put(base_url + "/" + body.idx, data);

    return response.data;
  } catch (e) {
    return e;
  }
};

const remove = async (idx) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const response = await axios.get(base_url + "/" + idx);

  var data = {
    ...response.data,
    created_at: GetDateTimeStringFromDate(new Date(response.data.created_at)),
    updated_at: GetDateTimeStringFromDate(new Date(response.data.updated_at)),
    deleted_at: GetDateTimeStringFromDate(new Date()),
    deleted_by: token.idx,
    is_deleted: true,
  };

  try {
    const response = await axios.put(base_url + "/" + idx, data);

    return response.data;
  } catch (e) {
    return e;
  }
};

const getList = async (offset, search) => {
  try {
    const response = await axios.post(base_url + "/list/" + offset, search);

    return response.data;
  } catch (e) {
    return e;
  }
};

const getCount = async (search) => {
  try {
    const response = await axios.post(base_url + "/count", search);

    return response.data.count;
  } catch (e) {
    return e;
  }
};

const getListAll = async (search) => {
  try {
    const response = await axios.post(base_url + "/list-all", search);

    return response.data;
  } catch (e) {
    return e;
  }
};

const getOptionList = async () => {
  try {
    const response = await axios.get(base_url + "/option-list");

    return response.data;
  } catch (e) {
    return e;
  }
};

const get = async (idx) => {
  try {
    const response = await axios.get(base_url + "/" + idx);

    return response.data;
  } catch (e) {
    return e;
  }
};

// const remove = async(idx) => {
//     try {
//         const response = await axios.delete(base_url + '/' + idx);

//         return response.data;
//     } catch (e) {
//         return e;
//     }
// }

export const discountKindService = {
  checkName,
  create,
  update,
  getList,
  getCount,
  getListAll,
  getOptionList,
  get,
  remove,
};
