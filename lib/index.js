import axios from 'axios'
import 'dotenv/config'

/**
 * Parse the input into an array of strings.
 *
 * @param input {string}
 * @returns {string[]}
 */
export function parseInput(input) {
  return input.trim().split('\n')
}

/**
 * Get the input for the given year and day.
 * @param year {number}
 * @param day {number}
 * @returns {Promise<string>}
 */
export async function getInput(year, day) {
  const url = `https://adventofcode.com/${year}/day/${day}/input`
  const cookie = process.env.AOC_SESSION_COOKIE
  const headers = { Cookie: `session=${cookie}` }
  const { data } = await axios.get(url, { headers })

  return data
}

/**
 * Print the given array
 * @param arr {string[]}
 */
export function printArray(arr) {
  console.log(arr.join('\n'))
}
