import axios from "axios";

export async function CheckContentNameAPI(model_name) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/content/check-name",
      {
        model_name: model_name,
      }
    );

    return response.data.exist;
  } catch (e) {
    return e;
  }
}

export async function CreateContentAPI(body) {
  var data = [
    {
      media_type: body.media_type,
      category_id: body.category_id,
      title: body.title,
      views: body.views,
      created_date: body.created_date,
      is_use: body.is_use,
    },
  ];

  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/content",
      data
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function UpdateContentAPI(body) {
  var data = {
    media_type: body.media_type,
    category_id: body.category_id,
    title: body.title,
    views: body.views,
    created_date: body.created_date,
    is_use: body.is_use,
  };

  try {
    const response = await axios.put(
      process.env.REACT_APP_API_URL + "/content/" + body.idx,
      data
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function GetContentListAPI(offset, search) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/content/list/" + offset,
      search
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function GetContentOptionListAPI(offset, search) {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/content/option-list"
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function GetContentInfoAPI(idx) {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/content/" + idx
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function DeleteContentInfoAPI(idx) {
  try {
    const response = await axios.delete(
      process.env.REACT_APP_API_URL + "/content/" + idx
    );

    return response.data;
  } catch (e) {
    return e;
  }
}
