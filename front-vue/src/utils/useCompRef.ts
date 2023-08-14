/**
 * 获取含有组件类型的 ref
 * @param _comp 组件，用于推导组件类型
 */
export function useCompRef<T extends abstract new (...args: any) => any>(
  _comp: T
) {
  return ref<InstanceType<T>>();
}
