import { sql } from "../db.js";


export const change = async (req, res) => {

    const {id, email} = req.body;
    
    await sql`update Users set email = ${email} where id = ${id}`
   
}