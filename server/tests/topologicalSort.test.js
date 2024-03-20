import topologicalSort from "../services/topologicalSort"

test('Base case', () => {
    expect(topologicalSort({})).toStrictEqual(
      []
      )
  })

  test('Single node', () => {
    expect(topologicalSort({
        1: []
    })).toStrictEqual(
      ["1"]
      )
  })

  test('Linked list', () => {
    expect(topologicalSort({
        1: ["2"],
        2: ["3"],
        3: ["4"],
        4: []
    })).toStrictEqual(
      ["1", "2", "3", "4"]
      )
  })

  test('DAG', () => {
    expect(topologicalSort({
        0: [],
        1: [],
        2: ["3"],
        3: ["1"],
        4: ["0", "1"],
        5: ["0", "2"]
    })).toStrictEqual(
      ["5", "4", "2", "3", "1", "0"]
      )
  })