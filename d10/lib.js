/**
 * @param cell {string}
 * @returns {boolean}
 */
export function isNorthAndSouth(cell) {
  return cell === '|'
}

/**
 * @param cell {string}
 * @returns {boolean}
 */
export function isEastAndWest(cell) {
  return cell === '-'
}

/**
 * @param cell {string}
 * @returns {boolean}
 */
export function isNorthAndEast(cell) {
  return cell === 'L'
}

/**
 * @param cell {string}
 * @returns {boolean}
 */
export function isNorthAndWest(cell) {
  return cell === 'J'
}

/**
 * @param cell {string}
 * @returns {boolean}
 */
export function isSouthAndWest(cell) {
  return cell === '7'
}

/**
 * @param cell {string}
 * @returns {boolean}
 */
export function isSouthAndEast(cell) {
  return cell === 'F'
}

/**
 * @param cell {string}
 * @returns {boolean}
 */
export function isGround(cell) {
  return cell === '.'
}

/**
 * @param cell {string}
 * @returns {boolean}
 */
export function isStart(cell) {
  return cell === 'S'
}

/**
 * @param map {{cell: string, visited: boolean}[][]}
 * @returns {{x: number, y: number}}
 */
export function findStart(map) {
  for (let y = 0; y < map.length; y++) {
    const row = map[y]
    for (let x = 0; x < row.length; x++) {
      const { cell } = row[x]
      if (isStart(cell)) {
        return { x, y }
      }
    }
  }
  return { x: -1, y: -1 }
}

/**
 * @param a {{x: number, y: number}}
 * @param b {{x: number, y: number}}
 * @returns {boolean}
 */
export function isSameTile(a, b) {
  return a.x === b.x && a.y === b.y
}

/**
 * @param map {{cell: string, visited: boolean}[][]}
 * @param cell {{x: number, y: number}}
 * @returns {{x: number, y: number}[]}
 */
export function getConnections(map, { x, y }) {
  const cell = map[y][x]
  const top = y - 1 >= 0 ? { y: y - 1, x } : undefined
  const right = x + 1 <= map[0].length - 1 ? { y: y, x: x + 1 } : undefined
  const bottom = y + 1 <= map.length ? { y: y + 1, x } : undefined
  const left = x - 1 >= 0 ? { y: y, x: x - 1 } : undefined
  const connections = []
  if (isStart(cell)) {
    // top
    if (top) {
      const cell = map[top.y][top.x]
      if (isNorthAndSouth(cell) || isSouthAndEast(cell) || isSouthAndWest(cell)) {
        connections.push(top)
      }
    }
    // bottom
    if (bottom) {
      const cell = map[bottom.y][bottom.x]
      if (isNorthAndSouth(cell) || isNorthAndEast(cell) || isNorthAndWest(cell)) {
        connections.push(bottom)
      }
    }
    // left
    if (left) {
      const cell = map[left.y][left.x]
      if (isEastAndWest(cell) || isSouthAndEast(cell) || isNorthAndEast(cell)) {
        connections.push(left)
      }
    }
    // right
    if (right) {
      const cell = map[right.y][right.x]
      if (isEastAndWest(cell) || isNorthAndWest(cell) || isSouthAndWest(cell)) {
        connections.push(right)
      }
    }
  }

  if (isNorthAndSouth(cell)) {
    // top
    if (top) {
      const cell = map[top.y][top.x]
      if (isNorthAndSouth(cell) || isSouthAndEast(cell) || isSouthAndWest(cell)) {
        connections.push(top)
      }
    }
    // bottom
    if (bottom) {
      const cell = map[bottom.y][bottom.x]
      if (isNorthAndSouth(cell) || isNorthAndEast(cell) || isNorthAndWest(cell)) {
        connections.push(bottom)
      }
    }
  }
  if (isEastAndWest(cell)) {
    // left
    if (left) {
      const cell = map[left.y][left.x]
      if (isEastAndWest(cell) || isSouthAndEast(cell) || isNorthAndEast(cell)) {
        connections.push(left)
      }
    }
    // right
    if (right) {
      const cell = map[right.y][right.x]
      if (isEastAndWest(cell) || isNorthAndWest(cell) || isSouthAndWest(cell)) {
        connections.push(right)
      }
    }
  }
  if (isNorthAndEast(cell)) {
    // top
    if (top) {
      const cell = map[top.y][top.x]
      if (isNorthAndSouth(cell) || isSouthAndEast(cell) || isSouthAndWest(cell)) {
        connections.push(top)
      }
    }
    // right
    if (right) {
      const cell = map[right.y][right.x]
      if (isEastAndWest(cell) || isNorthAndWest(cell) || isSouthAndWest(cell)) {
        connections.push(right)
      }
    }
  }
  if (isNorthAndWest(cell)) {
    // top
    if (top) {
      const cell = map[top.y][top.x]
      if (isNorthAndSouth(cell) || isSouthAndEast(cell) || isSouthAndWest(cell)) {
        connections.push(top)
      }
    }
    // left
    if (left) {
      const cell = map[left.y][left.x]
      if (isEastAndWest(cell) || isSouthAndEast(cell) || isNorthAndEast(cell)) {
        connections.push(left)
      }
    }
  }
  if (isSouthAndWest(cell)) {
    // bottom
    if (bottom) {
      const cell = map[bottom.y][bottom.x]
      if (isNorthAndSouth(cell) || isNorthAndEast(cell) || isNorthAndWest(cell)) {
        connections.push(bottom)
      }
    }
    // left
    if (left) {
      const cell = map[left.y][left.x]
      if (isEastAndWest(cell) || isSouthAndEast(cell) || isNorthAndEast(cell)) {
        connections.push(left)
      }
    }
  }
  if (isSouthAndEast(cell)) {
    // bottom
    if (bottom) {
      const cell = map[bottom.y][bottom.x]
      if (isNorthAndSouth(cell) || isNorthAndEast(cell) || isNorthAndWest(cell)) {
        connections.push(bottom)
      }
    }
    // right
    if (right) {
      const cell = map[right.y][right.x]
      if (isEastAndWest(cell) || isNorthAndWest(cell) || isSouthAndWest(cell)) {
        connections.push(right)
      }
    }
  }

  return connections
}

