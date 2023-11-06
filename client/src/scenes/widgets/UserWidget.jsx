/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import {
	ManageAccountsOutlined,
	EditOutlined,
	LocationOnOutlined,
	WorkOutlineOutlined,
} from "@mui/icons-material";
import UserImage from "src/components/UserImage";
import FlexBetween from "src/components/FlexBetween";
import WidgetWrapper from "src/components/WidgetWrapper";

// eslint-disable-next-line react/prop-types
const UserWidget = ({ userId, picturePath }) => {
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);
	const { palette } = useTheme();
	const navigate = useNavigate();
	const token = useSelector((state) => state.token);
	const dark = palette.neutral.dark;
	const medium = palette.neutral.medium;
	const main = palette.neutral.main;

	useEffect(() => {
		const getUser = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/users/${userId}`,
					{
						method: "GET",
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				if (!response.ok) {
					throw new Error("Failed to fetch user data.");
				}
				const data = await response.json();
				setUser(data);
			} catch (error) {
				setError("Error fetching user data.");
			}
		};
		getUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!user) {
		console.log(user);
		return null;
	}

	const {
		firstName,
		lastName,
		location,
		occupation,
		viewedProfile,
		impressions,
		friends,
	} = user;

	return (
		<WidgetWrapper>
			{error && <Typography color="error">{error}</Typography>}
			{/* First Row */}
			<FlexBetween
				gap="0.5rem"
				pb="1.1rem"
				onClick={() => navigate(`/profile/${userId}`)}
			>
				<FlexBetween gap="1rem">
					<UserImage image={picturePath} />
					<Box>
						<Typography
							variant="h4"
							color={dark}
							fontWeight="500"
							sx={{
								"&:hover": {
									color: palette.primary.light,
									cursor: "pointer",
								},
							}}
						>
							{firstName} {lastName}
						</Typography>
						<Typography color={medium}>
							{friends.length} friends
						</Typography>
					</Box>
				</FlexBetween>
				<ManageAccountsOutlined />
			</FlexBetween>

			<Divider />

			{/* Second Row */}
			<Box p="1rem 0rem">
				<Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
					<LocationOnOutlined fontSize="large" sx={{ color: main }} />
					<Typography color={medium}>{location}</Typography>
				</Box>
				<Box display="flex" alignItems="center" gap="1rem">
					<WorkOutlineOutlined
						fontSize="large"
						sx={{ color: main }}
					/>
					<Typography color={medium}>{occupation}</Typography>
				</Box>
			</Box>

			{/* Third Row */}
			<Box p="1rem 0">
				<FlexBetween mb="0.5rem">
					<Typography color={medium}>
						Who's viewed your profile
					</Typography>
					<Typography color={main} fontWeight="500">
						{viewedProfile}
					</Typography>
				</FlexBetween>
				<FlexBetween>
					<Typography color={medium}>
						Impressions of your post
					</Typography>
					<Typography color={main} fontWeight="500">
						{impressions}
					</Typography>
				</FlexBetween>
			</Box>

			{/* Fourth Row */}
			<Box mb="1rem 0">
				<Typography
					fontSize="1rem"
					color={main}
					fontWeight="500"
					mb="1rem"
				>
					Social Profiles
				</Typography>

				<FlexBetween gap="1rem" mb="0.5rem">
					<FlexBetween gap="1rem">
						{/* Update the image path if needed */}
						<img src="src/assets/twitter.png" alt="twitter" />
						<Box>
							<Typography color={main} fontWeight="500">
								Twitter
							</Typography>
							<Typography color={medium}>
								Social Network
							</Typography>
						</Box>
					</FlexBetween>
					<EditOutlined sx={{ color: main }} />
				</FlexBetween>

				<FlexBetween gap="1rem">
					<FlexBetween gap="1rem">
						{/* Update the image path if needed */}
						<img src="src/assets/linkedin.png" alt="linkedin" />
						<Box>
							<Typography color={main} fontWeight="500">
								LinkedIn
							</Typography>
							<Typography color={medium}>
								Network Platform
							</Typography>
						</Box>
					</FlexBetween>
					<EditOutlined sx={{ color: main }} />
				</FlexBetween>
			</Box>
		</WidgetWrapper>
	);
};

export default UserWidget;
