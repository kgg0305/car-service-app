import { combineReducers } from 'redux';
import auth from './auth';
import brandCreate from './car/brand/create';
import brandEdit from './car/brand/edit';
import brandList from './car/brand/list';
import groupCreate from './car/group/create';
import groupEdit from './car/group/edit';
import groupList from './car/group/list';
import modelCreate from './car/model/create';
import modelEdit from './car/model/edit';
import modelList from './car/model/list';
import lineupCreate from './car/lineup/create';
import lineupEdit from './car/lineup/edit';
import lineupList from './car/lineup/list';
import trimCreate from './car/trim/create';
import trimEdit from './car/trim/edit';
import trimList from './car/trim/list';

const rootReducers = combineReducers({
    auth,
    brandCreate,
    brandEdit,
    brandList,
    groupCreate,
    groupEdit,
    groupList,
    modelCreate,
    modelEdit,
    modelList,
    lineupCreate,
    lineupEdit,
    lineupList,
    trimCreate,
    trimEdit,
    trimList
});

export default rootReducers;