export interface Credibility {
  credibility: number
}

export interface TextCredibilityWeights {
  weightSpam: number
  weightBadWords: number
  weightMisspelling: number
}

export interface TwitterUser {
  name: string
  verified: boolean
  yearJoined: number
}