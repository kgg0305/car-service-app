import { contentService } from "../../../../services/contentService";
import { rankService } from "../../../../services/rankService";

const prefix = "content/contentRank/create/";

const INIT = prefix + "INIT";
const REMOVE_REDIRECTTO = prefix + "REMOVE_REDIRECTTO";
const SHOW_VALIDATION = prefix + "SHOW_VALIDATION";
const CLOSE_VALIDATION = prefix + "CLOSE_VALIDATION";
const SHOW_CONFIRM = prefix + "SHOW_CONFIRM";
const CLOSE_CONFIRM = prefix + "CLOSE_CONFIRM";
const ADD_CONTENT = prefix + "ADD_CONTENT";
const DELETE_CONTENT = prefix + "DELETE_CONTENT";
const SET_CONTENT = prefix + "SET_CONTENT";
const SET_BODY = prefix + "SET_BODY";
const MOVE_UP = prefix + "MOVE_UP";
const MOVE_DOWN = prefix + "MOVE_DOWN";
const SAVE = prefix + "SAVE";
const REMOVE = prefix + "REMOVE";

export const init = (idx) => async (dispatch) => {
  try {
    const bodyInfo = await rankService.get(2);

    dispatch({
      type: INIT,
      payload: {
        bodyInfo: bodyInfo,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
export const removeRedirectTo = () => ({
  type: REMOVE_REDIRECTTO,
});
export const showValidation = (list, disableFooter) => ({
  type: SHOW_VALIDATION,
  payload: {
    list: list,
    disableFooter: disableFooter,
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
export const addContent = () => (dispatch, getState) => {
  const state = getState();
  const contentBodyList = state.contentRankCreate.contentBodyList;

  if (contentBodyList.length < 10) {
    dispatch({
      type: ADD_CONTENT,
    });
  }
};
export const deleteContent = (number) => ({
  type: DELETE_CONTENT,
  payload: {
    number: number,
  },
});
export const setContent = (number, name, value) => async (dispatch) => {
  if (name == "idx") {
    let title = "";
    if (!isNaN(+value)) {
      const content_info = await contentService.get(value);
      title = "등록되지 않은 콘텐츠입니다.";
      if (content_info) {
        title = content_info.title;
      }
    }

    dispatch({
      type: SET_CONTENT,
      payload: {
        number: number,
        name: name,
        value: value,
        title: title,
      },
    });
  }
};
export const setBody = (name, value) => ({
  type: SET_BODY,
  payload: {
    name: name,
    value: value,
  },
});
export const moveUp = (index, contentBodyList) => (dispatch) => {
  if (index > 0) {
    const current_item = contentBodyList[index];
    const top_item = contentBodyList[index - 1];

    dispatch({
      type: MOVE_UP,
      payload: {
        index: index,
        current_item: current_item,
        top_item: top_item,
      },
    });
  }
};
export const moveDown = (index, contentBodyList) => (dispatch) => {
  if (index < contentBodyList.length - 1) {
    const current_item = contentBodyList[index];
    const bottom_item = contentBodyList[index + 1];

    dispatch({
      type: MOVE_DOWN,
      payload: {
        index: index,
        current_item: current_item,
        bottom_item: bottom_item,
      },
    });
  }
};
export const save = (url) => async (dispatch, getState) => {
  const state = getState();
  const bodyInfo = state.contentRankCreate.bodyInfo;
  const contentBodyList = state.contentRankCreate.contentBodyList;

  const validation = [];
  let disableFooter = false;

  if (contentBodyList.length < 10) {
    disableFooter = true;
    validation.push({
      title: "등록 수량이 부족 합니다.",
    });
  } else {
    contentBodyList.map((body) => {
      if (body.idx === null) {
        validation.push({
          title: "뉴스 " + (body.number < 10 ? "0" + body.number : body.number),
          name: "콘텐츠 번호",
        });
      }
      if (body.title === "등록되지 않은 콘텐츠입니다.") {
        validation.push({
          title: "뉴스 " + (body.number < 10 ? "0" + body.number : body.number),
          name: "콘텐츠 내용",
        });
      }
    });
  }

  if (validation.length > 0) {
    dispatch(showValidation(validation, disableFooter));
  } else {
    try {
      const updateRankBodyInfo = {
        ...bodyInfo,
        ids: contentBodyList.map((body) => body.idx).join(","),
      };

      await rankService.update(updateRankBodyInfo);

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
    await rankService.remove(idx);

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
    disableFooter: false,
  },
  confirm: {
    show: false,
    name: "",
  },
  bodyInfo: {
    type: null,
    ids: "",
    created_at: null,
  },
  contentBodyList: [
    {
      number: 1,
    },
  ],
};

export default function edit(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
        bodyInfo: action.payload.bodyInfo,
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
          disableFooter: action.payload.disableFooter,
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
    case ADD_CONTENT:
      return {
        ...state,
        contentBodyList: [
          ...state.contentBodyList,
          {
            ...initialState.contentBodyList[0],
            number:
              state.contentBodyList[state.contentBodyList.length - 1].number +
              1,
            brand_id: null,
            group_id: null,
            model_id: null,
          },
        ],
      };
    case DELETE_CONTENT:
      return {
        ...state,
        contentBodyList: state.contentBodyList.filter(
          (body) => body.number !== action.payload.number
        ),
      };
    case SET_CONTENT:
      return {
        ...state,
        contentBodyList: state.contentBodyList.map((body) =>
          body.number === action.payload.number
            ? {
                ...body,
                title:
                  action.payload.name === "idx" ? action.payload.title : "",
                [action.payload.name]: action.payload.value,
              }
            : body
        ),
      };
    case MOVE_UP:
      return {
        ...state,
        contentBodyList: state.contentBodyList.map((item, itemIndex) =>
          itemIndex === action.payload.index
            ? action.payload.top_item
            : itemIndex === action.payload.index - 1
            ? action.payload.current_item
            : item
        ),
      };
    case MOVE_DOWN:
      return {
        ...state,
        contentBodyList: state.contentBodyList.map((item, itemIndex) =>
          itemIndex === action.payload.index
            ? action.payload.bottom_item
            : itemIndex === action.payload.index + 1
            ? action.payload.current_item
            : item
        ),
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
