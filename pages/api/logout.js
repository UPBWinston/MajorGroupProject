import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../lib/session'
import {getIronSession} from "iron-session";

async function logoutRoute(req, res) {
    const session  = await getIronSession(req, res, sessionOptions);
    const username = session.username;
    if(!username){
        res.status(400).json("You are not logged in");
        res.send({ok: false})
    } else {
        await req.session.destroy()
        res.send({ok: true})
    }
}
export default withIronSessionApiRoute(logoutRoute, sessionOptions)