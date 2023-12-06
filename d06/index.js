import { example, input } from './input.js'

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
 * @param params {{time: number, distance: number}}
 * @param x {number}
 * @returns {number}
 */
function calculateDistance(x, { time, distance }) {
  return x * (time - x)
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
      const distance = calculateDistance(i, race)
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
console.log('answer:', main(parseInputPart1(input)))

console.log('\npart2:')
const examplePart2Result = main(parseInputPart2(example))
console.log('example:', examplePart2Result, examplePart2Result === 71503)
console.log('answer:', main(parseInputPart2(input)))
