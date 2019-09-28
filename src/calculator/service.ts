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
  const badWordsCalculation = params.weightBadWords * badWordsCriteria(text)
  return {
    credibility: badWordsCalculation
  }
}

function userInfoTest(userId: string) : boolean {
  
  var Twitter = require('twitter');
  var Twit = require('twit')

  var client = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  var user = client.get('users/show', { user_id : userId}, function (err: any, data: any, response: any) { console.log(data) })
  console.log(user)
  
  return true
}

export {
  textCredibility, userInfoTest
}
