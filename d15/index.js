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
 * @param step {string}
 * @returns {{label: string, focalLength: number, isAdd: boolean}}
 */
function parseStep(step) {
  let label = '', focalLength = 0, isAdd = false
  if (step.includes('=')) {
    const arr = step.split('=')
    label = arr[0]
    focalLength = parseInt(arr[1])
    isAdd = true
  } else {
    label = step.slice(0, step.length - 1)
  }

  return { label, focalLength, isAdd }
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

/**
 * @param input {string}
 * @returns {number}
 */
function part2(input) {
  let hash = 0
  const boxes = Array(256).fill(null).map(() => [])
  const steps = parseInput(input)
  for (let step of steps) {
    const { label, focalLength, isAdd } = parseStep(step)
    const boxNumber = getHash(label)
    if (isAdd) {
      const f = boxes[boxNumber].findIndex(it => it.label === label)
      if (f === -1) {
        boxes[boxNumber] = [...boxes[boxNumber], { label, focalLength }]
      } else {
        boxes[boxNumber][f] = { label, focalLength }
      }
    } else {
      boxes[boxNumber] = boxes[boxNumber].filter(it => it.label !== label)
    }
  }

  for (let i = 0; i < boxes.length; i++) {
    for (let j = 0; j < boxes[i].length; j++) {
      hash += (i + 1) * (j + 1) * boxes[i][j].focalLength
    }
  }

  return hash
}


console.log(NAME)
getInput(YEAR, DAY)
  .then(input => {
    console.log(input)
    console.log('part1:')
    const hashResult = part1(HASH)
    console.log('example(hash):', hashResult, hashResult === 52)
    const examplePart1Result = part1(EXAMPLE)
    console.log('example:', examplePart1Result, examplePart1Result === 1320)
    const part1Result = part1(input)
    console.log('answer:', part1Result)

    console.log('\npart2:')
    const examplePart2Result = part2(EXAMPLE)
    console.log('example:', examplePart2Result, examplePart2Result === 145)
    const part2Result = part2(input)
    console.log('answer:', part2Result)
  })
