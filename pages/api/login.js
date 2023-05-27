import { sessionOptions } from '../../lib/session'
import { getDatabaseConnection } from "./db";
import bcrypt from "bcrypt";
import { getIronSession } from 'iron-session'

export default function loginThroughApi(req, res) {

    console.log("login api page called...");

    console.log("looking at the variables we got from the browser..");
    console.log(req.body);

    // Get just the username and password and put them into variables.
    const username = req.body.username;
    const password = req.body.password;

    const bcrypt = require('bcrypt');

    // create the connection to database
    const connection = getDatabaseConnection();

    // simple query
    connection.query(
        "SELECT * FROM users WHERE username = '" + username + "' LIMIT 1;",
        async function (err, results, fields) {

            if (results.length === 0) {
                res.status(400).json("Wrong username pass combination");
            } else {
                await bcrypt.compare(password, results[0].password, async function(err, matched){
                    if (matched) {
                        const session = await getIronSession(req, res, sessionOptions);
                        session.username = username;
                        console.log("username: " + username);
                        console.log("session: " + session);
                        await session.save();
                        res.status(200).json("customer")
                    } else {
                        res.status(400).json("Wrong username pass combination");
                    }
                });
            }
        }
    );
}