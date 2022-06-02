import axios from "axios";
import { GetDateTimeStringFromDate } from "../constants/GlobalFunctions";
import { groupService } from "./groupService";

const base_url = process.env.REACT_APP_API_URL + "/brand";

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

const create = async (bodyList) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  var data = [];

  for (let i = 0; i < bodyList.length; i++) {
    const body = bodyList[i];
    const file = await uploadLogo(body.logo);

    data.push({
      brand_name: body.brand_name,
      sequence: body.sequence,
      nation: body.nation,
      is_use: body.is_use,
      is_income: body.is_income,
      public_uri: body.public_uri,
      room_uri: body.room_uri,
      service_uri: body.service_uri,
      deposit_uri: body.deposit_uri,
      logo: file.filename,

      created_at: GetDateTimeStringFromDate(new Date()),
      created_by: token.idx,
      updated_at: GetDateTimeStringFromDate(new Date()),
      updated_by: token.idx,
      is_deleted: false,
    });
  }

  try {
    const response = await axios.post(base_url, data);

    return response.data;
  } catch (e) {
    return e;
  }
};

const update = async (body) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  let logo = "";
  if (body.preview) {
    const file = await uploadLogo(body.logo);
    logo = file.filename;
  } else {
    logo = body.logo;
  }

  var data = {
    brand_name: body.brand_name,
    sequence: body.sequence,
    nation: body.nation,
    is_use: body.is_use,
    is_income: body.is_income,
    public_uri: body.public_uri,
    room_uri: body.room_uri,
    service_uri: body.service_uri,
    deposit_uri: body.deposit_uri,
    logo: logo,

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
  await groupService.removeByBrand(idx);
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

const sequence = async () => {
  try {
    const response = await axios.get(base_url + "/sequence");

    return response.data.max_sequence;
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

const uploadLogo = async (file) => {
  var formData = new FormData();
  formData.append("logo", file);

  try {
    const response = await axios.post(base_url + "/upload-logo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (e) {
    return e;
  }
};

export const brandService = {
  checkName,
  create,
  update,
  getList,
  getOptionList,
  get,
  sequence,
  remove,
};
