import { setResponseStatusBasedOnError } from "./utils"
import { sql } from "@vercel/postgres";


async function addNewFood(req, res) {
    const connection = getDatabaseConnection();
    await sql`insert into test.food(name, calories, amount, unit, color) 
            values ("${req.body.name}", "${req.body.calories}", "${req.body.amount}", "${req.body.unit}", "${req.body.color}")
            on duplicate key update calories="${req.body.calories}", amount="${req.body.amount}", unit="${req.body.unit}", color="${req.body.color}"`;
    res.status(200).json("ok");
}

async function getFood(req, res) {
    const connection = getDatabaseConnection();
    const {results} =  await sql`select * from test.food`;
    req.status(200).json(results);
}

export default async function handler(req, res) {
    if (req.method === "POST") {
        return await addNewFood(req, res);
    }
    if (req.method === "GET") {
        return await getFood(req, res);
    }
}