import React,{useState} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";

export default function SignupModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [user,setUser] = useState({
    userName:'',
    email:'',
    number:'',
    password:'',
    cPassword:''
  })

  const submitHandler = (e)=>{
    e.prventDefault();
    console.log(user);
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
                <form onSubmit={submitHandler}>
                  <ModalBody>
                
                <Input
                  autoFocus
                  label="Username"
                  placeholder="Enter your username"
                  variant="bordered"
                  value={user.userName}
                  onChange={(e)=>{setUser({
                    ...user,
                    userName:e.target.value
                  })}}
                />
                 <Input
                  label="Contact Number"
                  placeholder="Enter your contact number"
                  variant="bordered"
                  value={user.number}
                  onChange={(e)=>{setUser({
                    ...user,
                    number:e.target.value
                  })}}
                />
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  value={user.email}
                  onChange={(e)=>{setUser({
                    ...user,
                    email:e.target.value
                  })}}
                />
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                  value={user.password}
                  onChange={(e)=>{setUser({
                    ...user,
                    password:e.target.value
                  })}}
                />
                <Input
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  type="password"
                  variant="bordered"
                  value={user.cPassword}
                  onChange={(e)=>{setUser({
                    ...user,
                    cPassword:e.target.value
                  })}}
                />
                </ModalBody>
                <ModalFooter className="justify-center">
                <Button  type='submit' color="primary" >
                  Sign in
                </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
