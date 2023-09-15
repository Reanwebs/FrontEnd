import { apiSlice } from "../../../utils/apiSlice/apiSlice";
const USERS_URL = '/api/user'

const createApiMutation = (builder,endpoint,url,method)=>{
    return builder.mutation({
      query:(data)=>({
        url:`${USERS_URL}/${url}`,
        method:method,
        body:data
      })
    })
  }

  export const userCommunitySlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createCommunity:createApiMutation(builder,'createCommunity','create-community','POST'),
        getAllActiveCommunity:createApiMutation(builder,'getAllActiveCommunity','get-community','GET')
    })
    
  })

  export const {
    useCreateCommunityMutation,
    useGetAllActiveCommunityMutation
} = userCommunitySlice
