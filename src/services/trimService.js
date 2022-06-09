import axios from "axios";
import { GetServerTimezoneDate } from "../constants/GlobalFunctions";

const base_url = process.env.REACT_APP_API_URL + "/trim";

const checkName = async (name) => {
  try {
    const response = await axios.post(base_url + "/check-name", {
      trim_name: name,
    });

    return response.data.exist;
  } catch (e) {
    return e;
  }
};

const create = async (body) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  var data = [
    {
      brand_id: body.brand_id,
      group_id: body.group_id,
      model_id: body.model_id,
      lineup_id: body.lineup_id,
      trim_name: body.trim_name,
      gearbox_type: body.gearbox_type,
      price: body.price,
      model_trim_ids: body.model_trim_ids,
      is_use: body.is_use,
      detail_meta: body.detail_meta,

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

const update = async (body) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  var data = {
    brand_id: body.brand_id,
    group_id: body.group_id,
    model_id: body.model_id,
    lineup_id: body.lineup_id,
    trim_name: body.trim_name,
    gearbox_type: body.gearbox_type,
    price: body.price,
    model_trim_ids: body.model_trim_ids,
    is_use: body.is_use,
    detail_meta: body.detail_meta,

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

const removeByLineup = async (lineup_id) => {
  try {
    const response = await axios.post(base_url + "/list-id", {
      lineup_id: lineup_id,
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

export const trimService = {
  checkName,
  create,
  update,
  getList,
  getCount,
  getOptionList,
  get,
  remove,
  removeByLineup,
};
