
import {Navbar, NavbarBrand, NavbarContent, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import { SearchIcon } from "../SearchIcon/SearchIcon";
import { NavLink ,useNavigate} from "react-router-dom";



export default function HomeNavbar({userInfo,logoutHandler}) {
  const navigate = useNavigate();
  return (
    <Navbar>

      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
        <p className="font-bold text-inherit" style={{ color: "#01c8ef" }}>REAN C</p>
        <img src="/reanicons.png" alt="connect" width="13" height="13" />
        <p className="font-bold text-inherit" style={{ color: "#01c8ef" }}>NNECT</p>
        </NavbarBrand>
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

      <NavbarContent as="div" className="items-center" justify="end">
       
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
    </Navbar>
  );
}
