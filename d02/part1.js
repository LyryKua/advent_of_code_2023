import { example, input } from './input.js'
import { parseInput } from '../lib/index.js'

const MAX_RED = 12
const MAX_GREEN = 13
const MAX_BLUE = 14

/**
 * @param str {string}
 * @returns {{red: number, green: number, blue: number}}
 */
function getTry(str) {
  const answer = {
    red: 0,
    green: 0,
    blue: 0,
  }
  const cubes = str.split(', ')

  for (const cube of cubes) {
    const [amount, color] = cube.split(' ')
    answer[color] = parseInt(amount)
  }

  return answer
}

/**
 * @param input {string}
 * @return {number}
 */
function main(input) {
  const lines = parseInput(input)

  const parsedLines = lines
    .map(line => {
      const [_, cubes] = line.split(': ')
      return cubes
    })
    .map(it => it.split('; '))
    .map(tries => tries.map(getTry))

  return parsedLines.map((tries, index) => {
    const gameNumber = index + 1
    let flag = true
    for (const try_ of tries) {
      if (try_.red > MAX_RED || try_.green > MAX_GREEN || try_.blue > MAX_BLUE) {
        flag = false
        break
      }
    }

    return flag ? gameNumber : 0
  }).reduce((acc, cur) => acc + cur)
}

const exampleResult = main(example)
console.log('example:', exampleResult, exampleResult === 8)
console.log('answer:', main(input))
