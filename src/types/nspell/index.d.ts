declare module 'nspell' {
  class NSpell {
    constructor(aff: any, dic: any)
    correct(word: string): boolean
  }
  export default NSpell
}
