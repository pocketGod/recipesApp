import { Ingredient } from "./Ingredient";

export interface Recipe {
    recipe_id?: string,
    title: string,
    category: string,
    description: string,
    tags: string[],
    ingredients: Ingredient[],
    img: string,
    mainTaste: string[],
    rating: number,
    cookTime: string,
    _id?: string,
    __v?: string
} 