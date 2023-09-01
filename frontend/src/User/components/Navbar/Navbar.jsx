import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button,useDisclosure} from "@nextui-org/react";
import LoginModal from "../../pages/LoginModal/LoginModal";
import SignupModal from "../../pages/SignupModal/SignupModal";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";

export default function Header(){
  return (
      <Navbar >
      <NavbarBrand > 
      <p className="font-bold text-inherit"  style={{ color: "#01c8ef" }}>REAN C</p>
      <img src="/logo1.png" alt="connect" width="12.5" height="15" />
      <p className="font-bold text-inherit" style={{ color: "#01c8ef" }}>NNECT</p>
      </NavbarBrand>
      <NavbarContent justify="end" >
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
