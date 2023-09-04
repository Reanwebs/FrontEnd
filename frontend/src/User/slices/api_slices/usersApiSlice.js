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
export const userApliSlice = apiSlice.injectEndpoints({
  endpoints:(builder)=>({
    login:createApiMutation(builder,'login','login','POST'),
    register:createApiMutation(builder,'register','signup','POST'),
    requestOtp:createApiMutation(builder,'requestOtp','otp','POST'),
    validUserName:createApiMutation(builder,'validUserName','valid-name','POST'),
    logout:createApiMutation(builder,'logout','logout','POST'),
    resendOtp:createApiMutation(builder,'resendOtp','resend-otp','POST'),
    googleLogin:createApiMutation(builder,'googleLogin','google-login','POST'),
    validateUserStatus:createApiMutation(builder,'validateUserStatus','validate-user','POST')
  })
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useRequestOtpMutation,
  useValidUserNameMutation,
  useLogoutMutation,
  useResendOtpMutation,
  useGoogleLoginMutation,
  useValidateUserStatusMutation
} = userApliSlice

