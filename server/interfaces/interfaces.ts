
// NOTE: extending existing interface
export interface Context {
  request:{
    params:{id:string}
    body:any

  }
  user:any
  status:number
  body:any
}