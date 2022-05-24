import axios from "axios";

export async function CreateRankAPI(bodyList) {
  var data = [];
  bodyList.map((body) => {
    data.push({
      type: body.type,
      ids: body.ids,
      created_date: body.created_date,
    });
  });

  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/rank",
      data
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function UpdateRankAPI(body) {
  var data = {
    type: body.type,
    ids: body.ids,
    created_date: body.created_date,
  };

  try {
    const response = await axios.put(
      process.env.REACT_APP_API_URL + "/rank/" + body.idx,
      data
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function GetRankListAPI(offset, search) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/rank/list/" + offset,
      search
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function GetRankOptionListAPI(offset, search) {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/rank/option-list"
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function GetRankInfoAPI(idx) {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/rank/" + idx
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function DeleteRankInfoAPI(idx) {
  try {
    const response = await axios.delete(
      process.env.REACT_APP_API_URL + "/rank/" + idx
    );

    return response.data;
  } catch (e) {
    return e;
  }
}
