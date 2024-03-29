import { recommendationService } from "../../../../services/recommendationService";
import { contentService } from "../../../../services/contentService";
import { GetDateStringFromDate } from "../../../../constants/GlobalFunctions";

const prefix = "content/recommendation/list/";

const INIT = prefix + "INIT";
const SHOW_MORE = prefix + "SHOW_MORE";
const SHOW_DETAIL_MODAL = prefix + "SHOW_DETAIL_MODAL";
const CLOSE_DETAIL_MODAL = prefix + "CLOSE_DETAIL_MODAL";
const PUBLISH = prefix + "PUBLISH";

// 초기화
export const init = () => async (dispatch) => {
  try {
    const initDataSource = await recommendationService.getList(0);
    const dataLength = await recommendationService.getCount();

    let initTempDataSource = [];
    for (let i = 0; i < initDataSource.length; i++) {
      const element = initDataSource[i];
      initTempDataSource.push({
        ...element,
        content_list_text: (
          await contentService.get(element.content_ids.split(",")[0])
        ).title,
        content_count: element.content_ids.split(",").length,
        publish_date_text: GetDateStringFromDate(
          new Date(element.publish_date)
        ),
      });
    }

    dispatch({
      type: INIT,
      payload: {
        dataSource: initTempDataSource,
        dataLength: dataLength,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

// 더보기
export const showMore = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const offset = state.recommendationList.offset + 10;
    const initDataSource = await recommendationService.getList(offset);

    let initTempDataSource = [];
    for (let i = 0; i < initDataSource.length; i++) {
      const element = initDataSource[i];
      initTempDataSource.push({
        ...element,
        content_list_text: (
          await contentService.get(element.content_ids.split(",")[0])
        ).title,
        content_count: element.content_ids.split(",").length,
        publish_date_text: GetDateStringFromDate(
          new Date(element.publish_date)
        ),
      });
    }

    dispatch({
      type: SHOW_MORE,
      payload: {
        dataSource: initTempDataSource,
        offset: offset,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const showDetailModal = (content_ids) => async (dispatch) => {
  try {
    var contentList = [];
    for (let index = 0; index < content_ids.split(",").length; index++) {
      const id = content_ids.split(",")[index];
      contentList.push(await contentService.get(id));
    }

    dispatch({
      type: SHOW_DETAIL_MODAL,
      payload: {
        contentList: contentList,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const closeDetailModal = () => ({
  type: CLOSE_DETAIL_MODAL,
});

export const publish = (idx, dataSource) => async (dispatch) => {
  try {
    let bodyInfo = dataSource.filter((item) => item.idx === idx)[0];
    bodyInfo.publish_date = GetDateStringFromDate(new Date());
    await recommendationService.update(bodyInfo);

    const dataLength = await recommendationService.getCount();

    dispatch({
      type: PUBLISH,
      payload: {
        dataSource: dataSource.map((item) =>
          item.idx === idx ? bodyInfo : item
        ),
        dataLength: dataLength,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

// 초기상태값
const initialState = {
  offset: 0,
  dataSource: [],
  dataLength: 0,
  detailModal: {
    show: false,
    contentList: [],
  },
};

export default function list(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
        dataSource: action.payload.dataSource,
        dataLength: action.payload.dataLength,
      };
    case SHOW_MORE:
      return {
        ...state,
        dataSource: [...state.dataSource, ...action.payload.dataSource],
        offset: action.payload.offset,
      };
    case SHOW_DETAIL_MODAL:
      return {
        ...state,
        detailModal: {
          show: true,
          contentList: action.payload.contentList,
        },
      };
    case CLOSE_DETAIL_MODAL:
      return {
        ...state,
        detailModal: {
          show: false,
          contentList: [],
        },
      };
    case PUBLISH:
      return {
        ...state,
        dataSource: action.payload.dataSource,
        dataLength: action.payload.dataLength,
      };
    default:
      return state;
  }
}
