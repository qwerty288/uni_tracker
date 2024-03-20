export default function topologicalSort(adjacencyList) {
    let stack = []
    let visited = new Array(adjacencyList.length).fill(false)

    // DFS helper function
    function dfs(node) {
        visited[node] = true
        console.log(node)
        for (const neighbor of adjacencyList[node]) {
            if (!visited[neighbor]) {
                dfs(neighbor)
            }
        }
        // Add a node to the stack once all its children have been visited
        stack.push(node)
    }

    // DFS on every node
    for (const node in adjacencyList) {
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
