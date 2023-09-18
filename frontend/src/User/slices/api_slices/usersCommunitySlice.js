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

 const createApiGetQuery = (builder, endpoint, url) => {
    return builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${url}`,
        method: 'GET',
        params: `?userName=${data}`,
      }),
    });
  };

  export const userCommunitySlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createCommunity:createApiMutation(builder,'createCommunity','create-community','POST'),
        getAllActiveCommunity:createApiMutation(builder,'getAllActiveCommunity','get-active-community','GET'),
        searchUser:createApiGetQuery(builder,'searchUser','get-user-by-name')
    })
    
  })

  export const {
    useCreateCommunityMutation,
    useGetAllActiveCommunityMutation,
    useSearchUserMutation
} = userCommunitySlice
