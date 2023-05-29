import { sql } from '@vercel/postgres';


async function addNewFood(req, res) {

    try {
        await sql`insert into food(NAME, CALORIES, AMOUNT, UNIT, COLOR) 
        values (${req.body.name}, ${req.body.calories}, ${req.body.amount}, ${req.body.unit}, ${req.body.color})
        ON CONFLICT (name) 
        DO 
        UPDATE SET calories = ${req.body.calories}, amount=${req.body.amount}, unit=${req.body.unit}, color=${req.body.color}`;
        res.status(200).json("ok");
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }

}

async function getFood(req, res) {
    try {
        const result = await sql`select * from food;`;
        res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json([]);
    }
}

export default async function handler(req, res) {
    if (req.method === "POST") {
        return await addNewFood(req, res);
    }
    if (req.method === "GET") {
        return await getFood(req, res);
    }
}