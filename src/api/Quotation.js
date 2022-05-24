import axios from "axios";
import { CreateFileAPI } from "./File";

export async function CheckQuotationNameAPI(brandName) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/quotation/check-name",
      {
        brand_name: brandName,
      }
    );

    return response.data.exist;
  } catch (e) {
    return e;
  }
}

export async function CreateQuotationAPI(bodyList) {
  var data = [];

  for (let i = 0; i < bodyList.length; i++) {
    const body = bodyList[i];

    data.push({
      purchase_path: body.purchase_path,
      purchase_method: body.purchase_method,
      reg_date: body.reg_date,
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
    });
  }

  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/quotation",
      data
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function UpdateQuotationAPI(body) {
  var data = {
    purchase_path: body.purchase_path,
    purchase_method: body.purchase_method,
    reg_date: body.reg_date,
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
  };

  try {
    const response = await axios.put(
      process.env.REACT_APP_API_URL + "/quotation/" + body.idx,
      data
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function GetQuotationListAPI(offset, search) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/quotation/list/" + offset,
      search
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function GetQuotationOptionListAPI(offset, search) {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/quotation/option-list"
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function GetQuotationInfoAPI(idx) {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/quotation/" + idx
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function DeleteQuotationInfoAPI(idx) {
  try {
    const response = await axios.delete(
      process.env.REACT_APP_API_URL + "/quotation/" + idx
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function GetQuotationCountAPI(search) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/quotation/count",
      search
    );

    return response.data.count;
  } catch (e) {
    return e;
  }
}

export async function DownloadQuotationFileAPI() {
  try {
    const response = await axios
      .post(process.env.REACT_APP_API_URL + "/quotation/download", null, {
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
        link.setAttribute("download", "견적신청.xlsx");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => console.log(error));
  } catch (e) {
    return e;
  }
}
