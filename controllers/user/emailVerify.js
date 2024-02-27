const Token = require("../../models/token");
const User = require("../../models/user");

exports.emailVerify = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(400).send({ message: "Invalid link" });
        }

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) {
            return res.status(400).send({ message: "Token expired" });
        }
        if (token.expiryDate < Date.now()) {
            return res.status(400).send({ message: "Token expired" });
        }

        // Update user verification status
        user.verified = true;
        await user.save();

        // Remove the token using deleteOne
        await Token.deleteOne({ _id: token._id });
        res.status(200).json({ success: true, message: "Email verified successfully", email: user.email });
    } catch (error) {
        console.error(error);
        console.log("case # 4");
        res.status(500).send({ message: "Internal Server Error" });
    }
}
