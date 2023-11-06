import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "src/scenes/Login";
import Home from "src/scenes/Home";
import Profile from "src/scenes/Profile";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
	const mode = useSelector((state) => state.mode);
	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
	const isAuth = Boolean(useSelector((state) => state.token));
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route
						path="/home"
						element={isAuth ? <Home /> : <Navigate to="/" />}
					/>
					<Route
						path="/profile/:userId"
						element={isAuth ? <Profile /> : <Navigate to="/" />}
					/>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
