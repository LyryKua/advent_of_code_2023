import { example, input } from './input.js'
import { parseInput } from '../lib/index.js'

/**
 * @param line {string}
 * @returns {{cardNumber: number, winingNumbers: number[], myNumbers: number[]}}
 */
function parseLine(line) {
  const [card, numbers] = line.replaceAll(/\s+/g, ' ').split(': ')
  const [_, cardNumber] = card.split(' ')
  const [winingNumbers, myNumbers] = numbers.split(' | ')

  return {
    cardNumber: parseInt(cardNumber),
    winingNumbers: winingNumbers.split(' ').map(n => parseInt(n)),
    myNumbers: myNumbers.split(' ').map(n => parseInt(n)),
  }
}

/**
 * @param input {string}
 * @return {number}
 */
function part1(input) {
  let answer = 0
  const lines = parseInput(input)
  const numbers = lines.map(parseLine)

  for (const { winingNumbers, myNumbers } of numbers) {
    let cardResult = 0
    for (const number of myNumbers) {
      if (winingNumbers.includes(number)) {
        cardResult += 1
      }
    }
    answer += cardResult ? Math.pow(2, cardResult - 1) : cardResult
  }

  return answer
}

/**
 * @param winingNumbers {number[]}
 * @param myNumbers {number[]}
 * @returns {number}
 */
function getCardResult(winingNumbers, myNumbers) {
  let cardResult = 0
  for (const number of myNumbers) {
    if (winingNumbers.includes(number)) {
      cardResult += 1
    }
  }

  return cardResult
}

/**
 * @param cards {{cardNumber: number, winingNumbers: number[], myNumbers: number[]}[]}
 * @param initialCards {{cardNumber: number, winingNumbers: number[], myNumbers: number[]}[]}
 * @returns {number}
 */
function calculate(cards, initialCards = cards) {
  let answer = cards.length
  for (const { winingNumbers, myNumbers, cardNumber } of cards) {
    const cardResult = getCardResult(winingNumbers, myNumbers)
    if (cardResult) {
      const newCards = initialCards.slice(cardNumber, cardNumber + cardResult)
      answer += calculate(newCards, initialCards)
    }
  }
  return answer
}

/**
 * @param input {string}
 * @returns {number}
 */
function part2(input) {
  const lines = parseInput(input)
  const cards = lines.map(parseLine)

  return calculate(cards)
}

console.log('--- Day 4: Scratchcards ---')
console.log('\npart1:')
const examplePart1Result = part1(example)
console.log('example:', examplePart1Result, examplePart1Result === 13)
console.log('answer:', part1(input))

console.log('\npart2:')
const examplePart2Result = part2(example)
console.log('example:', examplePart2Result, examplePart2Result === 30)
console.log('answer:', part2(input))
