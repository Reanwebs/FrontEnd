import { apiSlice } from "../../../utils/apiSlice/apiSlice";
const CHAT_URL = '/chat'

const createApiMutation = (builder,endpoint,url,method)=>{
  return builder.mutation({
    query:(data)=>({
      url:`${CHAT_URL}/${url}`,
      method:method,
      body:data
    })
  })
}

export const chatApilSlice = apiSlice.injectEndpoints({
  endpoints:(builder)=>({
   getChat:createApiMutation(builder,'getChat','get','POST'),
  })
}) 

export const {
  useGetChatMutation,
} = chatApilSlice

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints:(builder)=>({
    createChat:createApiMutation(builder,'createChat','create','POST')
  })
})

export const{
  useCreateChatMutation,
} = chatApiSlice