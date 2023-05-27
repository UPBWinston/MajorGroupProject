import { withIronSessionApiRoute } from "iron-session/next";
import {getDatabaseConnection} from "./db";


export default withIronSessionApiRoute(
    async function customer(req, res) {
      
     // get the variables that were sent over
     
     var bundleOneQty = req.body.bundleOneQty;
     var bundleTwoQty = req.body.bundleTwoQty;
    

     // add the items to the cart object.
      req.session.cart = {
        
        bundleOne: bundleOneQty,
        bundleTwo: bundleTwoQty,
        

      };
      await req.session.save();

      // send back a message that it went to plan!
      res.status(200).json("updated cart");




    },
    {
      cookieName: "myapp_cookiename",
      password: "complex_password_at_least_32_characters_long",
      // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
      cookieOptions: {
        secure: process.env.NODE_ENV === "production",
      },
    },
  );
