

// NOTE: extending existing interface
export interface Context {
  request:{
    params:string
    body:any

  }
  user:any
  status:any
  body:any
}