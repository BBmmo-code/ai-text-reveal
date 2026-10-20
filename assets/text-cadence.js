// 保留组合 emoji 与带组合符的字符；旧浏览器回退到 Unicode 码点。
const graphemes = typeof Intl.Segmenter === 'function' ? new Intl.Segmenter(undefined, { granularity: 'grapheme' }) : null
export function splitCharacters(text) {
  return graphemes ? Array.from(graphemes.segment(text), item => item.segment) : Array.from(text)
}

// 按中文词组缓冲成小段；显示速度与段间停顿分开，避免匀速打字机效果。
const segmenter = typeof Intl.Segmenter === 'function' ? new Intl.Segmenter('zh', { granularity: 'word' }) : null

export function textDelays(text) {
  const words = segmenter
    ? Array.from(segmenter.segment(text || ''), item => item.segment)
    : (text || '').match(/[A-Za-z0-9]+(?:[./_-][A-Za-z0-9]+)*|[\s\S]/gu) || []
  const sizes = [5, 10, 4, 13, 7, 9]
  const paces = [34, 9, 48, 7, 24, 12]
  const pauses = [0, 70, 0, 430, 90, 650]
  const chunks = []
  let pending = ''
  let length = 0
  for (const word of words) {
    pending += word
    length += splitCharacters(word).length
    if (length >= sizes[chunks.length % sizes.length]) {
      chunks.push(pending)
      pending = ''
      length = 0
    }
  }
  if (pending) chunks.push(pending)

  let elapsed = 0
  return chunks.flatMap((chunk, index) => {
    const letters = splitCharacters(chunk)
    elapsed += pauses[index % pauses.length]
    return letters.map((_, position) => {
      const delay = elapsed
      const progress = position / Math.max(letters.length - 1, 1)
      elapsed += Math.round(paces[index % paces.length] * (.75 + .5 * Math.sin(Math.PI * progress)))
      return delay
    })
  })
}
