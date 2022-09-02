export interface Ingredient {
    name: string,
    mandatory: Boolean,
    mainIngredient: Boolean,
    amount: string,
    similar: string[],
    pic: string,
    _id?: string,
    __v?: string
}