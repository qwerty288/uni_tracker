import getWeaklyConnectedComponents from '../services/getWeaklyConnectedComponents'


test('Base case', () => {
    expect(getWeaklyConnectedComponents({})).toStrictEqual([])
  })

  test('Single node graph', () => {
    expect(getWeaklyConnectedComponents({
      1: []
    })).toStrictEqual([])
  })

  test('Two individual nodes', () => {
    expect(getWeaklyConnectedComponents({
      1: [],
      2: []
    })).toStrictEqual([])
  })

  test('Two connected nodes (directed)', () => {
    expect(getWeaklyConnectedComponents({
      1: [2],
      2: []
    })).toStrictEqual([])
  })

  test('Two weakly connected components', () => {
    expect(getWeaklyConnectedComponents({
      0: [1, 2],
      1: [2],
      2: [],
      3: [4],
      4: []
    })).toStrictEqual([])
  })
