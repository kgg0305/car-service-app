import { combineReducers } from "redux";
import auth from "./auth";
import brandCreate from "./car/brand/create";
import brandEdit from "./car/brand/edit";
import brandList from "./car/brand/list";
import groupCreate from "./car/group/create";
import groupEdit from "./car/group/edit";
import groupList from "./car/group/list";
import modelCreate from "./car/model/create";
import modelEdit from "./car/model/edit";
import modelList from "./car/model/list";
import lineupCreate from "./car/lineup/create";
import lineupEdit from "./car/lineup/edit";
import lineupList from "./car/lineup/list";
import trimCreate from "./car/trim/create";
import trimEdit from "./car/trim/edit";
import trimList from "./car/trim/list";
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
import galleryCreate from "./content/gallery/create";
import galleryEdit from "./content/gallery/edit";
import galleryList from "./content/gallery/list";
import popularCreate from "./content/popular/create";
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
  trimList,
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
  galleryCreate,
  galleryEdit,
  galleryList,
  popularCreate,
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
