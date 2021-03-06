import produce from 'immer'

export const closeMenu = () => {
  const $openMenu = document.querySelector('.operate-menu.open')
  if ($openMenu) {
    $openMenu.classList.remove('open')
  }
}

export const recursiveTreeData = data => func => {
  data.forEach(o => {
    func(o)
    if (Array.isArray(o.children) && o.children.length > 0) {
      recursiveTreeData(o.children)(func)
    }
  })
}

export const getNodeByIndexArr = (index_arr, data) => index_arr.reduce((result, i, idx) => idx === index_arr.length - 1 ? result[i] : result[i].children, data)

export const produceNewData = (key, prevData, func) => produce(prevData, draftState =>
  func(getNodeByIndexArr(key.split('-').slice(1), draftState))
)

export const getDropPosition = event => {
  const { top, bottom, height } = event.target.getBoundingClientRect()
  const { clientY } = event
  if (clientY <= top + height * 0.3) {
    return -1
  } else if (clientY >= bottom - height * 0.3) {
    return 1
  }
  return 0
}

export const getEventTargetByClass = (classname, target) => {
  if (!target) {
    return
  }
  if (target.classList.contains(classname)) {
    return target
  } else {
    return getEventTargetByClass(classname, target.parentElement)
  }
}
