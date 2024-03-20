import getWeaklyConnectedComponents from '../services/getWeaklyConnectedComponents'


test('Base case', () => {
    expect(getWeaklyConnectedComponents({})).toStrictEqual(
      new Set([])
      )
  })

  test('Single node graph', () => {
    expect(getWeaklyConnectedComponents({
      1: []
    })).toStrictEqual
      (new Set(
        [
          new Set(["1"])
        ]
      ))
  })

  test('Two individual nodes', () => {
    expect(getWeaklyConnectedComponents({
      1: [],
      2: []
    })).toStrictEqual
    (new Set(
      [
        new Set(["1"]),
        new Set(["2"])
      ]
    ))
})

  test('Two connected nodes (directed)', () => {
    expect(getWeaklyConnectedComponents({
      1: ["2"],
      2: []
    })).toStrictEqual
    (new Set(
      [
        new Set(["1", "2"]),
      ]
    ))
})

  test('Two weakly connected components (1)', () => {
    expect(getWeaklyConnectedComponents({
      0: ["1", "2"],
      1: ["2"],
      2: [],
      3: ["4"],
      4: []
    })).toStrictEqual
    (new Set(
      [
        new Set(["0", "1", "2"]),
        new Set(["3", "4"])
      ]
    ))
})

test('Two weakly connected components (2)', () => {
  expect(getWeaklyConnectedComponents({
    0: ["1", "2"],
    1: ["2", "5"],
    2: [],
    3: ["4"],
    4: [],
    5: []
  })).toStrictEqual
  (new Set(
    [
      new Set(["0", "1", "2", "5"]),
      new Set(["3", "4"])
    ]
  ))
})

test('Two weakly connected components (3)', () => {
  expect(getWeaklyConnectedComponents({
    0: ["1", "2"],
    1: ["2", "5", "6"],
    2: [],
    3: ["4"],
    4: [],
    5: [],
    6: []
  })).toStrictEqual
  (new Set(
    [
      new Set(["0", "1", "2", "5", "6"]),
      new Set(["3", "4"])
    ]
  ))
})

test('Two weakly connected components (4)', () => {
  expect(getWeaklyConnectedComponents({
    0: ["1", "2"],
    1: ["5", "6"],
    2: [],
    3: ["4"],
    4: [],
    5: [],
    6: []
  })).toStrictEqual
  (new Set(
    [
      new Set(["0", "1", "2", "5", "6"]),
      new Set(["3", "4"])
    ]
  ))
})

test('Three weakly connected components', () => {
  expect(getWeaklyConnectedComponents({
    0: ["1", "2"],
    1: ["5", "6"],
    2: [],
    3: ["4"],
    4: [],
    5: [],
    6: [],
    7: []
  })).toStrictEqual
  (new Set(
    [
      new Set(["0", "1", "2", "5", "6"]),
      new Set(["3", "4"]),
      new Set(["7"])
    ]
  ))
})