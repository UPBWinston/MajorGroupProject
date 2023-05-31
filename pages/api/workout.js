import {setResponseStatusBasedOnError} from "./utils"
import { sql } from '@vercel/postgres';

async function addNewWorkout(req, res) {
    try {
        await sql`insert into workout(date, type, sessions, exerciseName) 
        values (${req.body.date}, ${req.body.type}, ${req.body.sessions}, ${req.body.exerciseName})
        ON CONFLICT (date, type, exerciseName) 
        DO 
        UPDATE SET date=${req.body.date}, type=${req.body.type}, sessions=${req.body.sessions}, exerciseName=${req.body.exerciseName}`;
        res.status(200).json("ok");
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}

async function getWorkout(req, res) {
    try {
        const result = await sql`select * from workout inner join exercise on workout.exercisename = exercise.name where workout.date=${req.body.date}`;
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}

async function delWorkout(req, res) {
    try {
        const result = await sql`delete from workout where date=${req.body.date} and type=${req.body.type} and exerciseName = ${req.body.exerciseName}`;
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}

export default async function handler(req, res) {
    if (req.method === "POST") {
        if (req.body.reqType === "get") {
            return await getWorkout(req, res);
        } else if (req.body.reqType === "del") {
            return await delWorkout(req, res);
        } else {
            return await addNewWorkout(req, res);
        }
    }
}