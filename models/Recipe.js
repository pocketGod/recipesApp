const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        minlength: 2
    },
    category:{
        type: String,
        required: true,
        minlength: 2,
    },
    tags:{
        type: [String],
        required: true,
        minlength: 1
    },
    ingredients:{
        type: [],
        required: true,
        minlength: 3
    },
    img:{
        type: String,
        required: true,
        minlength: 3
    },
    // user_id:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'users',
    //     required: true
    // },
    description:{
        type: String,
        required: true,
        minlength: 10
    },
    mainTaste:{
        type: [String],
        required: true,
        minlength: 1
    },
    rating:{
        type: Number,
        required: true
    },
    cookTime:{
        type: String,
        required: true,
        minlength: 2
    },
    recipe_id:{
        unique: true,
        type: String,
        required: true
    }
})

const Recipe = mongoose.model('recipes', recipeSchema)

module.exports = {Recipe}