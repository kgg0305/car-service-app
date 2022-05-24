import { GetDateStringFromDate } from "../../../../constants/GlobalFunctions";
import { countService } from "../../../../services/countService";

const prefix = "estimation/count/list/";

const INIT = prefix + "INIT";
const SHOW_MORE = prefix + "SHOW_MORE";
const ADD = prefix + "ADD";
const SET_ADD = prefix + "SET_ADD";

export const init = () => async (dispatch) => {
  try {
    const dataSource = await countService.getList(0);

    dispatch({
      type: INIT,
      payload: {
        dataSource: dataSource,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const showMore = (offset) => async (dispatch) => {
  try {
    const dataSource = await countService.getList(offset);

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

export const add = (addData, offset) => async (dispatch) => {
  try {
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

    const dataSource = await countService.getList(offset);

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

const initialState = {
  offset: 0,
  dataSource: [],
  addData: {
    rent_admin: "",
    new_admin: "",
  },
};

export default function list(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
        dataSource: action.payload.dataSource,
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
    default:
      return state;
  }
}
