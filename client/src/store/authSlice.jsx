import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	mode: "light",
	user: null,
	token: null,
	posts: [],
	loading: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setMode: (state) => {
			state.mode = state.mode === "light" ? "dark" : "light";
		},
		setLogin: (state, action) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		setLogout: (state) => {
			state.user = null;
			state.token = null;
		},
		setFriends: (state, action) => {
			if (state.user) {
				state.user.friends = action.payload.friends;
			} else {
				console.error("User friends not exist :(");
			}
		},
		setPosts: (state, action) => {
			state.posts = action.payload.posts;
		},
		setPost: (state, action) => {
			const { post } = action.payload;
			const updatedPosts = state.posts.map((p) =>
				p._id === post._id ? post : p
			);
			state.posts = updatedPosts;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
