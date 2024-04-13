import { useTheme } from "@emotion/react";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../Components/FlexBetween";
import {
  changePasswordRequest,
  sendOTPRequest,
} from "./LoginRegisterChangePass";
import Loading from "../../Components/Loading/Loading";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repass, setRepass] = useState("");
  const [OTP, setOTP] = useState("");
  const [disableEmailField, setDisableEmailField] = useState(false);
  const [errMsg, setErrMsg] = useState();
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!email) setErrMsg("enter email to send OTP");
      else {
        const { success, message } = await sendOTPRequest(email);
        if (success) {
          setDisableEmailField(true);
          alert("OTP sent successfully");
          setErrMsg();
        } else setErrMsg(message);
      }
    } catch (error) {
      // console.log(error)
      setErrMsg("Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission for changing password
  const handleFormSubmitChangePass = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (password === repass && OTP.length === 6) {
        const { success, message } = await changePasswordRequest({
          email,
          password,
          otp: OTP,
        });
        success ? navigate("/auth/login") : setErrMsg(message);
      } else {
        OTP.length !== 6
          ? setErrMsg("Enter Digit OTP")
          : setErrMsg("Please enter both passwords the same");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const { palette } = useTheme();

  return (
    <FlexBetween width="100%" flexDirection={"column"}>
      <form onSubmit={handleSendOTP} style={{ width: "100%" }}>
        <TextField
          required
          label="Email"
          disabled={disableEmailField}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          sx={{ margin: "0.5rem", width: "100%" }}
        />
        {!disableEmailField && (
          <Button
            fullWidth
            type="submit"
            disabled={loading}
            sx={{
              m: "2rem 0",
              p: "1rem",
              backgroundColor: palette.primary.main,
              color: palette.background.alt,
              "&:hover": { color: palette.primary.main },
            }}
          >
            send otp
          </Button>
        )}
      </form>
      {disableEmailField && (
        <>
          <form onSubmit={handleFormSubmitChangePass} style={{ width: "100%" }}>
            <TextField
              required
              label="OTP"
              error={OTP.length > 0 && OTP.length !== 6}
              onChange={(e) => setOTP(e.target.value)}
              value={OTP}
              name="otp"
              sx={{ margin: "0.5rem", width: "100%" }}
            />
            <TextField
              required
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name="password"
              sx={{ margin: "0.5rem", width: "100%" }}
            />
            <TextField
              required
              label="Re-Enter Password"
              type="password"
              error={password !== repass && repass !== ""}
              onChange={(e) => setRepass(e.target.value)}
              value={repass}
              name="password"
              sx={{ margin: "0.5rem", width: "100%" }}
            />
            <Button
              fullWidth
              type="submit"
              disabled={loading}
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              Change
            </Button>
          </form>
        </>
      )}
      {errMsg && <h2 style={{ color: "red" }}>{errMsg}</h2>}
      {loading && <Loading />}
    </FlexBetween>
  );
};

export default ForgotPassword;
