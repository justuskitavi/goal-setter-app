const asyncHandler = require('express-async-handler');

const Goal = require('../models/goalModel')

const getGoal = asyncHandler (async (req, res) => {
    const goals = await Goal.find()
    res.status(200).json(goals)
});

const postGoal = asyncHandler (async (req, res, next) => {
    try {
        if (!req.body || !req.body.text) {
            res.status(400);
            throw new Error("Please add a text field");
        }
        const goal = await Goal.create({
            text: req.body.text
        })


        res.status(200).json(goal);
    } catch (error) {
        next(error); // Pass to errorHandler middleware
    }
});
//putGoal function updates the goals
const putGoal = asyncHandler (async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedGoal)
});


const deleteGoal = asyncHandler (async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error("Goal not found")
    }

    await goal.deleteOne()

    res.status(200).json({ id: req.params.id })
});

module.exports = {
    getGoal,
    postGoal,
    putGoal,
    deleteGoal,

}
