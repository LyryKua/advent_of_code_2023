import { getInput } from '../lib/index.js'
import { YEAR } from '../index.js'

const DAY = 10
const NAME = `\n\n--- Day 10: Pipe Maze ---`
const EXAMPLE = ``

/**
 * @param input {string}
 * @returns {number}
 */
function main(input) {

  return input.length
}

console.log(NAME)
getInput(YEAR, DAY)
  .then(input => {
    const exampleResult = main(EXAMPLE)
    console.log('example:', exampleResult, exampleResult === 0)
    // console.log('part1:')
    // const part1Result = main(input)
    // console.log('answer:', part1Result)
    //
    // console.log('\npart2:')
    // const part2Result = main(input)
    // console.log('answer:', part2Result)
  })
