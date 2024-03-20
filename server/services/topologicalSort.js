export default function topologicalSort(adjacencyList, nodeSet) {
    let stack = []
    let visited = new Array(nodeSet.size).fill(false)

    // DFS helper function
    function dfs(node) {
        visited[node] = true
        for (const neighbor of adjacencyList[node]) {
            if (!visited[neighbor]) {
                dfs(neighbor)
            }
        }
        // Add a node to the stack once all its children have been visited
        stack.push(node)
    }

    // DFS on every node
    for (const node of nodeSet) {
        if (!visited[node]) {
            dfs(node) 
        }
    }

    // Reverse the order
    let topologicalOrder = []
    while (stack.length) {
        topologicalOrder.push(stack.pop())
    }

    return topologicalOrder
}
