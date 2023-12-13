import { getInput, printArray } from '../lib/index.js'
import { YEAR } from '../index.js'
import { EXAMPLE, HORIZONTAL, INPUT, VERTICAL } from './input.js'
import { isHorizontalConnection } from '../d10/lib.js'

const DAY = 13
const NAME = `\n\n--- Day 13: Point of Incidence ---`

/**
 * @param str {string}
 * @returns {number}
 */
function str2Dec(str) {
  return parseInt(str.replaceAll('#', '1').replaceAll('.', '0'), 2)
}

/**
 * @param input {string}
 * @returns {string[][]}
 */
function parseInput(input) {
  return input.trim().split('\n\n').map(map => map.split('\n'))
}

/**
 * @param top {string[]}
 * @param bottom {string[]}
 */
function isHorizontalReflection(top, bottom) {
  let i = top.length - 1, j = 0
  while (i >= 0 && j < bottom.length) {
    if (top[i] !== bottom[j]) return false
    i -= 1
    j += 1
  }
  return true
}

/**
 * @param left {string[]}
 * @param right {string[]}
 */
function isVerticalReflection(left, right) {
  let i = left[0].length - 1, j = 0
  while (i >= 0 && j < right[0].length) {
    const leftStr = left.map(it => it[i]).join('')
    const rightStr = right.map(it => it[j]).join('')
    if (leftStr !== rightStr) return false
    i -= 1
    j += 1
  }
  return true
}

/**
 * @param map {string[]}
 * @returns {number}
 */
function findHorizontalMirror(map) {
  let answer = 0
  for (let i = 0; i < map.length - 1; i++) {
    const top = map.slice(0, i + 1)
    const bottom = map.slice(i + 1)
    if (isHorizontalReflection(top, bottom)) {
      answer += top.length * 100
    }
  }
  return answer
}

/**
 * @param map {string[]}
 * @returns {number}
 */
function findVerticalMirror(map) {
  let answer = 0
  for (let i = 0; i < map[0].length - 1; i++) {
    const left = map.map(it => it.slice(0, i + 1))
    const right = map.map(it => it.slice(i + 1))
    if (isVerticalReflection(left, right)) {
      answer += left[0].length
    }
  }
  return answer
}

/**
 * @param map {string[]}
 * @returns {number}
 */
function findMirror(map) {
  const horizontal = findHorizontalMirror(map)
  const vertical = findVerticalMirror(map)
  return horizontal + vertical
}

/**
 * @param input {string}
 * @returns {number}
 */
function main(input) {
  let answer = 0
  const maps = parseInput(input)
  for (let map of maps) {
    answer += findMirror(map)
  }
  return answer
}

console.log(NAME)
// getInput(YEAR, DAY)
//   .then(input => {
console.log('part1:')
const exampleResult = main(EXAMPLE)
console.log('example:', exampleResult, exampleResult === 405)
const part1Result = main(INPUT)
console.log('answer:', part1Result)
//
// console.log('\npart2:')
// const part2Result = main(input)
// console.log('answer:', part2Result)
// })
