export interface Repository <T> {
  findAll(): T[] | undefined
  findOne(item:{id:string}): T | undefined
/*   add(item: T): Promise<T | undefined>
  update(id:string,item: T): Promise<T | undefined>
  delete(item: {id:string}): Promise< T | undefined>
*/
}