import { getInput } from '../lib/index.js'
import { YEAR } from '../index.js'

const DAY = 6
const NAME = `\n\n--- Day ${DAY}: Wait For It ---`

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
  for (const { time, distance } of input) {
    const discriminant = time * time - 4 * distance
    const x1 = Math.floor((time - Math.sqrt(discriminant)) / 2)
    const x2 = Math.ceil((time + Math.sqrt(discriminant)) / 2)

    answer *= (x2 - x1 - 1)
  }

  return answer
}

console.log(NAME)
getInput(YEAR, DAY).then(input => {
  console.log('part1:')
  const part1Result = main(parseInputPart1(input))
  console.log('answer:', part1Result, part1Result === 633080)

  console.log('\npart2:')
  const part2Result = main(parseInputPart2(input))
  console.log('answer:', part2Result, part2Result === 20048741)
})
