import { apiSlice } from "../../../utils/apiSlice/apiSlice";
const ADMIN_URL = '/api/admin';


const createApiMutation= (builder,endpoint,url,method)=>{
    return builder.mutation({
        query:(data)=>({
            url:`${ADMIN_URL}/${url}`,
            method:method,
            body:data
        })
    })
}

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        adminLogin:createApiMutation(builder,'adminLogin','login','POST'),
        adminLogout:createApiMutation(builder,'adminLogout','logout','POST')
    })
})

export const {useAdminLoginMutation,useAdminLogoutMutation} = adminApiSlice



