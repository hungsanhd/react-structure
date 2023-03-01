import React from "react";
import "./App.css";
import "./styles/sb-admin-2.min.css";
import "./assets/font-awesome/css/all.min.css";
import { Routes, Route } from "react-router-dom";
import { CustomRouter, PrivateRoute } from "./components";
import { Admin } from "./pages/Admin/Admin";
import { history } from "./helpers";

function App() {
	return (
		<div className="App" id="wrapper">
			<CustomRouter history={history}>
				<Routes>
					<Route path="/*" element={<PrivateRoute><Admin /></PrivateRoute>}></Route>
				</Routes>
			</CustomRouter>
		</div>
	);
}

export default App;
