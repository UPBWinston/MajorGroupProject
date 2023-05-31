import {useState} from "react";
import {WorkoutModal} from "./WorkoutModal";
import {updateWorkout, deleteWorkout} from "../../exercise/workout";
import {refreshPage} from "../../../pages/api/utils";


const WorkoutBlock = ({ workout }) => {
    console.log("xxx " + JSON.stringify(workout));
    var [sessions, setSessions] = useState(Number(workout.sessions));

    const updateAmountOfExercise = ({event, amount}) => {
        event.stopPropagation();
        setSessions(sessions + amount)
        workout.sessions = sessions + amount;
        if(workout.sessions <= 0){
            deleteWorkout(workout);
        }else {
            updateWorkout(workout);
        }
        refreshPage();
    };

    const backgroundColor = workout.color || '#ffe58f';

    return <div
        className="card cursor-pointer three-columns-items"
        style={{backgroundColor: backgroundColor}}
    >

        <div className="mx-1 text-large">
            <div className="text-large">{workout.exerciseName}</div>
        </div>

        <div className="text-medium text-bold">
            total - {sessions * workout.calories} calories
        </div>

        <div className="flex justify-content-between w-100">
            <span className="text-medium">{workout.amount} {workout.sessions}</span>
            <div className="text-bold total-meal-calories">{workout.calories} calories</div>
        </div>

        <div className="flex justify-content-between w-100">
            <button
                onClick={event => {
                    updateAmountOfExercise({
                        event,
                        amount: -1
                    });
                }}
                className="card-button"
            >
                -
            </button>

            <div className="text-medium">{sessions} sessions</div>

            <button
                onClick={event => {
                    updateAmountOfExercise({
                        event,
                        amount: 1
                    });
                }}
                className="card-button"
            >
                +
            </button>
        </div>
        <WorkoutModal workout={workout} button={{text: "Edit", className: "back-color-white"}}></WorkoutModal>
    </div>
};

export default WorkoutBlock;
