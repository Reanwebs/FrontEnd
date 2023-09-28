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
        searchUser:createApiGetQuery(builder,'searchUser','get-user-by-name'),
        getUserJoinedCommunity:createApiMutation(builder,'getUserJoinedCommunity','get-joined-community','GET'),
        joinCommunity:createApiMutation(builder,'joinCommunity','join-community','PATCH'),
        leaveCommunity:createApiMutation(builder,'leaveCommunity','leave-community','PATCH')

    })
    
  })

  export const {
    useCreateCommunityMutation,
    useGetAllActiveCommunityMutation,
    useSearchUserMutation,
    useGetUserJoinedCommunityMutation,
    useJoinCommunityMutation,
    useLeaveCommunityMutation
} = userCommunitySlice
