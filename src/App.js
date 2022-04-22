import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './layouts/Main';
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

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path='/' element={< Main />}>
					<Route index element={<CarBrandList />} />
				</Route>
				<Route path="/car/brand/" element={<Main />}>
					<Route index element={<CarBrandList />} />
					<Route path="create" element={<CarBrandCreate />} />
					<Route path="edit" element={<CarBrandEdit />} />
				</Route>
				<Route path="/car/group/" element={<Main />}>
					<Route index element={<CarGroupList />} />
					<Route path="create" element={<CarGroupCreate />} />
					<Route path="edit" element={<CarGroupEdit />} />
				</Route>
				<Route path="/car/model/" element={<Main />}>
					<Route index element={<CarModelList />} />
					<Route path="create" element={<CarModelCreate />} />
					<Route path="edit" element={<CarModelEdit />} />
				</Route>
				<Route path="/car/lineup/" element={<Main />}>
					<Route index element={<CarLineupList />} />
					<Route path="create" element={<CarLineupCreate />} />
					<Route path="edit" element={<CarLineupEdit />} />
				</Route>
				<Route path="/car/trim/" element={<Main />}>
					<Route index element={<CarTrimList />} />
					<Route path="create" element={<CarTrimCreate />} />
					<Route path="edit" element={<CarTrimEdit />} />
				</Route>
				<Route path="/car/discount/" element={<Main />}>
					<Route index element={<CarDiscountList />} />
					<Route path="create" element={<CarDiscountCreate />} />
					<Route path="edit" element={<CarDiscountEdit />} />
				</Route>
				<Route path="/car/extra/" element={<Main />}>
					<Route index element={<CarExtraList />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;