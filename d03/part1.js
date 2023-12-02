import { example, input } from './input.js'
/**
 * @param input {string}
 * @return {number}
 */
function main(input) {
  return input.length
}

// TODO: replace `Day3` name
console.log('--- DAY 3: ??? ---')
console.log('\npart1:')
const exampleResult = main(example)
console.log('example:', exampleResult, exampleResult === 8)
console.log('answer:', main(input))
