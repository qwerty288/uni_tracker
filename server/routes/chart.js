import express from "express"

import generateChart from "../controllers/chartController/generateChart.js"
import chartData from "../controllers/chartController/chartData.js"

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router()

// Route to generate new chart data and save to the database
router.post("/generate_chart/", generateChart)

// Route to get the chart data for the frontend
router.get("/chart_data/", chartData)


export default router
