import {TextCredibilityWeights, Credibility, TwitterUser, TweetCredibilityWeights, Tweet, Language} from './models'
import config from '../config'
import Twit from 'twit'
import enDictionary, { Dictionary } from 'dictionary-en-us'
import frDictionary from 'dictionary-fr'
import esDictionary from 'dictionary-es'
import util from 'util'
import NSpell from 'nspell'
import wash from 'washyourmouthoutwithsoap'
import SimpleSpamFilter, { SimpleSpamFilterParams } from './spam-filter'

async function dictionaryFactory(lang: Language) : Promise<Dictionary> {
  const dictionaries = {
    en: enDictionary,
    fr: frDictionary,
    es: esDictionary
  }
  return util.promisify(dictionaries[lang])()
}

function responseToTwitterUser(response: any) : TwitterUser {
  return {
    name: response.name,
    verified: response.verified,
    yearJoined: response.created_at.split(' ').pop(),
    followersCount: response.followers_count,
    friendsCount: response.friends_count
  }
}

function responseToTweet(response: any) : Tweet {
  return {
    text: response.text,
    lang: response.lang,
    user: responseToTwitterUser(response.user)
  }
}

function buildTwitClient() : Twit {
  return new Twit({
    consumer_key: config.TWITTER_CONSUMER_KEY,
    consumer_secret: config.TWITTER_CONSUMER_SECRET,
    app_only_auth: true
  })
}

function getCleanedWords(text: string) : string[] {
  return text.replace(/[.]|\n|,/g, ' ').split(' ')
}

function isBadWord(lang: Language) : (word: string) => boolean {
  return (word) => wash.check(lang, word)
}

function getBadWords(words: string[], lang: Language) : string[] {
  return words.filter(isBadWord(lang))
}

function badWordsCriteria(text: string, lang: Language) : number {
  const wordsInText = getCleanedWords(text)
  const badWordsInText = getBadWords(wordsInText, lang)
  return 100 - (100 * badWordsInText.length / wordsInText.length)
}

function spamCriteria(text: string, lang: Language) : number {
  const spamParams : SimpleSpamFilterParams = {
    minWords: 5,
    maxPercentCaps: 30,
    maxNumSwearWords: 2,
    lang: lang
  }
  const spamFilter : SimpleSpamFilter = new SimpleSpamFilter(spamParams)
  return spamFilter.isSpam(text)
    ? 0
    : 100
}

async function missSpellingCriteria(text: string, lang: Language) : Promise<number> {
  const wordsInText = getCleanedWords(text)
  const d: Dictionary = await dictionaryFactory(lang)
  const spellingChecker = new NSpell(d.aff, d.dic)
  const numOfMissSpells : number = wordsInText.reduce((acc, curr) =>
    spellingChecker.correct(curr)
      ? acc
      : acc + 1, 0)
  return 100 - (100 * numOfMissSpells / wordsInText.length)
}

async function calculateTextCredibility(text: string, lang: Language, params: TextCredibilityWeights) : Promise<Credibility> {
  const badWordsCalculation = params.weightBadWords * badWordsCriteria(text, lang)
  const spamCalculation = params.weightSpam * spamCriteria(text, lang)
  const missSpellingCalculation = params.weightMisspelling * (await missSpellingCriteria(text, lang))
  return {
    credibility: badWordsCalculation + spamCalculation + missSpellingCalculation
  }
}

async function getUserInfo(userId: string) : Promise<TwitterUser> {
  const client = buildTwitClient()
  try {
    const response = await client.get('users/show', { user_id: userId })
    return responseToTwitterUser(response.data)
  } catch (e) {
    return e
  }
}

async function getTweetInfo(tweetId: string) : Promise<Tweet> {
  const client = buildTwitClient()
  try {
    const response = await client.get('statuses/show', { id: tweetId })
    return responseToTweet(response.data)
  } catch (e) {
    return e
  }
}

