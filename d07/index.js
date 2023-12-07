import { example, input } from './input.js'

const ALPHABET = '23456789TJQKA'

/**
 * @param hand {string}
 * @returns {number}
 */
function getRank(hand) {
  if (isFiveOfKind(hand)) return 7
  if (isFourOfKind(hand)) return 6
  if (isFullHouse(hand)) return 5
  if (isThreeOfKind(hand)) return 4
  if (twoPair(hand)) return 3
  if (onePair(hand)) return 2
  return 1
}

/**
 * @param input {string}
 * @returns {{hand: string, bid: number, rank: number}[]}
 */
function parseInput(input) {
  return input.trim().split('\n').map(line => {
    const [hand, bid] = line.split(' ')
    return { hand, bid: parseInt(bid), rank: getRank(hand) }
  })
}

/**
 * @param hand {string}
 * @returns {boolean}
 */
function isFiveOfKind(hand) {
  return hand[0] === hand[1] && hand[1] === hand[2] && hand[2] === hand[3] && hand[3] === hand[4]
}

/**
 * x....
 * .x...
 * ..x..
 * ...x.
 * ....x
 * @param hand {string}
 * @returns {boolean}
 */
function isFourOfKind(hand) {
  return (
    hand[1] === hand[2] && hand[2] === hand[3] && hand[3] === hand[4]
    || hand[0] === hand[2] && hand[2] === hand[3] && hand[3] === hand[4]
    || hand[0] === hand[1] && hand[1] === hand[3] && hand[3] === hand[4]
    || hand[0] === hand[1] && hand[1] === hand[2] && hand[2] === hand[4]
    || hand[0] === hand[1] && hand[1] === hand[2] && hand[2] === hand[3]
  )
}

/**
 * @param hand {string}
 * @returns {boolean}
 */
function isFullHouse(hand) {
  const arr = Array(ALPHABET.length).fill(0)
  for (const handElement of hand) {
    arr[ALPHABET.indexOf(handElement)]++
  }

  return arr.includes(3) && arr.includes(2)
}

/**
 * @param hand {string}
 * @returns {boolean}
 */
function isThreeOfKind(hand) {
  const arr = Array(ALPHABET.length).fill(0)
  for (const handElement of hand) {
    arr[ALPHABET.indexOf(handElement)]++
  }

  return arr.includes(3) && !arr.includes(2)
}

/**
 * @param hand {string}
 * @returns {boolean}
 */
function twoPair(hand) {
  const arr = Array(ALPHABET.length).fill(0)
  for (const handElement of hand) {
    arr[ALPHABET.indexOf(handElement)]++
  }

  return arr.filter(x => x === 2).length === 2
}

/**
 * @param hand {string}
 * @returns {boolean}
 */
function onePair(hand) {
  const arr = Array(ALPHABET.length).fill(0)
  for (const handElement of hand) {
    arr[ALPHABET.indexOf(handElement)]++
  }

  return arr.filter(x => x === 2).length === 1 && !arr.includes(3)
}

/**
 * @param input {string}
 * @returns {number}
 */
function main(input) {
  const cards = parseInput(input)
  const sortedCards = cards.sort((a, b) => {
    if (a.rank === b.rank) {
      for (let i = 0; i < 5; i++) {
        if (a.hand[i] !== b.hand[i]) {
          return ALPHABET.indexOf(a.hand[i]) - ALPHABET.indexOf(b.hand[i])
        }
      }
    }
    return a.rank - b.rank
  })

  return sortedCards.reduce((acc, card, currentIndex) => acc + card.bid * (currentIndex + 1), 0)
}

console.log('--- Day 7: Camel Cards ---')
console.log('\npart1:')
const examplePart1Result = main(example)
console.log('example:', examplePart1Result, examplePart1Result === 6440)
const part1Result = main(input)
console.log('answer:', part1Result)
//
// console.log('\npart2:')
// const examplePart2Result = main(parseInputPart2(example))
// console.log('example:', examplePart2Result, examplePart2Result)
// const part2Result = main(parseInputPart2(input))
// console.log('answer:', part2Result, part2Result === 20048741)
