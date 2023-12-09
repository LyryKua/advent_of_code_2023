import { example } from './input.js'
import { getInput } from '../lib/index.js'
import { YEAR } from '../index.js'

const DAY = 0
const NAME = `--- Day ${DAY}: TODO ---`

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
    console.log('\npart1:')
    const examplePart1Result = main(example)
    console.log('example:', examplePart1Result)
    const part1Result = main(input)
    console.log('answer:', part1Result)

    console.log('\npart2:')
    const examplePart2Result = main(example)
    console.log('example:', examplePart2Result)
    const part2Result = main(input)
    console.log('answer:', part2Result)
  })
