import axios from "axios";
import { GetServerTimezoneDate } from "../constants/GlobalFunctions";

// 백엔드 경로
const base_url = process.env.REACT_APP_API_URL + "/count";

// 증복명 확인
const checkName = async (name) => {
  try {
    const response = await axios.post(base_url + "/check-name", {
      brand_name: name,
    });

    return response.data.exist;
  } catch (e) {
    return e;
  }
};

// 데이터목록 등록
const create = async (body) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  var data = [
    {
      brand_id: body.brand_id,
      rent_request: body.rent_request,
      rent_admin: body.rent_admin,
      new_request: body.new_request,
      new_admin: body.new_admin,

      created_at: GetServerTimezoneDate(new Date()),
      created_by: token.idx,
      updated_at: GetServerTimezoneDate(new Date()),
      updated_by: token.idx,
      is_deleted: false,
    },
  ];

  try {
    const response = await axios.post(base_url, data);

    return response.data;
  } catch (e) {
    return e;
  }
};

// 데이터 수정
const update = async (body) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  var data = {
    brand_id: body.brand_id,
    rent_request: body.rent_request,
    rent_admin: body.rent_admin,
    new_request: body.new_request,
    new_admin: body.new_admin,

    created_at: GetServerTimezoneDate(new Date(body.created_at)),
    created_by: body.created_by,
    updated_at: GetServerTimezoneDate(new Date()),
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

// 데이터 삭제(임시삭제)
const remove = async (idx) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const response = await axios.get(base_url + "/" + idx);

  var data = {
    ...response.data,
    created_at: GetServerTimezoneDate(new Date(response.data.created_at)),
    updated_at: GetServerTimezoneDate(new Date(response.data.updated_at)),
    deleted_at: GetServerTimezoneDate(new Date()),
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

// 데이터목록 얻기
const getList = async (offset, search) => {
  try {
    const response = await axios.post(base_url + "/list/" + offset, search);

    return response.data;
  } catch (e) {
    return e;
  }
};

// 데이터목록개수 얻기
const getCount = async (search) => {
  try {
    const response = await axios.post(base_url + "/count", search);

    return response.data.count;
  } catch (e) {
    return e;
  }
};

// 옵션목록 얻기
const getOptionList = async () => {
  try {
    const response = await axios.get(base_url + "/option-list");

    return response.data;
  } catch (e) {
    return e;
  }
};

// 데이터 얻기
const get = async (idx) => {
  try {
    const response = await axios.get(base_url + "/" + idx);

    return response.data;
  } catch (e) {
    return e;
  }
};

const getByDate = async (date) => {
  try {
    const response = await axios.get(base_url + "/info-by-date/" + date);

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

export const countService = {
  checkName,
  create,
  update,
  getList,
  getCount,
  getOptionList,
  get,
  getByDate,
  remove,
};
