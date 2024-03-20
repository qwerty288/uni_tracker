import { FrappeGantt } from "frappe-gantt-react"
import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Chart() {

    const [chartData, setChartData] = useState(
        [
            {

            }
        ]
    )

    async function getChartData() {
        await axios.get('http://localhost:5050/chart/chart_data').then((res) => {
            console.log(res.data)
            setChartData(res.data)
        })
    }

    useEffect(() => {
        getChartData()
    }, 1)

    return (
        <div className="w-full p-6">
            <FrappeGantt
                tasks={chartData}
                viewMode={"Month"}
                onClick={task => console.log(task, "click")}
                onDateChange={(task, start, end) =>
                    console.log(task, start, end, "date")
                }
                onProgressChange={(task, progress) =>
                    console.log(task, progress, "progress")
                }
                onTasksChange={tasks => console.log(tasks, "tasks")}
            />
        </div>

    )
}
export default Chart
