import {useState} from "react";
import {FoodModal} from "./FoodModal"
import {Button} from "@nextui-org/react";

const FoodBlock = ({
                       food
                   }) => {

    const backgroundColor = food.color || '#ffe58f';

    return <div
        className="card cursor-pointer three-columns-items"
        style={{backgroundColor: backgroundColor}}
    >

        <div className="mx-1 text-large">
            <div className="text-large">{food.name}</div>
        </div>

        <div className="flex justify-content-between w-100">
            <span className="text-medium">{food.amount} {food.unit}</span>
            <div className="text-bold">{food.calories} calories</div>
        </div>

        <FoodModal food={food} button={{text: "Edit", className: "back-color-white"}}></FoodModal>
    </div>;
};

export default FoodBlock;
