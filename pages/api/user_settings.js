import { sql } from '@vercel/postgres';

async function saveSettings(req, res){
    try {
        await sql`insert into user_settings(username, gender, age, weight, height, calorieGoal) 
        values (${req.body.username}, ${req.body.gender}, ${req.body.age}, ${req.body.weight}, ${req.body.height}, ${req.body.calorieGoal})
        ON CONFLICT (username) 
        DO 
        UPDATE SET gender=${req.body.gender}, age=${req.body.age}, weight=${req.body.weight}, height=${req.body.height}, calorieGoal=${req.body.calorieGoal}`;
        res.status(200).json("ok");
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }

}

async function getSettings(req, res){
    try {
        const result = await sql`select * from user_settings where username=${req.body.username}`;
        res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json([]);
    }
}

export default async function handler(req, res) {
    if (req.method === "POST") {
        if (req.body.reqType === "get") {
            return await getSettings(req, res);
        } else {
            return await saveSettings(req, res);
        }
    }
}