const asyncHandler = require('express-async-handler');

const Goal = require('../models/goalModel')
const User = require('../models/goalModel')

const getGoal = asyncHandler (async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })
    res.status(200).json(goals)
});

const postGoal = asyncHandler (async (req, res, next) => {
    try {
        if (!req.body || !req.body.text) {
            res.status(400);
            throw new Error("Please add a text field");
        }
        const goal = await Goal.create({
            text: req.body.text,
            user: req.user.id
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

    const user = await User.findById(req.user.id)

    //Check for user
    if (!user){
        res.status(401)
        throw new Error("User not found")
    }
    //Make sure the logged in user is the owner of the goal
    if (goal.user.toString()!== user.id) {
        res.status(401)
        throw new Error("User not authorized")
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
    
    //Check for user
    if (!user){
        res.status(401)
        throw new Error("User not found")
    }
    //Make sure the logged in user is the owner of the goal
    if (goal.user.toString()!== user.id) {
        res.status(401)
        throw new Error("User not authorized")
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
