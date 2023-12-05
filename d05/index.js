import { example } from './input.js'
import { parseInput } from '../lib/index.js'

/**
 * @param input {string}
 * @returns {number}
 */
function part1(input) {
  const lines = parseInput(input)

  return lines.length
}

console.log('--- Day 5: If You Give A Seed A Fertilizer ---')
console.log('\npart1:')
const examplePart1Result = part1(example)
console.log('example:', examplePart1Result, examplePart1Result === 35)
