const User = require("../../models/user");

exports.editProfile = async (req, res) => {
    try {
        const userImage = req.body.myUserImage;
        const userName = req.body.myUserName;
        const userId = req.body.myUserId
        const updatedUser = await User.findByIdAndUpdate(userId, { username: userName, image: userImage }, { new: true });
        if(!updatedUser){
            res.status(400).json({ message: "user not found!" })
        }
        const { username: updatedUsername, email, image, _id } = updatedUser;
        const responseData = { username: updatedUsername, email, image, _id };
        res.status(200).json({ data: responseData, message: "updated successfully" })
    } catch (error) {
        console.log(error);
        return { message: "Internal Server Error!", status: 500 }
    }
}