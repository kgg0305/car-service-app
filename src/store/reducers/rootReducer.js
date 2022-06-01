import { combineReducers } from "redux";
import menu from "./menu";
import role from "./role";
import auth from "./auth";
import brandCreate from "./car/brand/create";
import brandEdit from "./car/brand/edit";
import brandList from "./car/brand/list";
import groupCreate from "./car/group/create";
import groupEdit from "./car/group/edit";
import groupList from "./car/group/list";
import groupManage from "./car/group/manage";
import modelCreate from "./car/model/create";
import modelEdit from "./car/model/edit";
import modelList from "./car/model/list";
import modelManage from "./car/model/manage";
import lineupCreate from "./car/lineup/create";
import lineupEdit from "./car/lineup/edit";
import lineupList from "./car/lineup/list";
import lineupManage from "./car/lineup/manage";
import trimCreate from "./car/trim/create";
import trimEdit from "./car/trim/edit";
import trimList from "./car/trim/list";
import trimManage from "./car/trim/manage";
import discountCreate from "./car/discount/create";
import discountEdit from "./car/discount/edit";
import discountList from "./car/discount/list";
import extraList from "./car/extra/list";

import quotationList from "./estimation/quotation/list";
import quotationDetail from "./estimation/quotation/detail";
import assignmentList from "./estimation/assignment/list";
import assignmentManage from "./estimation/assignment/manage";
import countList from "./estimation/count/list";
import settingList from "./estimation/setting/list";

import contentList from "./content/content/list";
import recommendationCreate from "./content/recommendation/create";
import recommendationEdit from "./content/recommendation/edit";
import recommendationList from "./content/recommendation/list";
import photoCreate from "./content/photo/create";
import photoEdit from "./content/photo/edit";
import photoList from "./content/photo/list";
import galleryEdit from "./content/gallery/edit";
import galleryList from "./content/gallery/list";
import popularEdit from "./content/popular/edit";
import popularList from "./content/popular/list";
import carRankCreate from "./content/carRank/create";
import carRankEdit from "./content/carRank/edit";
import carRankList from "./content/carRank/list";
import contentRankCreate from "./content/contentRank/create";
import contentRankEdit from "./content/contentRank/edit";
import contentRankList from "./content/contentRank/list";
import movieRankCreate from "./content/movieRank/create";
import movieRankEdit from "./content/movieRank/edit";
import movieRankList from "./content/movieRank/list";

import mineDetail from "./user/mine/detail";
import manageCreate from "./user/manage/create";
import manageEdit from "./user/manage/edit";
import manageList from "./user/manage/list";
import roleList from "./user/role/list";

const rootReducers = combineReducers({
  menu,
  role,
  auth,
  brandCreate,
  brandEdit,
  brandList,
  groupCreate,
  groupEdit,
  groupList,
  groupManage,
  modelCreate,
  modelEdit,
  modelList,
  modelManage,
  lineupCreate,
  lineupEdit,
  lineupList,
  lineupManage,
  trimCreate,
  trimEdit,
  trimList,
  trimManage,
  discountCreate,
  discountEdit,
  discountList,
  extraList,
  quotationList,
  quotationDetail,
  assignmentList,
  assignmentManage,
  countList,
  settingList,
  contentList,
  recommendationCreate,
  recommendationEdit,
  recommendationList,
  photoCreate,
  photoEdit,
  photoList,
  galleryEdit,
  galleryList,
  popularEdit,
  popularList,
  carRankCreate,
  carRankEdit,
  carRankList,
  contentRankCreate,
  contentRankEdit,
  contentRankList,
  movieRankCreate,
  movieRankEdit,
  movieRankList,
  mineDetail,
  manageCreate,
  manageEdit,
  manageList,
  roleList,
});

export default rootReducers;
