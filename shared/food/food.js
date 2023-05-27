import {getApiCallOptions} from "../../pages/api/utils"

const FOOD_ENDPOINT = "/api/food";


class Food {
    constructor(name, calories, amount, unit) {
        this.name = name;
        this.calories = calories;
        this.amount = amount;
        this.unit = unit;
    }
}

class LocalFoodStorage{

    constructor() {
        this.foods = new Map();
    }

    add(food){
        this.foods.set(`${food.name}`, food);
    }

    remove(food){
        this.foods.delete(`${food.name}`);
    }

    getAll(){
        return this.foods.values();
    }
}

export async function addFood(food) {
    const data = {
        name: food.name,
        calories: food.calories,
        amount: food.amount,
        unit: food.unit,
        color: food.color
    }

    fetch(FOOD_ENDPOINT, getApiCallOptions("POST", data))

    return food;
}

export async function getAllFood(){

}