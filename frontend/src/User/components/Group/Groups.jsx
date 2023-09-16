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
      toast.warn(<div>
        <p>User is trying to join.</p>
        <Button color="primary" className='m-2' variant="flat" size='sm' >Accept</Button>
        <Button color="primary"  variant="flat" size='sm'>Reject</Button>
      </div>,{
        autoClose:false
      });
      
    }
  }
   


  return (
   
      <div className='h-screen'>
        <div className='flex overflow-x-hidden justify-center whitespace-nowrap gap-4'>
        <CommunityCard communities={communities}/>
        </div>
       
      </div>
    
   
  );
};

export default Groups;
