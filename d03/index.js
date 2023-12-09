import { example } from './input.js'
import { getInput, parseInput } from '../lib/index.js'
import { YEAR } from '../index.js'

const DAY = 3
const NAME ='--- Day 3: Gear Ratios ---'

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
 * @returns {boolean}
 */
function isStar(char) {
  return char === '*'
}

/**
 * @param lines {string[]}
 * @param x {number}
 * @param y {number}
 * @returns {boolean}
 */
function isLeftTouchNumber(lines, x, y) {
  const targetChar = lines[y][x - 1] ?? '.'

  return isNumber(targetChar)
}

/**
 * @param lines {string[]}
 * @param x {number}
 * @param y {number}
 * @returns {boolean}
 */
function isRightTouchNumber(lines, x, y) {
  const targetChar = lines[y][x + 1] ?? '.'

  return isNumber(targetChar)
}

/**
 * @param lines {string[]}
 * @param x {number}
 * @param y {number}
 * @returns {boolean}
 */
function isTopTouchNumber(lines, x, y) {
  const targetChar = lines[y - 1]?.[x] ?? '.'

  return isNumber(targetChar)
}

/**
 * @param lines {string[]}
 * @param x {number}
 * @param y {number}
 * @returns {boolean}
 */
function isLeftTopTouchNumber(lines, x, y) {
  const targetChar = lines[y - 1]?.[x - 1] ?? '.'

  return isNumber(targetChar)
}

/**
 * @param lines {string[]}
 * @param x {number}
 * @param y {number}
 * @returns {boolean}
 */
function isRightTopTouchNumber(lines, x, y) {
  const targetChar = lines[y - 1]?.[x + 1] ?? '.'

  return isNumber(targetChar)
}

/**
 * @param lines {string[]}
 * @param x {number}
 * @param y {number}
 * @returns {boolean}
 */
function isAnyTopTouchNumber(lines, x, y) {
  return isTopTouchNumber(lines, x, y) || isLeftTopTouchNumber(lines, x, y) || isRightTopTouchNumber(lines, x, y)
}

/**
 * @param lines {string[]}
 * @param x {number}
 * @param y {number}
 * @returns {boolean}
 */
function isLeftBottomTouchNumber(lines, x, y) {
  const targetChar = lines[y + 1]?.[x - 1] ?? '.'

  return isNumber(targetChar)
}

/**
 * @param lines {string[]}
 * @param x {number}
 * @param y {number}
 * @returns {boolean}
 */
function isBottomTouchNumber(lines, x, y) {
  const targetChar = lines[y + 1]?.[x] ?? '.'

  return isNumber(targetChar)
}

/**
 * @param lines {string[]}
 * @param x {number}
 * @param y {number}
 * @returns {boolean}
 */
function isRightBottomTouchNumber(lines, x, y) {
  const targetChar = lines[y + 1]?.[x + 1] ?? '.'

  return isNumber(targetChar)
}

/**
 * @param lines {string[]}
 * @param x {number}
 * @param y {number}
 * @returns {boolean}
 */
function isAnyBottomTouchNumber(lines, x, y) {
  return isBottomTouchNumber(lines, x, y) || isLeftBottomTouchNumber(lines, x, y) || isRightBottomTouchNumber(lines, x, y)
}

/**
 * @param lines {string[]}
 * @param x {number}
 * @param y {number}
 * @returns {boolean}
 */
