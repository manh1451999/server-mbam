
const secretKey = process.env.ACCESS_TOKEN_SECRET || "Manh123456";

let isAuth = async (req, res, next) => {
	const tokenClient = req.query.key
	
	if (!tokenClient) return res.status(401).json({
		message: 'đã xảy ra lỗi truy cập'
	})
	try {
		// req.user = await jwtMethod.verifyToken(tokenClient, secretKey);
		if(tokenClient == secretKey)
			next()
		else return res.status(403).json({
			message: 'đã xảy ra lỗi truy cập'
		})
	}
	catch (err) {
		return res.status(403).json({
			message: 'đã xảy ra lỗi truy cập'
		})
	}
}






module.exports = { isAuth }

