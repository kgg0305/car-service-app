import { GetDateStringFromDate } from "../../../../constants/GlobalFunctions";
import { contentService } from "../../../../services/contentService";
import { recommendationService } from "../../../../services/recommendationService";

const prefix = "content/recommendation/create/";

const INIT = prefix + "INIT";
const REMOVE_REDIRECTTO = prefix + "REMOVE_REDIRECTTO";
const SHOW_VALIDATION = prefix + "SHOW_VALIDATION";
const CLOSE_VALIDATION = prefix + "CLOSE_VALIDATION";
const SET_BODY = prefix + "SET_BODY";
const ADD_CONTENT = prefix + "ADD_CONTENT";
const DELETE_CONTENT = prefix + "DELETE_CONTENT";
const SET_CONTENT = prefix + "SET_CONTENT";
const MOVE_UP = prefix + "MOVE_UP";
const MOVE_DOWN = prefix + "MOVE_DOWN";
const SAVE = prefix + "SAVE";

// 초기화
export const init = () => ({ type: INIT });

// 재로딩 경로 삭제
export const removeRedirectTo = () => ({
  type: REMOVE_REDIRECTTO,
});

// 유효검사창 현시
export const showValidation = (list) => ({
  type: SHOW_VALIDATION,
  payload: {
    list: list,
  },
});

// 유효검사창 닫기
export const closeValidation = () => ({
  type: CLOSE_VALIDATION,
});

// 항목값 설정
export const setBody = (name, value) => ({
  type: SET_BODY,
  payload: {
    name: name,
    value: value,
  },
});
export const addContent = () => ({
  type: ADD_CONTENT,
});
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

// 등록
export const save = (url, bodyInfo, contentBodyList) => async (dispatch) => {
  const validation = [];
  if (bodyInfo.publish_date === null) {
    validation.push({
      title: "정보",
      name: "발행일",
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
        publish_date: GetDateStringFromDate(new Date(bodyInfo.publish_date)),
        content_ids: contentBodyList.map((body) => body.idx).join(","),
      };

      await recommendationService.create(updateBodyInfo);

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

// 초기상태값
const initialState = {
  redirectTo: "",
  validation: {
    show: false,
    list: [],
  },
  bodyInfo: {
    publish_date: new Date(),
    content_ids: "",
  },
  contentBodyList: [
    {
      number: 1,
      idx: null,
      title: "",
    },
  ],
};

export default function create(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
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
    default:
      return state;
  }
}