function isTouchTwoNumbers(lines, x, y) {
  const left = isLeftTouchNumber(lines, x, y)
  const right = isRightTouchNumber(lines, x, y)
  const top = isTopTouchNumber(lines, x, y)
  const leftTop = isLeftTopTouchNumber(lines, x, y)
  const rightTop = isRightTopTouchNumber(lines, x, y)
  const bottom = isBottomTouchNumber(lines, x, y)
  const leftBottom = isLeftBottomTouchNumber(lines, x, y)
  const rightBottom = isRightBottomTouchNumber(lines, x, y)

  const anyTop = leftTop || top || rightTop
  const anyBottom = leftBottom || bottom || rightBottom

  if (left && anyTop) {
    return true
  }
  if (left && anyBottom) {
    return true
  }
  if (left && right) {
    return true
  }
  if (right && anyTop) {
    return true
  }
  if (right && anyBottom) {
    return true
  }
  if (anyTop && anyBottom) {
    return true
  }
  if (leftTop && rightTop) {
    return true
  }
  return leftBottom && rightBottom
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
 * @param line {string}
 * @param endPosition {number}
 * @returns {string}
 */
function getNumberFromEnd(line, endPosition) {
  let length = 0

  for (let i = endPosition; i >= 0; i--) {
    const char = line[i]

    if (isNumber(char)) {
      length += 1
    } else {
      break
    }
  }

  return line.slice(endPosition - length + 1, endPosition + 1)
}

/**
 * @param line {string}
 * @param position {number}
 * @returns {string}
 */
function getNumberFromMiddle(line, position) {
  let start = position
  let end = position

  for (let i = position; i >= 0; i--) {
    const char = line[i]

    if (isNumber(char)) {
      start = i
    } else {
      break
    }
  }
  for (let i = position; i < line.length; i++) {
    const char = line[i]

    if (isNumber(char)) {
      end = i
    } else {
      break
    }
  }

  return line.slice(start, end + 1)
}

/**
 * @param line {string}
 * @param start {number}
 * @returns {string[]}
 */
function numbersFromLine(line, start) {
  const isFirstNumber = isNumber(line[start - 1])
  const isSecondNumber = isNumber(line[start])
  const isThirdNumber = isNumber(line[start + 1])
  if (
    isFirstNumber && isSecondNumber && isThirdNumber
    || !isFirstNumber && isSecondNumber && isThirdNumber
    || isFirstNumber && isSecondNumber && !isThirdNumber) {
    return [getNumberFromMiddle(line, start)]
  }
  if (isFirstNumber && !isSecondNumber && !isThirdNumber) {
    return [getNumberFromEnd(line, start - 1)]
  }
  if (!isFirstNumber && !isSecondNumber && isThirdNumber) {
    return [getNumber(line, start + 1)]
  }
  if (isSecondNumber) {
    return [getNumberFromMiddle(line, start)]
  }
  if (isFirstNumber && !isSecondNumber && isThirdNumber) {
    return [getNumberFromEnd(line, start - 1), getNumber(line, start + 1)]
  }

  return []
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
function part1(input) {
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

/**
 * @param input {string}
 * @return {number}
 */
function part2(input) {
  const lines = parseInput(input)
  const x = lines[0].length
  const y = lines.length
  let answer = 0

  for (let j = 0; j < y; j++) {
    for (let i = 0; i < x; i++) {
      const char = lines[j][i]
      if (isStar(char) && isTouchTwoNumbers(lines, i, j)) {
        const numbers = []
        if (isAnyTopTouchNumber(lines, i, j)) {
          numbers.push(...numbersFromLine(lines[j - 1], i))
        }
        if (isAnyBottomTouchNumber(lines, i, j)) {
          numbers.push(...numbersFromLine(lines[j + 1], i))
        }
        if (isLeftTouchNumber(lines, i, j)) {
          numbers.push(...numbersFromLine(lines[j], i - 1))
        }
        if (isRightTouchNumber(lines, i, j)) {
          numbers.push(...numbersFromLine(lines[j], i + 1))
        }
        if (numbers.length === 2) {
          answer += parseInt(numbers[0]) * parseInt(numbers[1])
        }
      }
    }
  }
  return answer
}

console.log(NAME)
getInput(YEAR, DAY)
  .then(input => {
    console.log('\npart1:')
    const examplePart1Result = part1(example)
    console.log('example:', examplePart1Result, examplePart1Result === 4361)
    const part1Result = part1(input)
    console.log('answer:', part1Result, part1Result === 544433)

    console.log('\npart2:')
    const examplePart2Result = part2(example)
    console.log('example:', examplePart2Result, examplePart2Result === 467835)
    const part2Result = part2(input)
    console.log('answer:', part2Result, part2Result === 76314915)
  })
