import axios from "axios";

export async function CreateTrimSpecificationAPI(bodyList) {
  var data = [];
  bodyList.map((body) => {
    data.push({
      trim_id: body.trim_id,
      specification_id: body.specification_id,
      detail: body.detail,
    });
  });

  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/trim-specification",
      data
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function UpdateTrimSpecificationAPI(body) {
  var data = {
    trim_id: body.trim_id,
    specification_id: body.specification_id,
    detail: body.detail,
  };

  try {
    const response = await axios.put(
      process.env.REACT_APP_API_URL + "/trim-specification/" + body.idx,
      data
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function GetTrimSpecificationListAPI(offset, search) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/trim-specification/list/" + offset,
      search
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function GetTrimSpecificationOptionListAPI(offset, search) {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/trim-specification/option-list"
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function GetTrimSpecificationInfoAPI(idx) {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/trim-specification/" + idx
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function DeleteTrimSpecificationInfoAPI(idx) {
  try {
    const response = await axios.delete(
      process.env.REACT_APP_API_URL + "/trim-specification/" + idx
    );

    return response.data;
  } catch (e) {
    return e;
  }
}
