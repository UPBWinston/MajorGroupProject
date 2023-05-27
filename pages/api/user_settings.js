import {getDatabaseConnection} from "./db";
import {setResponseStatusBasedOnError} from "./utils";

async function saveSettings(req, res){
    const connection = getDatabaseConnection();
    connection.query(
        `insert into test.user_settings(username, gender, age, weight, height, calorieGoal) 
            values ("${req.body.username}", "${req.body.gender}", "${req.body.age}", "${req.body.weight}", "${req.body.height}", "${req.body.calorieGoal}")
            on duplicate key update gender="${req.body.gender}", age="${req.body.age}", weight="${req.body.weight}", height="${req.body.height}", calorieGoal="${req.body.calorieGoal}"`,
        async function (err, results, fields) {
            setResponseStatusBasedOnError(err, res, "ok");
            console.log(err);
            connection.end();
        }
    );
}

async function getSettings(req, res){
    const connection = getDatabaseConnection();
    connection.query(
        `select * from test.user_settings where username="${req.body.username}"`,
        async function (err, results, fields) {
            res.status(200).json(results);
            connection.end();
        }
    );
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