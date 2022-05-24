import { brandService } from "../../../../services/brandService";
import { groupService } from "../../../../services/groupService";
import { modelGalleryService } from "../../../../services/modelGalleryService";
import { modelService } from "../../../../services/modelService";
import { photoService } from "../../../../services/photoService";

const prefix = "content/popular/edit/";

const INIT = prefix + "INIT";
const REMOVE_REDIRECTTO = prefix + "REMOVE_REDIRECTTO";
const SHOW_VALIDATION = prefix + "SHOW_VALIDATION";
const CLOSE_VALIDATION = prefix + "CLOSE_VALIDATION";
const SHOW_CONFIRM = prefix + "SHOW_CONFIRM";
const CLOSE_CONFIRM = prefix + "CLOSE_CONFIRM";
const SET_BODY = prefix + "SET_BODY";
const SAVE = prefix + "SAVE";
const REMOVE = prefix + "REMOVE";

export const init = (idx) => async (dispatch) => {
  try {
    const brandOptionList = await brandService.getOptionList(idx);
    const groupOptionList = await groupService.getOptionList(idx);
    const modelOptionList = await modelService.getOptionList(idx);
    const modelBodyInfo = await modelService.get(idx);
    const bodyList = await modelGalleryService.getList(0, {
      model_id: idx,
    });

    dispatch({
      type: INIT,
      payload: {
        brandOptionList: brandOptionList,
        groupOptionList: groupOptionList,
        modelOptionList: modelOptionList,
        modelBodyInfo: modelBodyInfo,
        bodyList: bodyList,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
export const removeRedirectTo = () => ({
  type: REMOVE_REDIRECTTO,
});
export const showValidation = (list) => ({
  type: SHOW_VALIDATION,
  payload: {
    list: list,
  },
});
export const closeValidation = () => ({
  type: CLOSE_VALIDATION,
});
export const showConfirm = () => ({
  type: SHOW_CONFIRM,
});
export const closeConfirm = () => ({
  type: CLOSE_CONFIRM,
});
export const setBody = (name, value) => ({
  type: SET_BODY,
  payload: {
    name: name,
    value: value,
  },
});
export const save = (url, bodyInfo, contentBodyList) => async (dispatch) => {
  const validation = [];
  if (bodyInfo.category === "") {
    validation.push({
      title: "정보",
      name: "카테고리",
    });
  }
  if (bodyInfo.tag === "") {
    validation.push({
      title: "정보",
      name: "태그",
    });
  }
  contentBodyList.map((body, index) => {
    if (body.idx === null) {
      validation.push({
        title: "뉴스 " + (index + 1 < 10 ? "0" + (index + 1) : index + 1),
        name: "콘텐츠 번호",
      });
    }
    if (body.title === "등록되지 않은 콘텐츠입니다.") {
      validation.push({
        title: "뉴스 " + (index + 1 < 10 ? "0" + (index + 1) : index + 1),
        name: "콘텐츠 내용",
      });
    }
  });

  if (validation.length > 0) {
    dispatch(showValidation(validation));
  } else {
    try {
      const updateBodyInfo = {
        ...bodyInfo,
        content_ids: contentBodyList.map((body) => body.idx).join(","),
      };

      await photoService.update(updateBodyInfo);

      dispatch({
        type: SAVE,
        payload: {
          url: url,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
};
export const remove = (url, idx) => async (dispatch) => {
  try {
    await photoService.remove(idx);

    dispatch({
      type: REMOVE,
      payload: {
        url: url,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

const initialState = {
  redirectTo: "",
  validation: {
    show: false,
    list: [],
  },
  confirm: {
    show: false,
  },
  bodyList: [],
  brandOptionList: [],
  groupOptionList: [],
  modelOptionList: [],
  modelBodyInfo: {
    idx: null,
    brand_id: null,
    group_id: null,
  },
};

export default function edit(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
        brandOptionList: action.payload.brandOptionList,
        groupOptionList: action.payload.groupOptionList,
        modelOptionList: action.payload.modelOptionList,
        modelBodyInfo: action.payload.modelBodyInfo,
        bodyList: action.payload.bodyList,
      };
    case REMOVE_REDIRECTTO:
      return {
        ...state,
        redirectTo: "",
      };
    case SHOW_VALIDATION:
      return {
        ...state,
        validation: {
          ...state.validation,
          show: true,
          list: action.payload.list,
        },
      };
    case CLOSE_VALIDATION:
      return {
        ...state,
        validation: {
          ...state.validation,
          show: false,
        },
      };
    case SHOW_CONFIRM:
      return {
        ...state,
        confirm: {
          ...state.confirm,
          show: true,
        },
      };
    case CLOSE_CONFIRM:
      return {
        ...state,
        confirm: {
          ...state.confirm,
          show: false,
        },
      };
    case SET_BODY:
      return {
        ...state,
        bodyInfo: {
          ...state.bodyInfo,
          [action.payload.name]: action.payload.value,
        },
      };
    case SAVE:
      return {
        ...state,
        redirectTo: action.payload.url,
      };
    case REMOVE:
      return {
        ...state,
        redirectTo: action.payload.url,
      };
    default:
      return state;
  }
}
