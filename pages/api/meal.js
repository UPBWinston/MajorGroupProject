import {setResponseStatusBasedOnError} from "./utils"
import { sql } from '@vercel/postgres';

async function addNewMeal(req, res) {
    try {
        await sql`insert into meal(date, type, portions, foodName) 
        values (${req.body.date}, ${req.body.type}, ${req.body.portions}, ${req.body.foodName})
        ON CONFLICT (date, type, foodName) 
        DO 
        UPDATE SET date=${req.body.date}, type=${req.body.type}, portions=${req.body.portions}, foodName=${req.body.foodName}`;
        res.status(200).json("ok");
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}

async function getMeals(req, res) {
    try {
        console.log(`select * from meal, food where meal.foodname = food.name, meal.date=${req.body.date} and meal.type=${req.body.type}`);
        const result = await sql`select * from meal inner join food on meal.foodname = food.name where meal.date=${req.body.date} and meal.type=${req.body.type}`;
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}

async function delMeal(req, res) {
    try {
        console.log(`delete from meal where date=${req.body.date} and type=${req.body.type} and foodName = ${req.body.foodName}`);
        const result = await sql`delete from meal where date=${req.body.date} and type=${req.body.type} and foodName = ${req.body.foodName}`;
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}

export default async function handler(req, res) {
    if (req.method === "POST") {
        if (req.body.reqType === "get") {
            return await getMeals(req, res);
        } else if (req.body.reqType === "del") {
            return await delMeal(req, res);
        } else {
            return await addNewMeal(req, res);
        }
    }
}