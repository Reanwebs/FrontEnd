import React, { useState ,useEffect} from 'react';
import './Group.css';
import { useGetAllActiveCommunityMutation } from '../../slices/api_slices/usersCommunitySlice';
import {toast} from 'react-toastify'
import { Button } from '@nextui-org/react';
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
    <div>
      communities
    </div>
   
  );
};

export default Groups;
