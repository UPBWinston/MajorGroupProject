import {getDatabaseConnection} from "./db";
import {setResponseStatusBasedOnError} from "./utils"
import bcrypt from "bcrypt";

function insertUserCallBack(){

}

export default function handler(req, res) {

    // create the connection to database
    const connection = getDatabaseConnection()
    console.log("Registeing new user");

    bcrypt.hash(req.body.password, 12).then(passwordHash => {
        connection.query(
            `insert into test.users(username, password, address, phoneNumber) values ("${req.body.username}", "${passwordHash}", "${req.body.address}", "${req.body.phoneNumber}")`,
            function (err, results, fields) {
                setResponseStatusBasedOnError(err, res);
            }
        );
    }).catch(err => console.error(err.message));
}