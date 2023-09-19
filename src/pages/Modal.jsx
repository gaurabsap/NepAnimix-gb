import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import { authcon } from "./auth/authContext";
import { AiFillCloseCircle } from "react-icons/ai";

const Modal = ({ show }) => {
  const [modal, setModal] = useState(show);
  //   console.log(show);
  //   alert(show);
  //   setModal(show);
  const { login } = useContext(authcon);
  const ModalHandler = () => {
    // alert("clicked");
    setModal(false);
  };
  return (
    <>
      {show ? (
        <div className="z-[99999999] backgb">
          <dialog
            open={true}
            className="relative border border-red-500 rounded-full"
          >
            <AiFillCloseCircle
              className="text-white absolute top-36 z-50 right-0"
              size={40}
              onClick={ModalHandler}
            />
            <div className="fixed w-[35%] top-[50%] left-[50%] border center rounded-lg">
              {login ? <Login /> : <Signup />}
            </div>
          </dialog>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Modal;
