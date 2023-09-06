import { apiSlice } from "../../../utils/apiSlice/apiSlice";
const CONFERENCE_URL = '/api/conference'


const createApiMutation = (builder,endpoint,url,method)=>{
  return builder.mutation({
    query:(data)=>({
      url:`${CONFERENCE_URL}/${url}`,
      method:method,
      body:data
    })
  })
}

export const userConferenceApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
      scheduleConference:createApiMutation(builder,'scheduleConference','schedule-private-conference','POST')
    })
})

export const {useScheduleConferenceMutation} = userConferenceApiSlice