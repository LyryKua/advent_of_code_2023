import { example, input } from './input.js'
import { parseInput } from '../lib/index.js'

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
export function part2(input) {
  const lines = parseInput(input)

  const parsedLines = lines
    .map(line => {
      const [_, cubes] = line.split(': ')
      return cubes
    })
    .map(it => it.split('; '))
    .map(tries => tries.map(getTry))

  return parsedLines.map((tries, index) => {
    let maxRed = 0
    let maxGreen = 0
    let maxBlue = 0
    for (const try_ of tries) {
      maxRed = Math.max(maxRed, try_.red)
      maxGreen = Math.max(maxGreen, try_.green)
      maxBlue = Math.max(maxBlue, try_.blue)
    }

    return maxRed * maxGreen * maxBlue
  }).reduce((acc, cur) => acc + cur)
}
