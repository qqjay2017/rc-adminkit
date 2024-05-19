export function treeMapBase(
  data: any[],
  callback: (r: any) => any,
  { childrenKey = 'children' } = {
    childrenKey: 'children',
  },
) {
  return data.map((item) => {
    const newItem = { ...item }
    if (item[childrenKey] && item[childrenKey].length > 0) {
      newItem[childrenKey] = treeMapBase(item[childrenKey], callback, {
        childrenKey,
      })
    }
    return callback(newItem)
  })
}
