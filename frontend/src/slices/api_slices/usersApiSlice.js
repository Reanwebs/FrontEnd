import { apiSlice } from "./apiSlice";
const USERS_URL = '/api/users'

export const userApliSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
      login : builder.mutation({
        query:(data)=>({
            url:`${USERS_URL}/login`,
            method:'POST',
            body:data
        })
      }),
      register: builder.mutation({
        query:(data)=>({
            url:`${USERS_URL}/register`,
            method:'POST',
            body:data
        })
      }),
      requestOtp:builder.mutation({
        query:(data)=>({
            url:`${USERS_URL}/otp`,
            method:'POST',
            body:data
        })
      })
    })
})

export const {useLoginMutation,useRegisterMutation,useRequestOtpMutation} = userApliSlice