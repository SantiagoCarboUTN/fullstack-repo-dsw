export interface Repository <T> {
  findAll(): Promise<T[] | undefined>
  findOne(item:{[key:string ]:string |number }): Promise<T | undefined>
  add(item: T): Promise<T | undefined>
  update(item: T):Promise< T | undefined>
  delete(item: {[key:string ]:string |number  }): Promise<T | undefined>
}