import {TextCredibilityWeights, Credibility} from './models'
import Filter, { FilterParams } from 'bad-words'
import SimpleSpamFilter, { SimpleSpamFilterParams } from 'simple-spam-filter'

const BAD_WORD_PLACEHOLDER = '*'


function getCleanedWords(text: string) : string[] {
  return text.replace(/[.]|\n|,/g, ' ').split(' ')
}

function isBadWord(word: string) : boolean {
  return word.split('').every(i => i === BAD_WORD_PLACEHOLDER)
}

function getBadWords(words: string[]) : string[] {
  return words.filter(isBadWord)
}

function badWordsCriteria(text: string) : number {
  const filterParams : FilterParams = {
    placeHolder: BAD_WORD_PLACEHOLDER
  }
  const filter = new Filter(filterParams)
  const cleanedString = filter.clean(text)
  const wordsInText = getCleanedWords(cleanedString)
  const badWordsInText = getBadWords(wordsInText)
  return 100 - (100 * badWordsInText.length / wordsInText.length)
}

function spamCriteria(text: string) : number {
  const spamParams : SimpleSpamFilterParams = {
    minWords: 5,
    maxPercentCaps: 30,
    maxNumSwearWords: 2
  }
  const spamFilter : SimpleSpamFilter = new SimpleSpamFilter(spamParams)
  return spamFilter.isSpam(text)
    ? 0
    : 100
}

function textCredibility(text: string, params: TextCredibilityWeights) : Credibility {
  const badWordsCalculation = params.weightBadWords * badWordsCriteria(text)
  const spamCalculation = params.weightSpam * spamCriteria(text)
  return {
    credibility: badWordsCalculation + spamCalculation
  }
}

export {
  textCredibility
}
