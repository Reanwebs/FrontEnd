import { Link, NavLink } from 'react-router-dom';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent
} from 'react-pro-sidebar';
import {
  FaUser,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaTachometerAlt,
  FaGem,
  FaList,
  FaRegLaughWink,
  FaHeart
} from 'react-icons/fa';

import {BsFillPersonFill,BsVectorPen} from 'react-icons/bs'
import './SideBar.css'


const Sidebar = ({
  image,
  collapsed,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange
}) => {
  return (
    <ProSidebar
      image={image ? sidebarBg : false}
      collapsed={collapsed}
      toggled={toggled}
      onToggle={handleToggleSidebar}
      breakPoint="md"
      style={{ height: '100vh',backgroundColor:'#03000a' }}
    >
      {/* Header */}
      <SidebarHeader
      style={{ backgroundColor:'#03000a' }}
      >
        <Menu iconShape="circle">
          {collapsed ? (
            <MenuItem
              icon={<FaAngleDoubleRight />}
              onClick={handleCollapsedChange}
            ></MenuItem>
          ) : (
            <MenuItem
              suffix={<FaAngleDoubleLeft />}
              onClick={handleCollapsedChange}
            >
              {/* <div
                style={{
                  padding: '9px',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  fontSize: 15,
                  letterSpacing: '1px'
                }}
              >
                Pro Sidebar
              </div> */}
            </MenuItem>
          )}
        </Menu>
      </SidebarHeader>
      {/* Content */}
      <SidebarContent
      style={{ backgroundColor:'#03000a' }}
      >
        <Menu iconShape="circle">
          <MenuItem
            icon={<FaTachometerAlt />}
            // suffix={<span className="badge red">NEW</span>}
          >
            Dashboard
            <NavLink to="/admin/home" activeClassName="active"/>
          </MenuItem>
          {/* <MenuItem icon={<FaGem />}>Components </MenuItem> */}
          <MenuItem icon={<BsFillPersonFill />}>
           Users <Link to="/components" />
          </MenuItem>
          <MenuItem icon={<BsVectorPen />}>
           Interests <Link to="/components" />
          </MenuItem>
          {/* <SubMenu
            suffix={<span className="badge yellow">3</span>}
            title={'With Suffix'}
            icon={<FaRegLaughWink />}
          >
            <MenuItem>Submenu 1</MenuItem>
            <MenuItem>Submenu 2</MenuItem>
            <MenuItem>Submenu 3</MenuItem>
          </SubMenu> */}
          {/* <SubMenu
            prefix={<span className="badge gray">3</span>}
            title={'With Prefix'}
            icon={<FaHeart />}
          >
            <MenuItem>Submenu 1</MenuItem>
            <MenuItem>Submenu 2</MenuItem>
            <MenuItem>Submenu 3</MenuItem>
          </SubMenu> */}
          {/* <SubMenu title={'Multi Level'} icon={<FaList />}>
            <MenuItem>Submenu 1 </MenuItem>
            <MenuItem>Submenu 2 </MenuItem>
            <SubMenu title={'Submenu 3'}>
              <MenuItem>Submenu 3.1 </MenuItem>
              <MenuItem>Submenu 3.2 </MenuItem>
            </SubMenu>
          </SubMenu> */}
        </Menu>
      </SidebarContent>
      {/* Footer */}
      {/* <SidebarFooter style={{ textAlign: 'center' }}>
        <div className="sidebar-btn-wrapper" style={{ padding: '16px' }}>
          <Link
            className="sidebar-btn"
            style={{ cursor: 'pointer' }}
            to="/profile"
          >
            <FaUser />
            <span>My Account</span>
          </Link>
        </div> */}
      {/* </SidebarFooter> */}
    </ProSidebar>
  );
};

export default Sidebar;
