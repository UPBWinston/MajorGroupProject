import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
import { getApiCallOptions } from "../../api/utils";
import MealBlock from "../../../shared/components/Home/MealBlock";
import { MealModal } from "../../../shared/components/Home/MealModal";
import { WorkoutModal } from "../../../shared/components/Home/WorkoutModal";
import WorkoutBlock from '../../../shared/components/Home/WorkoutBlock';

import ProgressBar from "../../../shared/components/Home/ProgressBar";

function useMeals(setterFunction, mealData) {
    const mealApiCallOptions = getApiCallOptions("POST", mealData);

    useEffect(() => {
        fetch('/api/meal', mealApiCallOptions)
            .then((res) => {
                return res.json();
            })
            .then((mealList) => {
                setterFunction(mealList);
            });
    }, [])
}

function useBreakfastMeals(date, calories) {
    const [breakfastMeals, setBreakfastMeals] = useState([]);
    const breakfastData = {
        reqType: "get",
        type: "breakfast",
        date: date,
    };
    useMeals(setBreakfastMeals, breakfastData);

    if (!breakfastMeals || breakfastMeals.length === 0) {
        return <div className="three-columns-items">No Meals</div>;
    }

    var breakfastCals = 0;

    breakfastMeals.map((meal) => {
        breakfastCals += meal.calories * meal.portions;
    });

    return (
        <div>
            <ProgressBar filled={breakfastCals} total={calories}></ProgressBar>
            {breakfastMeals.map((meal) => (
                <MealBlock meal={meal} key={meal.foodName} />
            ))}
        </div>
    );
}

function useLunchMeals(date, calories) {
    const [lunchMeals, setLunchMeals] = useState([]);


    const lunchData = {
        reqType: "get",
        type: "lunch",
        date: date
    };
    useMeals(setLunchMeals, lunchData);

    if (!lunchMeals || lunchMeals.length === 0) {
        return <div className="three-columns-items">No Meals</div>;
    }

    var lunchCals = 0;

    lunchMeals.map((meal) => {
        lunchCals += meal.calories * meal.portions;
    });

    return (
        <div>
            <ProgressBar filled={lunchCals} total={calories}></ProgressBar>
            {lunchMeals.map((meal) => (
                <MealBlock meal={meal} key={meal.foodName} />
            ))}
        </div>
    );
}

function useDinnerMeals(date, calories) {
    const [dinnerMeals, setDinnerMeals] = useState([]);
    const dinnerData = {
        reqType: "get",
        type: "dinner",
        date: date,
    };
    useMeals(setDinnerMeals, dinnerData);

    if (!dinnerMeals || dinnerMeals.length === 0) {
        return (<div>No Meals</div>);
    }

    var dinnerCals = 0;

    dinnerMeals.map((meal) => {
        dinnerCals += meal.calories * meal.portions;
    });

    return (
        <div>
            <ProgressBar filled={dinnerCals} total={calories}></ProgressBar>
            {dinnerMeals.map((meal) => (
                <MealBlock meal={meal} key={meal.foodName} />
            ))}
        </div>
    );
}

function getMealFromFood(food, date) {
    return {
        foodName: food.name,
        date: date,
        type: "breakfast",
        color: food.color,
        portions: 1,
        calories: food.calories,
        amount: food.amount,
        unit: food.unit,
        name: food.name,
    }
}

function getWorkoutFromExercise(exercise, date) {
    return {
        exerciseName: exercise.name,
        date: date,
        type: "cardio",
        color: exercise.color,
        sessions: 1,
        calories: exercise.calories,
        amount: exercise.amount,
        unit: exercise.unit,
        name: exercise.name,
    }
}

function useMealModals(nameSubstring, date) {
    const [foodList, setFoodList] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch('/api/food')
            .then((res) => {
                console.log(res);
                return res.json();
            })
            .then((foodList) => {
                setFoodList(foodList);
                setLoading(false);
            });
    }, []);


    const filteredList = [];
    foodList.map(food => {
        if (food.name.includes(nameSubstring)) {
            filteredList.push(food);
        }
    })

    if (isLoading) return <p>Loading...</p>;
    if (!filteredList || filteredList.length === 0) {
        return (<MealModal meal={{ date: date, type: "breakfast" }}
            button={{ text: "Add meal with new food", className: "back-color-black" }}></MealModal>);
    }

    return (
        <div>
            {filteredList.slice(0, 7).map((food) => (
                <div className="float-left two-hundred-px-width" key={food.name}>
                    <MealModal meal={getMealFromFood(food, date)}
                        button={{ text: food.name, className: "back-color-black" }} />
                </div>
            ))}
        </div>
    );
}

