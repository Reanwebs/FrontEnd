import React,{useState} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import { emailValidation,passwordValidation } from "../../../utils/validation/useFormValidation";
import { useLoginMutation } from "../../slices/api_slices/usersApiSlice";
import {toast} from "react-toastify"
import { useDispatch } from "react-redux";
import { setCredentials } from "../../slices/reducers/user_reducers/authSlice";
import { useNavigate } from "react-router-dom";


export default function LoginModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [user,setUser] = useState({
    email:'',
    password:''
  })
  const [error,setError] = useState({
    emailError:"",
    passwordError:""
  })
  const dispatch = useDispatch()
  const [login,{isLoading}] = useLoginMutation();
  const navigate = useNavigate();

  async function authUser(){
    if(!user.email || !user.password) return toast.error("please fill all fields")
    if(error.emailError || error.passwordError) return toast.error("please clear all errors")
    else{
      try {
        const res = await login(user).unwrap()
        const data = {
          userName:res.username,
          email:res.email,
          phoneNumber:res.phoneNumber
        }
        dispatch(setCredentials({ ...data }));
        // toast.success("loggedin successfully")
        navigate('/home')
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
 }

  return (
    <>
     <Button onPress={onOpen} isLoading={isLoading} color="#01c8ef"  variant="flat" style={{ color: "#01c8ef" }}>
            Sign in
      </Button>
      
      <Modal 
        
        backdrop="opaque"
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
        classNames={{
          base: `border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#e6e9f0] sm:my-16 `, 
        }}

      >
        <ModalContent>
          {(onClose) => (
            <>
           
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  color={error.emailError ? "danger" : "success"}
                  errorMessage={error.emailError}
                  validationState={error.emailError ? "inavlid" : "valid"}
                  value={user.email}
                  onChange={(e)=>{ 
                    setUser({
                    ...user,
                    email:e.target.value
                  })}}
                  onKeyUp={(e)=>{
                    setError({
                      ...error,
                      emailError:emailValidation(e.target.value)
                    })
                  }}
                />
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                  color={error.passwordError ? "danger" : "success"}
                  errorMessage={error.passwordError}
                  validationState={error.passwordError ? "inavlid" : "valid"}
                  value={user.password}
                  onChange={(e)=>{                   
                    setUser({
                    ...user,
                    password:e.target.value
                  })}}
                  onKeyUp={(e)=>{
                    setError({
                      ...error,
                      passwordError:passwordValidation(e.target.value)
                    })
                  }}
                />
                {/* <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div> */}
              </ModalBody>
              <ModalFooter className="justify-center">
                <Button color="primary" onPress={authUser} isLoading={isLoading} variant="flat">
                  Sign in
                </Button>
              </ModalFooter>
              
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
