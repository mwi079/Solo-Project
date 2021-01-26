
// NOTE: extending existing interface
export interface Context {
  request:{
    params:{id:string}
    body:{tags:string,email:string,content:string, title:string, comment:string,id:string,_id:string}

  }
  user:any
  status:number
  body:any
}