import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Main from "./layouts/Main";
import AuthMain from "./layouts/AuthMain";
// Auth
import Login from "./pages/auth/Login";
import ChangePassword from "./pages/auth/ChangePassword";
// Mine
import UserMineDetail from "./pages/user/mine/Detail";
// Manage
import UserManageList from "./pages/user/manage/List";
import UserManageCreate from "./pages/user/manage/Create";
import UserManageEdit from "./pages/user/manage/Edit";
// Role
import UserRoleList from "./pages/user/role/List";
// Brand
import CarBrandList from "./pages/car/brand/List";
import CarBrandCreate from "./pages/car/brand/Create";
import CarBrandEdit from "./pages/car/brand/Edit";
// Brand Group
import CarGroupList from "./pages/car/group/List";
import CarGroupCreate from "./pages/car/group/Create";
import CarGroupEdit from "./pages/car/group/Edit";
import CarGroupManage from "./pages/car/group/Manage";
// Model
import CarModelList from "./pages/car/model/List";
import CarModelCreate from "./pages/car/model/Create";
import CarModelEdit from "./pages/car/model/Edit";
import CarModelManage from "./pages/car/model/Manage";
// Lineup
import CarLineupList from "./pages/car/lineup/List";
import CarLineupCreate from "./pages/car/lineup/Create";
import CarLineupEdit from "./pages/car/lineup/Edit";
import CarLineupManage from "./pages/car/lineup/Manage";
// Trim
import CarTrimList from "./pages/car/trim/List";
import CarTrimCreate from "./pages/car/trim/Create";
import CarTrimEdit from "./pages/car/trim/Edit";
import CarTrimManage from "./pages/car/trim/Manage";
// Discount
import CarDiscountList from "./pages/car/discount/List";
import CarDiscountCreate from "./pages/car/discount/Create";
import CarDiscountEdit from "./pages/car/discount/Edit";
// Extra
import CarExtraList from "./pages/car/extra/List";
// Quotation
import EstimationQuotationList from "./pages/estimation/quotation/List";
import EstimationQuotationDetail from "./pages/estimation/quotation/Detail";
// Assignment
import EstimationAssignmentList from "./pages/estimation/assignment/List";
import EstimationAssignmentManage from "./pages/estimation/assignment/Manage";
// Count
import EstimationCountList from "./pages/estimation/count/List";
// Setting
import EstimationSettingList from "./pages/estimation/setting/List";
// Content
import ContentContentList from "./pages/content/content/List";
// Recommendation
import ContentRecommendationList from "./pages/content/recommendation/List";
import ContentRecommendationCreate from "./pages/content/recommendation/Create";
import ContentRecommendationEdit from "./pages/content/recommendation/Edit";
// Photo
import ContentPhotoList from "./pages/content/photo/List";
import ContentPhotoCreate from "./pages/content/photo/Create";
import ContentPhotoEdit from "./pages/content/photo/Edit";
// Gallery
import ContentGalleryList from "./pages/content/gallery/List";
import ContentGalleryEdit from "./pages/content/gallery/Edit";
// Popular
import ContentPopularList from "./pages/content/popular/List";
import ContentPopularEdit from "./pages/content/popular/Edit";
// CarRank
import ContentCarRankList from "./pages/content/carRank/List";
import ContentCarRankCreate from "./pages/content/carRank/Create";
import ContentCarRankEdit from "./pages/content/carRank/Edit";
// ContentRank
import ContentContentRankList from "./pages/content/contentRank/List";
import ContentContentRankCreate from "./pages/content/contentRank/Create";
import ContentContentRankEdit from "./pages/content/contentRank/Edit";
// MovieRank
import ContentMovieRankList from "./pages/content/movieRank/List";
import ContentMovieRankCreate from "./pages/content/movieRank/Create";
import ContentMovieRankEdit from "./pages/content/movieRank/Edit";
// Media
import ContentMediaList from "./pages/content/media/List";
import NoAccess from "./pages/NoAccess";

