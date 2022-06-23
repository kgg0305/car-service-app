import axios from "axios";
import { GetServerTimezoneDate } from "../constants/GlobalFunctions";

const base_url = process.env.REACT_APP_API_URL + "/rank";

const checkName = async (name) => {
  try {
    const response = await axios.post(base_url + "/check-name", {
      group_name: name,
    });

    return response.data.exist;
  } catch (e) {
    return e;
  }
};

const create = async (bodyList) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  var data = [];
  bodyList.map((body) => {
    data.push({
      type: body.type,
      ids: body.ids,

      created_at: GetServerTimezoneDate(new Date()),
      created_by: token.idx,
      updated_at: GetServerTimezoneDate(new Date()),
      updated_by: token.idx,
      is_deleted: false,
    });
  });

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
    type: body.type,
    ids: body.ids,

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

const removeByModel = async (model_id) => {
  try {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const response = await axios.get(base_url + "/1");

    const model_id_array = response.data.ids.split(",");
    const updated_model_ids = model_id_array
      .filter((item) => item !== model_id)
      .join(",");

    var data = {
      type: response.data.type,
      ids: updated_model_ids,

      created_at: GetServerTimezoneDate(new Date(response.data.created_at)),
      created_by: response.data.created_by,
      updated_at: GetServerTimezoneDate(new Date()),
      updated_by: token.idx,
      is_deleted: response.data.is_deleted,
    };

    await axios.put(base_url + "/1", data);

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

export const rankService = {
  checkName,
  create,
  update,
  getList,
  getCount,
  getOptionList,
  get,
  remove,
  removeByModel,
};
