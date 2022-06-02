import axios from "axios";
import { GetDateTimeStringFromDate } from "../constants/GlobalFunctions";

const base_url = process.env.REACT_APP_API_URL + "/extra";

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
  const token = JSON.parse(sessionStorage.getItem("token"));
  var data = [
    {
      model_id: body.model_id,
      displacement: body.displacement,
      registered_area: body.registered_area,
      acquisition_tax: body.acquisition_tax,
      bond_discount: body.bond_discount,
      consignment: body.consignment,

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
  const token = JSON.parse(sessionStorage.getItem("token"));
  var data = {
    model_id: body.model_id,
    displacement: body.displacement,
    registered_area: body.registered_area,
    acquisition_tax: body.acquisition_tax,
    bond_discount: body.bond_discount,
    consignment: body.consignment,

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

const uploadExcel = async (file) => {
  var formData = new FormData();
  formData.append("excel", file);

  try {
    const response = await axios.post(base_url + "/upload-excel", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (e) {
    return e;
  }
};

export const extraService = {
  checkName,
  create,
  update,
  getList,
  getOptionList,
  get,
  remove,
  download,
  uploadExcel,
};
