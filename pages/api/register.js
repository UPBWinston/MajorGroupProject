import bcrypt from "bcrypt";
import { sql } from '@vercel/postgres';


export default async function handler(req, res) {

    bcrypt.hash(req.body.password, 12).then(async passwordHash => {
        try {
            await sql`insert into users(username, password, address, phoneNumber) values (${req.body.username}, ${passwordHash}, ${req.body.address}, ${req.body.phoneNumber})`;
            res.status(200).json("ok");
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    }).catch(err => console.error(err.message));
}