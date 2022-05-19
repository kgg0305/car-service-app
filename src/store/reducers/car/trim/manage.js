import { brandService } from '../../../../services/brandService';
import { carKindService } from '../../../../services/carKindService';
import { groupService } from '../../../../services/groupService';

const prefix = 'car/group/manage/';

const INIT = prefix + 'INIT';
const SHOW_MORE = prefix + 'SHOW_MORE';
const SEARCH = prefix + 'SEARCH';
const RESET = prefix + 'RESET';
const SET_SEARCH = prefix + 'SET_SEARCH';

export const init = () => async dispatch => {
    try {
        const dataSource = await groupService.getList(0);
        const brandOptionList = await brandService.getOptionList();
        const carKindOptionList = await carKindService.getOptionList();
        
        dispatch({ 
            type: INIT, 
            payload:{
                dataSource: dataSource,
                brandOptionList: brandOptionList,
                carKindOptionList: carKindOptionList
            } 
        });
    } catch (e) {
        console.log(e);
    }
};

export const showMore = (offset) => async dispatch => {
    try {
        const dataSource = await groupService.getList(offset);
        
        dispatch({ 
            type: SHOW_MORE, 
            payload:{
                dataSource: dataSource,
                offset: offset
            } 
        });
    } catch (e) {
        console.log(e);
    }
};

export const search = (searchData) => async dispatch => {
    try {
        const dataSource = await groupService.getList(0, searchData);
        
        dispatch({ 
            type: SEARCH, 
            payload:{
                offset: 0,
                dataSource: dataSource,
                searchData: searchData
            }
        });
    } catch (e) {
        console.log(e);
    }
};

export const reset = () => async dispatch => { 
    try {
        const dataSource = await groupService.getList(0);
        
        dispatch({ 
            type: RESET, 
            payload:{
                offset: 0,
                dataSource: dataSource,
                searchData: {
                    idx: null,
                    is_use: null
                }
            }
        });
    } catch (e) {
        console.log(e);
    }
};

export const setSearch = (name, value) => ({ 
    type: SET_SEARCH, 
    payload: {
        name: name,
        value: value
    } 
});

const initialState = {
    offset: 0,
    brandOptionList: [],
    carKindOptionList: [],
    dataSource: [],
    searchData: {
        brand_id: null,
		is_use: null,
        car_kind_id: null,
    }
};

export default function manage(state = initialState, action) {
    switch (action.type) {
        case INIT:
            return {
                ...initialState,
                brandOptionList: action.payload.brandOptionList,
                carKindOptionList: action.payload.carKindOptionList,
                dataSource: action.payload.dataSource
            };
        case SHOW_MORE:
            return {
                ...state,
                dataSource: [
                    ...state.dataSource,
                    ...action.payload.dataSource
                ],
                offset: action.payload.offset
            };
        case SEARCH:
            return {
                ...state,
                offset: action.payload.offset,
                dataSource: action.payload.dataSource,
                searchData: action.payload.searchData
            };
        case RESET:
            return {
                ...state,
                offset: action.payload.offset,
                dataSource: action.payload.dataSource,
                searchData: action.payload.searchData
            };
        case SET_SEARCH:
            return {
                ...state,
                searchData: {
                    ...state.searchData,
                    [action.payload.name]: action.payload.value
                }
            };
        default:
            return state;
    }
}