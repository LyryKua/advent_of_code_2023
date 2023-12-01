import { parseInput } from '../lib/index.js'
import { examplePart1, examplePart2, part1 } from './input.js'

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
 * For `part1` you need replace this function with this:
 * @example
 * function parseLine(line) {
 *   const numbers = line.match(/\d/g)
 *   const firstChar = String(numbers.at(0))
 *   const lastChar = String(numbers.at(-1))
 *
 *   return parseInt(firstChar + lastChar)
 * }
 *
 * @param line {string}
 * @returns {number}
 */
function parseLine(line) {
  const possibleFirstNumbers = line.match(/(\d|one|two|three|four|five|six|seven|eight|nine)/g)
  const firstChar = getNumberChar(possibleFirstNumbers.at(0))

  const reversedLine = line.split('').reverse().join('')
  const possibleLastNumbers = reversedLine.match(/(\d|enin|thgie|neves|xis|evif|ruof|eerht|owt|eno)/g)
  const lastChar = getNumberChar(possibleLastNumbers.at(0))

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
console.log('answer:', main(part1))

