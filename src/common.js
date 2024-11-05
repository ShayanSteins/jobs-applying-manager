/**
 * Génération d'un ID unique
 */
export function createUUID() {
  // http://www.ietf.org/rfc/rfc4122.txt
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  var uuid = s.join('')
  return 'Id' + uuid
}

/**
 * Renvoi la copie d'un objet complet et non de sa référence
 * @param {object | Array} inObject : objet à copier
 */
export function deepCopy(inObject) {
  let outObject, value, key

  if (typeof inObject !== 'object' || inObject instanceof Date || inObject === null) {
    return inObject
  }
  outObject = Array.isArray(inObject) ? [] : {}

  for (key in inObject) {
    value = inObject[key]
    outObject[key] = deepCopy(value)
  }

  return outObject
}

/**
 * Compare récurcivement un obj2 à un obj1. Retourne un tableau contenant le nom des différences, ou un tableau vide s'ils sont identiques
 * @param {object} obj1 : objet d'origine
 * @param {object} obj2 : objet à comparer
 */
export function deepComparison(obj1, obj2) {
  let modifications = []

  for (const key in obj1) {
    const val1 = obj1[key]
    const val2 = obj2[key]
    if (val1 !== val2) {
      if (typeof val1 === 'object' && typeof val2 === 'object') {
        const subComparison = deepComparison(val1, val2)
        if (subComparison.length > 0) modifications.push(key)
      } else {
        modifications.push(key)
      }
    }
  }
  return modifications
}
