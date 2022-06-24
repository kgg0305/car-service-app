import { galleryService } from "../../../../services/galleryService";
import { brandService } from "../../../../services/brandService";

const prefix = "content/gallery/list/";

const INIT = prefix + "INIT";
const SHOW_MORE = prefix + "SHOW_MORE";

// 초기화
export const init = () => async (dispatch) => {
  try {
    const brandOptionList = await brandService.getOptionList();
    const dataSource = await galleryService.getList(0);

    dispatch({
      type: INIT,
      payload: {
        dataSource: dataSource,
        brandOptionList: brandOptionList,
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
    const offset = state.galleryList.offset + 10;
    const dataSource = await galleryService.getList(offset);

    dispatch({
      type: SHOW_MORE,
      payload: {
        dataSource: dataSource,
        offset: offset,
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
  brandOptionList: [],
};

export default function list(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
        dataSource: action.payload.dataSource,
        dataLength: action.payload.dataLength,
        brandOptionList: action.payload.brandOptionList,
      };
    case SHOW_MORE:
      return {
        ...state,
        dataSource: [...state.dataSource, ...action.payload.dataSource],
        offset: action.payload.offset,
      };
    default:
      return state;
  }
}
