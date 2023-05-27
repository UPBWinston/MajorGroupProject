import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';

import {withIronSessionSsr} from "iron-session/next";
import {sessionOptions} from "../../../lib/session";
import {getApiCallOptions} from "../../api/utils";
import MealBlock from "../../../shared/components/Home/MealBlock";
import {MealModal} from "../../../shared/components/Home/MealModal";
import ProgressBar from "../../../shared/components/Home/ProgressBar";

function setMeals(setterFunction, mealData) {
    const mealApiCallOptions = getApiCallOptions("POST", mealData);

    useEffect(() => {
        fetch('/api/meal', mealApiCallOptions)
            .then((res) => {
                console.log(res);
                return res.json();
            })
            .then((mealList) => {
                setterFunction(mealList);
            });
    }, [])
}

function getBreakfastMeals(date, calories) {
    const [breakfastMeals, setBreakfastMeals] = useState([]);
    const breakfastData = {
        reqType: "get",
        type: "breakfast",
        date: date,
    };
    setMeals(setBreakfastMeals, breakfastData);

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
                <MealBlock meal={meal}/>
            ))}
        </div>
    );
}

function getLunchMeals(date, calories) {
    const [lunchMeals, setLunchMeals] = useState([]);


    const lunchData = {
        reqType: "get",
        type: "lunch",
        date: date
    };
    setMeals(setLunchMeals, lunchData);

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
                <MealBlock meal={meal}/>
            ))}
        </div>
    );
}

function getDinnerMeals(date, calories) {
    const [dinnerMeals, setDinnerMeals] = useState([]);
    const dinnerData = {
        reqType: "get",
        type: "dinner",
        date: date,
    };
    setMeals(setDinnerMeals, dinnerData);

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
                <MealBlock meal={meal}/>
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

function getMealModals(nameSubstring, date) {
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
        return (<MealModal meal={{date: date, type: "breakfast"}}
                           button={{text: "Add meal with new food", className: "back-color-black"}}></MealModal>);
    }

    return (
        <div>
            {filteredList.slice(0, 7).map((food) => (
                <div className="float-left two-hundred-px-width">
                    <MealModal meal={getMealFromFood(food, date)}
                               button={{text: food.name, className: "back-color-black"}}/>
                </div>
            ))}
        </div>
    );
}

export default function Date({username}) {
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
    if(userSettings && userSettings.calorieGoal){
        calorieGoal = userSettings.calorieGoal;
    }

    return (
        <div>
            <Head>
                <title>{date}</title>
                <meta name="description" content={date}/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div>
                <input
                    className="button-middle"
                    onChange={onChange}
                    id='search-food'
                    type="search"
                    name="search-food"
                    value={nameSubstring}
                    placeholder="Search food..."/>
                <div className="d-inline-block">{getMealModals(nameSubstring, date)}</div>
            </div>
            <div>
                <div className="width-33-percent float-left">
                    <div className="text-bold text-large">Breakfast</div>
                    {getBreakfastMeals(date, calorieGoal/3)}
                </div>
                <div className="width-33-percent float-left">
                    <div className="text-bold text-large">Lunch</div>
                    {getLunchMeals(date, calorieGoal/3)}
                </div>
                <div className="width-33-percent float-left">
                    <div className="text-bold text-large">Dinner</div>
                    {getDinnerMeals(date, calorieGoal/3)}
                </div>
            </div>
        </div>
    );
}


export const getServerSideProps = withIronSessionSsr(
    async ({req, res}) => {
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
            props: {username}
        }
    },
    sessionOptions
);