import { getInput, parseInput } from '../lib/index.js'
import { YEAR } from '../index.js'
import { EXAMPLE_SIMPLE, EXAMPLE_COMPLEX, EXAMPLE_2_SIMPLE_1, EXAMPLE_2_SIMPLE_2, INPUT } from './input.js'
import {
  findStart, isEastAndWest, isCorner,
  isHorizontalConnection, isNorthAndEast, isNorthAndWest, isSouthAndEast, isSouthAndWest,
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
 * @param map {string[][]}
 */
function printMap(map) {
  map.forEach(row => console.log(row.join('')))
  console.log('\n----\n')
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
  const copy = map.map((row, y) => row.map((_, x) => y === start.y && x === start.x ? 'F' : '.'))
  // printMap(copy)
  let answer = 0
  let next = getNext(map, start)
  const corners = [start]
  while (next) {
    answer += 1
    copy[next.y][next.x] = map[next.y][next.x].cell
    next = getNext(map, next)
    if (next && isCorner(map[next.y][next.x].cell)) {
      corners.push(next)
    }
  }
  // printMap(copy)
  //part2
  const a = corners.reduce((acc, corner, index, corners) => {
    if (index === corners.length - 1) {
      return acc + (corner.x * corners[0].y)
    }
    return acc + (corner.x * corners[index + 1].y)
  }, 0)
  const b = corners.reduce((acc, corner, index, corners) => {
    if (index === corners.length - 1) {
      return acc + (corner.y * corners[0].x)
    }
    return acc + (corner.y * corners[index + 1].x)
  }, 0)
  // printMap(copy)
  console.log(corners)
  console.log(a, b)
  console.log('s:', Math.abs(a - b) / 2)
  console.log('assmption:', Math.abs(a - b) / 2 - Math.floor(answer / 2))

  // printMap(copy)
  return Math.ceil(answer / 2)
}

console.log(NAME)
getInput(YEAR, DAY)
  .then(input => {
// const exampleSimpleResult = main(EXAMPLE_SIMPLE)
// console.log('example:', exampleSimpleResult, exampleSimpleResult === 4)

    // const exampleComplexResult3 = main(EXAMPLE_SIMPLE)
    // // console.log('example:', exampleComplexResult3, exampleComplexResult3 === 8)
    // // const exampleComplexResult2 = main(EXAMPLE_2_SIMPLE_1)
    // // console.log('example:', exampleComplexResult2)
    // // const exampleComplexResult = main(EXAMPLE_2_SIMPLE_2)
    // console.log('example:', exampleComplexResult, exampleComplexResult === 8)
    const part1Result = main(INPUT)
    console.log('answer:', part1Result, part1Result === 6867)
    /*
    console.log()
    // console.log('part1:')

     */
//
// console.log('\npart2:')
// const part2Result = main(input)
// console.log('answer:', part2Result)
  })
