import { example1, example2, input } from './input.js'

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
 * @param input {string}
 * @returns {number}
 */
function part1(input) {
  const { instructions, coordinates } = parseInput(input)
  let start = 'AAA'
  let answer = 0
  while (start !== 'ZZZ') {
    const instruction = instructions[answer % instructions.length]
    start = coordinates[start][instruction]
    answer += 1
  }

  return answer
}

console.log('--- Day 8: Haunted Wasteland ---')
console.log('\npart1:')
const example1Part1Result = part1(example1)
console.log('example1:', example1Part1Result, example1Part1Result === 2)
const example2Part1Result = part1(example2)
console.log('example2:', example2Part1Result, example2Part1Result === 6)
const part1Result = part1(input)
console.log('answer:', part1Result part1Result === 17621)

/*
console.log('\npart2:')
const examplePart2Result = part2(example)
console.log('example:', examplePart2Result, examplePart2Result === -1)
const part2Result = part2(input)
console.log('answer:', part2Result)
 */
