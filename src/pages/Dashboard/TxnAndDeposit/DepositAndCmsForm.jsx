import { Box } from "@mui/material";
import React from "react";
import CustomDatePicker from "../../../components/CustomDatePicker/CustomDatePicker";
import CustomTextField from "../../../components/CustomTextField/CustomTextField";
import CustomButton from "../../../components/CustomButton/CustomButton";

const DepositAndCmsForm = ({ onSubmit, fields, isUpdate }) => {
  const { depositFields, setDepositFields } = fields;

  return (
    <Box>
      <form onSubmit={onSubmit}>
        <Box sx={{ p: 1, mt: 1 }}>
          <CustomDatePicker
            isFullWidth={true}
            value={depositFields.date}
            onChange={(e) => {
              setDepositFields({ ...depositFields, date: e });
            }}
            label={"Transaction Date"}
          />
        </Box>
        <Box sx={{ p: 1, mt: 1 }}>
          <CustomTextField
            isFullwidth={true}
            label={"Amount"}
            placeholder={"Amount"}
            value={depositFields.amount}
            onChange={(e) => {
              setDepositFields({ ...depositFields, amount: e.target.value });
            }}
          />
        </Box>
        <Box sx={{ p: 1, mt: 1 }}>
          <CustomTextField
            isFullwidth={true}
            label={"Received From"}
            placeholder={"Received From"}
            value={depositFields.name}
            onChange={(e) => {
              setDepositFields({ ...depositFields, amount: e.target.value });
            }}
          />
        </Box>
        <Box sx={{ p: 1, mt: 1 }}>
          <CustomTextField
            isFullwidth={true}
            label={"Collected By"}
            placeholder={"Collected By"}
            value={depositFields.collectBy}
            onChange={(e) => {
              setDepositFields({ ...depositFields, name: e.target.value });
            }}
          />
        </Box>

        <Box sx={{ p: 1, mt: 2 }}>
          <CustomButton
            title={isUpdate ? "UPDATE" : "ADD"}
            isFullwidth={true}
          />
        </Box>
      </form>
    </Box>
  );
};

export default DepositAndCmsForm;
