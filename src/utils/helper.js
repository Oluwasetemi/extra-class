/**
 * 
 * @param {string} type - html tag
 * @param {Record<string, string>} props object of al the attributes
 * @param {Array<HTMLElement>} children - A vary array of HTMLElement(anything we will use appendChild to add)
 * @returns 
 */
export function mk(type, props, children) {
  // create element of type `type`
  const el = document.createElement(type)
  // set properties of the element if `props` is provided, e.g. className, style, etc.
  if (props) Object.assign(el, props)
  // append children to the element if `children` is provided
  if (children) el.prepend(...children)
  return el
}

/**
 * 
 * @param {number} start the start value, defaults to 1
 * @param {number} stop the stop value for the range generator
 * @param {number} step the rate of the range generation which defaults to 1
 * @returns 
 */
export function range(start, stop, step = 1) {
  if (!stop) {
    stop = start;
    start = 1
  }
  let range = [];
  for (let i = start; i <= stop; i+=step) {
    range.push(i)
  }
  return range
}

