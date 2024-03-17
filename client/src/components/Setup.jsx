import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import dayjs from 'dayjs'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import OutlinedInput from '@mui/material/OutlinedInput'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import axios from 'axios'

import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

function Setup() {

    const [goalWorkEstimate, setGoalWorkEstimate] = useState("0")

    const [existingGoalList, setExistingGoalList] = useState([])

    const [goal, setGoal] = useState("")

    const [goalInfoMap, setGoalInfoMap] = useState(
        {
        }
    )

    const [selectedDependentGoals, setSelectedDependentGoals] = useState([])

    const [maxTime, setMaxTime] = useState("8")

    const [goalDeadline, setGoalDeadline] = useState(dayjs.utc(''))

    const [startDate, setStartDate] = useState(dayjs())

    const goalListItems = existingGoalList.map((goal) => (
        <MenuItem
            key={goal}
            value={goal}
        >
            {goal}
        </MenuItem>
    ))

    function updateSelectedDependentGoals(event) {
        const {
            target: { value },
        } = event
        setSelectedDependentGoals(
            typeof value === 'string' ? value.split(',') : value,
        )
    }

    function saveGoal() {
        //Save the goal. 
        setExistingGoalList(existingGoalList.concat(goal))
        //Update the goal info map
        const cloneDict = { ...goalInfoMap }
        var deadlineJSON = goalDeadline.toJSON()
        if (goalDeadline.toJSON() == dayjs.utc('').toJSON()) {
            deadlineJSON = ""
        }
        cloneDict[goal] = [selectedDependentGoals, goalWorkEstimate, deadlineJSON]
        setGoalInfoMap(cloneDict)
        //Clear fields
        setGoal("")
        setGoalWorkEstimate("")
        setSelectedDependentGoals([])
        setGoalDeadline(dayjs.utc(''))
    }

    async function submitAllData() {
        const params = {
            goalInfoMap,
            maxTime,
            startDate
        }

        await axios.post('http://localhost:5050/chart/generate_chart/', params).then((res) => {

        })
    }

    return (
        <div className="w-full p-6">
            <Box sx={{ width: 1 / 1.1 }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow>
                                <TableCell width="100%">
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            Goal to add
                                        </Grid>
                                        <Grid item>
                                            <TextField id="outlined-basic" label="Goal" variant="outlined"
                                                value={goal}
                                                onChange={(event) => {
                                                    setGoal(event.target.value)
                                                }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField id="outlined-basic" label="Time Estimate" variant="outlined"
                                                value={goalWorkEstimate}
                                                onChange={(event) => {
                                                    setGoalWorkEstimate(event.target.value)
                                                }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            Dependent goals
                                        </Grid>
                                        <Grid item>
                                            <Select
                                                multiple
                                                value={selectedDependentGoals}
                                                onChange={updateSelectedDependentGoals}
                                                input={<OutlinedInput label="Name" />}
                                            >
                                                {goalListItems}
                                            </Select>
                                        </Grid>

                                        <Grid item>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DateTimePicker
                                                    label="Select Deadline"
                                                    value={goalDeadline}
                                                    onChange={(newValue) => setGoalDeadline(newValue)}
                                                />
                                            </LocalizationProvider>
                                        </Grid>

                                        <Grid item>
                                            <Button variant="contained" onClick={saveGoal}>Add Goal</Button>
                                        </Grid>

                                    </Grid>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell width="100%">
                                    <Grid container spacing={2}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <Grid item>
                                                Start Date
                                            </Grid>
                                            <Grid item>
                                                <DateTimePicker
                                                    label="Start Date"
                                                    value={startDate}
                                                    onChange={(newValue) => setStartDate(newValue)}
                                                />
                                            </Grid>
                                        </LocalizationProvider>
                                    </Grid>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            <TextField id="outlined-basic" label="Max daily working time" variant="outlined"
                                                value={maxTime}
                                                onChange={(event) => {
                                                    setMaxTime(event.target.value);
                                                }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Button variant="contained" onClick={submitAllData}>Generate Tracker</Button>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>

    )
}
export default Setup
