import React,{useState} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { useEmailValidation, useUserNameValidation,useNumberValidation,usePasswordValidation,useCPasswordValidation } from "../../../utils/validation/useFormValidation";
import {toast} from 'react-toastify'
import { useDispatch,useSelector } from "react-redux";
import { useRegisterMutation , useRequestOtpMutation } from "../../../slices/api_slices/usersApiSlice";
import { setCredentials } from "../../../slices/reducers/user_reducers/authSlice";

export default function SignupModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [loading,setLoading] = useState(false)
  const [user,setUser] = useState({
    userName:'',
    email:'',
    number:'',
    password:'',
    cPassword:'',
    otp:'',
    referal:''
  })

  const dispatch = useDispatch()

  const [requestOtp,{isError,isSuccess,isLoading}] = useRequestOtpMutation()


  const emailValidation = useEmailValidation(user.email)
  const nameValidation = useUserNameValidation(user.userName)
  const numberValidation = useNumberValidation(user.number)
  const passwordValidation = usePasswordValidation(user.password)
  const cPasswordValidation = useCPasswordValidation(user.password,user.cPassword)
  

async function otpRequest(){
  const validationState = [emailValidation,nameValidation,numberValidation,passwordValidation,cPasswordValidation]
  if(validationState.includes("invalid")) return  toast.error('Please clear all errors');
  else{
    try {
      setLoading(true)
      const res = await requestOtp({
        user
      }).unwrap()
      console.log(res);
      toast.success("otp sent succcessfully")
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }
}


  return (
    <>
     <Button onPress={onOpen}  color="primary"  variant="flat">
            Sign up
      </Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
        classNames={{
          base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#e6e9f0]", 
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Sign up</ModalHeader>
            
                  <ModalBody>
                
                <Input
                  autoFocus
                  size="sm"
                  label="Username"
                  placeholder="Enter your username"
                  variant="bordered"
                  color={nameValidation === "invalid" ? "danger" : "success"}
                  errorMessage={nameValidation === "invalid" && "Please enter a user name"}
                  validationState={nameValidation}
                 value={user.userName}
                  onChange={(e)=>{setUser({
                    ...user,
                    userName:e.target.value
                  })}}
                />
                 <Input
                  size="sm"
                  label="Contact Number"
                  placeholder="Enter your contact number"
                  variant="bordered"
                  color={numberValidation === "invalid" ? "danger" : "success"}
                  errorMessage={numberValidation === "invalid" && "Please enter a valid number"}
                  validationState={numberValidation}
                  value={user.number}
                  onChange={(e)=>{setUser({
                    ...user,
                    number:e.target.value
                  })}}
                />
                <Input
                  size="sm"
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  color={emailValidation === "invalid" ? "danger" : "success"}
                  errorMessage={emailValidation === "invalid" && "Please enter a valid email"}
                  validationState={emailValidation}
                  value={user.email}
                  onChange={(e)=>{ 
                    setUser({
                    ...user,
                    email:e.target.value
                  })
                }}
                />
                <Input
                  size="sm"
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                  color={passwordValidation === "invalid" ? "danger" : "success"}
                  errorMessage={passwordValidation === "invalid" && "Password must be greater than 6 charactors"}
                  validationState={passwordValidation}
                  value={user.password}
                  onChange={(e)=>{setUser({
                    ...user,
                    password:e.target.value
                  })}}
                />
                <Input
                  size="sm"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  type="password"
                  variant="bordered"
                  color={cPasswordValidation === "invalid" ? "danger" : "success"}
                  errorMessage={cPasswordValidation === "invalid" && "Password didn't match"}
                  validationState={cPasswordValidation}
                  value={user.cPassword}
                  onChange={(e)=>{setUser({
                    ...user,
                    cPassword:e.target.value
                  })}}
                />
                 <Button color="primary" onClick={otpRequest} isLoading={loading} variant="flat">
                  Request OTP
                </Button>
                <Input
                  size="sm"
                  label="Referal code"
                  placeholder="Enter your referal code"
                  type="text"
                  variant="bordered"
                  value={user.referal}
                  onChange={(e)=>{setUser({
                    ...user,
                    referal:e.target.value
                  })}}
                />
                <Input
                  size="sm"
                  label="OTP"
                  placeholder="Enter your otp"
                  type="text"
                  variant="bordered"
                  value={user.otp}
                  onChange={(e)=>{setUser({
                    ...user,
                    otp:e.target.value
                  })}}
                />
                </ModalBody>
                <ModalFooter className="justify-center">
                <Button  type='submit' color="primary" onPress={onClose} >
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
