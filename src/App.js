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
			</Routes>
		</BrowserRouter>
	);
}

export default App;