import React,{useState} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import { useEmailValidation,usePasswordValidation } from "../../../utils/validation/useFormValidation";
import { useLoginMutation } from "../../../slices/api_slices/usersApiSlice";
import {toast} from "react-toastify"
import { useDispatch,useSelector } from "react-redux";
import { setCredentials } from "../../../slices/reducers/user_reducers/authSlice";
import { useNavigate } from "react-router-dom";


export default function LoginModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [user,setUser] = useState({
    email:'',
    password:''
  })
  const dispatch = useDispatch()
  const [login,{isLoading}] = useLoginMutation();
  const emailValidation = useEmailValidation(user.email)
  const passwordValidation = usePasswordValidation(user.password)
  const navigate = useNavigate();

  async function authUser(){
    const validation = [emailValidation,passwordValidation];
    if(validation.includes("invalid")) return  toast.error('Please clear all errors');
    else{
      try {
        const res = await login(user).unwrap()
        dispatch(setCredentials({ ...res }));
        toast.success("loggedin successfully")
        navigate('/home')
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
 }

  return (
    <>
     <Button onPress={onOpen}  color="primary"  variant="flat">
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
                  color={emailValidation === "invalid" ? "danger" : "success"}
                  errorMessage={emailValidation === "invalid" && "Please enter a valid email"}
                  validationState={emailValidation}
                  value={user.email}
                  onChange={(e)=>{ 
                    setUser({
                    ...user,
                    email:e.target.value
                  })}}
                />
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                  color={passwordValidation === "invalid" ? "danger" : "success"}
                  errorMessage={passwordValidation === "invalid" && "Password must be greater than 6 charactors"}
                  validationState={passwordValidation}
                  value={user.password}
                  onChange={(e)=>{                   
                    setUser({
                    ...user,
                    password:e.target.value
                  })}}
                />
                <div className="flex py-2 px-1 justify-between">
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
                </div>
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
