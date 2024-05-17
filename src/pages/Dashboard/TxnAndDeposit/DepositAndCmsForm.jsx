import { Box, Card, Grid, Typography } from "@mui/material";
import React from "react";
import CustomDatePicker from "../../../components/CustomDatePicker/CustomDatePicker";
import CustomTextField from "../../../components/CustomTextField/CustomTextField";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { useTheme } from "@emotion/react";
import { GlobalStyles } from "../../../styles/GlobalStyles";
import UnderLine from "../../../components/UnderLine/UnderLine";

const DepositAndCmsForm = ({ onSubmit, fields, isUpdate,title }) => {
  const { depositFields, setDepositFields } = fields;
  const theme = useTheme();


  return (
    <Card sx={{p:2,mr:1}} >

        <Box sx={{ml:1,mb:1}}>
          <Typography variant="v5">
        {title}
          </Typography>
          <UnderLine color={theme?.palette?.p1?.main} width={21}/>
          </Box>    

      <form onSubmit={onSubmit}>
    
    <Grid container>
      <Grid item xs={12} md={3}>
      <Box sx={{ p: 1}}>
          <CustomDatePicker
            isFullWidth={true}
            value={depositFields.date}
            onChange={(e) => {
              setDepositFields({ ...depositFields, date: e });
            }}
            label={"Transaction Date"}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>
      <Box sx={{ p: 1 }}>
          <CustomTextField
            isFullwidth={true}
            label={"Total Amount"}
            placeholder={"Total Amount"}
            value={depositFields.amount}
            onChange={(e) => {
              setDepositFields({ ...depositFields, amount: e.target.value });
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>
      <Box sx={{ p: 1 }}>
          <CustomTextField
            isFullwidth={true}
            label={"Received From"}
            placeholder={"Received From"}
            value={depositFields?.receiveFrom}
            onChange={(e) => {
              setDepositFields({ ...depositFields, receiveFrom: e.target.value });
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>

      <Box sx={{ p: 1 }}>
          <CustomTextField
            isFullwidth={true}
            label={"Collected By"}
            placeholder={"Collected By"}
            value={depositFields?.collectedBy}
            onChange={(e) => {
              setDepositFields({ ...depositFields, collectedBy: e.target.value });
            }}
          />
        </Box>

      </Grid>

    </Grid>
      
    <Grid container>
      <Grid item xs={12} md={3}>
      <Box sx={{ p: 1}}>
      <CustomTextField
            isFullwidth={true}
            label={"Online Amount"}
            placeholder={"Online Amount"}
            value={depositFields.amount}
            onChange={(e) => {
              setDepositFields({ ...depositFields, amount: e.target.value });
            }}
          />
        
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>
      <Box sx={{ p: 1 }}>
          <CustomTextField
            isFullwidth={true}
            label={"Cash Amount"}
            placeholder={"Cash Amount"}
            value={depositFields.amount}
            onChange={(e) => {
              setDepositFields({ ...depositFields, amount: e.target.value });
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>
      <Box sx={{ p: 1 }}>
          <CustomTextField
            isFullwidth={true}
            label={"Balance Amount"}
            placeholder={"Balance Amount"}
            value={depositFields?.receiveFrom}
            onChange={(e) => {
              setDepositFields({ ...depositFields, receiveFrom: e.target.value });
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>

      <Box sx={{ p: 1 }}>
          <CustomTextField
            isFullwidth={true}
            label={"Remarks"}
            placeholder={"Remarks"}
            value={depositFields?.collectedBy}
            onChange={(e) => {
              setDepositFields({ ...depositFields, collectedBy: e.target.value });
            }}
          />
        </Box>

      </Grid>

    </Grid>
       
      
     
        <Box sx={{ p: 1,...GlobalStyles.alignmentStyles_2}}>
          <CustomButton
           width={100}
            title={isUpdate ? "UPDATE" : "ADD"}
            
          />
        </Box>
      </form>
    </Card>
  );
};

export default DepositAndCmsForm;
