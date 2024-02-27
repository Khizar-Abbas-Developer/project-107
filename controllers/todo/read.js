const User = require("../../models/user");

exports.readTodo = async (req, res) => {
    const userId = req.params.id;
    try {
        const allItems = await User.findById(userId, 'items');
        if (!allItems || allItems.length === 0) {
            return res.status(404).send({ message: "No items found" });
        }
        res.status(200).send({ data: allItems, message: "fetched successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error!" });
    }
}