import { EXAMPLE, ONE_LINE } from './input.js'
import { getInput } from '../lib/index.js'
import { YEAR } from '../index.js'

const DAY = 12
const NAME = `\n\n--- Day 12: Hot Springs ---`

/**
 * @param input {string}
 * @returns {[string, number[]][]}
 */
function parseInput(input) {
  return input.trim().split('\n')
    .map(line => {
      const [action, rest] = line.split(' ')
      const value = rest.split(',').map(it => parseInt(it))
      return [action, value]
    })
}

/**
 * @param str {string}
 * @return {string[]}
 */
function iterate(str) {
  if (!str.includes('?')) return [str]

  const index = str.indexOf('?')
  const before = str.slice(0, index)
  const after = str.slice(index + 1)
  const variants = iterate(after)
  return variants.map(it => before + '.' + it).concat(variants.map(it => before + '#' + it))
}

/**
 * @param arr1 {number[]}
 * @param arr2 {number[]}
 * @returns {boolean}
 */
function isEquals(arr1, arr2) {
  if (arr1.length !== arr2.length) return false
  for (let i = 0; i < arr1.length; i++) {
    if (arr1.at(i) !== arr2.at(i)) return false
  }
  return true
}

/**
 * @param input {string}
 * @returns {number}
 */
function main(input) {
  let answer = 0
  const rows = parseInput(input)
  for (const [spring, numbers] of rows) {
    const variant = iterate(spring)
      .map(it => it.replaceAll(/\.+/g, '.')
        .split('.')
        .filter(it => it !== '')
        .map(it => it.length))
      .reduce((acc, cur) => isEquals(cur, numbers) ? acc + 1 : acc, 0)
    answer += variant
  }

  return answer
}

console.log(NAME)
getInput(YEAR, DAY)
  .then(input => {
    console.log('part1:')
// const exampleResult = main(EXAMPLE)
    const exampleResult = main(EXAMPLE)
    console.log('example:', exampleResult, exampleResult === 21)
    const part1Result = main(input)
    console.log('answer:', part1Result)
//
// console.log('\npart2:')
// const part2Result = main(input)
// console.log('answer:', part2Result)
  })
