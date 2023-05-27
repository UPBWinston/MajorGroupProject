import {getDatabaseConnection} from "./db";
import {setResponseStatusBasedOnError} from "./utils"


async function addNewMeal(req, res) {
    const connection = getDatabaseConnection();
    connection.query(
        `insert into test.meal(date, type, portions, foodName) 
            values ("${req.body.date}", "${req.body.type}", "${req.body.portions}", "${req.body.foodName}")
            on duplicate key update date="${req.body.date}", type="${req.body.type}", portions="${req.body.portions}", foodName="${req.body.foodName}"`,
        async function (err, results, fields) {
            setResponseStatusBasedOnError(err, res, "ok");
            connection.end();
        }
    );
}

async function getMeals(req, res) {
    const connection = getDatabaseConnection();
    console.log("Getting meals");
    connection.query(
        `select * from test.meal, test.food where date="${req.body.date}" and type="${req.body.type}" and foodName = name`,
        async function (err, results, fields) {
            console.log(results);
            if (err) {
                console.log("ERROR: " + err);
            }
            res.status(200).json(results);
            connection.end();
        }
    );
}

async function delMeal(req, res) {
    const connection = getDatabaseConnection();
    console.log("Getting meals");
    connection.query(
        `delete from test.meal where date="${req.body.date}" and type="${req.body.type}" and foodName = "${req.body.foodName}"`,
        async function (err, results, fields) {
            console.log(results);
            if (err) {
                console.log("ERROR: " + err);
            }
            res.status(200).json(results);
            connection.end();
        }
    );
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