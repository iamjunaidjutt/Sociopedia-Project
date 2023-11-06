import React from "react";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "src/store/authSlice";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { _id } = useSelector((state) => state.user);
	const token = useSelector((state) => state.token);
	const friends = useSelector((state) => state.user.friends);

	const { palette } = useTheme();
	const { primary, neutral } = palette;

	const isFriend = friends.find((friend) => friend._id === friendId);

	const patchFriend = async () => {
		try {
			const response = await fetch(
				`http://localhost:8080/users/${_id}/${friendId}`,
				{
					method: "PATCH",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);
			if (!response.ok) {
				// Handle the error here (e.g., show an error message or log the error).
				console.error(
					"Error updating friend status:",
					response.status,
					response.statusText
				);
				return;
			}

			const data = await response.json();
			dispatch(authActions.setFriends({ friends: data }));
		} catch (error) {
			// Handle other potential errors (e.g., network errors).
			console.error("Error updating friend status:", error);
		}
	};

	return (
		<FlexBetween>
			<FlexBetween
				gap="1rem"
				onClick={() => navigate(`/profile/${friendId}`)}
			>
				<UserImage image={userPicturePath} size="55px" />
				<Box>
					<Typography
						color={neutral.main}
						variant="h5"
						fontWeight="500"
						sx={{
							"&:hover": {
								color: primary.light,
								cursor: "pointer",
							},
						}}
					>
						{name}
					</Typography>
					<Typography color={neutral.medium} fontSize="0.75rem">
						{subtitle}
					</Typography>
				</Box>
			</FlexBetween>

			<IconButton
				onClick={() => patchFriend()}
				sx={{ backgroundColor: primary.light, p: "0.6rem" }}
			>
				{isFriend ? (
					<PersonRemoveOutlined sx={{ color: primary.dark }} />
				) : (
					<PersonAddOutlined sx={{ color: primary.dark }} />
				)}
			</IconButton>
		</FlexBetween>
	);
};

export default Friend;
