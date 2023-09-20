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

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints:(builder)=>({
   getChat:createApiMutation(builder,'getChat','get-chatlist','POST'),
   createChat:createApiMutation(builder,'createChat','create-chat','POST'),
   getChatHistory:createApiMutation(builder,'getChatHistory','get-chat','POST'),
  })
}) 

export const {
  useGetChatMutation,
  useCreateChatMutation,
  useGetChatHistoryMutation,
} = chatApiSlice
