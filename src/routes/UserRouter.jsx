import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Public from "../components/public/Public";
import LoginPage from "../pages/LoginPage";
import Private from "../components/private/Private";
import ProfilePage from "../pages/ProfilePage";
import SignupPage from "../pages/SignupPage";

function UserRouter() {
	return (
		<Routes>
			<Route element={<Outlet />}>
				<Route path="/" element={<HomePage />} />
				<Route element={<Public />}>
					<Route path="login" element={<LoginPage />} />
					<Route path="signup" element={<SignupPage />} />
				</Route>
				<Route element={<Private />}>
					<Route path="profile" element={<ProfilePage />} />
				</Route>
			</Route>
		</Routes>
	);
}

export default UserRouter;
