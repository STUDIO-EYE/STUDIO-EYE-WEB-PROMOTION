import React, { useState } from "react";
import styled from "styled-components";
import Responsive from "./responsive";
import { HiMenu, HiX } from "react-icons/hi";
import Offcanvas from "react-bootstrap/Offcanvas";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import studioi from "../../assets/logo/mainLogo.png";
import PlusAboutModal from "../../pages/AdminPage/Component/PlusAboutModal";
import AdminModal from "./AdminModal";

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background-color: #ffa900;
  // box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  z-index: 999;
`;

const AnimatedOffcanvas = styled(Offcanvas)`
  background-color: white;
  margin-top: 4rem;
  width: 100%;
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  height: 96vh;

  @media (max-width: 390px) {
    margin-top: 2rem;
  }
`;

const Wrapper = styled(Responsive)`
  height: 4rem;
  width: 85%;
  padding-left: 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    font-weight: 600;
    letter-spacing: 2px;
    white-space: nowrap;
    cursor: pointer;
  }
  .menu {
    margin-right: 5%;
  }
`;
const Img = styled.img`
  height: 3rem;

  @media (max-width: 830px) {
    height: 1.5rem;
  }

  @media (max-width: 605px) {
    height: 1.5rem;
  }
`;

const MenuButton = styled(motion.button)`
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  margin: 0 1rem;

  @media (max-width: 830px) {
    font-size: 1rem;
  }

  @media (max-width: 605px) {
    font-size: 0.75rem;
  }
`;

const MenuButtons = ({ children }: any) => {
  const navigate = useNavigate();

  const goToAbout = (go: any) => {
    console.log("이동");
    navigate(`/${go}`);
  };

  const buttonVariants = {
    initial: { opacity: 0, x: 0, y: 0 },
    animate: {
      opacity: 1,
      x: 40,
      y: 0,
      transition: { type: "spring", duration: 1, bounce: 0.5 },
    },
    hover: {
      scale: 1,
      color: "black",
      transition: { type: "spring", duration: 1, bounce: 0.5 },
    },
  };

  return (
    <MenuButton
      onClick={() => goToAbout(children)}
      variants={buttonVariants}
      initial="initial"
      animate="animate"
      // transition="transition"
      whileHover="hover"
    >
      {children}
    </MenuButton>
  );
};
const StyledLetter = styled(motion.span)`
  display: inline-block;
  font-size: 3rem;
  font-weight: 600;
  color: blue;
`;

const canvasanimation = {
  initial: { opacity: 0, x: 0, y: 0 },
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { type: "spring", duration: 1, bounce: 0.5 },
  },
};

const Header = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const goMain = () => {
    console.log("이동");
    navigate(`/`);
  };

  const goToAdmin = () => {
    setIsAdmin(true);
    // navigate('/admin');
  };
  const handleCancel = () => {
    setIsAdmin(false);
  };

  const text = "STUDIO I";
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <div className="logo">
            <Img
              src={studioi}
              alt="logo image"
              className="SocoaLogo"
              onClick={goMain}
            />
          </div>
          <div className="menu">
            <MenuButtons>ABOUT</MenuButtons>
            <MenuButtons>CONTENTS</MenuButtons>
            <MenuButtons>CONTACT</MenuButtons>
            <MenuButtons>FAQ</MenuButtons>
          </div>
        </Wrapper>
      </HeaderBlock>
    </>
  );
};

export default Header;
