import { apiSlice } from "../../../utils/apiSlice/apiSlice";
const MONETIZATION_URL = "/api/monitaization"

const createApiMutation = (builder,endpoint,url,method)=>{
    return builder.mutation({
      query:(data)=>({
        url:`${MONETIZATION_URL}/${url}`,
        method:method,
        body:data
      })
    })
  }


  export const monetizationApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createWallet:createApiMutation(builder,'createWallet','create-wallet','POST'),
        updateWallet:createApiMutation(builder,'updateWallet','update-wallet','PUT'),
        rewardUser:createApiMutation(builder,'rewardUser','participent-reward','POST')
    })
  })

  export const {
     useCreateWalletMutation,
     useUpdateWalletMutation,
     useRewardUserMutation
  }=
  monetizationApiSlice

