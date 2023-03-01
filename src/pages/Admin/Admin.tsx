import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { AppState } from "../../store";
import { getCurrentLoginUser } from "../../store/account/actions";
import { Home } from "./Home/Home";
import { LeftMenu } from "./LeftMenu/LeftMenu";
import { TopMenu } from "./TopMenu/TopMenu";
import { AddUser } from "./Users/AddUser";
import { EditUser } from "./Users/EditUser";
import { Users } from "./Users/Users";
import env from 'react-dotenv';
import { io } from 'socket.io-client';
import {v4 as uuidv4} from 'uuid';
import { addNotification } from "../../store/notification/actions";

export const Admin = () => {
	const dispatch = useDispatch<any>();
	const alert = useSelector((state: AppState) => state.alert);
	const userId = useSelector((state: AppState) => state.account.user?._id);

	useEffect(() => {
		dispatch(getCurrentLoginUser());
	}, [dispatch]);

	useEffect(() => {
		const socket = io(env.API_URL);
		// socket.on('connect', () => {
		// 	socket.emit('login', {userId: userId});
		// });
		socket.emit('login', {userId: userId});

		socket.on('message', function (message: any){
			console.log(message);
		});		
		socket.on('user_created', function (message: any){
			console.log('user_created');
			const id = uuidv4();
			dispatch(addNotification(id, message))
		});
		socket.on('user_updated', function (message: any){
			console.log('user_updated');
			const id = uuidv4();
			dispatch(addNotification(id, message))
		});
		socket.on('user_deleted', function (message: any){
			console.log('user_deleted');
			const id = uuidv4();
			dispatch(addNotification(id, message))
		});
	},[dispatch, userId]);

	return (
		<>
			<LeftMenu />
			{/* Content Wrapper */}
			<div id="content-wrapper" className="d-flex flex-column">
				{/* Main Content */}
				<div id="content">
					<TopMenu />
					{/* Begin Page Content */}
					<div className="container-fluid">
						{alert.message && (
							<div className={`alert ${alert.type}`}>{alert.message}</div>
						)}
						<Routes>
							<Route index element={<Home />} />
							<Route path="/users" element={<Users />} />
							<Route path="/user-edit/:id" element={<EditUser />} />
							<Route path="/user-add" element={<AddUser />} />
						</Routes>
					</div>
					{/* /.container-fluid */}
				</div>
				{/* End of Main Content */}
				{/* Footer */}
				<footer className="sticky-footer bg-white">
					<div className="container my-auto">
						<div className="copyright text-center my-auto">
							<span>Copyright © Your Website 2021</span>
						</div>
					</div>
				</footer>
				{/* End of Footer */}
			</div>
			{/* End of Content Wrapper */}
		</>
	);
};
