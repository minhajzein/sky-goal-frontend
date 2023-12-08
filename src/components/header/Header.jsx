import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function Header() {
	const token = useSelector(state => state.auth.token);
	const user = useSelector(state => state.user.value);
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<div className="w-full z-50 sticky top-0 flex justify-between items-center p-1 bg-gray-500">
			<div>
				<i className="fa-solid fa-bars text-lg text-yellow-100 mr-1 lg:mr-5 cursor-pointer hover:scale-105 duration-300"></i>
			</div>
			<div>
				<div
					onClick={() => navigate("/")}
					className="flex gap-1 justify-center items-center cursor-pointer"
				>
					<img
						className="lg:h-8 h-6 rounded-full hover:animate-spin"
						src="https://static.vecteezy.com/system/resources/previews/009/970/456/original/eps10-orange-quotation-mark-icon-isolated-on-white-background-double-quotes-symbol-in-a-simple-flat-trendy-modern-style-for-your-website-design-logo-ui-pictogram-and-mobile-application-vector.jpg"
						alt="logo"
					/>
					<h1 className="text-white font-extrabold text-2xl">Quotes</h1>
				</div>
			</div>
			<div>
				{token ? (
					<>
						{location.pathname === "/profile" ? (
							<i
								onClick={() => navigate("/")}
								className="fa-solid fa-house text-lg text-yellow-100 mr-1 lg:mr-5 cursor-pointer hover:scale-105 duration-300"
							></i>
						) : (
							<img
								className="rounded-full hover:scale-105 duration-300 cursor-pointer h-6 lg:h-8"
								src={
									user?.avatar && user.avatar !== null
										? user.avatar
										: "https://www.eirim.ie/eirim2017/wp-content/uploads/2016/09/dummy-profile-pic.jpg"
								}
								alt="Profile"
								title="Profile"
								onClick={() => navigate("/profile")}
							/>
						)}
					</>
				) : (
					<>
						{location.pathname === "/login" || location.pathname === "/signup" ? (
							<i
								onClick={() => navigate("/")}
								className="fa-solid fa-house  text-lg text-yellow-100 mr-1 lg:mr-5 cursor-pointer hover:scale-105 duration-300"
							></i>
						) : (
							<i
								onClick={() => navigate("/login")}
								className="fa-solid fa-right-to-bracket text-lg text-yellow-100 mr-1 lg:mr-5 cursor-pointer hover:scale-105 duration-300"
							></i>
						)}
					</>
				)}
			</div>
		</div>
	);
}

export default Header;
