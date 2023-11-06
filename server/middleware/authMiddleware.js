import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
	try {
		let token = req.headers.authorization || req.headers.Authorization;

		if (!token) {
			return res
				.status(401)
				.send("Unauthorized: Access token is missing.");
		}

		if (token.startsWith("Bearer ")) {
			token = token.slice(7).trimLeft();
		}

		const verified = jwt.verify(token, process.env.JWT_SECRET);
		req.user = verified;
		next();
	} catch (err) {
		if (err.name === "JsonWebTokenError") {
			return res
				.status(401)
				.json({ error: "Unauthorized: Invalid token." });
		}

		return res.status(500).json({ error: "Internal Server Error" });
	}
};
