import db from "../../db/connection.js"

export default async (req, res) => {
    let collection = await db.collection("goals")
    let results = await collection.find({}).toArray()
    res.send(results).status(200)
}