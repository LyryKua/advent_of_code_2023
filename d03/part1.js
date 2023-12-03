import { example, input } from './input.js'
import { parseInput } from '../lib/index.js'

/**
 * @param char {string}
 * @returns {boolean}
 */
function isNumber(char) {
  return char === '0' || char === '1' || char === '2' || char === '3' || char === '4' || char === '5' || char === '6'
    || char === '7' || char === '8' || char === '9'

}

/**
 * @param char {string}
 * @return {boolean}
 */
function isPeriod(char) {
  return char === '.'
}

/**
 * @param line {string}
 * @param startPosition {number}
 * @returns {string}
 */
function getNumber(line, startPosition) {
  let length = 0

  for (let i = startPosition; i < line.length; i++) {
    const char = line[i]

    if (isNumber(char)) {
      length += 1
    } else {
      break
    }
  }

  return line.slice(startPosition, length + startPosition)
}

/**
 * @param lines {string[]}
 * @param numberLength {number}
 * @param x {number}
 * @param y {number}
 * @returns {boolean}
 */
function isNumberAdjacent(lines, numberLength, x, y) {
  const leftChar = lines[y][x - 1] ?? '.'
  const rightChar = lines[y][x + numberLength] ?? '.'
  const left = !isNumber(leftChar) && !isPeriod(leftChar)
  const right = !isNumber(rightChar) && !isPeriod(rightChar)
  let top = false
  let bottom = false
  for (let i = -1; i < numberLength + 1; i++) {
    const topChar = lines[y - 1]?.[x + i] ?? '.'
    if (!isNumber(topChar) && !isPeriod(topChar)) {
      top = true
      break
    }
    const bottomChar = lines[y + 1]?.[x + i] ?? '.'
    if (!isNumber(bottomChar) && !isPeriod(bottomChar)) {
      bottom = true
      break
    }
  }

  return top || bottom || left || right
}

/**
 * @param input {string}
 * @return {number}
 */
function main(input) {
  const lines = parseInput(input)
  const x = lines[0].length
  const y = lines.length
  let answer = 0

  for (let j = 0; j < y; j++) {
    for (let i = 0; i < x; i++) {
      const char = lines[j][i]
      if (isNumber(char)) {
        const number = getNumber(lines[j], i)
        const it = isNumberAdjacent(lines, number.length, i, j)
        if (it) {
          answer += parseInt(number)
        }
        i += number.length - 1
      }
    }
  }

  return answer
}

console.log('--- Day 3: Gear Ratios ---')
console.log('\npart1:')
const exampleResult = main(example)
console.log('example:', exampleResult, exampleResult === 4361)
console.log('answer:', main(input))
