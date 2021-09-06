export function min (...params) {
  let res
  params.forEach((item) => {
    if (item > res) {
      return
    }
    res = item
  })
  return res
}

export function max (...params) {
  let res
  params.forEach((item) => {
    if (item < res) {
      return
    }
    res = item
  })
  return res
}

export function normalizeHex (hex) {
  return String(hex).trim().replace(/^#/, '').toLowerCase()
}
