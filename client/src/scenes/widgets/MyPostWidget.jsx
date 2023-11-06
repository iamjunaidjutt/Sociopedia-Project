import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "src/store/authSlice";
import {
	Box,
	Divider,
	Typography,
	InputBase,
	IconButton,
	Button,
} from "@mui/material";
import {
	EditOutlined,
	DeleteOutlined,
	AttachFileOutlined,
	GifBoxOutlined,
	ImageOutlined,
	MicOutlined,
	MoreHorizOutlined,
} from "@mui/icons-material";
import Dropzone from "react-dropzone";
import FlexBetween from "src/components/FlexBetween";
import UserImage from "src/components/UserImage";
import WidgetWrapper from "src/components/WidgetWrapper";

const MyPostWidget = ({ picturePath }) => {
	const dispatch = useDispatch();
	const [isImage, setIsImage] = useState(false);
	const [image, setImage] = useState(null);
	const [post, setPost] = useState("");

	const user = useSelector((state) => state.user);
	const token = useSelector((state) => state.token);

	const handlePost = async () => {
		const formData = new FormData();
		formData.append("userId", user._id);
		formData.append("description", post);
		if (image) {
			formData.append("picture", image);
			formData.append("picturePath", picturePath);
		}

		const response = await fetch(`http://localhost:8080/posts`, {
			method: "POST",
			headers: { Authorization: `Bearer ${token}` },
			body: formData,
		});
		const posts = await response.json();
		dispatch(authActions.setPosts({ posts }));
		setImage(null);
		setPost("");
	};

	const handleImageDrop = (acceptedFiles) => {
		setImage(acceptedFiles[0]);
	};

	return (
		<WidgetWrapper>
			<FlexBetween gap="1.5rem">
				<UserImage image={picturePath} />
				<InputBase
					placeholder="What's on your mind..."
					onChange={(e) => setPost(e.target.value)}
					value={post}
					sx={{
						width: "100%",
						backgroundColor: "#f0f2f5",
						borderRadius: "2rem",
						padding: "1rem 2rem",
					}}
				/>
			</FlexBetween>

			{isImage && (
				<Box
					border={`1px solid #BDBDBD`}
					borderRadius="5px"
					mt="1rem"
					p="1rem"
				>
					<Dropzone
						acceptedFiles=".jpeg,.png,.jpg"
						multiple={false}
						onDrop={handleImageDrop}
					>
						{({ getRootProps, getInputProps }) => (
							<FlexBetween>
								<Box
									{...getRootProps()}
									border={`2px dashed #3f51b5`}
									p="1rem"
									width="100%"
									sx={{
										"&:hover": {
											cursor: "pointer",
										},
									}}
								>
									<input {...getInputProps()} />
									{!image ? (
										<p>Add Image Here</p>
									) : (
										<FlexBetween>
											<Typography>
												{image.name}
											</Typography>
											<EditOutlined />
										</FlexBetween>
									)}
								</Box>
								{image && (
									<IconButton
										onClick={() => setImage(null)}
										sx={{
											width: "16%",
										}}
									>
										<DeleteOutlined />
									</IconButton>
								)}
							</FlexBetween>
						)}
					</Dropzone>
				</Box>
			)}

			<Divider sx={{ margin: "1.25rem 0" }} />

			<FlexBetween>
				<FlexBetween
					gap="0.25rem"
					onClick={() => setIsImage((prev) => !prev)}
				>
					<ImageOutlined sx={{ color: "#3f51b5" }} />
					<Typography
						color="#3f51b5"
						sx={{ cursor: "pointer", color: "#757575" }}
					>
						Image
					</Typography>
				</FlexBetween>
				<FlexBetween gap="0.25rem">
					<GifBoxOutlined sx={{ color: "#3f51b5" }} />
					<Typography color="#3f51b5">Clip</Typography>
				</FlexBetween>
				<FlexBetween gap="0.25rem">
					<AttachFileOutlined sx={{ color: "#3f51b5" }} />
					<Typography color="#3f51b5">Attachment</Typography>
				</FlexBetween>
				<FlexBetween gap="0.25rem">
					<MicOutlined sx={{ color: "#3f51b5" }} />
					<Typography color="#3f51b5">Audio</Typography>
				</FlexBetween>

				<Button
					disabled={!post}
					onClick={handlePost}
					sx={{
						color: "#fff",
						backgroundColor: "#3f51b5",
						borderRadius: "3rem",
					}}
				>
					POST
				</Button>
			</FlexBetween>
		</WidgetWrapper>
	);
};

export default MyPostWidget;
