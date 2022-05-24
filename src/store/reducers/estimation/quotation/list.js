import { GetDateStringFromDate } from "../../../../constants/GlobalFunctions";
import { quotationService } from "../../../../services/quotationService";
import { userService } from "../../../../services/userService";

const prefix = "estimation/quotation/list/";

const INIT = prefix + "INIT";
const SHOW_MORE = prefix + "SHOW_MORE";
const SEARCH = prefix + "SEARCH";
const SET_SEARCH = prefix + "SET_SEARCH";
const ASSIGN = prefix + "ASSIGN";

export const init = () => async (dispatch) => {
  try {
    const dataSource = await quotationService.getList(0);
    const userOptionList = await userService.getOptionList();
    const summaryData = {
      quotation: dataSource.length,
      wait: dataSource.filter((body) => body.is_business == null).length,
      business: dataSource.filter((body) => body.is_business == 0).length,
      contract: dataSource.filter((body) => body.is_contract == 0).length,
      release: dataSource.filter((body) => body.is_release == 0).length,
      close: dataSource.filter((body) => body.is_close == 0).length,
    };

    dispatch({
      type: INIT,
      payload: {
        userOptionList: userOptionList,
        summaryData: summaryData,
        dataSource: dataSource,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const showMore = (offset) => async (dispatch) => {
  try {
    const dataSource = await quotationService.getList(offset);
    const summaryData = {
      quotation: dataSource.length,
      wait: dataSource.filter((body) => body.is_business == null).length,
      business: dataSource.filter((body) => body.is_business == 0).length,
      contract: dataSource.filter((body) => body.is_contract == 0).length,
      release: dataSource.filter((body) => body.is_release == 0).length,
      close: dataSource.filter((body) => body.is_close == 0).length,
    };

    dispatch({
      type: SHOW_MORE,
      payload: {
        summaryData: summaryData,
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
    const dataSource = await quotationService.getList(0, searchData);
    const summaryData = {
      quotation: dataSource.length,
      wait: dataSource.filter((body) => body.is_business == null).length,
      business: dataSource.filter((body) => body.is_business == 0).length,
      contract: dataSource.filter((body) => body.is_contract == 0).length,
      release: dataSource.filter((body) => body.is_release == 0).length,
      close: dataSource.filter((body) => body.is_close == 0).length,
    };

    dispatch({
      type: SEARCH,
      payload: {
        offset: 0,
        summaryData: summaryData,
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

export const setSearch = (name, value) => (dispatch) => {
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
};

export const assign = (dataSource, idx, value) => async (dispatch) => {
  let quotation_info = dataSource.filter((item) => item.idx === idx)[0];
  quotation_info.assign_to = value;
  await quotationService.update(quotation_info);

  dispatch({
    type: ASSIGN,
    payload: {
      offset: 0,
      idx: idx,
      value: value,
    },
  });
};

export const download = () => {
  quotationService.download();
};

const initialState = {
  offset: 0,
  userOptionList: [],
  summaryData: {
    quotation: 0,
    wait: 0,
    business: 0,
    contract: 0,
    release: 0,
    close: 0,
  },
  dataSource: [],
  searchData: {
    date_type: "0",
    date_period: 0,
    s_date: null,
    e_date: null,
    purchase_method: null,
    search_type: null,
    search_text: "",
    purchase_path: "",
    status: 0,
  },
};

export default function list(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
        userOptionList: action.payload.userOptionList,
        summaryData: action.payload.summaryData,
        dataSource: action.payload.dataSource,
      };
    case SHOW_MORE:
      return {
        ...state,
        summaryData: action.payload.summaryData,
        dataSource: [...state.dataSource, ...action.payload.dataSource],
        offset: action.payload.offset,
      };
    case SEARCH:
      return {
        ...state,
        offset: action.payload.offset,
        summaryData: action.payload.summaryData,
        dataSource: action.payload.dataSource,
        searchData: action.payload.searchData,
      };
    case SET_SEARCH:
      return {
        ...state,
        searchData: {
          ...state.searchData,
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
    case ASSIGN:
      return {
        ...state,
        dataSource: state.dataSource.map((item) => ({
          ...item,
          assign_to:
            item.idx === action.payload.idx
              ? action.payload.value
              : item.assign_to,
        })),
      };
    default:
      return state;
  }
}