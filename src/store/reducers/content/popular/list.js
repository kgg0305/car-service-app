import { popularService } from "../../../../services/popularService";
import { brandService } from "../../../../services/brandService";

const prefix = "content/popular/list/";

const INIT = prefix + "INIT";
const SHOW_MORE = prefix + "SHOW_MORE";

export const init = () => async (dispatch) => {
  try {
    const brandOptionList = await brandService.getOptionList();
    const dataSource = await popularService.getList(0);

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

export const showMore = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const offset = state.popularList.offset + 10;
    const dataSource = await popularService.getList(offset);

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
const initialState = {
  offset: 0,
  dataSource: [],
  brandOptionList: [],
};

export default function list(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
        dataSource: action.payload.dataSource,
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
