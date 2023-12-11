import { getInput } from '../lib/index.js'
import { YEAR } from '../index.js'

const DAY = 11
const NAME = `\n\n--- Day 11: Cosmic Expansion ---`
const EXTENDER_PART1 = 2
const EXTENDER_PART2 = 1000000

/**
 * @param input {string}
 * @param extender {number}
 * @returns {{char: string, distanceX: number, distanceY: number}[][]}
 */
function getMap(input, extender) {
  const arr = input.trim()
    .split('\n')
    .map(line => line.split('')
      .map(char => ({
        char,
        distanceX: 1,
        distanceY: 1,
      })))
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].map(it => it.char).includes('#')) {
      arr[i] = arr[i].map(it => ({ ...it, distanceY: extender }))
    }
  }
  for (let i = arr[0].length - 1; i >= 0; i--) {
    let isColumnEmpty = true
    for (let j = 0; j < arr.length; j++) {
      if (arr[j][i].char === '#') {
        isColumnEmpty = false
        break
      }
    }
    if (isColumnEmpty) {
      for (let j = 0; j < arr[0].length; j++) {
        arr[j][i] = { ...arr[j][i], distanceX: extender }
      }
    }
  }
  return arr
}

/**
 * @param map {{char: string, distanceX: number, distanceY: number}[][]}
 * @param i {number}
 * @param k {number}
 */
function getYDistance(map, i, k) {
  const start = Math.min(i, k)
  const end = Math.max(i, k)
  let distance = 0
  for (let i = start; i < end; i++) {
    distance += map[i][0].distanceY
  }
  return distance
}

/**
 * @param map {{char: string, distanceX: number, distanceY: number}[][]}
 * @param j {number}
 * @param l {number}
 */

function getXDistance(map, j, l) {
  const start = Math.min(j, l)
  const end = Math.max(j, l)
  let distance = 0
  for (let i = start; i < end; i++) {
    distance += map[0][i].distanceX
  }
  return distance
}

/**
 * @param input {string}
 * @param extender {number}
 * @returns {number}
 */
function main(input, extender) {
  const map = getMap(input, extender)
  const distances = [0]
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j].char === '#') {
        map[i][j].char = 'X'
        for (let k = 0; k < map.length; k++) {
          for (let l = 0; l < map[k].length; l++) {
            if (map[k][l].char === '#') {
              const distance = getXDistance(map, j, l) + getYDistance(map, i, k)
              distances.push(distance)
            }
          }
        }
      }
    }
  }

  return distances.reduce((a, b) => a + b, 0)
}

console.log(NAME)
getInput(YEAR, DAY)
  .then(input => {
    console.log('part1:')
    const part1Result = main(input, EXTENDER_PART1)
    console.log('answer:', part1Result)

    console.log('\npart2:')
    const part2Result = main(input, EXTENDER_PART2)
    console.log('answer:', part2Result)
  })
