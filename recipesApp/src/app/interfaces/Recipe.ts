import { Ingredient } from "./Ingredient";

export interface Recipe {
    _id?: String,
    recipe_id?: Number,
    title: String,
    category: String,
    description: String,
    tags: String[],
    ingredients: Ingredient[],
    img: String,
    mainTaste: String[],
    rating: number,
    cookTime: String
} 