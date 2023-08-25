import { apiSlice } from "./apiSlice";
const USERS_URL = '/api/user'

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
            url:`${USERS_URL}/signup`,
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
      }),
      validUserName:builder.mutation({
        query:(data)=>({
          url:`${USERS_URL}/valid-name`,
          method:'POST',
          body:data
        })
      }),
      logout:builder.mutation({
        query:(data)=>({
          url:`${USERS_URL}/logout`,
          method:'POST',
          body:data
        })
      })
    })
})

export const {useLoginMutation,useRegisterMutation,useRequestOtpMutation,useValidUserNameMutation,useLogoutMutation} = userApliSlice