function calculateUserCredibility(user: TwitterUser) : number {
  return getVerifWeight(user.verified) + getCreationWeight(user.yearJoined)
}

function calculateSocialCredibility(user: TwitterUser, maxFollowers: number) : number {
  const followersImpactCalc = followersImpact(user.followersCount, maxFollowers)
  const ffProportionCalc = ffProportion(user.followersCount, user.friendsCount)
  return followersImpactCalc + ffProportionCalc
}

async function twitterUserCredibility(userId: string) {
  return getUserInfo(userId)
    .then(response => {
      return  {
        credibility: calculateUserCredibility(response)
      }
    })
}

function scrapperTwitterUserCredibility(verified: boolean, accountCreationYear: number) : Credibility{
  const user:  TwitterUser = {
    name: '',
    verified: verified,
    yearJoined: accountCreationYear,
    followersCount: 0,
    friendsCount: 0,
  }
  return {
    credibility: calculateUserCredibility(user)
  }
}

async function calculateTweetCredibility(tweetId: string,
  params: TweetCredibilityWeights, maxFollowers: number) : Promise<Credibility> {
  try {
    const tweet: Tweet = await getTweetInfo(tweetId)
    const user: TwitterUser = tweet.user
    const userCredibility: number = calculateUserCredibility(user) * params.weightUser
    const textCredibility: number = (await calculateTextCredibility(tweet.text, tweet.lang, params)).credibility * params.weightText
    const socialCredibility: number = calculateSocialCredibility(user, maxFollowers) * params.weightSocial
    return {
      credibility: userCredibility + textCredibility + socialCredibility
    }
  } catch (e) {
    console.log(e)
    throw e
  }
}

function getVerifWeight(isUserVerified : boolean) : number {
  if (isUserVerified) {
    return 50
  } else {
    return 0
  }
}

function getCreationWeight(yearJoined : number) : number {
  const currentYear = new Date().getFullYear()
  const twitterCreationYear = 2006
  const maxAccountAge = currentYear - twitterCreationYear
  const accountAge = currentYear - yearJoined
  return 50 * (accountAge / maxAccountAge)
}

function followersImpact(userFollowers: number, maxFollowers: number) : number {
  if (maxFollowers === 0) {
    return 0
  } else {
    return (userFollowers / maxFollowers) * 50
  } 
}

function ffProportion(userFollowers: number, userFollowing: number) : number {
  return (userFollowers / (userFollowers + userFollowing)) * 50
}

async function socialCredibility(userID: string, maxFollowers: number) {
  const response: TwitterUser = await getUserInfo(userID)
  return {
    credibility: calculateSocialCredibility(response, maxFollowers)
  }
}

async function scrapedtweetCredibility(tweetText: string, lang: Language, tweetCredibilityWeights: TweetCredibilityWeights, twitterUser: TwitterUser, maxFollowers: number){
  const userCredibility: number = calculateUserCredibility(twitterUser) * tweetCredibilityWeights.weightUser
  const textCredibility: number = (await calculateTextCredibility(tweetText, lang, tweetCredibilityWeights)).credibility * tweetCredibilityWeights.weightText
  const socialCredibility: number = calculateSocialCredibility(twitterUser, maxFollowers) * tweetCredibilityWeights.weightSocial
  return {
    credibility: userCredibility + textCredibility + socialCredibility
  }
}

function scrapedSocialCredibility(followersCount: number, friendsCount: number, maxFollowers: number){
  const user : TwitterUser = {
    name: '',
    verified: false,
    yearJoined: 2018,
    followersCount: followersCount,
    friendsCount: friendsCount
  }
  return {
    credibility: calculateSocialCredibility(user, maxFollowers)
  }
}

export {
  calculateTextCredibility,
  twitterUserCredibility,
  calculateTweetCredibility,
  socialCredibility,
  scrapperTwitterUserCredibility,
  scrapedSocialCredibility,
  scrapedtweetCredibility
}
