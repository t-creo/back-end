import {TextCredibilityWeights, Credibility} from './models'
import Filter, { FilterParams } from 'bad-words'

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

function textCredibility(text: string, params: TextCredibilityWeights) : Credibility {
  console.log(text)
  console.log(params)
  const badWordsCalculation = params.weightBadWords * badWordsCriteria(text)
  return {
    credibility: params.weightBadWords * badWordsCalculation
  }
}

export {
  textCredibility
}
