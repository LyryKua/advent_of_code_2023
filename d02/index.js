import { part1 } from './part1.js'
import { part2 } from './part2.js'
import { getInput } from '../lib/index.js'
import { YEAR } from '../index.js'

const DAY = 2
const NAME = `\n\n--- Day ${DAY}: Cube Conundrum ---`

console.log(NAME)
getInput(YEAR, DAY)
  .then(input => {
    console.log('part1:')
    const part1Result = part1(input)
    console.log('answer:', part1Result, part1Result === 2285)

    console.log('\npart2:')
    const part2Result = part2(input)
    console.log('answer:', part2Result, part2Result === 77021)
  })
