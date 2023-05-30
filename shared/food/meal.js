import {getApiCallOptions} from "../../pages/api/utils"

const MEAL_ENDPOINT = "/api/meal";
const FOOD_ENDPOINT = "/api/food";
/*
since we need a  food entry to be present before creating a meal - this method sends 2 requests:
1. to add the food entry
2. to add the meal entry
 */
export async function addMeal(meal) {
    const mealData = {
        reqType: "add",
        date: meal.date,
        type: meal.type,
        portions: meal.portions,
        foodName: meal.foodName
    }

    const foodData= {
        name: meal.foodName,
        calories: meal.calories,
        amount: meal.amount,
        unit: meal.unit,
        color: meal.color,
    }

    await fetch(FOOD_ENDPOINT, getApiCallOptions("POST", foodData));
    await fetch(MEAL_ENDPOINT, getApiCallOptions("POST", mealData))
}

export function updateMeal(meal){
    const mealData = {
        reqType: "add",
        date: meal.date,
        type: meal.type,
        portions: meal.portions,
        foodName: meal.foodname
    }

     fetch(MEAL_ENDPOINT, getApiCallOptions("POST", mealData)).then();
}

export function deleteMeal(meal){
    const mealData = {
        reqType: "del",
        date: meal.date,
        type: meal.type,
        portions: meal.portions,
        foodName: meal.foodname
    }

    fetch(MEAL_ENDPOINT, getApiCallOptions("POST", mealData)).then();
}