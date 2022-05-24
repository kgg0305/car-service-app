import axios from "axios";

export async function CheckUserNameAPI(brandName) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/user/check-name",
      {
        brand_name: brandName,
      }
    );

    return response.data.exist;
  } catch (e) {
    return e;
  }
}

export async function CreateUserAPI(bodyList) {
  var data = [];

  for (let i = 0; i < bodyList.length; i++) {
    const body = bodyList[i];

    data.push({
      type_id: body.type_id,
      group_id: body.group_id,
      name: body.name,
      user_id: body.user_id,
      phone: body.phone,
      email: body.email,
      password: body.password,
    });
  }

  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/user",
      data
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function UpdateUserAPI(body) {
  var data = {
    type_id: body.type_id,
    group_id: body.group_id,
    name: body.name,
    user_id: body.user_id,
    phone: body.phone,
    email: body.email,
    password: body.password,
  };

  try {
    const response = await axios.put(
      process.env.REACT_APP_API_URL + "/user/" + body.idx,
      data
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function GetUserListAPI(offset, search) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/user/list/" + offset,
      search
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function GetUserOptionListAPI(offset, search) {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/user/option-list"
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function GetUserInfoAPI(idx) {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/user/" + idx
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function DeleteUserInfoAPI(idx) {
  try {
    const response = await axios.delete(
      process.env.REACT_APP_API_URL + "/user/" + idx
    );

    return response.data;
  } catch (e) {
    return e;
  }
}
