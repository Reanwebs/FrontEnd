import React,{useState,useEffect} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { useEmailValidation, useUserNameValidation,useNumberValidation,usePasswordValidation,useCPasswordValidation ,useOtpValidation} from "../../../utils/validation/useFormValidation";
import {toast} from 'react-toastify'
import { useDispatch,useSelector } from "react-redux";
import { useRegisterMutation , useRequestOtpMutation ,useValidUserNameMutation} from "../../../slices/api_slices/usersApiSlice";
import { setCredentials } from "../../../slices/reducers/user_reducers/authSlice";
import { useNavigate } from "react-router-dom";

export default function SignupModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [show,setShow] = useState(false)
  const [disabled,setDisabled] = useState(false)
  const[signup,setSignup] = useState(false)
  
  const [user,setUser] = useState({
    userName:'',
    email:'',
    number:'',
    password:'',
    cPassword:'',
    otp:'',
    referral:''
  })
  const [error,setError] = useState({
    nameError:'',
    emailError:'',
    numberError:'',
    passwordError:'',
    cPasswordError:'',
    otpError:''
  })

  const [success,setSuccess] = useState({
    nameSuccess:'',
  })

  const dispatch = useDispatch();
  const navigate = useNavigate()
  

  const [validUserName] = useValidUserNameMutation()
  const [requestOtp,{isError,isSuccess,isLoading}] = useRequestOtpMutation();
  const [register] = useRegisterMutation()

      const emailValidation = useEmailValidation(user.email)
      const nameValidation = useUserNameValidation(user.userName)
      const numberValidation = useNumberValidation(user.number)
      const passwordValidation = usePasswordValidation(user.password)
      const cPasswordValidation = useCPasswordValidation(user.password,user.cPassword)  
      const otpValidation = useOtpValidation(user.otp)

async function checkUserName(){

      setSuccess({
        ...success,
        nameSuccess:""
      })
    setError({
      ...error,
      nameError:""
    })
  try {
    if(user.userName === "") throw new Error("user name required")
    if(user.userName.length < 5) throw new Error("user name must be more than 4 charactors")
    const res = await validUserName(user).unwrap()
    setSuccess({
      ...success,
      nameSuccess:res.message
    })   
  } catch (err) { 
    setError({
      ...error,
      nameError:err?.data?.message || err.message
    })
    
  }
}

function continueSignUp(){
  if(error.nameError) toast.error("please clear all error")
  else if(!user.userName) toast.error("Please enter user name")
  else{
     setSuccess({
      ...success,
      nameSuccess:""
     })
     setDisabled(true)
     setShow(true)

   }
}

async function otpRequest(){
  const validationState = [emailValidation,nameValidation,numberValidation,passwordValidation,cPasswordValidation]
  if(validationState.includes("invalid")) return  toast.error('Please clear all errors');
  else{
    try {
      const res = await requestOtp(user).unwrap()
      toast.success("otp sent succcessfully")
      setSignup(true)
    } catch (err) {
      toast.error(err?.data?.message || err.Error)
    }
  }
}

async function signupHandler(){
  const validationState = [emailValidation,nameValidation,numberValidation,passwordValidation,cPasswordValidation,otpValidation]
  if(validationState.includes("invalid")) return  toast.error('Please clear all errors');
  else{
    try {
      const res = await register(user).unwrap()
      dispatch(setCredentials({ ...res }));
      toast.success("account created successfully")
      navigate('/home')
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
              <ModalHeader className="justify-center">Sign up</ModalHeader>
            
                  <ModalBody>
                
                    <Input
                      autoFocus
                      isDisabled={disabled}
                      size="sm"
                      label="Username"
                      placeholder="Enter your username"
                      variant="bordered"
                      color={error.nameError === "" ? "success" : "danger"}
                      errorMessage={error.nameError }
                      validationState={error.nameError === "" ? "valid" : "invalid"}
                      value={user.userName}
                      onChange={(e)=>{                    
                      setUser({
                        ...user,
                        userName:e.target.value
                      })                  
                    }}
                    onKeyUp={(e)=>{
                      checkUserName(e.target.value)
                    }}
                    />
                    {error.nameError === "" && success.nameSuccess !== "" && (
                    <p className="text-xs text-green-500">{success.nameSuccess}</p>
                    )}
                    <Button color="primary" className={show ? "hidden" : "block"} onClick={continueSignUp}  variant="flat">
                      continue
                    </Button>

                    {show && 
                <>
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
                    <Button color="primary" onClick={otpRequest} isLoading={isLoading} variant="flat" className={signup ? "hidden" : "block"}>
                      Request OTP
                    </Button>
                  {signup &&
                  <>
                   
                    <Input
                      size="sm"
                      label="OTP"
                      placeholder="Enter your otp"
                      type="text"
                      variant="bordered"
                      color={otpValidation === "invalid" ? "danger" : "success"}
                      errorMessage={otpValidation === "invalid" && "Please enter a valid otp"}
                      validationState={otpValidation}
                      value={user.otp}
                      onChange={(e)=>{setUser({
                        ...user,
                        otp:e.target.value
                      })}}
                    />

                    <Input
                      size="sm"
                      label="Referral code"
                      placeholder="Enter your referral code"
                      type="text"
                      variant="bordered"
                      value={user.referral}
                      onChange={(e)=>{setUser({
                        ...user,
                        referral:e.target.value
                      })}}
                    />
                    
                    <Button  type='submit' color="primary" onPress={signupHandler} >
                      Sign in
                    </Button>
                  </>
                  }
                 
                </>
                
                   }
                </ModalBody>
                          
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
