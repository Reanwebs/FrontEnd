import {  useParams } from 'react-router-dom';
import { useGetCommunityDetailMutation } from '../../slices/api_slices/usersCommunitySlice';
import { useEffect,useState } from 'react';
import { RingLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import { CLOUDINARY_FETCH_URL } from '../../../utils/config/config';
import { Avatar } from '@nextui-org/react';



const CommunityDetail = ()=>{

 const [community,setCommunity] = useState(null)
 const [members,setMembers] = useState([])
 const [loading,setLoading] = useState(false)
 const { id } = useParams();
 const [communityDetail] = useGetCommunityDetailMutation()
 const userInfo = useSelector((state)=> state.auth.userInfo)

 useEffect(()=>{
    async function getCommunityDetailHandler(){
        setLoading(true)
        try {
            const res = await communityDetail(id).unwrap()
            console.log(res);
            setCommunity(res.community)
            setMembers(res.members)
            console.log(community);
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }
    getCommunityDetailHandler()
 },[])
 
    return (
        <div className='h-screen'>
        {loading ? <div className="w-full flex justify-center h-full">
            <div className="py-52">
              <RingLoader color="#1bacbf"/>
            </div>
          </div>
         :(
         
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
        <div className=" flex  justify-evenly  p-10 md:p-12 mb-8 ">
            <div className='w-1/4 bg-slate-950'>
                <div className="flex items-center ">
                    <div className="w-full text-center opacity-50 font-bold m-4">
                            MEMBERS
                    </div>
                </div>
                <div className="overflow-y-scroll h-[40rem]"> 
                {members.length > 0 && members.map((member,idx)=>
                    <div className="flex gap-2 items-center m-2 bg-gray-700 h-10 rounded" key={idx}>
                    <Avatar alt={member.userName} className="flex-shrink-0 m-2" size="sm"  src={member.avatarId ?`${CLOUDINARY_FETCH_URL}/${member?.avatarId}` : undefined}/>
                    <div className="flex flex-col">
                    <span className="text-small">{member.userName}</span>
                    
                    </div>
                    </div>

                )}
                   
                </div>
            </div>
            <div className='w-3/4'>
               
                <img
                    className="w-full max-h-[25rem] overflow-hidden object-fit"
                    src={community?.communityAvatar ?`${CLOUDINARY_FETCH_URL}/${community?.communityAvatar}` : undefined}
                    alt=""
                />
            </div>

            <div className="grid lg:grid-cols-2 justify-items-center ">
                <div className="py-5 px-2 max-h-[45rem]">
                    <div className="rounded overflow-hidden hover:shadow-lg mt-6 ">
                        <div className="ms-2 px-1">
                            
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
    </div>
         )}
         </div>
    )
}

export default CommunityDetail