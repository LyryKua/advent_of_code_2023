import { getInput } from '../lib/index.js'
import { YEAR } from '../index.js'
import { EXAMPLE, HASH } from './input.js'

const DAY = 15
const NAME = `\n\n--- Day 15: Lens Library ---`

/**
 * @param input {string}
 * @returns {string[]}
 */
function parseInput(input) {
  return input.trim().replaceAll('\n', '').split(',')
}

/**
 * @param str {string}
 * @returns {number}
 */
function getHash(str) {
  let curr = 0
  for (let c of str) {
    const ascii = c.charCodeAt(0)
    curr += ascii
    curr *= 17
    curr %= 256
  }

  return curr
}

/**
 * @param input {string}
 * @returns {number}
 */
function part1(input) {
  let hash = 0
  const initSeq = parseInput(input)
  for (let string of initSeq) {
    hash += getHash(string)
  }

  return hash
}

console.log(NAME)
getInput(YEAR, DAY)
  .then(input => {
    console.log('part1:')
    const hashResult = part1(HASH)
    console.log('example(hash):', hashResult, hashResult === 52)
    const exampleResult = part1(EXAMPLE)
    console.log('example:', exampleResult, exampleResult === 1320)
    const part1Result = part1(input)
    console.log('answer:', part1Result)

//   console.log('\npart2:')
//   const part2Result = main(input)
//   console.log('answer:', part2Result)
  })
