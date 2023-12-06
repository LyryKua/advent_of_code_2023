import { example, input } from './input.js'

/**
 * @param input {string}
 * @returns {{time: number, distance: number}[]}
 */
function parseInput(input) {
  const [times, distances] = input.trim().split('\n').map(line => {
    const [_, numbers] = line.split(':')
    return numbers.trim().split(/\s+/).map(Number)
  })

  return times.map((time, i) => ({ time, distance: distances[i] }))
}

/**
 * @param params {{time: number, distance: number}}
 * @param x {number}
 * @returns {number}
 */
function calculateDistance(x, { time, distance }) {
  return x * (time - x)
}

/**
 * @param input {string}
 * @returns {number}
 */
function part1(input) {
  const lines = parseInput(input)
  let answer = 1
  for (const line of lines) {
    let winCounter = 0
    for (let i = 0; i < line.time; i++) {
      const distance = calculateDistance(i, line)
      if (distance > line.distance) {
        winCounter += 1
      }
    }
    answer *= winCounter
  }

  return answer
}

console.log('--- Day 6: Wait For It ---')
console.log('\npart1:')
const examplePart1Result = part1(example)
console.log('example:', examplePart1Result, examplePart1Result === 288)
console.log('answer:', part1(input))

// console.log('\npart2:')
// const examplePart2Result = part2(example)
// console.log('example:', examplePart2Result, examplePart2Result === 46)
// console.log('answer:', part2(input))
