import { example, input } from './input.js'

/**
 * @param input {string}
 * @returns {number}
 */
function part1(input) {
  return input.length
}

/**
 * @param input {string}
 * @returns {number}
 */
function part2(input) {
  return input.length
}

console.log('--- Day 8: ??? ---')
console.log('\npart1:')
const examplePart1Result = part1(example)
console.log('example:', examplePart1Result, examplePart1Result === -1)
const part1Result = part1(input)
console.log('answer:', part1Result)

console.log('\npart2:')
const examplePart2Result = part2(example)
console.log('example:', examplePart2Result, examplePart2Result === -1)
const part2Result = part2(input)
console.log('answer:', part2Result)
