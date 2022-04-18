import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './layouts/Main';
import CarBrandList from './pages/car/brand/List';
import CarBrandCreate from './pages/car/brand/Create';

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
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;