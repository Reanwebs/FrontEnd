import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button,useDisclosure} from "@nextui-org/react";
import LoginModal from "../../pages/LoginModal/LoginModal";
import SignupModal from "../../pages/SignupModal/SignupModal";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";

export default function Header(){
  return (
      <Navbar>
      <NavbarBrand> 
        <p className="font-bold text-inherit">REAN</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        {/* <NavbarItem >
           <ThemeSwitch/>
        </NavbarItem> */}
        <NavbarItem >
            <LoginModal />
        </NavbarItem>
        <NavbarItem>
            <SignupModal/>
        </NavbarItem>
      </NavbarContent>
    </Navbar>  
  );
}
