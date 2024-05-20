import type { ComponentType, ReactElement } from 'react'
import { isValidElement } from 'react'
import { Route, Routes } from 'react-router-dom'
import { isValidElementType } from 'react-is'

import type { ResourceProps } from '../types'
import { ResourceContextProvider } from '../context/ResourceContextProvider'
import { RouteDataContextProvider } from './RouteDataContext'

export function Resource(props: ResourceProps) {
  const { create, edit, list, name, detail, more } = props

  return (
    <ResourceContextProvider value={name}>
      <Routes>
        {props.children}
        {(more || []).map((m, index) => (
          <Route
            key={m.path + index}
            path={m.path}
            element={(
              <RouteDataContextProvider type={m.path} label={m.label}>
                {getElement(m.element)}
              </RouteDataContextProvider>
            )}
          />
        ))}
        {create && (
          <Route
            path="create/*"
            element={(
              <RouteDataContextProvider type="create" {...create}>
                {getElement(create.element)}
              </RouteDataContextProvider>
            )}
          />
        )}
        {detail && (
          <Route
            path="detail/:id/*"
            element={(
              <RouteDataContextProvider type="detail" {...detail}>
                {getElement(detail.element)}
              </RouteDataContextProvider>
            )}
          />
        )}
        {edit && (
          <Route
            path="edit/:id/*"
            element={(
              <RouteDataContextProvider type="edit" {...edit}>
                {getElement(edit.element)}
              </RouteDataContextProvider>
            )}
          />
        )}
        {list && (
          <Route
            path="/*"
            element={(
              <RouteDataContextProvider type="list" {...list}>
                {getElement(list.element)}
              </RouteDataContextProvider>
            )}
          />
        )}
      </Routes>
    </ResourceContextProvider>
  )
}

function getElement(ElementOrComponent?: ComponentType<any> | ReactElement) {
  if (isValidElement(ElementOrComponent))
    return ElementOrComponent

  if (isValidElementType(ElementOrComponent)) {
    const Element = ElementOrComponent as ComponentType<any>
    return <Element />
  }

  return null
}

Resource.raName = 'Resource'

Resource.registerResource = ({
  create,
  edit,
  icon,
  list,
  name,
  options,
  detail,

  hasCreate,
  hasEdit,
  hasDetail,
}: ResourceProps) => ({
  name,
  options,
  hasList: !!list,
  hasCreate: !!create || !!hasCreate,
  hasEdit: !!edit || !!hasEdit,
  hasDetail: !!detail || !!hasDetail,
  icon,
})
