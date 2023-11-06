import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoute.js";
import usersRoutes from "./routes/usersRoute.js";
import postsRoutes from "./routes/postsRoute.js";
import { register } from "./controllers/authController.js";
import { createPost } from "./controllers/postsController.js";
import { verifyToken } from "./middleware/authMiddleware.js";

// Configurations & Middleware
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const whitelist = ["http://localhost:5173"];

const corsOptions = {
	origin: (origin, callback) => {
		if (whitelist.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
};

app.use(cors(corsOptions));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// File Storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/assets");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});
const upload = multer({ storage });

// Routes With Files
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

// Routes
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).json({ error: "Internal Server Error" });
});

// Mongoose Setup
const PORT = process.env.PORT || 3000;
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
	})
	.catch((err) => console.error(err));
