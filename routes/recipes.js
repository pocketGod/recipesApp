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
router.post('/', auth, async (req,res)=>{
    try {
        let {error} = recipeScheme.validate(req.body)
        if(error) return res.status(400).send(error.message)

        let recipe = await Recipe.findOne({title:req.body.title})
        if(recipe) return res.status(400).send(`There's already a Reciepe with this name in DB`)

        recipe = new Recipe(req.body)
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
        let recipes = await Recipe.find({})
        if(recipes.length == 0) return res.status(400).send('No Recipes in DB')

        res.status(200).send(recipes)

    } catch (err) {
        res.status(400).send('ERROR in GET all Recipes')
    }
})


//get all recipes based on TAGS
router.get('/tags/:tag', async(req,res)=>{
    try {
        let recipes = await Recipe.find({})
        if(recipes.length == 0) return res.status(400).send('No Recipes in DB')

        let matchingRecipesArr = []

        recipes.forEach((rcp)=>{
            if(rcp.tags.includes(req.params.tag)){
                matchingRecipesArr.push(rcp)
            }
        })

        if(matchingRecipesArr.length == 0) return res.status(400).send('No Recipes with these tags')

        res.status(200).send(matchingRecipesArr)

    } catch (err) {
        res.status(400).send('ERROR in GET Recipes by TAG')
    }
})

//get random recipe based on TAG/null
router.get('/random/:tag', async(req,res)=>{
    try {
        let recipes = await Recipe.find({})
        if(recipes.length == 0) return res.status(400).send('No Recipes in DB')

        let matchingRecipesArr = []

        recipes.forEach((rcp)=>{
            if(req.params.tag == 'any') matchingRecipesArr.push(rcp)
            else if(rcp.tags.includes(req.params.tag) || rcp.mainTaste.includes(req.params.tag)){
                matchingRecipesArr.push(rcp)
            }
        })

        if(matchingRecipesArr.length == 0) return res.status(400).send('No Recipes with these tags')

        let randomIndex = _.random(0, matchingRecipesArr.length)
        let randomRecipe = matchingRecipesArr[randomIndex]

        res.status(200).send(randomRecipe)

    } catch (err) {
        res.status(400).send('ERROR in GET Recipes by TAG')
    }
})

//get reciepe based on main ingredient
router.get('/main/:ing', async(req,res)=>{
    try {
        let recipes = await Recipe.find({})
        if(recipes.length == 0) return res.status(400).send('No Recipes in DB')

        let matchingRecipesArr = new Set()

        recipes.forEach((rcp)=>{
            rcp.ingredients.forEach((ingredient)=>{
                if(ingredient.name == req.params.ing){
                    if(ingredient.mainIngredient) matchingRecipesArr.add(rcp)
                }
            })
        })

        if(matchingRecipesArr.length == 0) return res.status(400).send('No Recipes with this ingredient as a main ingredient')

        res.status(200).send(Array.from(matchingRecipesArr))

    } catch (err) {
        res.status(400).send('ERROR in GET Recipes by main ingredient')
    }
})

//get all of the tags in db
router.get('/alltags', async(req,res)=>{
    try {
        let recipes = await Recipe.find({})
        if(recipes.length == 0) return res.status(400).send('No Recipes in DB')

        let allTagsArr = []
        recipes.forEach((rcp)=>{
            rcp.tags.forEach((tag)=>{
                allTagsArr.push(tag)
            })
        })

        if(allTagsArr.length == 0) return res.status(400).send('No tags ere found')

        let map = allTagsArr.reduce((p, c)=> {
            p[c] = (p[c] || 0) + 1
            return p
          }, {})

        let chosenTagsArr = Object.keys(map).sort((a, b)=> {
            return map[b] - map[a]
        })


        res.status(200).send(chosenTagsArr)

    } catch (err) {
        res.status(400).send('ERROR in GET Recipes by TAG')
    }
})


//get one recipe base on ID
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
router.delete('/:recipe_id',auth, async(req,res)=>{
    try {
        let recipe = await Recipe.findOneAndRemove({recipe_id:req.params.recipe_id})
        if(!recipe) return res.status(400).send('No such recipe in DB')

        res.status(200).send(`Recipe ${req.params.recipe_id} Was Deleted`)
    } catch (error) {
        res.status(400).send('ERROR in DELETE a specific Recipe')
    }
})



module.exports = router