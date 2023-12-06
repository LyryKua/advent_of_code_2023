import { example, input } from './input.js'
import { part1 } from '../d01/input.js'

/**
 * @param input {string}
 * @returns {{time: number, distance: number}[]}
 */
function parseInputPart1(input) {
  const [times, distances] = input.trim().split('\n').map(line => {
    const [_, numbers] = line.split(':')
    return numbers.trim().split(/\s+/).map(Number)
  })

  return times.map((time, i) => ({ time, distance: distances[i] }))
}

/**
 * @param input {string}
 * @returns {{time: number, distance: number}[]}
 */
function parseInputPart2(input) {
  const [timesStr, distancesStr] = input.trim().replaceAll(/ +/g, '').split('\n')
  const [_, time] = timesStr.split(':')
  const [__, distances] = distancesStr.split(':')

  return [{
    time: parseInt(time),
    distance: parseInt(distances),
  }]
}

/**
 * @param input {{time: number, distance: number}[]}
 * @returns {number}
 */
function main(input) {
  let answer = 1
  for (const race of input) {
    let winCounter = 0
    for (let i = 0; i < race.time; i++) {
      const distance = i * (race.time - i)
      if (distance > race.distance) {
        winCounter += 1
      }
    }
    answer *= winCounter
  }

  return answer
}

console.log('--- Day 6: Wait For It ---')
console.log('\npart1:')
const examplePart1Result = main(parseInputPart1(example))
console.log('example:', examplePart1Result, examplePart1Result === 288)
const part1Result = main(parseInputPart1(input))
console.log('answer:', part1Result, part1Result === 633080)

console.log('\npart2:')
const examplePart2Result = main(parseInputPart2(example))
console.log('example:', examplePart2Result, examplePart2Result === 71503)
const part2Result = main(parseInputPart2(input))
console.log('answer:', part2Result, part2Result === 20048741)
