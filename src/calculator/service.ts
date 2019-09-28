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

async function getUserInfo(userId: string) {

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

async function twitterUserCredibility(userId: string) { 
  return getUserInfo(userId)
  .then(response => {
    const user : TwitterUser = {
      name: response.name,
      verified: response.verified,
      yearJoined : response.created_at.split(' ').pop()
    }
    const userCredCalculation = getVerifWeigth(user.verified) + getCreationWeight(user.yearJoined)
    return  {
      credibility: userCredCalculation
    }
  })  
}

function getVerifWeigth(isUserVerified : boolean) : number {
  if (isUserVerified) {
    return 50
  } else {
    return 0
  }
}

function getCreationWeight(yearJoined : number) : number {
  const currentYear = new Date().getFullYear()
  const twitterCreationYear = 2006
  const accountAge = currentYear - twitterCreationYear
  const maxAccountAge = currentYear - yearJoined
  return accountAge/maxAccountAge
}

export {
  textCredibility, getUserInfo, twitterUserCredibility
}