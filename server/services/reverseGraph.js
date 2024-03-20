export default function reverseGraph(adjList) {
    const reversed = Object.keys(adjList).reduce((acc, key) => {
        acc[key] = []
        return acc
    }, {})

    for (let u in adjList) {
        for (let j = 0; j < adjList[u].length; j++) {
            const v = adjList[u][j];
            if (reversed[v]) {
                reversed[v].push(u)
            } else {
                reversed[v] = [u]
            }
        }
    }

    return reversed
}

