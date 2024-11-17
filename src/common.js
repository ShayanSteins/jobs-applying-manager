/**
 * Generate a UUID
 * @returns { string } generated UUID
 */
export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * Return the copy of an entire object, not its reference
 * @param {object | Array} inObject : array or object to copy
 * @return {object | Array} the copied object/array
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
 * Recursively compares two objects to return an array of their differences
 * @param {object} obj1 : first object
 * @param {object} obj2 : object to compare with
 * @return {array} array of field name pr empty array if identical
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
