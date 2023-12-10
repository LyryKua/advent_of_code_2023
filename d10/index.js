import { getInput, parseInput } from '../lib/index.js'
import { YEAR } from '../index.js'
import { EXAMPLE_SIMPLE, EXAMPLE_COMPLEX } from './input.js'
import {
  findStart,
  isHorizontalConnection,
  isVerticalConnection,
} from './lib.js'

const DAY = 10
const NAME = `\n\n--- Day 10: Pipe Maze ---`

/**
 * @param map {{cell: string, visited: boolean, direction?: 'top' | 'bottom' | 'left' | 'right'}[][]}
 * @param cell {{x: number, y: number}}
 * @returns{{x: number, y: number} | undefined}
 */
function getNext(map, cell) {
  const { x, y } = cell
  const mapCell = map[y][x]
  mapCell.visited = true
  const topCoordinates = y - 1 >= 0 ? { y: y - 1, x } : undefined
  const topCell = topCoordinates ? map[topCoordinates.y][topCoordinates.x] : undefined
  const rightCoordinates = x + 1 <= map[0].length - 1 ? { y, x: x + 1 } : undefined
  const rightCell = rightCoordinates ? map[rightCoordinates.y][rightCoordinates.x] : undefined
  const bottomCoordinates = y + 1 < map.length ? { y: y + 1, x } : undefined
  const bottomCell = bottomCoordinates ? map[bottomCoordinates.y][bottomCoordinates.x] : undefined
  const leftCoordinates = x - 1 >= 0 ? { y, x: x - 1 } : undefined
  const leftCell = leftCoordinates ? map[leftCoordinates.y][leftCoordinates.x] : undefined

  if (topCell && !topCell.visited && isVerticalConnection(topCell.cell, mapCell.cell)) {
    mapCell.direction = 'top'
    return topCoordinates
  }
  if (bottomCell && !bottomCell.visited && isVerticalConnection(mapCell.cell, bottomCell.cell)) {
    mapCell.direction = 'bottom'
    return bottomCoordinates
  }
  if (leftCell && !leftCell.visited && isHorizontalConnection(leftCell.cell, mapCell.cell)) {
    mapCell.direction = 'left'
    return leftCoordinates
  }
  if (rightCell && !rightCell.visited && isHorizontalConnection(mapCell.cell, rightCell.cell)) {
    mapCell.direction = 'right'
    return rightCoordinates
  }
  return undefined
}

/**
 * @param map {{cell: string, visited: boolean}[][]}
 */
function printMap(map) {
  map.forEach(row => console.log(row.map(it => it.cell).join('')))
  console.log('----')
}

/**
 * @param input {string}
 * @returns {number}
 */
function main(input) {
  const map = parseInput(input)
    .map(row => row
      .split('')
      .reduce((acc, cell) => ([...acc, { cell, visited: cell === 'S' }]), []))
  const start = findStart(map)
  let answer = 0
  let next = getNext(map, start)
  while (next) {
    // map[direction.y][direction.x] = 'S'
    answer += 1
    next = getNext(map, next)
  }

  return Math.ceil(answer / 2)
}

console.log(NAME)
getInput(YEAR, DAY)
  .then(input => {
    const exampleSimpleResult = main(EXAMPLE_SIMPLE)
    console.log('example:', exampleSimpleResult, exampleSimpleResult === 4)
    const exampleComplexResult = main(EXAMPLE_COMPLEX)
    console.log('example:', exampleComplexResult, exampleComplexResult === 8)
    console.log('part1:')
    const part1Result = main(input)
    console.log('answer:', part1Result, part1Result === 6867)
//
// console.log('\npart2:')
// const part2Result = main(input)
// console.log('answer:', part2Result)
  })

