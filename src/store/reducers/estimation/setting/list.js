import { GetDateStringFromDate } from "../../../../constants/GlobalFunctions";
import { countSettingService } from "../../../../services/countSettingService";

const prefix = "estimation/setting/list/";

const INIT = prefix + "INIT";
const SET_DATA_SOURCE = prefix + "SET_DATA_SOURCE";

export const init = () => async (dispatch) => {
  try {
    const dataSource = await countSettingService.getList();

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

export const setDataSource = (dataSource, idx, name, value) => (dispatch) => {
  const body = {
    ...dataSource.filter((body) => body.idx === idx)[0],
    [name]: value,
  };

  countSettingService.update(body);

  dispatch({
    type: SET_DATA_SOURCE,
    payload: {
      idx: idx,
      name: name,
      value: value,
    },
  });
};

const initialState = {
  dataSource: [],
};

export default function list(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
        dataSource: action.payload.dataSource,
      };
    case SET_DATA_SOURCE:
      return {
        ...state,
        dataSource: state.dataSource.map((body) =>
          body.idx === action.payload.idx
            ? {
                ...body,
                [action.payload.name]: action.payload.value,
              }
            : body
        ),
      };
    default:
      return state;
  }
}
