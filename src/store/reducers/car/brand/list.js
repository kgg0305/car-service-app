import { brandService } from '../../../../services/brandService';

const prefix = 'car/brand/list/';

const INIT = prefix + 'INIT';
const SHOW_MORE = prefix + 'SHOW_MORE';
const SEARCH = prefix + 'SEARCH';
const RESET = prefix + 'RESET';
const SET_SEARCH = prefix + 'SET_SEARCH';

export const init = () => async dispatch => {
    try {
        const brandOptionList = await brandService.getOptionList();
        const dataSource = await brandService.getList(0);
        
        dispatch({ 
            type: INIT, 
            payload:{
                brandOptionList: brandOptionList,
                dataSource: dataSource
            } 
        });
    } catch (e) {
        console.log(e);
    }
};

export const showMore = (offset) => async dispatch => {
    try {
        const dataSource = await brandService.getList(offset);
        
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
        const dataSource = await brandService.getList(0, searchData);
        
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
        const dataSource = await brandService.getList(0);
        
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
    dataSource: [],
    searchData: {
        idx: null,
		is_use: null
    }
};

export default function list(state = initialState, action) {
    switch (action.type) {
        case INIT:
            return {
                ...initialState,
                brandOptionList: action.payload.brandOptionList,
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