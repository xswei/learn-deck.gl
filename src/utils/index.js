export const generatePoints = function (nums = 100) {
  const center = [116, 39]
  const points = []
  for (let i = 0; i < nums; ++i) {
    points.push({
      longitude: center[0] - (Math.random() - 0.5) * 20,
      latitude: center[1] - (Math.random() - 0.5) * 20,
    })
  }
  return points
}


export const generatePaths = function (nums = 100) {
  const center = [116, 39]
  const paths = []
  for (let i = 0; i < nums; ++i) {
    paths.push([
      [
        center[0] - (Math.random() - 0.5) * 20,
        center[1] - (Math.random() - 0.5) * 20,
        10
      ], [
        center[0] - (Math.random() - 0.5) * 20,
        center[1] - (Math.random() - 0.5) * 20,
        10
      ]
    ])
  }
  return paths
}