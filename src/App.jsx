import { Route, Routes } from "react-router-dom";
import UserRouter from "./routes/UserRouter";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Persist from "./components/login/Persist";

function App() {
	return (
		<>
			<Routes>
				<Route element={<Persist />}>
					<Route path="/*" element={<UserRouter />} />
				</Route>
			</Routes>
			<ToastContainer />
		</>
	);
}

export default App;
