import "./Sidebar.css";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import { CgMenu } from "react-icons/cg";
import {
  LuBookOpen,
  LuUser2,
  LuNewspaper,
  LuSettings,
  LuUsers,
} from "react-icons/lu";

function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <div className="SidebarWrap" >
      <IconButton // This is the button that opens the sidebar
        className="dashboardOpenBtn"
        ref={btnRef}
        aria-label="Open Menu"
        onClick={onOpen}
        fontSize="30px"
        size="lg"
        p={2}
        m={2}
        icon={<CgMenu />}
      />

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <h1 className="logoText">
            Clef
            <span style={{ color: "#A38B13" }}>err</span>
          </h1>

          <DrawerBody className="drawerBodyWrap">
            <div className="userProfile">
              <LuUser2 />
              <a href="#">Ankit Kumar</a>
            </div>
            <hr></hr>
            <DrawerHeader className="dashboardHeader">Course</DrawerHeader>

            <div className="dashboardBody">
              <div className="dashboardBodyItem">
                <LuBookOpen />
                <a href="#">Back To Course</a>
              </div>
              <div className="dashboardBodyItem">
                <LuNewspaper />
                <a href="#">Assignments</a>
              </div>
              <div className="dashboardBodyItem">
                <LuUsers />
                <a href="#">People</a>
              </div>
              <div className="dashboardBodyItem">
                <LuSettings />
                <a href="#">Course Setting</a>
              </div>
            </div>
            <hr></hr>
            <DrawerHeader className="dashboardHeader">Teachers</DrawerHeader>

            <div className="dashboardBody">
              <div className="dashboardBodyItem">
                <LuUser2 />

                <a href="#">Teacher 1</a>
              </div>
              <div className="dashboardBodyItem">
                <LuUser2 />

                <a href="#">Teacher 2</a>
              </div>
              <div className="dashboardBodyItem">
                <LuUser2 />

                <a href="#">Teacher 3</a>
              </div>
            </div>
            <hr></hr>
          </DrawerBody>

          <DrawerFooter>
            <hr></hr>
            <h3  className="footerName">Assignment Name</h3>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default Sidebar;
