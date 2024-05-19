import { useRemoteResourceContext } from '.'

interface UseCheckActionsType {
  (actions: string): boolean[]
  (actions: string[]): boolean[]
  (actions: string | string[]): boolean[]
}

export const useCheckActions: UseCheckActionsType = (
  actions: string | string[],
) => {
  const { permissionKeyMap } = useRemoteResourceContext()
  if (typeof actions === 'string')
    return [permissionKeyMap[actions] || false]

  if (Array.isArray(actions))
    return actions.map(action => permissionKeyMap[action] || false)

  return [false]
}
