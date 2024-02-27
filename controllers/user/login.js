const User = require("../../models/user");
const sendEmail = require("../../utils/sendEmail");
const bcrypt = require("bcrypt");
const Token = require("../../models/token");
const crypto = require('crypto');

exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).send({ message: "Invalid Email or Password" });
        }
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword) {
            return res.status(401).send({ message: "Invalid Email or Password" });
        }
        if (!user.verified) {
            let token = await Token.findOne({ userId: user._id });
            if (!token) {
                token = await new Token({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString("hex")
                }).save();
                const url = `${process.env.BASE_URL}/users/${user._id}/verify/${token.token}`;
                await sendEmail(user.email, "Email Verification", url);
            }
            return res.status(400).send({ message: "An Email sent to your account please verify" })
        }
        const { _id, username, email, image } = await user;
        const filteredUser = { _id, username, email, image }
        res.status(200).send({ data: filteredUser, message: "logged in successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error!" });
    }
}