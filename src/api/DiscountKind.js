import axios from "axios";

export async function CheckDiscountKindNameAPI(kind_name) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/discount-kind/check-name",
      {
        kind_name: kind_name,
      }
    );

    return response.data.exist;
  } catch (e) {
    return e;
  }
}

export async function CreateDiscountKindAPI(bodyList) {
  var data = [];
  bodyList.map((body) => {
    body.kindBodyList.map((kindBody) => {
      data.push({
        brand_id: body.brand_id,
        kind_name: kindBody.kind_name,
        kind_detail: kindBody.kind_detail,
        s_date: kindBody.s_date,
        e_date: kindBody.e_date,
      });
    });
  });

  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/discount-kind",
      data
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function UpdateDiscountKindAPI(body) {
  var data = {
    brand_id: body.brand_id,
    kind_name: body.kind_name,
    kind_detail: body.kind_detail,
    s_date: body.s_date,
    e_date: body.e_date,
  };

  try {
    const response = await axios.put(
      process.env.REACT_APP_API_URL + "/discount-kind/" + body.idx,
      data
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function GetDiscountKindListAPI(offset, search) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/discount-kind/list/" + offset,
      search
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function GetDiscountKindOptionListAPI(offset, search) {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/discount-kind/option-list"
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function GetDiscountKindInfoAPI(idx) {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/discount-kind/" + idx
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function DeleteDiscountKindInfoAPI(idx) {
  try {
    const response = await axios.delete(
      process.env.REACT_APP_API_URL + "/discount-kind/" + idx
    );

    return response.data;
  } catch (e) {
    return e;
  }
}
