import { Box, Typography } from "@mui/material";
import React from "react";
import { GlobalStyles } from "../../styles/GlobalStyles";
import { useTheme } from "@emotion/react";
import { FinoLabel } from "../../labels/FinoLabel";
import CustomTextField from "../../components/CustomTextField/CustomTextField";
import CustomDatePicker from "../../components/CustomDatePicker/CustomDatePicker";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import CustomButton from "../../components/CustomButton/CustomButton";

const FinoSignup = ({}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        maxWidth: 370,
        height: "100%",
        display: "flex",
        alignItems: "center",
        p: 1.5,
      }}
    >
      <Box
        sx={{
          border: `1px solid ${GlobalStyles.sideTopNavborderColor}`,
          m: 1.5,
          borderRadius: 1.5,
          p: 1,
        }}
      >
        <Box
          sx={{
            ...GlobalStyles.alignmentStyles,
            mt: 1,
            border: `1px solid ${theme?.palette?.p1?.main}`,
            m: 1,
            borderRadius: 1.5,
            p: 0.3,
            boxShadow: ` -3px -3px 1px ${theme?.palette?.p1?.main}`,
          }}
        >
          <Typography color={theme?.palette?.p1?.main} variant="v3">
            {FinoLabel.signUp}
          </Typography>
        </Box>

        <Box sx={{ p: 1, mt: 2, ...GlobalStyles.alignmentStyles }}>
          <Box>
            <CustomTextField
              label={FinoLabel.firstName}
              placeholder={FinoLabel.firstName}
              isFullwidth={true}
            />
          </Box>
          <Box sx={{ ml: 1 }}>
            <CustomTextField
              label={FinoLabel.surname}
              placeholder={FinoLabel.surname}
              isFullwidth={true}
            />
          </Box>
        </Box>

        <Box sx={{ p: 1, mt: 1, ...GlobalStyles.alignmentStyles }}>
          <CustomDatePicker isFullWidth={true} label={FinoLabel.dateOfBirth} />
        </Box>

        <Box sx={{ p: 1, mt: 1, ...GlobalStyles.alignmentStyles }}>
          <CustomTextField
            label={FinoLabel.mobileNumber}
            placeholder={FinoLabel.mobileNumber}
            isFullwidth={true}
          />
        </Box>

        <Box sx={{ p: 1, mt: 1, ...GlobalStyles.alignmentStyles }}>
          <CustomTextField
            label={FinoLabel.emailID}
            placeholder={FinoLabel.emailID}
            isFullwidth={true}
          />
        </Box>

        <Box sx={{ p: 1, mt: 1, ...GlobalStyles.alignmentStyles }}>
          <CustomTextField
            label={FinoLabel.userName}
            placeholder={FinoLabel.userName}
            isFullwidth={true}
          />
        </Box>

        <Box sx={{ p: 1, mt: 1, ...GlobalStyles.alignmentStyles }}>
          <CustomTextField
            label={FinoLabel.password}
            placeholder={FinoLabel.password}
            isFullwidth={true}
          />
        </Box>

        <Box sx={{ p: 1, mt: 1, ...GlobalStyles.alignmentStyles }}>
          <CustomTextField
            label={FinoLabel.confirmPassword}
            placeholder={FinoLabel.confirmPassword}
            isFullwidth={true}
          />
        </Box>

        <Box sx={{ p: 1, mt: 1, ...GlobalStyles.alignmentStyles }}>
          <CustomButton
            endIcon={<FaArrowUpRightFromSquare />}
            color={"p1"}
            isFullwidth={true}
            title={FinoLabel.signUp}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default FinoSignup;
