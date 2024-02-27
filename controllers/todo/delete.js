const { default: mongoose } = require("mongoose");
const User = require("../../models/user");

exports.deleteTodo = async (req, res) => {
    const itemId = req.params.id;
    try {
        const itemIdObject = new mongoose.Types.ObjectId(itemId);
        const user = await User.findOne({ "items._id": itemIdObject });
        if (!user) {
            return res.status(404).send({ message: "User or Todo item not found" });
        }
        const itemIndex = user.items.findIndex(item => item._id.toString() === itemId);
        if (itemIndex === -1) {
            return res.status(404).send({ message: "Todo item not found" });
        }
        user.items.splice(itemIndex, 1);
        await user.save();
        res.status(200).send({ message: "Todo item deleted successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error!" });
    }
}
