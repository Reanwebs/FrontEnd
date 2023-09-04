import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button,useDisclosure} from "@nextui-org/react";
import LoginModal from "../../pages/LoginModal/LoginModal";
import SignupModal from "../../pages/SignupModal/SignupModal";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";

export default function Header(){
  return (
    <div>
      <Navbar >
      <NavbarBrand > 
      <p className="font-bold text-inherit" style={{ color: "#01c8ef" }}>REAN C</p>
      <img src="/reanicons.png" alt="connect" width="13" height="13" />
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
    </div>
  );
}
