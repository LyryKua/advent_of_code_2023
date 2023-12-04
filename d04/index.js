import { example, input } from './input.js'
import { parseInput } from '../lib/index.js'

/**
 * @param line {string}
 * @returns {{winingNumbers: number[], myNumbers: number[]}}
 */
function parseLine(line) {
  const [_, numbers] = line.replaceAll('  ', ' ').split(': ')
  const [winingNumbers, myNumbers] = numbers.split(' | ')

  return {
    winingNumbers: winingNumbers.split(' ').map(n => parseInt(n)),
    myNumbers: myNumbers.split(' ').map(n => parseInt(n)),
  }
}

/**
 * @param input {string}
 * @return {number}
 */
function part1(input) {
  let answer = 0
  const lines = parseInput(input)
  const numbers = lines.map(parseLine)

  for (const { winingNumbers, myNumbers } of numbers) {
    let cardResult = 0
    for (const number of myNumbers) {
      if (winingNumbers.includes(number)) {
        cardResult += 1
      }
    }
    answer += cardResult ? Math.pow(2, cardResult - 1) : cardResult
  }

  return answer
}

console.log('--- Day 4: Scratchcards ---')
console.log('\npart1:')
const examplePart1Result = part1(example)
console.log('example:', examplePart1Result, examplePart1Result === 13)
console.log('answer:', part1(input))

// console.log('\npart2:')
// const examplePart2Result = part2(example)
// console.log('example:', examplePart2Result, examplePart2Result === 467835)
// console.log('answer:', part2(input))
