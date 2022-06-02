import axios from "axios";
import { GetDateTimeStringFromDate } from "../constants/GlobalFunctions";

const base_url = process.env.REACT_APP_API_URL + "/quotation";

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
      purchase_path: body.purchase_path,
      purchase_method: body.purchase_method,
      client_name: body.client_name,
      client_phone: body.client_phone,
      brand_id: body.brand_id,
      model_id: body.model_id,
      lineup_id: body.lineup_id,
      car_kind_id: body.car_kind_id,
      trim_id: body.trim_id,
      is_business: body.is_business,
      is_contract: body.is_contract,
      contract_date: body.contract_date,
      is_release: body.is_release,
      release_date: body.release_date,
      is_close: body.is_close,
      note: body.note,
      assign_to: body.assign_to,

      created_at: GetDateTimeStringFromDate(new Date()),
      created_by: token.idx,
      updated_at: GetDateTimeStringFromDate(new Date()),
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
    purchase_path: body.purchase_path,
    purchase_method: body.purchase_method,
    client_name: body.client_name,
    client_phone: body.client_phone,
    brand_id: body.brand_id,
    model_id: body.model_id,
    lineup_id: body.lineup_id,
    car_kind_id: body.car_kind_id,
    trim_id: body.trim_id,
    is_business: body.is_business,
    is_contract: body.is_contract,
    contract_date: body.contract_date,
    is_release: body.is_release,
    release_date: body.release_date,
    is_close: body.is_close,
    note: body.note,
    assign_to: body.assign_to,

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

const count = async (search) => {
  try {
    const response = await axios.post(base_url + "/count", search);

    return response.data.count;
  } catch (e) {
    return e;
  }
};

const download = async () => {
  try {
    const response = await axios
      .post(base_url + "/download", null, {
        headers: {
          "Content-Disposition": "attachment; filename=template.xlsx",
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
        responseType: "arraybuffer",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "취득세.xlsx");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => console.log(error));
  } catch (e) {
    return e;
  }
};

export const quotationService = {
  checkName,
  create,
  update,
  getList,
  getOptionList,
  get,
  remove,
  count,
  download,
};
