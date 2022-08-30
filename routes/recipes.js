const express = require('express')
const { Recipe } = require('../models/recipe')
const _ = require('lodash')
const joi = require('joi')
const auth = require('../middlewares/auth')

const router = express.Router()

const recipeScheme = joi.object({
    title: joi.string().required().min(2),
    category: joi.string().required().min(2),
    description: joi.string().required().min(6),
    tags: joi.array().items(joi.string()).required(),
    ingredients: joi.array().items(joi.object({
        name: joi.string().required(),
        mandatory: joi.boolean().required(),
        mainIngredient: joi.boolean().required(),
        amount: joi.string().required(),
        similar: joi.array().items(joi.string()).required(),
        pic: joi.string().required()
    })),
    img: joi.string().required(),
    mainTaste: joi.array().items(joi.string()).required(),
    rating: joi.number().min(0).max(10).required(),
    cookTime: joi.string().required().min(2)
})

const generateRandomID = async ()=>{
    let ID = _.random(1000, 999999)
    let recipe = await Recipe.findOne({recipe_id:ID})
    if(recipe) generateRandomID()
    else return ID
}


//add a new recipe
router.post('/', async (req,res)=>{
    try {
        let {error} = recipeScheme.validate(req.body)
        if(error) return res.status(400).send(error.message)

        let recipe = new Recipe(req.body)
        recipe.recipe_id = await generateRandomID()

        await recipe.save()
        
        res.status(200).send(_.pick(recipe, ['recipe_id', 'title', 'category', 'tags', 'ingredients', 'img']))


    } catch (err) {
        res.status(400).send('ERROR in POST a new recipe')
    }
})

//get all recipes
router.get('/', async(req,res)=>{
    try {
        let recipes = await Recipe.find()
        if(recipes.length == 0) return res.status(400).send('No Recipes in DB')

        res.status(200).send(recipes)

    } catch (err) {
        res.status(400).send('ERROR in GET all Recipes')
    }
})

//get a specific recipe
router.get('/:recipe_id', async(req,res)=>{
    try {
        let recipe = await Recipe.findOne({recipe_id: req.params.recipe_id})
        if(!recipe) return res.status(400).send('No such Recipe in DB')

        res.status(200).send(recipe)
    } catch (err) {
        res.status(400).send('ERROR in GET a specific Recipe')
    }
})

//edit a specific recipe
router.put('/:recipe_id', auth, async(req,res)=>{
    try {
        let {error} = recipeScheme.validate(req.body)
        if(error) return res.status(400).send(error.message)

        let recipe = await Recipe.findOneAndUpdate({recipe_id: req.params.recipe_id,}, req.body, {new:true})

        if(!recipe) return res.status(400).send('No such Recipe in DB')
        res.status(200).send(recipe)
    } catch (error) {
        res.status(400).send('ERROR in PUT a specific Recipe')
    }
})

//delete a recipe
router.delete('/:recipe_id', async(req,res)=>{
    try {
        let recipe = await Recipe.findOneAndRemove({recipe_id:req.params.recipe_id})
        if(!recipe) return res.status(400).send('No such recipe in DB')

        res.status(200).send(`Recipe ${req.params.recipe_id} Was Deleted`)
    } catch (error) {
        res.status(400).send('ERROR in DELETE a specific Recipe')
    }
})



module.exports = router