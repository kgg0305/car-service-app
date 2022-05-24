import axios from "axios";
import { GetDateTimeStringFromDate } from "../constants/GlobalFunctions";

const base_url = process.env.REACT_APP_API_URL + "/model";
const token = JSON.parse(sessionStorage.getItem("token"));

const checkName = async (name) => {
  try {
    const response = await axios.post(base_url + "/check-name", {
      model_name: name,
    });

    return response.data.exist;
  } catch (e) {
    return e;
  }
};

const create = async (body) => {
  let pictures = {};
  for (let i = 0; i < 8; i++) {
    pictures["picture_" + (i + 1)] = body["picture_" + (i + 1)];
    if (body["preview_" + (i + 1)]) {
      const file = await uploadImage(body["picture_" + (i + 1)]);
      pictures["picture_" + (i + 1)] = file.filename;
    }
  }

  var data = [
    {
      group_id: body.group_id,
      brand_id: body.brand_id,
      model_name: body.model_name,
      is_new: body.is_new,
      release_date: body.release_date,
      sequence: body.sequence,
      is_use: body.is_use,
      discount_condition_ids: body.discount_condition_ids,
      picture_1: pictures["picture_1"],
      picture_2: pictures["picture_2"],
      picture_3: pictures["picture_3"],
      picture_4: pictures["picture_4"],
      picture_5: pictures["picture_5"],
      picture_6: pictures["picture_6"],
      picture_7: pictures["picture_7"],
      picture_8: pictures["picture_8"],

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
  let pictures = {};
  for (let i = 0; i < 8; i++) {
    pictures["picture_" + (i + 1)] = body["picture_" + (i + 1)];
    if (body["preview_" + (i + 1)]) {
      const file = await uploadImage(body["picture_" + (i + 1)]);
      pictures["picture_" + (i + 1)] = file.filename;
    }
  }

  var data = {
    group_id: body.group_id,
    brand_id: body.brand_id,
    model_name: body.model_name,
    is_new: body.is_new,
    release_date: body.release_date,
    sequence: body.sequence,
    is_use: body.is_use,
    discount_condition_ids: body.discount_condition_ids,
    picture_1: pictures["picture_1"],
    picture_2: pictures["picture_2"],
    picture_3: pictures["picture_3"],
    picture_4: pictures["picture_4"],
    picture_5: pictures["picture_5"],
    picture_6: pictures["picture_6"],
    picture_7: pictures["picture_7"],
    picture_8: pictures["picture_8"],

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

const uploadImage = async (file) => {
  var formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post(base_url + "/upload-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (e) {
    return e;
  }
};

export const modelService = {
  checkName,
  create,
  update,
  getList,
  getOptionList,
  get,
  remove,
};
