import {TextCredibilityWeights, Credibility, TwitterUser} from './models'
import Filter, { FilterParams } from 'bad-words'
import Twit from 'twit'

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
  const badWordsCalculation = params.weightBadWords * badWordsCriteria(text)
  return {
    credibility: badWordsCalculation
  }
}

async function userInfoTest(userId: string)  {

  const client = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY || '',
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET || '',
    app_only_auth: true
  })
  try {
    const response = await client.get('users/show', { user_id: userId })
    return response.data
  } catch (e) {
    return e
  }
}

async function whatever(userId: string) { 
  // aqui deberia poder llenar la interfaz 
  // para tenerla disponible en varias funciones y hacer calculos
  return userInfoTest(userId)
  .then(response => {
    return response.name
  })
}

export {
  textCredibility, whatever
}
