
/*
 * Module dependencies.
 */

import wash from 'washyourmouthoutwithsoap'

interface SimpleSpamFilterParams {
  minWords?: number
  maxPercentCaps?: number
  maxNumSwearWords?: number
}
/*
 * Checks if a given tweet is spam.
 * @param {number} minWords - the minimum number of words for the tweet
 * @param {number} maxPercentCaps - the percentage of characters that can be
 *                                  capitalized
 * @param {number} maxNumSwearWords - the maximum number of swear words in the
 *                                    tweet
 * @returns {boolean}
 * @api public
 */
class SimpleSpamFilter {
  minWords?: number
  maxPercentCaps?: number
  maxNumSwearWords?: number

  constructor (opts: SimpleSpamFilterParams) {
    this.minWords = opts.minWords
    this.maxPercentCaps = opts.maxPercentCaps
    this.maxNumSwearWords = opts.maxNumSwearWords
  }

  isSpam(tweet: string): boolean {
    if (this.minWords !== undefined &&
      tweet.split(' ').length < this.minWords) {
      console.log('`%s` does not meet minimum word requirement', tweet)
      return true
    }

    if (this.maxPercentCaps !== undefined &&
      percentCaps(tweet) > this.maxPercentCaps) {
      console.log('`%s` exceeds max percentage of capitalized characters', tweet)
      return true
    }

    if (this.maxNumSwearWords !== undefined &&
      numSwearWords(tweet) > this.maxNumSwearWords) {
      console.log('`%s` exceeds max number of swear words', tweet)
      return true
    }

    console.log('`%s` is not spam', tweet)
    return false

  }
}


/*
 * Returns the percentage of the tweet that consists of capitalized characters.
 * @param tweet - the tweet to analyze
 * @returns {number}
 * @api private
 */

function percentCaps (tweet: string) {
  var capCount = 0
  var chars = tweet.split('')

  chars.forEach(function (char) {
    if (char === char.toUpperCase()) {
      capCount++
    }
  })

  return (capCount / tweet.length) * 100
}

/*
 * Returns the number of swear words in the tweet.
 * @param tweet - the tweet to analyze
 * @returns {number}
 * @api private
 */

function numSwearWords (tweet: string) {
  function getCleanedWords(text: string) : string[] {
    return text.replace(/[.]|\n|,/g, ' ').split(' ')
  }
  return getCleanedWords(tweet).filter(word => wash.check('en', word)).length
}

/*
 * Module exports.
 */

export default SimpleSpamFilter
export {
  SimpleSpamFilterParams
}
