const User = require("../../models/user");
const { validate } = require("../../utils/validations");
const bcrypt = require("bcrypt");
const Token = require("../../models/token");
const crypto = require("crypto");
const sendEmail = require("../../utils/sendEmail");
exports.registerUser = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });
        let user = await User.findOne({ email: req.body.email });
        if (user)
            return res
                .status(409)
                .send({ message: "User with given email already Exist!" });
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        user = await new User({ ...req.body, password: hashPassword }).save();

        const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex")
        }).save();
        const url = `${process.env.BASE_URL}/users/${user._id}/verify/${token.token}`;
        await sendEmail(user.email, "Email Verification", url);

        res.status(201).send({ message: "An Email is sent to your Account please verify" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server error!" })
    }
}