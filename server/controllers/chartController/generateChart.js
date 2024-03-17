import db from "../../db/connection.js"
import makeChart from "../../services/makeChart.js"

export default async (req, res) => {
    try {
        let connection = await db.collection("goals")
        // Clear existing chart data
        await connection.deleteMany({})
        // Generate the chart
        let goalInfoMap = body["goalInfoMap"]
        let maxTime = body["maxTime"]
        let documents = makeChart(goalInfoMap, maxTime)
        // Save this to the database
        let result = await connection.insertMany(documents)
        res.send(result).status(204)
    } catch (err) {
        console.error(err)
        res.status(500).send("Error")
    }
}