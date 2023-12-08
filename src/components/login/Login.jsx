import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import usePersist from "../../hooks/usePersist";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/apiSlice/authApiService";
import Loading from "../loading/Loading";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/slices/authSlice";

function Login() {
	const [hidePassword, setHidePassword] = useState(true);
	const [persist, setPersist] = usePersist();

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [login, { isLoading }] = useLoginMutation();

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "email not valid")
				.email("Invalid email address")
				.required("email is required"),
			password: Yup.string().required("password is required"),
		}),
		onSubmit: async values => {
			try {
				const response = await login(values);

				if (response.data.success) {
					dispatch(setCredentials({ token: response.data.accessToken }));
					dispatch(setUserdata(response.data.user));
					navigate("/");
				} else {
					toast.error(response.data.error_msg, {
						position: "top-center",
						theme: "colored",
					});
				}
			} catch (error) {
				console.log(error);
				toast.error("Server not responding", {
					position: "top-center",
					theme: "colored",
				});
			}
		},
	});

	const handleToggle = () => setPersist(prev => !prev);

	return isLoading ? (
		<Loading />
	) : (
		<div className="w-full py-10  flex flex-col justify-center items-center">
			<h1 className="font-serif font-bold text-gray-700">Login Page</h1>
			<form
				onSubmit={formik.handleSubmit}
				className="flex flex-col lg:w-[40%] md:w-[60%] w-[80%] gap-4"
			>
				<div className="mt-4">
					<label
						className={`block ml-3 text-xs sm:text-sm ${
							formik.errors.email ? "text-red-500" : ""
						}`}
						htmlFor="email"
					>
						{formik.errors.email ? formik.errors.email : "enter your email"}
					</label>
					<input
						className={`placeholder-shown:text-xs sm:placeholder-shown:text-sm text-xs sm:text-sm shadow-md lg:p-2 p-1 rounded-xl border-2 outline-none ${
							formik.errors.email ? "focus:border-red-500" : "focus:border-lime-500"
						}  w-full`}
						type="email"
						name="email"
						id="email"
						placeholder="jhondoe@example.com"
						value={formik.values.email}
						onChange={formik.handleChange}
					/>
				</div>
				<div>
					<label
						className={`block ml-3 text-xs sm:text-sm ${
							formik.errors.password ? "text-red-500" : ""
						}`}
						htmlFor="password"
					>
						{formik.errors.password ? formik.errors.password : "Password"}
					</label>
					<div className="relative">
						<input
							className={`placeholder-shown:text-xs sm:placeholder-shown:text-sm text-xs sm:text-sm shadow-md lg:p-2 p-1 rounded-xl border-2 outline-none ${
								formik.errors.password
									? "focus:border-red-500"
									: "focus:border-lime-500"
							}  w-full`}
							type={hidePassword ? "password" : "text"}
							name="password"
							autoComplete="true"
							id="password"
							placeholder="Enter password"
							value={formik.values.password}
							onChange={formik.handleChange}
						/>
						<i
							onClick={() => setHidePassword(!hidePassword)}
							className={
								hidePassword
									? "fa-solid fa-eye absolute top-1/2 right-3 -translate-y-1/2 text-gray-600 cursor-pointer"
									: "fa-sharp fa-solid fa-eye-slash absolute top-1/2 right-3 -translate-y-1/2 text-gray-600 cursor-pointer"
							}
						></i>
					</div>
				</div>
				<div className="flex flex-row justify-between border-blue-500 rounded-md items-center border p-1 px-4">
					<input
						className="bg-cyan-200 rounded-md border-blue-700 border-2"
						type="checkbox"
						id="persist"
						checked={persist}
						onChange={handleToggle}
					/>
					<label className="ml-4 lg:text-sm text-xs" htmlFor="persist">
						Keep me signed in
					</label>
				</div>
				<button
					className="bg-gray-500 p-1 shadow-md rounded-xl lg:p-2 font-mono text-white hover:scale-105 duration-300"
					type="submit"
				>
					Login
				</button>
			</form>
			<div className="flex lg:w-[40%] md:w-[60%] w-[80%] pt-5 justify-between">
				<p className="font-mono text-blue-500 cursor-pointer">Forgot password?</p>
				<button
					onClick={() => navigate("/signup")}
					className="border-2 text-gray-500 hover:text-white duration-300 hover:bg-gray-500 p-1 rounded-md font-mono border-gray-500"
				>
					Sign up
				</button>
			</div>
		</div>
	);
}

export default Login;
