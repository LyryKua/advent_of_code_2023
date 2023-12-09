import { example } from './input.js'
import { getInput } from '../lib/index.js'
import { YEAR } from '../index.js'

const NAME = '--- Day 5: If You Give A Seed A Fertilizer ---'
const DAY = 5

/**
 * @param input {string}
 * @returns {{seeds: number[], seedToSoilMap: number[][], soilToFertilizerMap: number[][], fertilizerToWaterMap: number[][], waterToLightMap: number[][], lightToTemperatureMap: number[][], temperatureToHumidityMap: number[][], humidityToLocationMap: number[][]}}
 */
function parseSeeds(input) {
  const [seeds, seedToSoilMap, soilToFertilizerMap, fertilizerToWaterMap, waterToLightMap, lightToTemperatureMap, temperatureToHumidityMap, humidityToLocationMap] = input.trim().split('\n\n')

  return {
    seeds: seeds.replaceAll('seeds: ', '').trim().split(' ').map(it => parseInt(it)),
    seedToSoilMap: seedToSoilMap.replaceAll('seed-to-soil map:\n', '').trim().split('\n').map(row => row.trim().split(' ').map(it => parseInt(it))),
    soilToFertilizerMap: soilToFertilizerMap.replaceAll('soil-to-fertilizer map:\n', '').trim().split('\n').map(row => row.trim().split(' ').map(it => parseInt(it))),
    fertilizerToWaterMap: fertilizerToWaterMap.replaceAll('fertilizer-to-water map:\n', '').trim().split('\n').map(row => row.trim().split(' ').map(it => parseInt(it))),
    waterToLightMap: waterToLightMap.replaceAll('water-to-light map:\n', '').trim().split('\n').map(row => row.trim().split(' ').map(it => parseInt(it))),
    lightToTemperatureMap: lightToTemperatureMap.replaceAll('light-to-temperature map:\n', '').trim().split('\n').map(row => row.trim().split(' ').map(it => parseInt(it))),
    temperatureToHumidityMap: temperatureToHumidityMap.replaceAll('temperature-to-humidity map:\n', '').trim().split('\n').map(row => row.trim().split(' ').map(it => parseInt(it))),
    humidityToLocationMap: humidityToLocationMap.replaceAll('humidity-to-location map:\n', '').trim().split('\n').map(row => row.trim().split(' ').map(it => parseInt(it))),
  }
}

/**
 * @param x {number}
 * @param origin {number}
 * @param target {number}
 * @param range {number}
 * @returns {number}
 */
function originToTarget(x, target, origin, range) {
  const delta = target - origin
  const originMax = origin + range
  const y = x + delta

  if (origin <= x && x < originMax) {
    return y
  }
  return x
}

/**
 * @param x {number}
 * @param map {number[][]}
 * @returns {number}
 */
function oneToAnother(x, map) {
  let y = x
  for (const row of map) {
    const target = originToTarget(x, ...row)
    if (y !== target) {
      return target
    }
  }

  return y
}

/**
 * @param input {string}
 * @returns {number}
 */
function part1(input) {
  const {
    seeds,
    seedToSoilMap,
    soilToFertilizerMap,
    fertilizerToWaterMap,
    waterToLightMap,
    lightToTemperatureMap,
    temperatureToHumidityMap,
    humidityToLocationMap,
  } = parseSeeds(input)

  const soils = seeds.map(seed => oneToAnother(seed, seedToSoilMap))
  const fertilizers = soils.map(soil => oneToAnother(soil, soilToFertilizerMap))
  const waters = fertilizers.map(fertilizer => oneToAnother(fertilizer, fertilizerToWaterMap))
  const lights = waters.map(water => oneToAnother(water, waterToLightMap))
  const temperatures = lights.map(light => oneToAnother(light, lightToTemperatureMap))
  const humidities = temperatures.map(temperature => oneToAnother(temperature, temperatureToHumidityMap))
  const locations = humidities.map(humidity => oneToAnother(humidity, humidityToLocationMap))

  return Math.min(...locations)
}

/**
 * @param input {string}
 * @returns {number}
 */
function part2(input) {
  let min = 9007199254740992
  const {
    seeds,
    seedToSoilMap,
    soilToFertilizerMap,
    fertilizerToWaterMap,
    waterToLightMap,
    lightToTemperatureMap,
    temperatureToHumidityMap,
    humidityToLocationMap,
  } = parseSeeds(input)

  for (let i = 0; i < seeds.length; i += 2) {
    console.log('i:', i, '-', new Date())
    const start = seeds[i]
    const end = start + seeds[i + 1]
    for (let seed = start; seed < end; seed++) {
      const soil = oneToAnother(seed, seedToSoilMap)
      const fertilizer = oneToAnother(soil, soilToFertilizerMap)
      const water = oneToAnother(fertilizer, fertilizerToWaterMap)
      const light = oneToAnother(water, waterToLightMap)
      const temperature = oneToAnother(light, lightToTemperatureMap)
      const humidity = oneToAnother(temperature, temperatureToHumidityMap)
      const location = oneToAnother(humidity, humidityToLocationMap)
      if (location < min) {
        min = location
      }
    }
  }

  return min
}

console.log(NAME)
getInput(YEAR, DAY).then(input => {
  console.log('\npart1:')
  const examplePart1Result = part1(example)
  console.log('example:', examplePart1Result, examplePart1Result === 35)
  const part1Result = part1(input)
  console.log('answer:', part1Result, part1Result === 379811651)

  console.log('\npart2:')
  const examplePart2Result = part2(example)
  console.log('example:', examplePart2Result, examplePart2Result === 46)
  const part2Result = part2(input)
  console.log('answer:', part2Result, part2Result === 27992443)
})
