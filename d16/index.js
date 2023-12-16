import { getInput } from '../lib/index.js'
import { YEAR } from '../index.js'
import { EXAMPLE } from './input.js'

const DAY = 16
const NAME = `\n\n--- Day 16: The Floor Will Be Lava ---`

/**
 * @param input {string}
 * @returns {string[][]}
 */
function parseInput(input) {
  return input.trim().split('\n').map(it => it.split(''))
}

/**
 * @param input {string}
 * @returns {number}
 */
function main(input) {
  let ans = 0
  const map = parseInput(input)

  return ans
}

console.log(NAME)
// getInput(YEAR, DAY)
//   .then(input => {
console.log('part1:')
const exampleResult = main(EXAMPLE)
console.log('example:', exampleResult, exampleResult === 1)
// const part1Result = main(input)
// console.log('answer:', part1Result)
//
//   console.log('\npart2:')
//   const part2Result = main(input)
//   console.log('answer:', part2Result)
// })
