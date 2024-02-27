const { default: mongoose } = require("mongoose");
const User = require("../../models/user");

exports.editTodo = async (req, res) => {
    const { title } = req.body;
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
        user.items[itemIndex].Title = title;
        await user.save();
        res.status(200).send({ message: "Todo item updated successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error!" });
    }

}