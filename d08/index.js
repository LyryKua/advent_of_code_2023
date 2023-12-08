import { example1, example2, example3, input } from './input.js'
import lcm from 'compute-lcm'

/**
 * @param input {string}
 * @returns {{instructions: string, coordinates: Object<string, {L: string, R: string}>}}
 */
function parseInput(input) {
  const [instructions, _, ...coordinates] = input.trim().split('\n')

  return {
    instructions,
    coordinates: coordinates.reduce((acc, line) => {
      const [key, LR] = line.split(' = ')
      const [L, R] = LR.replace(/[()]/g, '').split(', ')
      return { ...acc, [key]: { L, R } }
    }, {}),
  }
}

/**
 * @param start {string}
 * @param part {number}
 * @returns {boolean}
 */
function isFinish(start, part) {
  if (part === 1) {
    return start === 'ZZZ'
  }
  return start[2] === 'Z'
}

/**
 * @param input {string}
 * @param part {number}
 * @returns {number}
 */
function main(input, part) {
  const { instructions, coordinates } = parseInput(input)
  let starts = part === 1 ? ['AAA'] : Object.keys(coordinates).filter(key => key[2] === 'A')
  let answers = {}
  for (let start of starts) {
    let answer = 0
    while (!isFinish(start, part)) {
      const instruction = instructions[answer % instructions.length]
      start = coordinates[start][instruction]
      answer += 1
    }
    answers[answer] = answer
  }
  const values = Object.values(answers)

  return part === 1 ? Math.min(...values) : lcm(...values)
}

console.log('--- Day 8: Haunted Wasteland ---')

console.log('\npart1:')
const example1Part1Result = main(example1, 1)
console.log('example1:', example1Part1Result, example1Part1Result === 2)
const example2Part1Result = main(example2, 1)
console.log('example2:', example2Part1Result, example2Part1Result === 6)
const part1Result = main(input, 1)
console.log('answer:', part1Result, part1Result === 17621)

console.log('\npart2:')
const example3Part2Result = main(example3, 2)
console.log('example3:', example3Part2Result, example3Part2Result === 6)
const part2Result = main(input, 2)
console.log('answer:', part2Result, part2Result === 20685524831999)
