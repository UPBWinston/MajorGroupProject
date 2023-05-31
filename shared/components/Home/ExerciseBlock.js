import {useState} from "react";
import {ExerciseModal} from "./ExerciseModal"

const ExerciseBlock = ({
                       exercise
                   }) => {
    var [portions, setPortions] = useState(1);

    const updateAmountOfExercise = ({event, amount}) => {
        event.stopPropagation();
        setPortions(portions + amount)
        console.log(portions);
    };

    const backgroundColor = exercise.color || '#ffe58f';

    if (portions <= 0) {
        return (<div></div>);
    }

    return <div
        className="card cursor-pointer three-columns-items"
        style={{backgroundColor: backgroundColor}}
    >

        <div className="mx-1 text-large">
            <div className="text-large">{exercise.name}</div>
        </div>

        <div className="flex justify-content-between w-100">
            <span className="text-medium">{exercise.amount} {exercise.unit}</span>
            <div className="text-bold">{exercise.calories} calories</div>
        </div>

        <ExerciseModal exercise={exercise} button={{text: "Edit", className: "back-color-white"}}></ExerciseModal>
    </div>;
};

export default ExerciseBlock;
