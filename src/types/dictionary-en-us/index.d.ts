declare module 'dictionary-en-us' {
  interface Dictionary {
    aff: string
    dic: string
  }
  export default function(
    callback: (error: NodeJS.ErrnoException, result: Dictionary) => void) : void
}
