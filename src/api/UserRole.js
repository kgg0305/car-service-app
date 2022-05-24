import axios from "axios";

export async function CheckUserRoleNameAPI(brandName) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/user-role/check-name",
      {
        brand_name: brandName,
      }
    );

    return response.data.exist;
  } catch (e) {
    return e;
  }
}

export async function CreateUserRoleAPI(bodyList) {
  var data = [];

  for (let i = 0; i < bodyList.length; i++) {
    const body = bodyList[i];

    data.push({
      name: body.name,
      user_id: body.user_id,
      status: body.status,
    });
  }

  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/user-role",
      data
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function UpdateUserRoleAPI(body) {
  var data = {
    name: body.name,
    user_id: body.user_id,
    status: body.status,
  };

  try {
    const response = await axios.put(
      process.env.REACT_APP_API_URL + "/user-role/" + body.idx,
      data
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function GetUserRoleListAPI(offset, search) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/user-role/list/" + offset,
      search
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function GetUserRoleOptionListAPI(offset, search) {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/user-role/option-list"
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function GetUserRoleInfoAPI(idx) {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/user-role/" + idx
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function DeleteUserRoleInfoAPI(idx) {
  try {
    const response = await axios.delete(
      process.env.REACT_APP_API_URL + "/user-role/" + idx
    );

    return response.data;
  } catch (e) {
    return e;
  }
}
