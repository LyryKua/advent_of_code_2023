import { example, input } from './input.js'
import { parseInput } from '../lib/index.js'

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
 * @returns {number}
 */
function getPrediction(pyramid) {
  let prediction = 0
  for (let i = pyramid.length - 1; i >= 0; i--) {
    prediction = prediction + pyramid[i][pyramid[i].length - 1]
  }

  return prediction
}

/**
 * @param input {string}
 * @returns {number}
 */
function main(input) {
  let answer = 0
  const lines = parseInput(input)
  const numbers = lines.map(line => line.split(' ').map(it => parseInt(it)))

  for (const number of numbers) {
    const pyramid = getPyramid(number)
    answer += getPrediction(pyramid)
  }

  return answer
}

console.log('--- Day 9: Mirage Maintenance ---')

console.log('\npart1:')
const examplePart1Result = main(example)
console.log('example:', examplePart1Result, examplePart1Result === 114)
const part1Result = main(input)
console.log('answer:', part1Result)
/*
console.log('\npart2:')
const example3Part2Result = main(example)
console.log('example:', example3Part2Result, example3Part2Result === 6)
const part2Result = main(input)
console.log('answer:', part2Result, part2Result === 20685524831999)
 */
