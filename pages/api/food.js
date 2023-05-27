import {getDatabaseConnection} from "./db";
import {setResponseStatusBasedOnError} from "./utils"


async function addNewFood(req, res){
    const connection = getDatabaseConnection();
    connection.query(
        `insert into test.food(name, calories, amount, unit, color) 
            values ("${req.body.name}", "${req.body.calories}", "${req.body.amount}", "${req.body.unit}", "${req.body.color}")
            on duplicate key update calories="${req.body.calories}", amount="${req.body.amount}", unit="${req.body.unit}", color="${req.body.color}"`,
        async function (err, results, fields) {
            setResponseStatusBasedOnError(err, res, "ok");
            connection.end();
        }
    );
}

async function getFood(req, res){
    const connection = getDatabaseConnection();
    connection.query(
        `select * from test.food`,
        async function (err, results, fields) {
            res.status(200).json(results);
            connection.end();
        }
    );
}

export default async function handler(req, res) {
    if(req.method === "POST"){
        return await addNewFood(req, res);
    }
    if(req.method === "GET"){
        return await getFood(req, res);
    }
}