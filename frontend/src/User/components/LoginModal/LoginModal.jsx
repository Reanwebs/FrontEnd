import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";

export default function LoginModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

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
          base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#e6e9f0]", 
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
                />
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
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
                <Button color="primary" onPress={onClose}  variant="flat">
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
