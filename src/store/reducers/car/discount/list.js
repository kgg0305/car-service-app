import { brandService } from "../../../../services/brandService";
import { discountKindService } from "../../../../services/discountKindService";
import { GetDateStringFromDate } from "../../../../constants/GlobalFunctions";

const prefix = "car/discount/list/";

const INIT = prefix + "INIT";
const SHOW_MORE = prefix + "SHOW_MORE";
const SEARCH = prefix + "SEARCH";
const SET_SEARCH = prefix + "SET_SEARCH";

export const init = () => async (dispatch) => {
  try {
    const dataSource = await discountKindService.getList(0);
    const brandOptionList = await brandService.getOptionList();
    const discountKindOptionList = await discountKindService.getOptionList();

    dispatch({
      type: INIT,
      payload: {
        dataSource: dataSource,
        brandOptionList: brandOptionList,
        discountKindOptionList: discountKindOptionList,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const showMore = (offset) => async (dispatch) => {
  try {
    const dataSource = await discountKindService.getList(offset);

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

export const search = (searchData) => async (dispatch) => {
  try {
    const dataSource = await discountKindService.getList(0, {
      ...searchData,
      s_date: searchData.s_date
        ? GetDateStringFromDate(new Date(searchData.s_date))
        : "",
      e_date: searchData.e_date
        ? GetDateStringFromDate(new Date(searchData.e_date))
        : "",
    });

    dispatch({
      type: SEARCH,
      payload: {
        offset: 0,
        dataSource: dataSource,
        searchData: searchData,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const reset = () => async (dispatch) => {
  try {
    dispatch(init());
  } catch (e) {
    console.log(e);
  }
};

export const setSearch = (name, value) => async (dispatch) => {
  try {
    let s_date = null;
    let e_date = null;
    if (name === "date_period") {
      s_date = new Date();
      e_date = new Date();
      switch (value) {
        case 0:
          s_date = null;
          e_date = null;
          break;
        case 1:
          break;
        case 2:
          s_date.setDate(s_date.getDate() - 1);
          break;
        case 3:
          s_date.setDate(s_date.getDate() - 3);
          break;
        case 4:
          s_date.setDate(s_date.getDate() - 7);
          break;
        case 5:
          s_date.setMonth(s_date.getMonth() - 1);
          break;
        case 6:
          s_date.setMonth(s_date.getMonth() - 3);
          break;
        default:
          break;
      }

      if (value !== 0) {
        s_date = GetDateStringFromDate(s_date);
        e_date = GetDateStringFromDate(e_date);
      }
    }

    dispatch({
      type: SET_SEARCH,
      payload: {
        name: name,
        value: value,
        s_date: s_date,
        e_date: e_date,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

const initialState = {
  offset: 0,
  brandOptionList: [],
  discountKindOptionList: [],
  dataSource: [],
  searchData: {
    brand_id: null,
    idx: null,
    s_date: null,
    e_date: null,
    date_period: 0,
  },
};

export default function list(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
        brandOptionList: action.payload.brandOptionList,
        discountKindOptionList: action.payload.discountKindOptionList,
        dataSource: action.payload.dataSource,
      };
    case SHOW_MORE:
      return {
        ...state,
        dataSource: [...state.dataSource, ...action.payload.dataSource],
        offset: action.payload.offset,
      };
    case SEARCH:
      return {
        ...state,
        offset: action.payload.offset,
        dataSource: action.payload.dataSource,
        searchData: action.payload.searchData,
      };
    case SET_SEARCH:
      return {
        ...state,
        searchData: {
          ...state.searchData,
          idx: action.payload.name == "brand_id" ? null : state.searchData.idx,
          s_date:
            action.payload.name === "date_period"
              ? action.payload.s_date
              : state.searchData.s_date,
          e_date:
            action.payload.name === "date_period"
              ? action.payload.e_date
              : state.searchData.e_date,
          [action.payload.name]: action.payload.value,
        },
      };
    default:
      return state;
  }
}
