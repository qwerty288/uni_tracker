import getWeaklyConnectedComponents from "./getWeaklyConnectedComponents.js"
import topologicalSort from "./topologicalSort.js"
import dayjs from 'dayjs'
import reverseGraph from "./reverseGraph.js"

export default function makeChart(goalInfoMap, maxTime, startDate) {
    let res = []
    let goalAdjacencyList = {}
    let reverseGoalAdjacencyList = {}
    let sortedGoalSequences = []
    let finalGoalOrder = []
    startDate = dayjs(startDate).toDate()
    let endDate = new Date(startDate.valueOf())
    function sortFunction(a, b) {
        // Get last goal in a and b
        let last_a = a[a.length - 1]
        let last_b = b[b.length - 1]
        if (goalInfoMap[last_a][2] === goalInfoMap[last_b][2]) {
            return 0
        }
        else {
            return (dayjs(goalInfoMap[last_a][2]) < dayjs(goalInfoMap[last_b][2])) ? -1 : 1
        }
    }
    // Generate adjacency list from goalInfoMap
    for (const goal in goalInfoMap) {
        goalAdjacencyList[goal] = goalInfoMap[goal][0]
    }
    reverseGoalAdjacencyList = goalAdjacencyList
    goalAdjacencyList = reverseGraph(goalAdjacencyList)
    // Get sets of weakly connected nodes
    let weaklyConnectedComponentSets = getWeaklyConnectedComponents(goalAdjacencyList)
    // Apply topological sort to each set
    for (const weaklyConnectedComponentSet of weaklyConnectedComponentSets) {
        sortedGoalSequences.push(topologicalSort(goalAdjacencyList, weaklyConnectedComponentSet))
    }
    // Sort the goal sequences in ascending order of the deadline of the last goal in each sequence
    sortedGoalSequences.sort(sortFunction)
    // Concatenate all sub arrays in sortedGoalSequences together
    for (let i = 0; i < sortedGoalSequences.length; i++) {
        finalGoalOrder = finalGoalOrder.concat(sortedGoalSequences[i])
    }
    // Now we have an order for the goals. We need to calculate start and end date for each goal
    let i = 0
    for (const goal of finalGoalOrder) {
        //Generate goal dependency string
        let goalDependencyString = ""
        for (const dependency of reverseGoalAdjacencyList[goal]) {
            goalDependencyString = goalDependencyString + ", " + dependency
        }
        goalDependencyString = goalDependencyString.substring(2)
        //Calculate goal duration in days - ceil(hours total / max working time) as of now 
        let goalDays = Math.ceil(parseInt(goalInfoMap[goal][1]) / maxTime)
        endDate.setDate(endDate.getDate() + goalDays)
        //Assumes all goals have unique names
        res.push(
            {
                id: goal,
                name: goal,
                start: startDate,
                end: endDate,
                progress: 0,
                dependencies: goalDependencyString
            }
        )
        startDate = new Date(endDate.valueOf())
        endDate = new Date(startDate.valueOf())
        i++
    }
    console.log(res)
    return res
}