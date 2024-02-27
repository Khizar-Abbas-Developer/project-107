const User = require("../../models/user");
const mongoose = require("mongoose");

exports.createTodo = async (req, res) => {
    const { title } = req.body;
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        const newItem = {
            _id: new mongoose.Types.ObjectId(), // Generate a unique identifier
            Title: title
        };
        user.items.push(newItem);
        await user.save();
        res.status(200).send({ message: "Todo added successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error!" });
    }
}
