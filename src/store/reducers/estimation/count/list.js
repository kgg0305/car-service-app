import { GetDateStringFromDate } from "../../../../constants/GlobalFunctions";
import { countService } from "../../../../services/countService";

const prefix = "estimation/count/list/";

const INIT = prefix + "INIT";
const SHOW_MORE = prefix + "SHOW_MORE";
const ADD = prefix + "ADD";
const SET_ADD = prefix + "SET_ADD";
const SET_YEAR = prefix + "SET_YEAR";
const SET_MONTH = prefix + "SET_MONTH";

export const init = () => async (dispatch) => {
  try {
    const dataSource = await countService.getList(0, {
      year: initialState.year,
      month: initialState.month,
    });
    const dataLength = await countService.getCount({
      year: initialState.year,
      month: initialState.month,
    });

    dispatch({
      type: INIT,
      payload: {
        dataSource: dataSource,
        dataLength: dataLength,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
export const showMore = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const offset = state.countList.offset + 10;
    const year = state.countList.year;
    const month = state.countList.month;

    const dataSource = await countService.getList(offset, {
      year: year,
      month: month,
    });

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
export const add = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const addData = state.countList.addData;
    const offset = state.countList.offset + 10;
    const year = state.countList.year;
    const month = state.countList.month;

    const count_info = await countService.getByDate(
      GetDateStringFromDate(new Date())
    );

    if (count_info) {
      count_info.rent_admin += Number(addData.rent_admin);
      count_info.new_admin += Number(addData.new_admin);
      await countService.update(count_info);
    } else {
      await countService.create({
        ...addData,
        rent_request: 0,
        new_request: 0,
      });
    }

    const dataSource = await countService.getList(offset, {
      year: year,
      month: month,
    });

    dispatch({
      type: ADD,
      payload: {
        dataSource: dataSource,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
export const setAdd = (name, value) => (dispatch) => {
  dispatch({
    type: SET_ADD,
    payload: {
      name: name,
      value: value,
    },
  });
};
export const setYear = (year) => async (dispatch, getState) => {
  try {
    const state = getState();
    const month = state.countList.month;

    const dataSource = await countService.getList(0, {
      year: year,
      month: month,
    });

    dispatch({
      type: SET_YEAR,
      payload: {
        dataSource: dataSource,
        year: year,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
export const setMonth = (month) => async (dispatch, getState) => {
  try {
    const state = getState();
    const year = state.countList.year;

    const dataSource = await countService.getList(0, {
      year: year,
      month: month,
    });

    dispatch({
      type: SET_MONTH,
      payload: {
        dataSource: dataSource,
        month: month,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

const initialState = {
  offset: 0,
  dataSource: [],
  dataLength: 0,
  addData: {
    rent_admin: "",
    new_admin: "",
  },
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
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
    case ADD:
      return {
        ...state,
        dataSource: action.payload.dataSource,
        dataLength: action.payload.dataLength,
        addData: initialState.addData,
      };
    case SET_ADD:
      return {
        ...state,
        addData: {
          ...state.addData,
          [action.payload.name]: action.payload.value,
        },
      };
    case SET_YEAR:
      return {
        ...state,
        dataSource: action.payload.dataSource,
        dataLength: action.payload.dataLength,
        year: action.payload.year,
      };
    case SET_MONTH:
      return {
        ...state,
        dataSource: action.payload.dataSource,
        dataLength: action.payload.dataLength,
        month: action.payload.month,
      };
    default:
      return state;
  }
}
