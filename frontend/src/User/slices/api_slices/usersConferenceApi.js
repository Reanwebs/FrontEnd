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
      startPrivateConference:createApiMutation(builder,'startPrivateConference','start-private-conference','POST'),
      joinPrivateConference:createApiMutation(builder,'joinPrivateConference','join-private-conference','PATCH'),
      scheduleConference:createApiMutation(builder,'scheduleConference','schedule-private-conference','POST'),
      scheduledConference:createApiMutation(builder,'scheduledConference','scheduled-conference','GET'),
    })
})

export const {
  useStartPrivateConferenceMutation,
  useJoinPrivateConferenceMutation,
  useScheduleConferenceMutation,
  useScheduledConferenceMutation
} = userConferenceApiSlice