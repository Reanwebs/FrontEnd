
import {Navbar, NavbarBrand, NavbarContent, Input,NavbarItem,NavbarMenu,NavbarMenuItem,NavbarMenuToggle, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar,Link, Button} from "@nextui-org/react";
import { SearchIcon } from "../SearchIcon/SearchIcon";
import { NavLink ,useNavigate} from "react-router-dom";
import "./HomeNavbar.css"
import React from "react";



export default function HomeNavbar({userInfo,logoutHandler}) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Conference",
    "Schedule",
    "Community",
    "Messages",
    "Wallet",
    "Help & Feedback",
    "Log Out",
  ];
  return (
    <Navbar className="home-navbar" isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>

      <NavbarContent className="md:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="md:hidden pr-3" justify="center">
        <NavbarBrand justify="center">
        <p className="font-bold text-inherit" style={{ color: "#01c8ef" }}>REAN</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-10" justify="center" style={{ maxWidth: 'fit-content' }}>
        <NavbarBrand className="mr-4">
        <p className="font-bold text-inherit" style={{ color: "#01c8ef" }}>REAN C</p>
        <img src="/reanicons.png" alt="connect" width="13" height="13" />
        <p className="font-bold text-inherit" style={{ color: "#01c8ef" }}>NNECT</p>
        </NavbarBrand>
        <NavbarItem>
          <Link color="foreground" href="/conference">
            Conference
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/schedule" aria-current="page">
            Schedules
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/group">
            Community
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/chat">
            Messages
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent>
       <Input
          classNames={{
            base: "max-w-full sm:max-w-[20rem] h-10 mx-auto",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={15} />}
          type="search"
        />
      </NavbarContent>
      

      <NavbarContent as="div" className="items-center md:flex gap-12" justify="center"> 
      <NavbarItem>
          <Link color="foreground" href="/chat">
            Support
          </Link>
        </NavbarItem>   
        
        <Button className="wallet-button" style={{ backgroundColor: 'transparent'}}>
          <p>Wallet</p>
        </Button>
          
        <Dropdown placement="bottom-end" className="dark text-foreground bg-background">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="#01c8ef"
              name={userInfo?.userName}
              size="sm"
              src={userInfo?.avatarId && `https://res.cloudinary.com/dcv6mx1nk/image/upload/v1693938021/${userInfo.avatarId}`}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2" textValue={userInfo}>
              <p className="font-semibold" >{userInfo?.userName}</p>
              <p className="font-semibold">{userInfo?.email}</p>
              <p className="font-semibold">{userInfo?.phoneNumber}</p>
            </DropdownItem>
           
            <DropdownItem key="myprofile" color="primary" textValue="profile" onPress={()=>{
                navigate('/profile')
            }}>
                Profile
            </DropdownItem>           
            <DropdownItem key="logout" color="danger" onPress={logoutHandler} textValue="logout ">
                Log Out 
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
