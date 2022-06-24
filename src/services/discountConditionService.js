import axios from "axios";
import { GetServerTimezoneDate } from "../constants/GlobalFunctions";

// 백엔드 경로
const base_url = process.env.REACT_APP_API_URL + "/discount-condition";

// 증복명 확인
const checkName = async (name) => {
  try {
    const response = await axios.post(base_url + "/check-name", {
      condition_name: name,
    });

    return response.data.exist;
  } catch (e) {
    return e;
  }
};

// 데이터목록 등록
const create = async (body) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  var data = {
    discount_kind_id: body.discount_kind_id,
    condition_name: body.condition_name,
    discount_price: body.discount_price,
    price_unit: body.price_unit,

    created_at: GetServerTimezoneDate(new Date()),
    created_by: token.idx,
    updated_at: GetServerTimezoneDate(new Date()),
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

// 데이터 수정
const update = async (body) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  var data = {
    discount_kind_id: body.discount_kind_id,
    condition_name: body.condition_name,
    discount_price: body.discount_price,
    price_unit: body.price_unit,

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

const removeByCondition = async (discount_kind_id) => {
  try {
    const response = await axios.post(base_url + "/list-id", {
      discount_kind_id: discount_kind_id,
    });

    for (let i = 0; i < response.data.length; i++) {
      const idx = response.data[i].idx;
      await remove(idx);
    }

    return;
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

const getListAll = async (search) => {
  try {
    const response = await axios.post(base_url + "/list-all", search);

    return response.data;
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

// const remove = async(idx) => {
//     try {
//         const response = await axios.delete(base_url + '/' + idx);

//         return response.data;
//     } catch (e) {
//         return e;
//     }
// }

export const discountConditionService = {
  checkName,
  create,
  update,
  getList,
  getCount,
  getListAll,
  getOptionList,
  get,
  remove,
  removeByCondition,
};
