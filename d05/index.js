import { example } from './input.js'

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

  console.log('seeds:', seeds)
  console.log('seedToSoilMap:', seedToSoilMap)
  console.log('soilToFertilizerMap:', soilToFertilizerMap)
  console.log('fertilizerToWaterMap:', fertilizerToWaterMap)
  console.log('waterToLightMap:', waterToLightMap)
  console.log('lightToTemperatureMap:', lightToTemperatureMap)
  console.log('temperatureToHumidityMap:', temperatureToHumidityMap)
  console.log('humidityToLocationMap:', humidityToLocationMap)
  return 0
}

console.log('--- Day 5: If You Give A Seed A Fertilizer ---')
console.log('\npart1:')
const examplePart1Result = part1(example)
console.log('example:', examplePart1Result, examplePart1Result === 35)
