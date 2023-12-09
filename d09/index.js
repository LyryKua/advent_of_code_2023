import { example } from './input.js'
import { getInput, parseInput } from '../lib/index.js'
import { YEAR } from '../index.js'

const DAY = 9

/**
 * @param arr {number[]}
 * @returns {number[]}
 */
function getDeltas(arr) {
  const deltas = []
  for (let i = arr.length - 1; i > 0; i--) {
    deltas.unshift(arr[i] - arr[i - 1])
  }
  return deltas
}

/**
 * @param arr {number[]}
 * @returns{number[][]}
 */
function getPyramid(arr) {
  const pyramid = [arr]
  for (let i = 0; i < arr.length - 2; i++) {
    pyramid.push(getDeltas(pyramid[i]))
  }
  return pyramid
}

/**
 * @param pyramid {number[][]}
 * @param part {number}
 * @returns {number}
 */
function getPrediction(pyramid, part = 1) {
  let prediction = 0
  for (let i = pyramid.length - 1; i >= 0; i--) {
    prediction = part === 1
      ? prediction + pyramid[i][pyramid[i].length - 1]
      : pyramid[i][0] - prediction
  }

  return prediction
}

/**
 * @param input {string}
 * @param part {number}
 * @returns {number}
 */
function main(input, part) {
  let answer = 0
  const lines = parseInput(input)
  const numbers = lines.map(line => line.split(' ').map(it => parseInt(it)))

  for (const number of numbers) {
    const pyramid = getPyramid(number)
    answer += getPrediction(pyramid, part)
  }

  return answer
}

console.log('--- Day 9: Mirage Maintenance ---')
getInput(YEAR, DAY)
  .then(input => {
    console.log('\npart1:')
    const examplePart1Result = main(example, 1)
    console.log('example:', examplePart1Result, examplePart1Result === 114)
    const part1Result = main(input, 1)
    console.log('answer:', part1Result, part1Result === 1939607039)

    console.log('\npart2:')
    const examplePart2Result = main(example, 2)
    console.log('example:', examplePart2Result, examplePart2Result === 2)
    const part2Result = main(input, 2)
    console.log('answer:', part2Result, part2Result === 1041)
  })
