import axios from "axios";
import { GetServerTimezoneDate } from "../constants/GlobalFunctions";
import { discountKindService } from "./discountKindService";
import { groupService } from "./groupService";

// 백엔드 경로
const base_url = process.env.REACT_APP_API_URL + "/brand";

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
const create = async (bodyList) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  var data = [];

  for (let i = 0; i < bodyList.length; i++) {
    const body = bodyList[i];

    let logo = "";
    if (body.logo.uid) {
      const picture = body.logo.uid.includes("__AUTO__") ? "" : body.logo;

      if (picture) {
        const file = await uploadLogo(picture);
        logo = file.filename;
      }
    } else {
      logo = body.preview;
    }

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
      logo: logo,

      created_at: GetServerTimezoneDate(new Date()),
      created_by: token.idx,
      updated_at: GetServerTimezoneDate(new Date()),
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

// 데이터 수정
const update = async (body) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  let logo = "";
  if (body.logo.uid) {
    const picture = body.logo.uid.includes("__AUTO__") ? "" : body.logo;

    if (picture) {
      const file = await uploadLogo(picture);
      logo = file.filename;
    }
  } else {
    logo = body.preview;
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
  await groupService.removeByBrand(idx);
  await discountKindService.removeByBrand(idx);
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

// 로고 업로드
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
  getCount,
  getOptionList,
  get,
  sequence,
  remove,
};
