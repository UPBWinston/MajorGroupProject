import {useState} from "react";
import {MealModal} from "./MealModal";
import {updateMeal, deleteMeal} from "../../food/meal";
import {refreshPage} from "../../../pages/api/utils";


const MealBlock = ({
                       meal
                   }) => {
    var [portions, setPortions] = useState(Number(meal.portions));

    const updateAmountOfFood = async ({event, amount}) => {
        event.stopPropagation();
        setPortions(portions + amount)
        meal.portions = portions + amount;
        if(meal.portions <= 0){
            deleteMeal(meal);
        }else {
            await updateMeal(meal);
        }
        refreshPage();
    };

    const backgroundColor = meal.color || '#ffe58f';

    return <div
        className="card cursor-pointer three-columns-items"
        style={{backgroundColor: backgroundColor}}
    >

        <div className="mx-1 text-large">
            <div className="text-large">{meal.name}</div>
        </div>

        <div className="text-medium text-bold">
            total - {portions * meal.calories} calories
        </div>

        <div className="flex justify-content-between w-100">
            <span className="text-medium">{meal.amount} {meal.unit}</span>
            <div className="text-bold total-meal-calories">{meal.calories} calories</div>
        </div>

        <div className="flex justify-content-between w-100">
            <button
                onClick={event => {
                    updateAmountOfFood({
                        event,
                        amount: -1
                    });
                }}
                className="card-button"
            >
                -
            </button>

            <div className="text-medium">{portions} portions</div>

            <button
                onClick={event => {
                    updateAmountOfFood({
                        event,
                        amount: 1
                    });
                }}
                className="card-button"
            >
                +
            </button>
        </div>
        <MealModal meal={meal} button={{text: "Edit", className: "back-color-white"}}></MealModal>
    </div>;
};

export default MealBlock;
