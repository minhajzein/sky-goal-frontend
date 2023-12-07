import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function Private() {
	const token = useSelector(state => state.auth.token);
	const location = useLocation();
	return token !== null ? (
		<Outlet />
	) : (
		<Navigate to="/" state={{ from: location }} replace />
	);
}

export default Private;
