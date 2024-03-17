import db from "../../db/connection.js"

export default async (req, res) => {
    console.log("called")
    let collection = await db.collection("goals")
    let results = await collection.find({}).toArray()
    res.send(results).status(200)
}