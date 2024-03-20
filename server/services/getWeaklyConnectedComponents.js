export default function getWeaklyConnectedComponents(adjacencyList) {
    let parents = {}
    let rank = {}
    let res_dict = {}
    let final_res = new Set()
    for (const key in adjacencyList) {
        parents[key] = key
        rank[key] = 1
        res_dict[key] = new Set([key])
    }

    function find(node) {
        let res = node
        // Loop until a root node has been found (where parent is itself)
        while (res != parents[res]) {
            res = parents[res]
        }
        return res
    }

    function union(u, v) {
        let parent1 = find(u)
        let parent2 = find(v)
        // If both parents are the same, this indicates u and v belong in the same component
        // If both parents aren't the same, then perform union
        if (rank[parent2] > rank[parent1]) {
            parents[parent1] = parent2
            rank[parent2] += rank[parent1]
            res_dict[parent2].add(u)

        } else {
            parents[parent2] = parent1
            rank[parent1] += rank[parent2]
            res_dict[parent1].add(v)
        }
    }

    // Perform union on all edges in adjacency list    
    for (const u in adjacencyList) {
        for (var i = 0; i < adjacencyList[u].length; i++) {
            let v = adjacencyList[u][i]
            union(u, v)
        }
    }

    // Create sets of components from the trees
    for (const key in res_dict) {
        // If a node parent is itself, then it is a tree root
        if (parents[key] == key) {
            final_res.add(res_dict[key])
        }
    }

    return final_res
}

