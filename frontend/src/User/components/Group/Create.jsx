import React, { useState } from "react";
import "./Group.css";
import { Input, Textarea ,Avatar,Select,SelectItem,Button} from "@nextui-org/react";
import axios from "axios";
import {toast} from 'react-toastify'
import { useCreateCommunityMutation } from "../../slices/api_slices/usersCommunitySlice";
import { useNavigate } from "react-router-dom";


const Create = () => {
  const [community,setCommunity] = useState({
    communityImage:'',
    communityName:'',
    description:'',
    joinedType:'',
    members:[]
  })

  const [selectedImage,setSelectedImage] = useState(null)
  const [createCommunity,{isLoading}] = useCreateCommunityMutation()
  const navigate = useNavigate()

  
 
  const createCommunityHandler = async()=>{
    try {
      await addCommunityImageHandler();  
      const res = await createCommunity(community).unwrap();
      toast.success(res.message)
      setCommunity({
        communityImage:'',
        communityName:'',
        description:'',
        joinedType:'',
        members:[]
      })
      setSelectedImage(null)
    } catch (error) {
      toast.error(error?.message || error?.data?.message)
      console.log(error);
      
    }
  }

  const addCommunityImageHandler = async ()=>{
    try {
        const formData = new FormData();
       formData.append("file",selectedImage);
       formData.append("upload_preset","reanconnect");
       const cloudRes = await axios.post("https://api.cloudinary.com/v1_1/dcv6mx1nk/image/upload",formData)
       console.log(cloudRes,"cloud response");
       console.log(cloudRes.data['public_id']);
        setCommunity({
        ...community,
        communityImage:cloudRes.data['public_id']
       })
    } catch (error) {

        toast.error(error?.message || error?.data?.message)
    }
  }

  return (
   <section className="container mx-auto m-4">
     <div className="flex flex-col items-center m-4">
      <div className="m-2 items-center">
      <div className="md:shrink-0 relative mt-3">
           <label className="cursor-pointer">
               <Input
                 type="file"
                 accept=".jpg, .jpeg, .png, .webp"
                 className="hidden"
                 label="Community Icon"
                 labelPlacement="outside-bottom"
                 onChange={(e) => setSelectedImage(e.target.files[0])}
                    />
                   <Avatar name={' Icon'} src={
                       selectedImage
                       ? URL.createObjectURL(selectedImage)
                       : undefined 
                      } className="w-20 h-20 text-large"
                        />
                </label>    
                </div> 

               </div>
               <div className="flex justify-center">
                {selectedImage &&
                <>
                <Button color="default" onClick={()=>{
                    console.log(selectedImage);
                    setSelectedImage(null)
                }} 
                variant="#db2777"
                  style={{ 
                  color: "#db2777",
                   }}>remove</Button>
                </>
               }
               </div>
            <div className="m-2 items-center w-100">
                <Input
                isRequired
                type="text"
                  label="Community name"
                  labelPlacement="outside-left"
                  placeholder="Enter a community name"
                  value={community.communityName}
                  onChange={(e)=>{
                    setCommunity({
                      ...community,
                      communityName:e.target.value
                    })
                  }}
                  />
            </div>
            <div className="m-2 items-center w-100">
                <Textarea 
                isRequired
                type="text" 
                label="Description" 
                labelPlacement="outside-left"
                placeholder="Enter a description for your community"
                value={community.description}
                onChange={(e)=>{
                  setCommunity({
                    ...community,
                    description:e.target.value
                  })
                }}
                  />
            </div>
           
            <div className="m-2 items-center w-100">
            <Select
                isRequired
                label='Type'
                placeholder='select a join type'
                className="w-64"
                labelPlacement="outside-left"
                name='joinType'
                onChange={(e)=>{
                  setCommunity({
                    ...community,
                    joinedType:e.target.value
                  })
                }}
                  >
               <SelectItem key='open'  value='open' className="w-fit">Any one can join </SelectItem>
               <SelectItem key='request'  value='request' className="w-fit">Admin need to accept</SelectItem>   
              </Select>
            </div>
            <div className="m-2 items-center flex ">
              <Input
              className="flex-1"
               type="text"
               label="Add members"
               labelPlacement="outside-left"
               placeholder="Search user"
              />          
            </div>
            <div className="m-2 items-center">
              <Button color="primary"  variant="flat" onClick={createCommunityHandler} isLoading={isLoading}>
                Create
              </Button>
            </div>
      </div>
   </section>
  );
};

export default Create;
