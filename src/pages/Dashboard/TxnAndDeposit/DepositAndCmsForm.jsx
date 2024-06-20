import { Box, Card, Grid, MenuItem, Typography } from "@mui/material";
import React from "react";
import CustomDatePicker from "../../../components/CustomDatePicker/CustomDatePicker";
import CustomTextField from "../../../components/CustomTextField/CustomTextField";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { useTheme } from "@emotion/react";
import { GlobalStyles } from "../../../styles/GlobalStyles";
import UnderLine from "../../../components/UnderLine/UnderLine";
import CustomDropDown, { menuItemStyle } from "../../../components/CustomDropDown/CustomDropDown";




const DepositAndCmsForm = ({ onSubmit, fields, isUpdate, title, isBankDeposit,bankList,clientList }) => {
  const theme = useTheme();
  const { bankAndCmsDepositfields, setBankAndCmsDepositfields } = fields

  return (
    <Card sx={{ p: 2 }} >

      <Box sx={{ ml: 1, mb: 1 }}>
        <Typography variant="v5">
          {title}
        </Typography>
        <UnderLine color={theme?.palette?.p1?.main} width={21} />
      </Box>

      <form onSubmit={onSubmit}>

        <Grid container>
          <Grid item xs={12} md={isUpdate ? 12 : 3}>
            <Box sx={{ p: 1 }}>
              <CustomDatePicker
                isFullWidth={true}
                isRequired={true}
                value={bankAndCmsDepositfields?.TransactionDate}
                onChange={(e) => {
                  setBankAndCmsDepositfields({ ...bankAndCmsDepositfields, TransactionDate: e });
                }}
                label={"Transaction Date"}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={isUpdate ? 12 : 3}>
            <Box sx={{ p: 1 }}>
              <CustomTextField
                isFullwidth={true}
                label={"Total Amount"}
                placeholder={"Total Amount"}
                type={"number"}
                isRequired={true}
                value={bankAndCmsDepositfields?.collectionAmount}
                onChange={(e) => {
                  setBankAndCmsDepositfields({ ...bankAndCmsDepositfields, collectionAmount: e.target.value });
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={isUpdate ? 12 : 3}>
            <Box sx={{ p: 1 }}>
              <CustomDropDown isFullwidth={true}
                label={isBankDeposit ? "Deposited In" : "Received From"}
                placeholder={isBankDeposit ? "Deposited In" : "Received From"}
                isRequired={true}
                value={bankAndCmsDepositfields?.recievedFrom}
                onChange={(e) => {
                  setBankAndCmsDepositfields({ ...bankAndCmsDepositfields, recievedFrom: e.target.value });
                }}>
                {((bankList && clientList)? isBankDeposit?bankList:clientList:[]).map((item, index) => (
                  <MenuItem id={`${index}-${item}`} value={item} style={menuItemStyle}>{item}</MenuItem>
                ))}

              </CustomDropDown>
            </Box>
          </Grid>
          <Grid item xs={12} md={isUpdate ? 12 : 3}>

            <Box sx={{ p: 1 }}>
              <CustomTextField
                isFullwidth={true}
                label={isBankDeposit ? "Deposited By" : "Collected By"}
                placeholder={isBankDeposit ? "Deposited By" : "Collected By"}
                value={bankAndCmsDepositfields?.collectedBy}
                isdisable={true}
              />
            </Box>

          </Grid>

        </Grid>

        <Grid container>
          <Grid item xs={12} md={isUpdate ? 12 : 3}>
            <Box sx={{ p: 1 }}>
              <CustomTextField
                isFullwidth={true}
                label={"Cash Amount"}
                placeholder={"Cash Amount"}
                type={"number"}
                value={bankAndCmsDepositfields?.cashAmount}
                onChange={(e) => {
                  setBankAndCmsDepositfields({ ...bankAndCmsDepositfields, cashAmount: e.target.value });
                }}
              />
            </Box>
          </Grid>
          {
            isBankDeposit ? null : <>
              <Grid item xs={12} md={isUpdate ? 12 : 3}>


                <Box sx={{ p: 1 }}>
                  <CustomTextField
                    isFullwidth={true}
                    label={"Online Amount"}
                    placeholder={"Online Amount"}
                    type={"number"}
                    value={bankAndCmsDepositfields?.onlineAmount}
                    onChange={(e) => {
                      setBankAndCmsDepositfields({ ...bankAndCmsDepositfields, onlineAmount: e.target.value });
                    }}
                  />

                </Box>

              </Grid>
              <Grid item xs={12} md={isUpdate ? 12 : 3}>
                <Box sx={{ p: 1 }}>
                  <CustomTextField
                    isFullwidth={true}
                    label={"Balance Amount"}
                    placeholder={"Balance Amount"}
                    value={bankAndCmsDepositfields?.balanceAmount}
                    isdisable={true}
                  />
                </Box>
              </Grid>
            </>
          }
          <Grid item xs={12} md={isUpdate ? 12 : 3}>

            <Box sx={{ p: 1 }}>
              <CustomTextField
                isFullwidth={true}
                label={"Remarks"}
                placeholder={"Remarks"}
                value={bankAndCmsDepositfields?.remarks}
                onChange={(e) => {
                  setBankAndCmsDepositfields({ ...bankAndCmsDepositfields, remarks: e.target.value });
                }}
              />
            </Box>

          </Grid>

        </Grid>



        <Box sx={{ p: 1, display: "flex", justifyContent: isUpdate ? "center" : "flex-end", alignItems: "center" }}>
          <CustomButton
            width={isUpdate ? "100%" : 100}
            title={isUpdate ? "UPDATE" : "ADD"}

          />
        </Box>
      </form>
    </Card>
  );
};

export default DepositAndCmsForm;
