import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './layouts/Main';
// Mine
import UserMineDetail from './pages/user/mine/Detail';
// Manage
import UserManageList from './pages/user/manage/List';
import UserManageCreate from './pages/user/manage/Create';
import UserManageEdit from './pages/user/manage/Edit';
// Role
import UserRoleList from './pages/user/role/List';
// Brand
import CarBrandList from './pages/car/brand/List';
import CarBrandCreate from './pages/car/brand/Create';
import CarBrandEdit from './pages/car/brand/Edit';
// Brand Group
import CarGroupList from './pages/car/group/List';
import CarGroupCreate from './pages/car/group/Create';
import CarGroupEdit from './pages/car/group/Edit';
// Model
import CarModelList from './pages/car/model/List';
import CarModelCreate from './pages/car/model/Create';
import CarModelEdit from './pages/car/model/Edit';
// Lineup
import CarLineupList from './pages/car/lineup/List';
import CarLineupCreate from './pages/car/lineup/Create';
import CarLineupEdit from './pages/car/lineup/Edit';
// Trim
import CarTrimList from './pages/car/trim/List';
import CarTrimCreate from './pages/car/trim/Create';
import CarTrimEdit from './pages/car/trim/Edit';
// Discount
import CarDiscountList from './pages/car/discount/List';
import CarDiscountCreate from './pages/car/discount/Create';
import CarDiscountEdit from './pages/car/discount/Edit';
// Extra
import CarExtraList from './pages/car/extra/List';
// Quotation
import EstimationQuotationList from './pages/estimation/quotation/List';
import EstimationQuotationDetail from './pages/estimation/quotation/Detail';
// Assignment
import EstimationAssignmentList from './pages/estimation/assignment/List';
import EstimationAssignmentManage from './pages/estimation/assignment/Manage';
// Count
import EstimationCountList from './pages/estimation/count/List';
// Setting
import EstimationSettingList from './pages/estimation/setting/List';
// Content
import ContentContentList from './pages/content/content/List';
// Recommendation
import ContentRecommendationList from './pages/content/recommendation/List';
import ContentRecommendationCreate from './pages/content/recommendation/Create';
import ContentRecommendationEdit from './pages/content/recommendation/Edit';
// Photo
import ContentPhotoList from './pages/content/photo/List';
import ContentPhotoCreate from './pages/content/photo/Create';
import ContentPhotoEdit from './pages/content/photo/Edit';
// Gallery
import ContentGalleryList from './pages/content/gallery/List';
import ContentGalleryEdit from './pages/content/gallery/Edit';
// Popular
import ContentPopularList from './pages/content/popular/List';
import ContentPopularEdit from './pages/content/popular/Edit';
// CarRank
import ContentCarRankList from './pages/content/carRank/List';
import ContentCarRankCreate from './pages/content/carRank/Create';
import ContentCarRankEdit from './pages/content/carRank/Edit';
// ContentRank
import ContentContentRankList from './pages/content/contentRank/List';
import ContentContentRankCreate from './pages/content/contentRank/Create';
import ContentContentRankEdit from './pages/content/contentRank/Edit';
// MovieRank
import ContentMovieRankList from './pages/content/movieRank/List';
import ContentMovieRankCreate from './pages/content/movieRank/Create';
import ContentMovieRankEdit from './pages/content/movieRank/Edit';
// Media
import ContentMediaList from './pages/content/media/List';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path='/' element={ < Main headerMenuKey={"car"} /> }>
					<Route index element={ <CarBrandList /> } />
				</Route>

				{/* User */}
				<Route path="/user/mine/:id" element={ <Main headerMenuKey={"user"} /> }>
					<Route index element={<UserMineDetail />} />
				</Route>
				<Route path="/user/manage/" element={ <Main headerMenuKey={"user"} /> }>
					<Route index element={<UserManageList />} />
					<Route path='create' element={<UserManageCreate />} />
					<Route path='edit/:id' element={<UserManageEdit />} />
				</Route>
				<Route path="/user/role/" element={ <Main headerMenuKey={"user"} /> }>
					<Route index element={<UserRoleList />} />
				</Route>

				{/* Car */}
				<Route path="/car/brand/" element={ <Main headerMenuKey={"car"} /> }>
					<Route index element={<CarBrandList />} />
					<Route path="create" element={<CarBrandCreate />} />
					<Route path="edit/:id" element={<CarBrandEdit />} />
				</Route>
				<Route path="/car/group/" element={ <Main headerMenuKey={"car"} /> }>
					<Route index element={<CarGroupList />} />
					<Route path="create" element={<CarGroupCreate />} />
					<Route path="edit/:id" element={<CarGroupEdit />} />
				</Route>
				<Route path="/car/model/" element={ <Main headerMenuKey={"car"} /> }>
					<Route index element={<CarModelList />} />
					<Route path="create" element={<CarModelCreate />} />
					<Route path="edit/:id" element={<CarModelEdit />} />
				</Route>
				<Route path="/car/lineup/" element={ <Main headerMenuKey={"car"} /> }>
					<Route index element={<CarLineupList />} />
					<Route path="create" element={<CarLineupCreate />} />
					<Route path="edit/:id" element={<CarLineupEdit />} />
				</Route>
				<Route path="/car/trim/" element={ <Main headerMenuKey={"car"} /> }>
					<Route index element={<CarTrimList />} />
					<Route path="create" element={<CarTrimCreate />} />
					<Route path="edit/:id" element={<CarTrimEdit />} />
				</Route>
				<Route path="/car/discount/" element={ <Main headerMenuKey={"car"} /> }>
					<Route index element={<CarDiscountList />} />
					<Route path="create" element={<CarDiscountCreate />} />
					<Route path="edit/:id" element={<CarDiscountEdit />} />
				</Route>
				<Route path="/car/extra/" element={ <Main headerMenuKey={"car"} /> }>
					<Route index element={<CarExtraList />} />
				</Route>

				{/* Estimation */}
				<Route path="/estimation/quotation/" element={ <Main headerMenuKey={"estimation"} /> }>
					<Route index element={<EstimationQuotationList />} />
					<Route path="detail/:id" element={<EstimationQuotationDetail />} />
				</Route>
				<Route path="/estimation/assignment/" element={ <Main headerMenuKey={"estimation"} /> }>
					<Route index element={<EstimationAssignmentList />} />
					<Route path="manage" element={<EstimationAssignmentManage />} />
				</Route>
				<Route path="/estimation/count/" element={ <Main headerMenuKey={"estimation"} /> }>
					<Route index element={<EstimationCountList />} />
				</Route>
				<Route path="/estimation/setting/" element={ <Main headerMenuKey={"estimation"} /> }>
					<Route index element={<EstimationSettingList />} />
				</Route>

				{/* Content */}
				<Route path="/content/content/" element={ <Main headerMenuKey={"content"} /> }>
					<Route index element={<ContentContentList />} />
				</Route>
				<Route path="/content/recommendation/" element={ <Main headerMenuKey={"content"} /> }>
					<Route index element={<ContentRecommendationList />} />
					<Route path="create" element={<ContentRecommendationCreate />} />
					<Route path="edit/:id" element={<ContentRecommendationEdit />} />
				</Route>
				<Route path="/content/photo/" element={ <Main headerMenuKey={"content"} /> }>
					<Route index element={<ContentPhotoList />} />
					<Route path="create" element={<ContentPhotoCreate />} />
					<Route path="edit/:id" element={<ContentPhotoEdit />} />
				</Route>
				<Route path="/content/gallery/" element={ <Main headerMenuKey={"content"} /> }>
					<Route index element={<ContentGalleryList />} />
					<Route path="edit/:id" element={<ContentGalleryEdit />} />
				</Route>
				<Route path="/content/popular/" element={ <Main headerMenuKey={"content"} /> }>
					<Route index element={<ContentPopularList />} />
					<Route path="edit/:id" element={<ContentPopularEdit />} />
				</Route>
				<Route path="/content/carRank/" element={ <Main headerMenuKey={"content"} /> }>
					<Route index element={<ContentCarRankList />} />
					<Route path="create" element={<ContentCarRankCreate />} />
					<Route path="edit" element={<ContentCarRankEdit />} />
				</Route>
				<Route path="/content/contentRank/" element={ <Main headerMenuKey={"content"} /> }>
					<Route index element={<ContentContentRankList />} />
					<Route path="create" element={<ContentContentRankCreate />} />
					<Route path="edit" element={<ContentContentRankEdit />} />
				</Route>
				<Route path="/content/movieRank/" element={ <Main headerMenuKey={"content"} /> }>
					<Route index element={<ContentMovieRankList />} />
					<Route path="create" element={<ContentMovieRankCreate />} />
					<Route path="edit" element={<ContentMovieRankEdit />} />
				</Route>
				<Route path="/content/media/" element={ <Main headerMenuKey={"content"} /> }>
					<Route index element={<ContentMediaList />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;