import { createContext } from 'react'

/**
 *存储当前资源名称。
 *
 *使用useResource()钩子函数来读取上下文。
 *
 * @example
 *
 * import { useResourceContext, useTranslate } from 'ra-core';
 *
 * const MyCustomEditTitle = props => {
 *     const name = useResourceContext(props);
 *
 *     return (
 *         <h1>{translate(`${name}.name`)}</h1>
 *     );
 * };
 */
export const ResourceContext = createContext<ResourceContextValue>(undefined)

export type ResourceContextValue = string | undefined
