import { parseInput } from '../lib/index.js'
import { examplePart1, examplePart2, part1 } from './input.js'

/**
 * @param line {string}
 * @returns {number}
 */
function parseLine(line) {
  const numbers = line.match(/\d/g)
  const firstChar = String(numbers.at(0))
  const lastChar = String(numbers.at(-1))

  return parseInt(firstChar + lastChar)
}

/**
 * @param input {string}
 * @return {number}
 */
function main(input) {
  const lines = parseInput(input)

  return lines.map(parseLine).reduce((acc, cur) => acc + cur, 0)
}

console.log('\npart1:')
const examplePart1Result = main(examplePart1)
console.log('example:', examplePart1Result, examplePart1Result === 142)
console.log('answer:', main(part1))

console.log('\npart2:')
const examplePart2Result = main(examplePart2)
console.log('example:', examplePart2Result, examplePart2Result === 281)
console.log('answer:', 'not yet')

