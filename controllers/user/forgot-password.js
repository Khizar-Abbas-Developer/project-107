const Joi = require("joi");
const User = require("../../models/user");
const Token = require("../../models/token");
const sendEmail = require("../../utils/sendEmail");
const crypto = require("crypto");

exports.forgotPassword = async (req, res) => {
    try {
        const emailSchema = Joi.object({
            email: Joi.string().email().required().label("Email"),
        });
        const { error } = emailSchema.validate(req.body);
        if (error)
            return res.status(400).json({ message: error.details[0].message });

        let user = await User.findOne({ email: req.body.email });
        if (!user)
            return res
                .status(409)
                .json({ message: "User with given email does not exist! Create an account" });

        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }
        const url = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}/`;
        await sendEmail(user.email, "Password Reset", url);
        res
            .status(200)
            .json({ message: "Password reset link sent to your email account" });
    } catch (error) {
        console.error("Error in forgotPassword:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
