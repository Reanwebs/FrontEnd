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

 export const chapApilSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createChat:createApiMutation(builder,'createChat','private','GET'),

    })

 }) 

 export const {
    useCreateChatMutation,
 } = chapApilSlice