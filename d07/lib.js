/**
 * @param hand {string}
 * @returns {boolean}
 */
export function isFiveOfKind(hand) {
  return hand[0] === hand[1] && hand[1] === hand[2] && hand[2] === hand[3] && hand[3] === hand[4]
}

/**
 * @param hand {string}
 * @param alphabet {string}
 * @returns {boolean}
 */
export function isFourOfKind(hand, alphabet) {
  const arr = Array(alphabet.length).fill(0)
  for (const handElement of hand) {
    arr[alphabet.indexOf(handElement)]++
  }

  return arr.includes(4)
}

/**
 * @param hand {string}
 * @param alphabet {string}
 * @returns {boolean}
 */
export function isFullHouse(hand, alphabet) {
  const arr = Array(alphabet.length).fill(0)
  for (const handElement of hand) {
    arr[alphabet.indexOf(handElement)]++
  }

  return arr.includes(3) && arr.includes(2)
}

/**
 * @param hand {string}
 * @param alphabet {string}
 * @returns {boolean}
 */
export function isThreeOfKind(hand, alphabet) {
  const arr = Array(alphabet.length).fill(0)
  for (const handElement of hand) {
    arr[alphabet.indexOf(handElement)]++
  }

  return arr.includes(3) && !arr.includes(2)
}

/**
 * @param hand {string}
 * @param alphabet {string}
 * @returns {boolean}
 */
export function isTwoPair(hand, alphabet) {
  const arr = Array(alphabet.length).fill(0)
  for (const handElement of hand) {
    arr[alphabet.indexOf(handElement)]++
  }

  return arr.filter(x => x === 2).length === 2
}

/**
 * @param hand {string}
 * @param alphabet {string}
 * @returns {boolean}
 */
export function isOnePair(hand, alphabet) {
  const arr = Array(alphabet.length).fill(0)
  for (const handElement of hand) {
    arr[alphabet.indexOf(handElement)]++
  }

  return arr.filter(x => x === 2).length === 1 && !arr.includes(3)
}

/**
 * @param alphabet {string}
 * @returns {function(*, *): number}
 */
export function sortCards(alphabet) {
  /**
   * @param a {{rank: number, hand: string}}
   * @param b {{rank: number, hand: string}}
   * @returns {number}
   */
  const sortFn = function (a, b) {
    if (a.rank === b.rank) {
      for (let i = 0; i < 5; i++) {
        if (a.hand[i] !== b.hand[i]) {
          return alphabet.indexOf(a.hand[i]) - alphabet.indexOf(b.hand[i])
        }
      }
    }
    return a.rank - b.rank
  }
  return sortFn
}

