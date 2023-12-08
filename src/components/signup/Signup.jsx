import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSignupMutation } from "../../redux/apiSlice/authApiService";
import Loading from "../loading/Loading";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/slices/authSlice";
import { setUserData } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import usePersist from "../../hooks/usePersist";

function Signup() {
	const [hidePassword, setHidePassword] = useState(true);
	const [signup, { isLoading }] = useSignupMutation();
	const [persist, setPersist] = usePersist();

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirm: "",
		},
		validationSchema: Yup.object({
			firstName: Yup.string()
				.min(3, "username should be atleast 3 character")
				.max(25, "username is too long")
				.required("username is required"),
			lastName: Yup.string()
				.min(3, "username should be atleast 3 character")
				.max(25, "username is too long")
				.required("username is required"),
			email: Yup.string()
				.matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "email is not valid")
				.email("Invalid email address")
				.required("email is required"),
			password: Yup.string()
				.min(8, "password should be atleast 8 character")
				.matches(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
					"password should contain an uppercase,a lowercase, a number and a special character"
				)
				.required("password is required"),
			confirm: Yup.string()
				.required("please confirm your password")
				.oneOf([Yup.ref("password")], "password must be same"),
		}),
		onSubmit: async values => {
			try {
				const { data } = await signup(values);
				if (data.success) {
					dispatch(setCredentials({ token: data.accessToken }));
					dispatch(setUserData(data.user));
					navigate("/");
				} else {
					toast.error(data.error_msg, {
						position: "top-center",
						theme: "colored",
					});
				}
			} catch (error) {
				console.log(error);
			}
		},
	});

	const handleToggle = () => setPersist(prev => !prev);

	return isLoading ? (
		<Loading />
	) : (
		<div className="flex py-10 flex-col justify-center items-center">
			<h1 className="font-serif font-bold text-gray-700">Sign up Page</h1>
			<form
				onSubmit={formik.handleSubmit}
				className="flex flex-col gap-4 lg:w-[40%] md:w-[60%] w-[80%]"
			>
				<div>
					<label
						className={`block ml-3 text-xs sm:text-sm ${
							formik.errors.firstName ? "text-red-500" : ""
						}`}
						htmlFor="firstName"
					>
						{formik.errors.firstName ? formik.errors.firstName : "First Name"}
					</label>
					<input
						className={`placeholder-shown:text-xs sm:placeholder-shown:text-sm text-xs sm:text-sm shadow-md lg:p-2 p-1 rounded-xl border-2 outline-none ${
							formik.errors.firstName
								? "focus:border-red-500"
								: "focus:border-lime-500"
						}  w-full`}
						type="text"
						id="firstName"
						name="firstName"
						placeholder="Jhon"
						value={formik.values.firstName}
						onChange={formik.handleChange}
					/>
				</div>
				<div>
					<label
						className={`block ml-3 text-xs sm:text-sm ${
							formik.errors.lastName ? "text-red-500" : ""
						}`}
						htmlFor="lastName"
					>
						{formik.errors.lastName ? formik.errors.lastName : "Last Name"}
					</label>
					<input
						className={`placeholder-shown:text-xs sm:placeholder-shown:text-sm text-xs sm:text-sm shadow-md lg:p-2 p-1 rounded-xl border-2 outline-none ${
							formik.errors.lastName ? "focus:border-red-500" : "focus:border-lime-500"
						}  w-full`}
						type="text"
						id="lastName"
						name="lastName"
						placeholder="Doe"
						value={formik.values.lastName}
						onChange={formik.handleChange}
					/>
				</div>
				<div>
					<label
						htmlFor="email"
						className={`block ml-3 text-xs sm:text-sm ${
							formik.errors.email ? "text-red-500" : ""
						}`}
					>
						{formik.errors.email ? formik.errors.email : "Email"}
					</label>
					<input
						className={`placeholder-shown:text-xs sm:placeholder-shown:text-sm text-xs sm:text-sm shadow-md lg:p-2 p-1 rounded-xl border-2 outline-none ${
							formik.errors.email ? "focus:border-red-500" : "focus:border-lime-500"
						}  w-full`}
						type="email"
						id="email"
						name="email"
						placeholder="jhondoe@example.com"
						value={formik.values.email}
						onChange={formik.handleChange}
					/>
				</div>
				<div>
					<label
						htmlFor="password"
						className={`block ml-3 text-xs sm:text-sm ${
							formik.errors.password ? "text-red-500" : ""
						}`}
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
							placeholder="Create Password"
							value={formik.values.password}
							onChange={formik.handleChange}
						/>
						<i
							onClick={() => setHidePassword(!hidePassword)}
							className={
								hidePassword
									? "fa-solid fa-eye absolute top-1/2 right-3 text-sm -translate-y-1/2 text-gray-600 cursor-pointer"
									: "fa-sharp fa-solid fa-eye-slash absolute top-1/2 right-3 text-sm -translate-y-1/2 text-gray-600 cursor-pointer"
							}
						></i>
					</div>
				</div>
				<div>
					<label
						htmlFor="confirm"
						className={`block ml-3 text-xs sm:text-sm ${
							formik.errors.confirm ? "text-red-500" : ""
						} `}
					>
						{formik.errors.confirm ? formik.errors.confirm : "Confirm Password"}
					</label>
					<input
						className={`placeholder-shown:text-xs sm:placeholder-shown:text-sm text-xs sm:text-sm shadow-md lg:p-2 p-1 rounded-xl border-2 outline-none ${
							formik.errors.confirm ? "focus:border-red-500" : "focus:border-lime-500"
						}  w-full`}
						type={hidePassword ? "password" : "text"}
						id="confirm"
						name="confirm"
						autoComplete="true"
						placeholder="Enter Password again"
						value={formik.values.confirm}
						onChange={formik.handleChange}
					/>
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
					Sign up
				</button>
			</form>
			<div className="flex lg:w-[40%] md:w-[60%] w-[80%] pt-5 justify-between">
				<p className="font-mono text-blue-500 cursor-pointer">Already signed up?</p>
				<button
					onClick={() => navigate("/login")}
					className="border-2 text-gray-500 hover:text-white duration-300 hover:bg-gray-500 p-1 rounded-md font-mono border-gray-500"
				>
					Login
				</button>
			</div>
		</div>
	);
}

export default Signup;
