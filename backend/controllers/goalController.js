const asyncHandler = require('express-async-handler');

const getGoal = asyncHandler (async (req, res) => {
    res.status(200).json({message: "Get goals"})
});

const postGoal = asyncHandler (async (req, res, next) => {
    try {
        if (!req.body || !req.body.text) {
            res.status(400);
            throw new Error("Please add a text field");
        }

        res.status(200).json({ message: "Set goals" });
    } catch (error) {
        next(error); // Pass to errorHandler middleware
    }
});

const putGoal = asyncHandler (async (req, res) => {
    res.status(200).json({message: `Update goal ${req.params.id}`})
});
const deleteGoal = asyncHandler (async (req, res) => {
    res.status(200).json({message: `Delete goal ${req.params.id}`})
});

module.exports = {
    getGoal,
    postGoal,
    putGoal,
    deleteGoal,

}
