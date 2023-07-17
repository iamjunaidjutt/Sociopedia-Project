import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "scenes/Login";
import Home from "scenes/Home";
import Profile from "scenes/Profile";

const router = createBrowserRouter([
	{
		path: "/",
		children: [
			{ index: true, element: <Login /> },
			{ path: "home", element: <Home /> },
			{ path: "profile/:userId", element: <Profile /> },
		],
	},
]);

function App() {
	return (
		<RouterProvider router={router}>
			<div className="app"></div>
		</RouterProvider>
	);
}

export default App;
