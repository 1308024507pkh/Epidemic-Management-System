function details(state={
  loading:true,
  data:{
    data:{
      tab: "",
      content: "",
      title: "",
      last_reply_at: "",
      good: '',
      top: '',
      create_at: "",
      author: {
        loginname: "",
        avatar_url: ""
      },
      replies: [],
      }
  }
}, action){
  switch(action.type){
    case 'DETAILS_SUCC':
      return {
        loading:false,
        data:action.data.data
      }
    default:
      return state
  }
}

export default details