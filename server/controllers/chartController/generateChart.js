import db from "../../db/connection.js"
import makeChart from "../../services/makeChart.js"

export default async (req, res) => {
    try {
        let connection = await db.collection("goals")
        // Clear existing chart data
        await connection.deleteMany({})
        // Generate the chart
        let goalInfoMap = req.body["goalInfoMap"]
        let maxTime = req.body["maxTime"]
        let startDate = req.body["startDate"]
        let documents = makeChart(goalInfoMap, maxTime, startDate)
        // Save this to the database
        let result = await connection.insertMany(documents)
        res.send(result).status(204)
    } catch (err) {
        console.error(err)
        res.status(500).send("Error")
    }
}