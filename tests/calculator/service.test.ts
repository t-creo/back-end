import assert from 'assert'
import { removeHashtag } from '../../src/calculator/service'

describe('remove hashtags', () => {
  it('text with only one hashtag in the beginning', () => {
    assert.equal(removeHashtag('#hello'), '')
  })

  it('text with one hashtag in the beginning', () => {
    assert.equal(removeHashtag('#hello bye'), 'bye')
  })

  it('text with many hashtags', () => {
    assert.equal(removeHashtag('#hello bye #house car'), 'bye car')
  })

  it('text with all hashtags', () => {
    assert.equal(removeHashtag('#hello #bye #car'), '')
  })

  it('text with no hashtag', () => {
    assert.equal(removeHashtag('hello bye'), 'hello bye')
  })

  it('text in arabic with no hashtag', () => {
    assert.equal(removeHashtag('لجت معاليق الضماير'), 'لجت معاليق الضماير')
  })

  it('text in arabic with one hashtag', () => {
    assert.equal(removeHashtag('لجت معاليق #مرحبّا الضماير'), 'لجت معاليق الضماير')
  })

  it('text in arabic with one hashtag inverted', () => {
    assert.equal(removeHashtag('لجت# معاليق مرحبّا الضماير'), 'معاليق مرحبّا الضماير')
  })

  it('text in arabic with many hashtags', () => {
    assert.equal(removeHashtag('لجت# #معاليق مرحبّا الضماير#'), 'مرحبّا')
  })
})