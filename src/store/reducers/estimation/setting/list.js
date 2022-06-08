import { GetDateStringFromDate } from "../../../../constants/GlobalFunctions";
import { countSettingService } from "../../../../services/countSettingService";

const prefix = "estimation/setting/list/";

const INIT = prefix + "INIT";
const SET_DATA_SOURCE = prefix + "SET_DATA_SOURCE";
const SAVE = prefix + "SAVE";

export const init = () => async (dispatch) => {
  try {
    const dataSource = await countSettingService.getList();
    const dataLength = await countSettingService.getCount();

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
export const setDataSource = (idx, name, value) => ({
  type: SET_DATA_SOURCE,
  payload: {
    idx: idx,
    name: name,
    value: value,
  },
});
export const save = () => async (dispatch, getState) => {
  const state = getState();
  const dataSource = state.settingList.dataSource;

  for (let i = 0; i < dataSource.length; i++) {
    const body = dataSource[i];
    await countSettingService.update(body);
  }

  dispatch({
    type: SAVE,
  });
};

const initialState = {
  dataSource: [],
  dataLength: 0,
};

export default function list(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
        dataSource: action.payload.dataSource,
        dataLength: action.payload.dataLength,
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
