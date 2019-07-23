export const isFunction = (obj: any): obj is Function => Object.prototype.toString.call(obj) === '[object Function]';