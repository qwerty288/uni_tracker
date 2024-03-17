import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();


// Route to get the chart data to display
router.get("/chart_data/", async (req, res) => {
  console.log("called")

  // Sample data

  let d1 = new Date()
  let d2 = new Date()
  d2.setDate(d2.getDate() + 5)
  let d3 = new Date()
  d3.setDate(d3.getDate() + 8)
  let d4 = new Date()
  d4.setDate(d4.getDate() + 20)

  const tasks = [
    {
      id: "Task 1",
      name: "Task 1",
      start: d1,
      end: d2,
      progress: 10,
      dependencies: ""
    },
    {
      id: "Task 2",
      name: "Task 2",
      start: d3,
      end: d4,
      progress: null,
      dependencies: "Task 1"
    },
    {
      id: "Task 3",
      name: "Redesign website",
      start: new Date(),
      end: d4,
      progress: 0,
      dependencies: "Task 2, Task 1"
    }
  ]
  res.send(tasks).status(200);
});


export default router;
