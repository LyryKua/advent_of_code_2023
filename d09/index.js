import { example, input } from './input.js'
import lcm from 'compute-lcm'

/**
 * @param input {string}
 * @returns {number}
 */
function main(input) {
  return input.length
}

console.log('--- Day 9: Mirage Maintenance ---')

console.log('\npart1:')
const example1Part1Result = main(example)
console.log('example:', example1Part1Result, example1Part1Result === 2)
const part1Result = main(input)
console.log('answer:', part1Result, part1Result === 17621)

console.log('\npart2:')
const example3Part2Result = main(example)
console.log('example:', example3Part2Result, example3Part2Result === 6)
const part2Result = main(input)
console.log('answer:', part2Result, part2Result === 20685524831999)
