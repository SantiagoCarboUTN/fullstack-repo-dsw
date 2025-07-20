export interface Repository <T> {
  findAll(): Promise<T[] | undefined>
  findOne(item:{[key:string]:string}): T | undefined
  add(item: T): T | undefined
  update(item: T): T | undefined
  delete(item: {[key:string]:string}):T | undefined
}