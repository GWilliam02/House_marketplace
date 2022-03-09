import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setEmail(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was Sent");
      navigate("/sign-in");
    } catch (error) {
      toast.error("Could not send password reset email");
    }
  };

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forgot Password</p>
        <main>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="emailInput"
              placeholder="Email"
              value={email}
              onChange={handleChange}
              id="email"
            />
            <Link className="forgotPasswordLink" to="/sign-in">
              Sign In
            </Link>
            <div className="signInBar">
              <div className="signInText">Send Reset Link</div>
              <button className="signInButton">
                <ArrowRightIcon fill="white" width="34px" height="34px" />
              </button>
            </div>
          </form>
        </main>
      </header>
    </div>
  );
}

export default ForgotPassword;
