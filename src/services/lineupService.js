import axios from "axios";
import { GetDateTimeStringFromDate } from "../constants/GlobalFunctions";
import { trimService } from "./trimService";

const base_url = process.env.REACT_APP_API_URL + "/lineup";
const token = JSON.parse(sessionStorage.getItem("token"));

const checkName = async (name) => {
  try {
    const response = await axios.post(base_url + "/check-name", {
      lineup_name: name,
    });

    return response.data.exist;
  } catch (e) {
    return e;
  }
};

const create = async (body) => {
  var data = [
    {
      brand_id: body.brand_id,
      group_id: body.group_id,
      model_id: body.model_id,
      model_lineup_ids: body.model_lineup_ids,
      model_color_ids: body.model_color_ids,
      lineup_name: body.lineup_name,
      fule_kind: body.fule_kind,
      year_type: body.year_type,
      is_use: body.is_use,

      created_at: GetDateTimeStringFromDate(new Date()),
      created_by: token.idx,
      updated_at: GetDateTimeStringFromDate(new Date()),
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
  var data = {
    brand_id: body.brand_id,
    group_id: body.group_id,
    model_id: body.model_id,
    model_lineup_ids: body.model_lineup_ids,
    model_color_ids: body.model_color_ids,
    lineup_name: body.lineup_name,
    fule_kind: body.fule_kind,
    year_type: body.year_type,
    is_use: body.is_use,

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
  await trimService.removeByLineup(idx);
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

const removeByModel = async (model_id) => {
  try {
    const response = await axios.post(base_url + "/list-id", {
      model_id: model_id,
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

export const lineupService = {
  checkName,
  create,
  update,
  getList,
  getOptionList,
  get,
  remove,
  removeByModel,
};
