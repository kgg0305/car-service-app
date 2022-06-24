import axios from "axios";
import {
  GetDateStringFromDate,
  GetServerTimezoneDate,
} from "../constants/GlobalFunctions";
import { lineupService } from "./lineupService";
import { galleryService } from "./galleryService";
import { popularService } from "./popularService";
import { rankService } from "./rankService";

// 백엔드 경로
const base_url = process.env.REACT_APP_API_URL + "/model";

// 증복명 확인
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

// 데이터목록 등록
const create = async (body) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  let pictures = {};
  for (let i = 1; i <= 8; i++) {
    const picture = body["picture_" + i].uid.includes("__AUTO__")
      ? ""
      : body["picture_" + i];
    pictures["picture_" + i] = picture;
    if (picture) {
      const file = await uploadImage(picture);
      pictures["picture_" + i] = file.filename;
    }
  }

  var data = [
    {
      group_id: body.group_id,
      brand_id: body.brand_id,
      model_name: body.model_name,
      is_new: body.is_new,
      release_date: GetDateStringFromDate(new Date(body.release_date)),
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
  let pictures = {};
  for (let i = 1; i <= 8; i++) {
    pictures["picture_" + i] = "";
    if (body["picture_" + i].uid) {
      const picture = body["picture_" + i].uid.includes("__AUTO__")
        ? ""
        : body["picture_" + i];

      if (picture) {
        const file = await uploadImage(picture);
        pictures["picture_" + i] = file.filename;
      }
    } else {
      pictures["picture_" + i] = body["preview_" + i];
    }
  }

  var data = {
    group_id: body.group_id,
    brand_id: body.brand_id,
    model_name: body.model_name,
    is_new: body.is_new,
    release_date: GetDateStringFromDate(new Date(body.release_date)),
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
  await lineupService.removeByModel(idx);
  await galleryService.removeByModel(idx);
  await popularService.removeByModel(idx);
  await rankService.removeByModel(idx);
  const response = await axios.get(base_url + "/" + idx);

  var data = {
    ...response.data,
    release_date: GetDateStringFromDate(new Date(response.data.release_date)),
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

const removeByGroup = async (group_id) => {
  try {
    const response = await axios.post(base_url + "/list-id", {
      group_id: group_id,
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
  getCount,
  getOptionList,
  get,
  sequence,
  remove,
  removeByGroup,
};
