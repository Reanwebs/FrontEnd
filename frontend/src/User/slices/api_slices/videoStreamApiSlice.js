import { apiSlice } from "../../../utils/apiSlice/apiSlice";
const STREAM_URL = '/api/video'




const createApiMutation = (builder,endpoint,url,method)=>{
    return builder.mutation({
      query:(data)=>({
        url:`${STREAM_URL}/${url}`,
        method:method,
        body:data,
      })
    })
  }

  const createApiGetQuery = (builder, endpoint, url) => {
    return builder.mutation({
      query: (data) => ({
        url: `${STREAM_URL}/${url}`,
        method: 'GET',
        params: `?userName=${data}`,
      }),
    });
  };
  export const streamApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
     uploadVideo:createApiMutation(builder,'uploadVideo','upload','POST'),
     getUserVideos:createApiGetQuery(builder,'getUserVideos','user-videos','GET')
    })
  }) 

  export const {
    useUploadVideoMutation,
    useGetUserVideosMutation
  } = streamApiSlice
