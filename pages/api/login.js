import { sessionOptions } from '../../lib/session'
import { getDatabaseConnection } from "./db";
import bcrypt from "bcrypt";
import { getIronSession } from 'iron-session'
import { sql } from '@vercel/postgres';

export default async function loginThroughApi(req, res) {


    // Get just the username and password and put them into variables.
    const username = req.body.username;
    const password = req.body.password;

    const bcrypt = require('bcrypt');


    const result = await sql`SELECT * FROM users WHERE username =${username}`;

    if (result.rows.length === 0) {
        res.status(400).json("Wrong username pass combination");
    } else {
        await bcrypt.compare(password, result.rows[0].password, async function (err, matched) {
            if (matched) {
                const session = await getIronSession(req, res, sessionOptions);
                session.username = username;
                await session.save();
                res.status(200).json("customer")
            } else {
                res.status(400).json("Wrong username pass combination");
            }
        });
    }
}