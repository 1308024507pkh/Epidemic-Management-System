function list(state={
  data:[],   // 列表数据
  loading: true,
}, action){
  switch(action.type){
    case 'LIST_UPLOAD_SUCC':
      return {
        data:action.data.data,
        loading: false,
      }
    case 'LIST_UPLOAD_ERROR':
    return {
      data:{
        data:[]
      },
      loading: false,
    }
    default:
      return state
  }
}

export default list