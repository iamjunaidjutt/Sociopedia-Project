import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "src/store/authSlice";
import PostWidget from "src/scenes/widgets/PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.posts);
	const token = useSelector((state) => state.token);
	const loading = useSelector((state) => state.loading); // Add a loading state to your Redux store

	const fetchData = async () => {
		try {
			dispatch(authActions.setLoading(true)); // Set loading to true before fetching data

			let url = "http://localhost:8080/posts";
			if (isProfile) {
				url = `http://localhost:8080/posts/${userId}/posts`;
			}

			const response = await fetch(url, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				throw new Error("Error fetching posts");
			}

			const data = await response.json();
			dispatch(authActions.setPosts({ posts: data }));
			dispatch(authActions.setLoading(false)); // Set loading back to false after data is fetched
		} catch (error) {
			// Handle errors and set the loading state to false
			console.error("Error fetching posts:", error);
			dispatch(authActions.setLoading(false));
		}
	};

	useEffect(() => {
		// Call the fetchData function when the component mounts or when userId, isProfile, or token changes
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId, isProfile, token, dispatch]);

	if (loading) {
		// You can return a loader component here to show a loading spinner or message
		return <div>Loading...</div>;
	}

	return (
		<>
			{posts.map((post) => (
				<PostWidget key={post._id} {...post} />
			))}
		</>
	);
};

export default PostsWidget;
