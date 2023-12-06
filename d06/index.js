import { example, input } from './input.js'
import { parseInput } from '../lib/index.js'

/**
 * @param input {string}
 * @returns {number}
 */
function part1(input) {
  const lines = parseInput(input)
  return lines.length
}

console.log('--- Day 6: Wait For It ---')
console.log('\npart1:')
const examplePart1Result = part1(example)
console.log('example:', examplePart1Result, examplePart1Result === 35)
// console.log('answer:', part1(input))

// console.log('\npart2:')
// const examplePart2Result = part2(example)
// console.log('example:', examplePart2Result, examplePart2Result === 46)
// console.log('answer:', part2(input))