/**
 * @param left {string}
 * @param right {string}
 */
export function isHorizontalConnection(left, right) {
  return (
    (isStart(left) && (isEastAndWest(right) || isNorthAndWest(right) || isSouthAndWest(right)))

    || ((isEastAndWest(left) || isSouthAndEast(left) || isNorthAndEast(left)) && isStart(right))

    || (isEastAndWest(left) && isEastAndWest(right))
    || (isEastAndWest(left) && isNorthAndWest(right))
    || (isEastAndWest(left) && isSouthAndWest(right))

    || (isSouthAndEast(left) && isSouthAndWest(right))
    || (isSouthAndEast(left) && isEastAndWest(right))
    || (isSouthAndEast(left) && isNorthAndWest(right))

    || (isNorthAndEast(left) && isNorthAndWest(right))
    || (isNorthAndEast(left) && isSouthAndWest(right))
    || (isNorthAndEast(left) && isEastAndWest(right))
  )
}

/**
 * @param top {string}
 * @param bottom {string}
 */
export function isVerticalConnection(top, bottom) {
  return (
    (isStart(top) && (isNorthAndSouth(bottom) || isNorthAndEast(bottom) || isNorthAndWest(bottom)))

    || ((isNorthAndSouth(top) || isSouthAndEast(top) || isSouthAndWest(top)) && isStart(bottom))

    || (isNorthAndSouth(top) && isNorthAndSouth(bottom))
    || (isNorthAndSouth(top) && isNorthAndEast(bottom))
    || (isNorthAndSouth(top) && isNorthAndWest(bottom))

    || (isSouthAndEast(top) && isNorthAndWest(bottom))
    || (isSouthAndEast(top) && isNorthAndSouth(bottom))
    || (isSouthAndEast(top) && isNorthAndEast(bottom))

    || (isSouthAndWest(top) && isNorthAndEast(bottom))
    || (isSouthAndWest(top) && isNorthAndWest(bottom))
    || (isSouthAndWest(top) && isNorthAndSouth(bottom))
  )
}

/**
 * @param map {{cell: string, visited: boolean, direction?: 'top' | 'bottom' | 'left' | 'right'}[][]}
 * @param a {{x: number, y: number}}
 * @param b {{x: number, y: number}}
 * @returns {boolean}
 */
export function isConnected(map, a, b) {
  const cellA = map[a.y][a.x]
  const cellB = map[b.y][b.x]
  // top or bottom
  if (isNorthAndSouth(cellA.cell)) {
  }
}
