import axios from "axios";

export async function CheckRecommendationNameAPI(model_name) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/recommendation/check-name",
      {
        model_name: model_name,
      }
    );

    return response.data.exist;
  } catch (e) {
    return e;
  }
}

export async function CreateRecommendationAPI(body) {
  var data = [
    {
      publish_date: body.publish_date,
      content_ids: body.content_ids,
    },
  ];

  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/recommendation",
      data
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function UpdateRecommendationAPI(body) {
  var data = {
    publish_date: body.publish_date,
    content_ids: body.content_ids,
  };

  try {
    const response = await axios.put(
      process.env.REACT_APP_API_URL + "/recommendation/" + body.idx,
      data
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function GetRecommendationListAPI(offset, search) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/recommendation/list/" + offset,
      search
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function GetRecommendationOptionListAPI(offset, search) {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/recommendation/option-list"
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function GetRecommendationInfoAPI(idx) {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/recommendation/" + idx
    );

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function DeleteRecommendationInfoAPI(idx) {
  try {
    const response = await axios.delete(
      process.env.REACT_APP_API_URL + "/recommendation/" + idx
    );

    return response.data;
  } catch (e) {
    return e;
  }
}
