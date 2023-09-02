import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button} from "@nextui-org/react";
import { SearchIcon } from "../../../User/components/SearchIcon/SearchIcon";


export default function AdminHomeNavbar({adminInfo,logoutHandler}) {
  return (
    <div >
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
        <p className="font-bold text-inherit" style={{ color: "#01c8ef" }}>REAN C</p>
        <img src="/reanicons.png" alt="connect" width="13" height="13" />
        <p className="font-bold text-inherit" style={{ color: "#e51376" }}>NNECT</p>
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
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">{adminInfo?.name}</p>
              <p className="font-semibold">{adminInfo?.email}</p>
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onPress={logoutHandler}>
                  Log Out 
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
    </div>
  );
}
