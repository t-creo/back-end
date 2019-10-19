
declare module 'dictionary-es' {
  import { Dictionary } from 'dictionary-en-us'
  export default function(
    callback: (error: NodeJS.ErrnoException, result: Dictionary) => void) : void
}