function useWorkouts(date, calorieGoal) {
    const [workouts, setWorkouts] = useState([]);
    const workoutData = {
        reqType: "get",
        date: date,
    };
    const workoutCallOptions = getApiCallOptions("POST", workoutData);

    useEffect(() => {
        fetch('/api/workout', workoutCallOptions)
            .then((res) => {
                return res.json();
            })
            .then((workoutList) => {
                setWorkouts(workoutList);
            });
    }, [])

    if (!workouts || workouts.length === 0) {
        return <div className="three-columns-items">No Workouts</div>;
    }

    var workoutCals = 0;

    workouts.map((workout) => {
        workoutCals += workout.calories * workout.sessions;
    });

    return (
        <div>
            <ProgressBar filled={workoutCals} total={calorieGoal}></ProgressBar>
            <div className="three-columns">
            {workouts.map((workout) => (
                <WorkoutBlock workout={workout} key={workout.exerciseName} />
            ))}
            </div>
        </div>
    );
}

function useExerciseModals(nameSubstring, date) {
    const [exerciseList, setExerciseList] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch('/api/exercise')
            .then((res) => {
                console.log(res);
                return res.json();
            })
            .then((exerciseList) => {
                setExerciseList(exerciseList);
                setLoading(false);
            });
    }, []);


    const filteredList = [];
    exerciseList.map(exercise => {
        if (exercise.name.includes(nameSubstring)) {
            filteredList.push(exercise);
        }
    })

    if (isLoading) return <p>Loading...</p>;
    if (!filteredList || filteredList.length === 0) {
        return (<WorkoutModal workout={{ date: date, type: "cardio" }}
            button={{ text: "Add workout with new exercise", className: "back-color-black" }}></WorkoutModal>);
    }

    return (
        <div>
            {filteredList.slice(0, 7).map((exercise) => (
                <div className="float-left two-hundred-px-width" key={exercise.name}>
                    <WorkoutModal workout={getWorkoutFromExercise(exercise, date)}
                        button={{ text: exercise.name, className: "back-color-black" }} />
                </div>
            ))}
        </div>
    );
}

export default function Date({ username }) {
    const router = useRouter();
    const date = router.query.date;

    const [nameSubstring, setNameSubstring] = useState("");
    const onChange = (e) => {
        setNameSubstring(e.target.value);
    };

    const [userSettings, setUserSettings] = useState([]);
    const data = {
        reqType: "get",
        username: username
    }

    useEffect(() => {
        fetch('/api/user_settings', getApiCallOptions("POST", data))
            .then((res) => {
                return res.json();
            })
            .then((userSettings) => {
                setUserSettings(userSettings[0]);
            });
    }, []);
    var calorieGoal = 1800;
    if (userSettings && userSettings.calorieGoal) {
        calorieGoal = userSettings.calorieGoal;
    }

    return (
        <div>
            <Head>
                <title>{date}</title>
                <meta name="description" content={date} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <input
                    className="button-middle"
                    onChange={onChange}
                    id='search-food'
                    type="search"
                    name="search-food"
                    value={nameSubstring}
                    placeholder="Search food..." />
                <div className="d-inline-block">{useMealModals(nameSubstring, date)}</div>
            </div>
            <div>
                <div className="width-33-percent float-left">
                    <div className="text-bold text-large">Breakfast</div>
                    {useBreakfastMeals(date, calorieGoal / 3)}
                </div>
                <div className="width-33-percent float-left">
                    <div className="text-bold text-large">Lunch</div>
                    {useLunchMeals(date, calorieGoal / 3)}
                </div>
                <div className="width-33-percent float-left">
                    <div className="text-bold text-large">Dinner</div>
                    {useDinnerMeals(date, calorieGoal / 3)}
                </div>
            </div>
            <div>
                <input
                    className="button-middle"
                    onChange={onChange}
                    id='search-exercises'
                    type="search"
                    name="search-exercises"
                    value={nameSubstring}
                    placeholder="Search exercises..." />
                <div className="d-inline-block">{useExerciseModals(nameSubstring, date)}</div>
            </div>
            <div>
                <div>
                    <div className="text-bold text-large">Workouts</div>
                    {useWorkouts(date, 700)}
                </div>
            </div>
        </div>
    );
}


export const getServerSideProps = withIronSessionSsr(
    async ({ req, res }) => {
        const username = req.session.username;

        if (!username) {
            return {
                redirect: {
                    permanent: false,
                    destination: "/login",
                },
            }
        }

        return {
            props: { username }
        }
    },
    sessionOptions
);