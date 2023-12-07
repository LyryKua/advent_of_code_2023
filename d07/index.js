import { example, input } from './input.js'
import { isFourOfKind, isFiveOfKind, isThreeOfKind, isFullHouse, isTwoPair, isOnePair, sortCards } from './lib.js'

const ALPHABET_PART1 = '23456789TJQKA'
const ALPHABET_PART2 = 'J23456789TQKA'

/**
 * @param hand {string}
 * @returns {number}
 */
function getRankPart1(hand) {
  if (isFiveOfKind(hand)) return 7
  if (isFourOfKind(hand, ALPHABET_PART1)) return 6
  if (isFullHouse(hand, ALPHABET_PART1)) return 5
  if (isThreeOfKind(hand, ALPHABET_PART1)) return 4
  if (isTwoPair(hand, ALPHABET_PART1)) return 3
  if (isOnePair(hand, ALPHABET_PART1)) return 2
  return 1
}

/**
 * @param hand {string}
 * @returns {number}
 */
function getRankPart2(hand) {
  const arr = Array(ALPHABET_PART2.length).fill(0)
  for (const handElement of hand) {
    arr[ALPHABET_PART2.indexOf(handElement)]++
  }

  const amountOfJokers = arr[0]

  if (isFiveOfKind(hand)) {
    return 7
  }
  if (isFourOfKind(hand, ALPHABET_PART2)) {
    if (amountOfJokers === 1 || amountOfJokers === 4) {
      return 7
    }
    return 6
  }
  if (isFullHouse(hand, ALPHABET_PART2)) {
    if (amountOfJokers === 2 || amountOfJokers === 3) {
      return 7
    }
    return 5
  }
  if (isThreeOfKind(hand, ALPHABET_PART2)) {
    if (amountOfJokers === 1) {
      return 6
    }
    if (amountOfJokers === 2) {
      return 7
    }
    if (amountOfJokers === 3) {
      return 6
    }
    return 4
  }
  if (isTwoPair(hand, ALPHABET_PART2)) {
    if (amountOfJokers === 1) {
      return 5
    }
    if (amountOfJokers === 2) {
      return 6
    }
    return 3
  }
  if (isOnePair(hand, ALPHABET_PART2)) {
    if (amountOfJokers === 1 || amountOfJokers === 2) {
      return 4
    }
    return 2
  }
  if (amountOfJokers === 1) {
    return 2
  }
  return 1
}

/**
 * @param input {string}
 * @param getRank {function(string): number}
 * @returns {{hand: string, bid: number, rank: number}[]}
 */
function parseInput(input, getRank) {
  return input.trim().split('\n').map(line => {
    const [hand, bid] = line.split(' ')
    return { hand, bid: parseInt(bid), rank: getRank(hand) }
  })
}

/**
 * @param input {string}
 * @returns {number}
 */
function part1(input) {
  const cards = parseInput(input, getRankPart1)
  const sortedCards = cards.sort(sortCards(ALPHABET_PART1))

  return sortedCards.reduce((acc, card, currentIndex) => acc + card.bid * (currentIndex + 1), 0)
}

/**
 * @param input {string}
 * @returns {number}
 */
function part2(input) {
  const cards = parseInput(input, getRankPart2)
  const sortedCards = cards.sort(sortCards(ALPHABET_PART2))

  return sortedCards.reduce((acc, card, currentIndex) => acc + card.bid * (currentIndex + 1), 0)
}

console.log('--- Day 7: Camel Cards ---')
console.log('\npart1:')
const examplePart1Result = part1(example)
console.log('example:', examplePart1Result, examplePart1Result === 6440)
const part1Result = part1(input)
console.log('answer:', part1Result, part1Result === 247823654)

console.log('\npart2:')
const examplePart2Result = part2(example)
console.log('example:', examplePart2Result, examplePart2Result === 5905)
const part2Result = part2(input)
console.log('answer:', part2Result, part2Result === 245461700)
