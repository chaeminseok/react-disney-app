import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import app from "../firebase";
const Nav = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  const [searchValue, setsearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      } else if (user && pathname === "/") {
        navigate("/main");
      }
    });
    return () => {
      unsubscribe();
    };
  }, [auth, navigate]);

  useEffect(() => {
    window.addEventListener("scoll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // console.log('useLocation.search', useLocation().search);
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  const handleAuth = (e) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(result);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  const handleChange = (e) => {
    setsearchValue(e.target.value);
    // console.log(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };
  return (
    <NavWrapper $show={show}>
      <Logo>
        <img
          alt="Disney Plus Logo"
          src="/images/logo.svg"
          onClick={() => {
            window.location.href = "/";
          }}
        />
      </Logo>
      {pathname === "/" ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <Input
            value={searchValue}
            onChange={handleChange}
            className="nav__input"
            type="text"
            placeholder="검색해주세요."
          />
          <SignOut>
            <UserImg />
            <DropDown>signed</DropDown>
          </SignOut>
        </>
      )}
    </NavWrapper>
  );
};
const Login = styled.a`
  backgroud-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: gray;
    border-color: transparent;
  }
`;
const Input = styled.input`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgba(0, 0, 0, 0.582);
  border-radius: 5px;
  color: white;
  padding: 5px;
  border: none;
`;

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => (props.$show ? "white" : "transparent")};
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: blcok;
    width: 100%;
  }
`;
const UserImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;
const DropDown = styled.div`
  positon: absoulte;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;
const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;
export default Nav;
