import { Avatar, Box, Card, Typography } from "@mui/material";
import { FinoLabel } from "../../labels/FinoLabel";
import loginImage from "../../assets/loginImage.jpg";
import { GlobalStyles } from "../../styles/GlobalStyles";
import { useTheme } from "@emotion/react";
import CustomTextField from "../../components/CustomTextField/CustomTextField";
import { FaUserCircle } from "react-icons/fa";
import { TbPasswordFingerprint } from "react-icons/tb";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";
import { IoIosCreate } from "react-icons/io";

const FinoLogin = ({onCreateAccount,onForgotPassword}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const onLogin = (e) => {
    e.preventDefault();
    navigate("/Layout/Dashboard");
  };

  return (
    <Card sx={{ height: "100%", width: "100%"}}>

      <Box
        sx={{ height: "100%", width: "100%", ...GlobalStyles.alignmentStyles  }}
      >
        <Box
          sx={{
            height: "94.5%",
            width:"100%",
            p:2,
            borderRadius:0,
          }}
        >
          <form onSubmit={onLogin}>
            <Box>
              <Box sx={{ ...GlobalStyles.alignmentStyles }}>
                <Avatar
                  sx={{ mt: 0.5, width: 50, height: 50, objectFit: "fill" }}
                  alt="L"
                  src={loginImage}
                />
              </Box>
              <Box sx={{ ...GlobalStyles.alignmentStyles }}>
                <Typography color={theme?.palette?.primary?.main} variant="v1">
                  {FinoLabel.loginPageTitle}
                </Typography>
              </Box>
              <Box sx={{ ...GlobalStyles.alignmentStyles }}>
                <Typography color={theme?.palette?.primary?.main} variant="v2">
                  {FinoLabel.loginPageTitle_1}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ p: 1, mt: 3, ...GlobalStyles.alignmentStyles }}>
              <CustomTextField
                label={FinoLabel.userName}
                placeholder={FinoLabel.userName}
                endIcon={
                  <FaUserCircle
                    color={theme?.palette?.primary?.main}
                    fontSize={20}
                  />
                }
                isFullwidth={true}
              />
            </Box>

            <Box sx={{ p: 1, mt: 2, ...GlobalStyles.alignmentStyles }}>
              <CustomTextField
                type={"password"}
                label={FinoLabel.password}
                placeholder={FinoLabel.password}
                endIcon={
                  <TbPasswordFingerprint
                    color={theme?.palette?.primary?.main}
                    fontSize={20}
                  />
                }
                isFullwidth={true}
              />
            </Box>

            <Box onClick={onForgotPassword}
              sx={{
                cursor: "pointer",
                ...GlobalStyles.alignmentStyles_2,
                mr: 1,
              }}
            >
              <Typography color="primary" variant="v2">
                {FinoLabel.forgotPassword}
              </Typography>
            </Box>

       <Box sx={{p:1,mt:1,...GlobalStyles.alignmentStyles}}>
        <CustomButton endIcon={<IoMdLogIn />} color={"primary"} isFullwidth={true} title={FinoLabel.loginPageTitle}/>
       </Box>
       </form>
   
       <Box sx={{ mt: 3, ...GlobalStyles.alignmentStyles }}>
            <Typography color="primary" variant="v2">
              {FinoLabel.dontHaveAnAccount}
            </Typography>
          </Box>
          <Box sx={{ p: 1, ...GlobalStyles.alignmentStyles }}>
           
              <CustomButton
              endIcon={<IoIosCreate />}
                
                onClick={onCreateAccount}
                color={"success"}
                isFullwidth={true}
                title={FinoLabel.createAnAccount}
              />
          
          </Box>

        </Box>
      </Box>
    </Card>
  );
};

export default FinoLogin;
