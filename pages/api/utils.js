import { getIronSession } from 'iron-session'
import { sessionOptions } from "../../lib/session";

export function setResponseStatusBasedOnError(err, res){
    if(err){
        console.log(err);
        res.status(400).json("error");
    }
    else{
        res.status(200).json("ok");
    }
}


export function getApiCallOptions(method, data){
    const JSONdata = JSON.stringify(data)

    if(method === "GET"){
        return {
            method: method,
        }
    }

    return  {
        method: method,
        // Tell the server we're sending JSON.
        headers: {
            'Content-Type': 'application/json',
        },
        // Body of the request is the JSON data we created above.
        body: JSONdata,
    }
}

export async function getIronSessionConnection(req, res){
    return await getIronSession(req, res, sessionOptions);
}

export function refreshPage() {
    window.location.reload(false);
}