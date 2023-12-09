import { parseInput, getInput } from '../lib/index.js'
import { examplePart1, examplePart2 } from './input.js'
import { YEAR } from '../index.js'

const DAY = 1
const NAME = `--- Day ${DAY}: Trebuchet?! ---`

/**
 * @param str {string}
 * @returns {string}
 */
function getNumberChar(str) {
  if (str === 'one' || str === '1' || str === 'eno') return '1'
  if (str === 'two' || str === '2' || str === 'owt') return '2'
  if (str === 'three' || str === '3' || str === 'eerht') return '3'
  if (str === 'four' || str === '4' || str === 'ruof') return '4'
  if (str === 'five' || str === '5' || str === 'evif') return '5'
  if (str === 'six' || str === '6' || str === 'xis') return '6'
  if (str === 'seven' || str === '7' || str === 'neves') return '7'
  if (str === 'eight' || str === '8' || str === 'thgie') return '8'
  if (str === 'nine' || str === '9' || str === 'enin') return '9'
  throw new Error(`Can not parse ${str}`)
}

/**
 * @param line {string}
 * @returns {number}
 */
function parseLinePart1(line) {
  const numbers = line.match(/\d/g)
  const firstChar = String(numbers.at(0))
  const lastChar = String(numbers.at(-1))

  return parseInt(firstChar + lastChar)
}

/**
 * @param line {string}
 * @returns {number}
 */
function parseLinePart2(line) {
  const possibleFirstNumbers = line.match(/(\d|one|two|three|four|five|six|seven|eight|nine)/g)
  const firstChar = getNumberChar(possibleFirstNumbers.at(0))

  const reversedLine = line.split('').reverse().join('')
  const possibleLastNumbers = reversedLine.match(/(\d|enin|thgie|neves|xis|evif|ruof|eerht|owt|eno)/g)
  const lastChar = getNumberChar(possibleLastNumbers.at(0))

  return parseInt(firstChar + lastChar)
}

/**
 * @param input {string}
 * @param part {number}
 * @return {number}
 */
function main(input, part) {
  const lines = parseInput(input)
  const parseLine = part === 1 ? parseLinePart1 : parseLinePart2

  return lines.map(parseLine).reduce((acc, cur) => acc + cur, 0)
}

console.log(NAME)
getInput(YEAR, DAY)
  .then(input => {
    console.log('\npart1:')
    const examplePart1Result = main(examplePart1, 1)
    console.log('example:', examplePart1Result, examplePart1Result === 142)
    const part1Result = main(input, 1)
    console.log('answer:', part1Result, part1Result === 54632)

    console.log('\npart2:')
    const examplePart2Result = main(examplePart2, 2)
    console.log('example:', examplePart2Result, examplePart2Result === 281)
    const part2Result = main(input, 2)
    console.log('answer:', part2Result, part2Result === 54019)
  })

