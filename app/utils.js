export const alphabeticalOrder = (obj, details) => {  
  return Object.keys(obj).sort((a, b) => { 
    const aName = details[a].name
    const bName = details[b].name
    return (aName < bName) ? -1 : (aName > bName) ? 1 : 0
  })
}