function App() {
  const { token } = useSelector((state) => ({
    token: state.auth.token,
  }));

  if (!token) {
    return (
      <AuthMain>
        <Login />
      </AuthMain>
    );
  } else if (token.created_at === token.updated_at) {
    return (
      <AuthMain>
        <ChangePassword />
      </AuthMain>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Main />}>
          {token.idx === 1 ? (
            <Route index element={<CarBrandList />} />
          ) : (
            <Route index element={<NoAccess />} />
          )}
        </Route>
        <Route exact path="car" element={<Main />}>
          <Route path="brand">
            <Route index element={<CarBrandList />} />
            <Route path="create" element={<CarBrandCreate />} />
            <Route path="edit/:id" element={<CarBrandEdit />} />
          </Route>
          <Route path="group">
            <Route index element={<CarGroupList />} />
            <Route path="create" element={<CarGroupCreate />} />
            <Route path="edit/:id/:brand_id" element={<CarGroupEdit />} />
            <Route path="manage/:brand_id" element={<CarGroupManage />} />
          </Route>
          <Route path="model">
            <Route index element={<CarModelList />} />
            <Route path="create" element={<CarModelCreate />} />
            <Route path="edit/:id/:group_id" element={<CarModelEdit />} />
            <Route path="manage/:group_id" element={<CarModelManage />} />
          </Route>
          <Route path="lineup">
            <Route index element={<CarLineupList />} />
            <Route path="create" element={<CarLineupCreate />} />
            <Route path="edit/:id/:model_id" element={<CarLineupEdit />} />
            <Route path="manage/:model_id" element={<CarLineupManage />} />
          </Route>
          <Route path="trim">
            <Route index element={<CarTrimList />} />
            <Route path="create" element={<CarTrimCreate />} />
            <Route path="edit/:id/:lineup_id" element={<CarTrimEdit />} />
            <Route path="manage/:lineup_id" element={<CarTrimManage />} />
          </Route>
          <Route path="discount">
            <Route index element={<CarDiscountList />} />
            <Route path="create" element={<CarDiscountCreate />} />
            <Route path="edit/:id" element={<CarDiscountEdit />} />
          </Route>
          <Route path="extra">
            <Route index element={<CarExtraList />} />
          </Route>
        </Route>

        {/* User */}
        <Route exact path="user" element={<Main />}>
          <Route index path="mine/:id" element={<UserMineDetail />} />
          <Route path="manage">
            {token.idx === 1 ? (
              <Route index element={<UserManageList />} />
            ) : (
              <Route index element={<NoAccess />} />
            )}
            <Route path="create" element={<UserManageCreate />} />
            <Route path="edit/:id" element={<UserManageEdit />} />
          </Route>
          <Route path="role">
            {token.idx === 1 ? (
              <Route index element={<UserRoleList />} />
            ) : (
              <Route index element={<NoAccess />} />
            )}
          </Route>
        </Route>

        {/* Estimation */}
        <Route exact path="estimation" element={<Main />}>
          <Route path="quotation">
            <Route index element={<EstimationQuotationList />} />
            <Route path="detail/:id" element={<EstimationQuotationDetail />} />
          </Route>
          <Route path="assignment">
            <Route index element={<EstimationAssignmentList />} />
            <Route path="manage/:id" element={<EstimationAssignmentManage />} />
          </Route>
          <Route path="count">
            <Route index element={<EstimationCountList />} />
          </Route>
          <Route path="setting">
            <Route index element={<EstimationSettingList />} />
          </Route>
        </Route>

        {/* Content */}
        <Route exact path="content" element={<Main />}>
          <Route path="content">
            <Route index element={<ContentContentList />} />
          </Route>
          <Route path="recommendation">
            <Route index element={<ContentRecommendationList />} />
            <Route path="create" element={<ContentRecommendationCreate />} />
            <Route path="edit/:id" element={<ContentRecommendationEdit />} />
          </Route>
          <Route path="photo">
            <Route index element={<ContentPhotoList />} />
            <Route path="create" element={<ContentPhotoCreate />} />
            <Route path="edit/:id" element={<ContentPhotoEdit />} />
          </Route>
          <Route path="gallery">
            <Route index element={<ContentGalleryList />} />
            <Route path="edit/:id" element={<ContentGalleryEdit />} />
          </Route>
          <Route path="popular">
            <Route index element={<ContentPopularList />} />
            <Route path="edit/:id" element={<ContentPopularEdit />} />
          </Route>
          <Route path="carRank">
            <Route index element={<ContentCarRankList />} />
            <Route path="create" element={<ContentCarRankCreate />} />
            <Route path="edit" element={<ContentCarRankEdit />} />
          </Route>
          <Route path="contentRank">
            <Route index element={<ContentContentRankList />} />
            <Route path="create" element={<ContentContentRankCreate />} />
            <Route path="edit" element={<ContentContentRankEdit />} />
          </Route>
          <Route path="movieRank">
            <Route index element={<ContentMovieRankList />} />
            <Route path="create" element={<ContentMovieRankCreate />} />
            <Route path="edit" element={<ContentMovieRankEdit />} />
          </Route>
          <Route path="media">
            <Route index element={<ContentMediaList />} />
          </Route>
        </Route>

        {/* NoAccess */}
        <Route exact path="no-access" element={<Main />}>
          <Route index element={<NoAccess />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
