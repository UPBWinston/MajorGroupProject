import {getApiCallOptions} from "../../pages/api/utils"

const WORKOUT_ENDPOINT = "/api/workout";
const EXERCISE_ENDPOINT = "/api/exercise";
/*
since we need an exercise entry to be present before creating a workout - this method sends 2 requests:
1. to add the exercise entry
2. to add the workout entry
 */
export async function addWorkout(workout) {
    const workoutData = {
        reqType: "add",
        date: workout.date,
        type: workout.type,
        sessions: workout.sessions,
        exerciseName: workout.exerciseName
    }

    const exerciseData= {
        name: workout.exerciseName,
        calories: workout.calories,
        amount: workout.amount,
        sessions: workout.sessions,
        color: workout.color,
        unit: workout.unit
    }

    await fetch(EXERCISE_ENDPOINT, getApiCallOptions("POST", exerciseData));
    await fetch(WORKOUT_ENDPOINT, getApiCallOptions("POST", workoutData))
}

export function updateWorkout(workout){
    const workoutData = {
        reqType: "add",
        date: workout.date,
        type: workout.type,
        sessions: workout.sessions,
        exerciseName: workout.exercisename
    }

    fetch(WORKOUT_ENDPOINT, getApiCallOptions("POST", workoutData)).then();
}

export function deleteWorkout(workout){
    const workoutData = {
        reqType: "del",
        date: workout.date,
        type: workout.type,
        sessions: workout.sessions,
        exerciseName: workout.exercisename
    }

    fetch(WORKOUT_ENDPOINT, getApiCallOptions("POST", workoutData)).then();
}