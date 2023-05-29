import {Button, Card, Col, Container, Input, NextUIProvider, Row, Spacer, Text} from "@nextui-org/react";
import {withIronSessionSsr} from "iron-session/next";
import {sessionOptions} from "../../lib/session";
import Head from "next/head";
import {getApiCallOptions} from "../api/utils";
import {useState, useEffect} from 'react';

async function saveUserSettings(event) {

    const data = {
        calorieGoal: event.target.calorieGoal.value,
        gender: event.target.gender.value,
        weight: event.target.weight.value,
        height: event.target.height.value,
        username: event.target.username.value,
        age: event.target.age.value,
    }

    fetch('/api/user_settings', getApiCallOptions("POST", data));

}

function useUserSettingsForm(username) {
    const [userSettings, setUserSettings] = useState([]);
   

    useEffect(() => {
        const data = {
            reqType: "get",
            username: username
        };
        fetch('/api/user_settings', getApiCallOptions("POST", data))
            .then((res) => {
                return res.json();
            })
            .then((userSettings) => {
                if(!userSettings || userSettings.length === 0){
                    setUserSettings(
                        {
                            username: username,
                            weight: 70,
                            gender: "male",
                            height: 170,
                            age: 25,
                            calorieGoal: 1800
                        }
                    );
                }else{
                    setUserSettings(userSettings[0]);
                }
               
            });
    }, [username]);

    return (

        <form className="mx-15 w-50-md" onSubmit={saveUserSettings}>

            <input id="username"
                   readOnly={username}
                   defaultValue={username}
                   className="width-90-percent"></input>

            <select
                id="gender"
                name="gender"
                required
                placeholder="gender"
                defaultValue={userSettings.gender}
                className="width-90-percent text-medium"
            >
                <option value="male">male</option>
                <option value="female">female</option>
            </select>

            <div>
                <input
                    type="number"
                    id="age"
                    name="age"
                    required
                    placeholder="age"
                    defaultValue={userSettings.age}
                    className="width-90-percent"
                />
                <text>years</text>
            </div>

            <div>
                <input
                    type="decimal"
                    id="weight"
                    name="weight"
                    required
                    placeholder="weight"
                    defaultValue={userSettings.weight}
                    className="width-90-percent"
                />
                <text>kg</text>
            </div>

            <div>
                <input
                    type="number"
                    id="height"
                    name="height"
                    required
                    placeholder="height"
                    defaultValue={userSettings.height}
                    className="width-90-percent"
                />
                <text>cm</text>
            </div>

            <div>
                <input
                    type="decimal"
                    id="calorieGoal"
                    name="calorieGoal"
                    required
                    placeholder="calorie goal"
                    defaultValue={userSettings.caloriegoal}
                    className="width-90-percent"
                />
                <text>kcal</text>
            </div>


            <button className="button button-green column float-left">submit</button>

        </form>
    );
}

export default function UserSettings({username}) {

    async function setRecommendedCalories(event) {
        const gender = document.getElementById("gender").value;
        const weight = document.getElementById("weight").value;
        const height = document.getElementById("height").value;
        const age = document.getElementById("age").value;

        const menDailyCalories = 66.5 + 13.75 * weight + 5 * height - 6.75 * age;

        var dailyCalories = menDailyCalories;
        if (gender === 'female') {
            dailyCalories = 655.1 + 9.563 * weight + 1.850 * height - 4.7 * age;
        }

        document.getElementById("calorieGoal").value = dailyCalories;
    }


    return (
        <div>
            <Head>
                <title>calorie tracker - user settings</title>
                <meta
                    name="description"
                    content="calorie tracker - user settings"
                />
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <div className="container">
                <h1 className="mt-1 mx-15">user settings</h1>
                {useUserSettingsForm(username)}
                <button className="button button-green float-left column" type="button"
                        onClick={setRecommendedCalories}>recommend calories
                </button>
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