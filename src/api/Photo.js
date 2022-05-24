import axios from "axios";

export async function CheckPhotoNameAPI(model_name) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/photo/check-name",
      {
        model_name: model_name,
      }
    );

    return response.data.exist;
  } catch (e) {
    return e;
  }
}

export async function CreatePhotoAPI(body) {
  var data = [
    {
      category: body.category,
      tag: body.tag,
      content_ids: body.content_ids,
      is_use: body.is_use,
    },
  ];

  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/photo",
      data
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function UpdatePhotoAPI(body) {
  var data = {
    category: body.category,
    tag: body.tag,
    content_ids: body.content_ids,
    is_use: body.is_use,
  };

  try {
    const response = await axios.put(
      process.env.REACT_APP_API_URL + "/photo/" + body.idx,
      data
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function GetPhotoListAPI(offset, search) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/photo/list/" + offset,
      search
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function GetPhotoOptionListAPI(offset, search) {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/photo/option-list"
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function GetPhotoInfoAPI(idx) {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/photo/" + idx
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function DeletePhotoInfoAPI(idx) {
  try {
    const response = await axios.delete(
      process.env.REACT_APP_API_URL + "/photo/" + idx
    );

    return response.data;
  } catch (e) {
    return e;
  }
}
