import { getInput } from '../lib/index.js'
import { YEAR } from '../index.js'

const DAY = 16
const NAME = `\n\n--- Day 16: The Floor Will Be Lava ---`

/**
 * @param input {string}
 * @returns {{char: string, visited: number}[][]}
 */
function parseInput(input) {
  return input.trim().split('\n').map(it => it.split('').map(it => ({ char: it, visited: 0 })))
}

/**
 * @param dot {{x: number, y: number}}
 * @param map {{char: string, visited: number}[][]}
 * @returns {boolean}
 */
function isInside({ x, y }, map) {
  return y >= 0 && y < map.length && x >= 0 && x < map[y].length
}

/**
 * @param dot {{x: number, y: number, direction: string}}
 * @returns {{x: number, y: number, direction: string}}
 */
function getNewStart({ x, y, direction }) {
  if (direction === 'right') return { x: x + 1, y, direction }
  if (direction === 'down') return { x, y: y + 1, direction }
  if (direction === 'left') return { x: x - 1, y, direction }
  return { x, y: y - 1, direction }
}

/**
 * @param dot{{x: number, y: number, direction: string}}
 * @param map {{char: string, visited: number}[][]}
 * @returns {boolean}
 */
function isVerticalSplit({ x, y, direction }, map) {
  const { char } = map[y][x]
  if (char === '|') return direction === 'right' || direction === 'left'
  return false
}

/**
 * @param dot{{x: number, y: number, direction: string}}
 * @param map {{char: string, visited: number}[][]}
 * @returns {boolean}
 */
function isHorizontalSplit({ x, y, direction }, map) {
  const { char } = map[y][x]
  if (char === '-') return direction === 'down' || direction === 'up'
  return false
}

/**
 * @param start {{x: number, y: number, direction: string}}
 * @param map {{char: string, visited: number}[][]}
 */
function traceMap(start, map) {
  let newStart = { ...start }
  while (isInside(newStart, map)) {
    const { char, visited } = map[newStart.y][newStart.x]
    if ((char === '|' || char === '-') && visited >= 2) return
    map[newStart.y][newStart.x].visited += 1
    if (isVerticalSplit(newStart, map)) {
      traceMap(getNewStart({ ...newStart, direction: 'up' }), map)
      traceMap(getNewStart({ ...newStart, direction: 'down' }), map)
      return
    } else if (isHorizontalSplit(newStart, map)) {
      traceMap(getNewStart({ ...newStart, direction: 'left' }), map)
      traceMap(getNewStart({ ...newStart, direction: 'right' }), map)
      return
    } else if ((char === '/' && newStart.direction === 'right')
      || (char === '\\' && newStart.direction === 'left')) {
      newStart = getNewStart({ ...newStart, direction: 'up' })
    } else if ((char === '/' && newStart.direction === 'left')
      || (char === '\\' && newStart.direction === 'right')) {
      newStart = getNewStart({ ...newStart, direction: 'down' })
    } else if ((char === '/' && newStart.direction === 'up')
      || (char === '\\' && newStart.direction === 'down')) {
      newStart = getNewStart({ ...newStart, direction: 'right' })
    } else if ((char === '/' && newStart.direction === 'down')
      || (char === '\\' && newStart.direction === 'up')) {
      newStart = getNewStart({ ...newStart, direction: 'left' })
    } else {
      newStart = getNewStart(newStart)
    }
  }
}

/**
 * @param map {{char: string, visited: number}[][]}
 * @returns {number}
 */
function countHashes(map) {
  let ans = 0
  for (let mapElement of map) {
    ans += mapElement.filter(it => it.visited > 0).length
  }
  return ans
}

/**
 * @param input {string}
 * @param part {number}
 * @returns {number}
 */
function main(input, part) {
  let ans = 0
  const map = parseInput(input)
  if (part === 1) {
    const start = { x: 0, y: 0, direction: 'right' }
    traceMap(start, map)
    ans = countHashes(map)
  } else {
    for (let i = 0; i < map[0].length; i++) {
      const copy = parseInput(input)
      const s = { x: i, y: 0, direction: 'down' }
      traceMap(s, copy)
      const tmp = countHashes(copy)
      if (tmp > ans) {
        ans = tmp
      }
    }
    for (let i = 0; i < map.length; i++) {
      const copy = parseInput(input)
      const s = { x: 0, y: i, direction: 'right' }
      traceMap(s, copy)
      const tmp = countHashes(copy)
      if (tmp > ans) {
        ans = tmp
      }
    }
    for (let i = 0; i < map[0].length; i++) {
      const copy = parseInput(input)
      const s = { x: i, y: map.length - 1, direction: 'up' }
      traceMap(s, copy)
      const tmp = countHashes(copy)
      if (tmp > ans) {
        ans = tmp
      }
    }
    for (let i = 0; i < map.length; i++) {
      const copy = parseInput(input)
      const s = { x: map[0].length - 1, y: i, direction: 'left' }
      traceMap(s, copy)
      const tmp = countHashes(copy)
      if (tmp > ans) {
        ans = tmp
      }
    }
  }


  return ans
}

console.log(NAME)
getInput(YEAR, DAY)
  .then(input => {
    console.log('part1:')
    const part1Result = main(input, 1)
    console.log('answer:', part1Result)

    console.log('\npart2:')
    const part2Result = main(input, 2)
    console.log('answer:', part2Result)
  })
