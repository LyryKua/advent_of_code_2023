import { example, input } from './input.js'

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
  const soils = map.map(row => originToTarget(x, ...row)).filter(it => it !== x)

  return soils.length === 1 ? soils[0] : x
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

console.log('--- Day 5: If You Give A Seed A Fertilizer ---')
console.log('\npart1:')
const examplePart1Result = part1(example)
console.log('example:', examplePart1Result, examplePart1Result === 35)
console.log('answer:', part1(input))
