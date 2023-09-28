import React, { useState ,useEffect} from 'react';
import './Group.css';
import { useGetAllActiveCommunityMutation } from '../../slices/api_slices/usersCommunitySlice';
import {toast} from 'react-toastify'
import { Button } from '@nextui-org/react';
import CommunityCard from '../CommunityCard/CommunityCard';
const Groups = () => {
  const [communities, setCommunities] = useState([]); 
  const [getCommunity] = useGetAllActiveCommunityMutation();

  useEffect(()=>{
    getActiveCommunities()
  },[])

  const getActiveCommunities = async ()=>{
    try {
     const res = await getCommunity().unwrap();
     console.log(res);
     setCommunities(res.community)
      
    } catch (error) {
      console.log(error);
      toast.error("error in fetching communities")
      
    }
  }
   


  return (
   
      <div className='h-fit'>
        <div className=''>
       <div className="m-4">
         <div className="card_header">
          <h1 className="card_title">Active Communities</h1>
         </div>
         {communities.length > 0 ?
         <div className="flex px-8 overflow-y-auto stream_container">
         <CommunityCard communities={communities}/>
         </div>
         :
         <div className="flex justify-center">
         <h1 className="font-semibold text-2xl m-12">No Active Communities</h1>
         </div>
         }
        </div>
        </div>
        <div className=''>
       <div className="m-4">
         <div className="card_header">
          <h1 className="card_title">Joined Communities</h1>
         </div>
         {communities.length > 0 ?
         <div className="flex px-8 overflow-y-auto stream_container">
         <CommunityCard communities={communities}/>
         </div>
         :
         <div className="flex justify-center">
         <h1 className="font-semibold text-2xl m-12">No Joined Communities</h1>
         </div>
         }
        </div>
        </div>
       
      </div>
    
   
  );
};

export default Groups;
