export const getUid = () => {
  return 'dgd-flowchart-' + Math.floor((1 + Math.random()) * 0x10000000)
    .toString(16)
    .substring(1)
}

export const getShape = (shape) => {
  switch (shape) {
    case 'stadium': return '([TEXT])'
    case 'subroutine': return '[[TEXT]]'
    case 'cylindrical': return '[(TEXT)]'
    case 'circle': return '((TEXT))'
    case 'asymmetric': return '>TEXT]'
    case 'rhombus': return '{TEXT}'
    case 'hexagone': return '{{TEXT}}'
    case 'parallelogram': return '[/TEXT/]'
    case 'parallelogram_alt': return '[\\TEXT\\]'
    case 'trapezoid': return '[/TEXT\\]'
    case 'trapezoid_alt': return '[\\TEXT/]'
    case 'round':
    default: return '(TEXT)'
  }
}

const getLinkType = (type) => {
  switch (type) {
    case 'line': return '---'
    case 'dotted': return '-.->'
    case 'thick': return '==>'
    case 'multi_round': return 'o--o'
    case 'multi_arrow': return '<-->'
    case 'multi_cross': return 'x--x'
    case 'arrow':
    default: return '-->'
  }
}

const getTextLinkType = (type) => {
  switch (type) {
    case 'line': return '-- TEXT ---'
    case 'dotted': return '-. TEXT .->'
    case 'thick': return '== TEXT ==>'
    case 'multi_round': return 'o-- TEXT --o'
    case 'multi_arrow': return '<-- TEXT -->'
    case 'multi_cross': return 'x-- TEXT --x'
    case 'arrow':
    default: return '-- TEXT -->'
  }
}

export const getLink = (link) => {
  let type, text
  if (typeof link === 'object') {
    type = link.type
    text = link.text
  } else {
    type = link
    text = ''
  }

  if (text) {
    return getTextLinkType(type).replace('TEXT', text)
  } else {
    return getLinkType(type)
  }
}

export const recursiveFind = (tree, id) => {
  let found = null
  for (const node of tree) {
    id = typeof node.id === 'number' ? +id : id

    if (node.id === id) return node
    if (node.children) found = recursiveFind(node.children, id)
  }

  return found
}
