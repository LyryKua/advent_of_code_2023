import { getInput } from '../lib/index.js'
import { YEAR } from '../index.js'
import { EXAMPLE, INPUT } from './input.js'

const DAY = 14
const NAME = `\n\n--- Day 14: Parabolic Reflector Dish ---`

/**
 * @param arr {string[][]}
 */
function printArray(arr) {
  console.log(arr.map(it => it.join('')).join('\n'))
}

/**
 * @param input {string}
 * @returns {string[][]}
 */
function parseInput(input) {
  return input.trim().split('\n').map(it => it.split(''))
}

/**
 * @param str {string}
 * @returns {string}
 */
function tailStr(str) {
  return str.split('').reverse().join('')
}

/**
 * @param str {string[]}
 * @returns {string[]}
 */
function sortOpposite(str) {
  const copy = str.map(it => it)
  let i = 0, j = copy.length - 1
  while (i < j) {
    if (copy[i] === 'O' && copy[j] === '.') {
      copy[i] = '.'
      copy[j] = 'O'
    }
    if (copy[i] === '.') i++
    if (copy[j] === 'O') j--
  }
  return copy
}

/**
 * @param str {string[]}
 * @returns {string[]}
 */
function sort(str) {
  const copy = str.map(it => it)
  let i = 0, j = copy.length - 1
  while (i < j) {
    if (copy[i] === '.' && copy[j] === 'O') {
      copy[i] = 'O'
      copy[j] = '.'
    }
    if (copy[i] === 'O') i++
    if (copy[j] === '.') j--
  }
  return copy
}

/**
 * @param map {string[][]}
 * @returns {string[][]}
 */
function tailN(map) {
  let tailedMap = map.map(it => it.map(it => it))
  for (let k = 0; k < map[0].length; k++) {
    const str = map
      .map(it => it[k])
      .join('')
      .split('#')
      .map(
        it => sort(it.split('')).join(''),
      )
      .join('#')
    for (let j = 0; j < str.length; j++) {
      tailedMap[j][k] = str[j]
    }
  }

  return tailedMap
}

/**
 * @param map {string[][]}
 * @returns {string[][]}
 */
function tailW(map) {
  let tailedMap = map.map(it => it.map(it => it))
  for (let k = 0; k < map.length; k++) {
    const str = map[k].join('').split('#').map(it => sort(it.split('')).join('')).join('#')

    for (let j = 0; j < str.length; j++) {
      tailedMap[k][j] = str[j]
    }
  }

  return tailedMap
}

/**
 * @param map {string[][]}
 * @returns {string[][]}
 */
function tailE(map) {
  let tailedMap = map.map(it => it.map(it => it))
  for (let k = 0; k < map[0].length; k++) {
    const str = map
      .map(it => it[k])
      .join('')
      .split('#')
      .map(
        it => sortOpposite(it.split('')).join(''),
      )
      .join('#')
    for (let j = 0; j < str.length; j++) {
      tailedMap[j][k] = str[j]
    }
  }

  return tailedMap
}

/**
 * @param map {string[][]}
 * @returns {string[][]}
 */
function tailS(map) {
  let tailedMap = map.map(it => it.map(it => it))
  for (let k = 0; k < map.length; k++) {
    const str = map[k].join('').split('#').map(it => sortOpposite(it.split('')).join('')).join('#')

    for (let j = 0; j < str.length; j++) {
      tailedMap[k][j] = str[j]
    }
  }

  return tailedMap
}

/**
 * @param map {string[][]}
 * @returns {string[][]}
 */
function calc(map) {
  let tailedMap = map.map(it => it.map(it => it))
  tailedMap = tailN(tailedMap)
  tailedMap = tailW(tailedMap)
  tailedMap = tailE(tailedMap)
  tailedMap = tailS(tailedMap)
  return tailedMap
}

/**
 * @param input {string}
 * @returns {number}
 */
function main(input) {
  const map = parseInput(input)
  const arr = Array(500).fill(0).map((_, i) => i + 1)
  for (let arrElement of arr) {
    let ans = 0
    let tailedMap = map.map(it => it.map(it => it))
    for (let i = 0; i < arrElement; i++) {
      tailedMap = calc(tailedMap)
    }
    for (let i = 0; i < tailedMap.length; i++) {
      let row = tailedMap[i]
      ans += row.filter(it => it === 'O').length * (tailedMap.length - i)
    }
    console.log(`${arrElement},${ans}`)
  }


  return 0
}

console.log(NAME)
// getInput(YEAR, DAY)
//   .then(input => {
console.log('part1:')
// const exampleResult = main(EXAMPLE)
// console.log('example result:', exampleResult, exampleResult === 136)
const part1Result = main(INPUT)
console.log('answer:', part1Result)
//
// console.log('\npart2:')
// const part2Result = main(input)
// console.log('answer:', part2Result)
// })
