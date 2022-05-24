import axios from "axios";

export async function CheckTrimNameAPI(lineup_name) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/trim/check-name",
      {
        lineup_name: lineup_name,
      }
    );

    return response.data.exist;
  } catch (e) {
    return e;
  }
}

export async function CreateTrimAPI(body) {
  var data = [
    {
      brand_id: body.brand_id,
      group_id: body.group_id,
      model_id: body.model_id,
      lineup_id: body.lineup_id,
      trim_name: body.trim_name,
      gearbox_type: body.gearbox_type,
      price: body.price,
      model_trim_ids: body.model_trim_ids,
      is_use: body.is_use,
    },
  ];

  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/trim",
      data
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function UpdateTrimAPI(body) {
  var data = {
    brand_id: body.brand_id,
    group_id: body.group_id,
    model_id: body.model_id,
    lineup_id: body.lineup_id,
    trim_name: body.trim_name,
    gearbox_type: body.gearbox_type,
    price: body.price,
    model_trim_ids: body.model_trim_ids,
    is_use: body.is_use,
  };

  try {
    const response = await axios.put(
      process.env.REACT_APP_API_URL + "/trim/" + body.idx,
      data
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function GetTrimListAPI(offset, search) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/trim/list/" + offset,
      search
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function GetTrimOptionListAPI(offset, search) {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/trim/option-list"
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function GetTrimInfoAPI(idx) {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/trim/" + idx
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function DeleteTrimInfoAPI(idx) {
  try {
    const response = await axios.delete(
      process.env.REACT_APP_API_URL + "/trim/" + idx
    );

    return response.data;
  } catch (e) {
    return e;
  }
}
