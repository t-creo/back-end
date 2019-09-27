import {TextCredibilityWeights, Credibility} from './models'


export function textCredibility(text: string, params: TextCredibilityWeights) : Credibility {
  console.log(text)
  console.log(params)
  return {
    credibility: 1
  }
}

