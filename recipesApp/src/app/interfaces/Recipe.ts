import { Ingredient } from "./Ingredient";

export interface Recipe {
    recipe_id?: string,
    title: String,
    category: String,
    description: String,
    tags: String[],
    ingredients: Ingredient[],
    img: String,
    mainTaste: String[],
    rating: number,
    cookTime: String,
    _id?: String,
    __v?: String
} 