import { example, input } from './input.js'

/**
 * @param input {string}
 * @returns {number}
 */
function main(input) {
  return input.length
}

console.log('--- Day 7: Camel Cards ---')
console.log('\npart2:')
const examplePart1Result = main(example)
console.log('example:', examplePart1Result, examplePart1Result === 288)
const part1Result = main(example)
console.log('answer:', part1Result)
//
// console.log('\npart2:')
// const examplePart2Result = main(parseInputPart2(example))
// console.log('example:', examplePart2Result, examplePart2Result === 71503)
// const part2Result = main(parseInputPart2(input))
// console.log('answer:', part2Result, part2Result === 20048741)
