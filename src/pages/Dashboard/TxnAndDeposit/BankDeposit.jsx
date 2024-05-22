import React, { useState } from "react";
import CustomTable from "../../../components/CustomTable/CustomTable";
import { Box, Card, IconButton, Typography } from "@mui/material";
import { FinoLabel } from "../../../labels/FinoLabel";
import { GlobalStyles } from "../../../styles/GlobalStyles";
import CustomButton from "../../../components/CustomButton/CustomButton";
import CustomModal from "../../../components/CustomModal/CustomModal";
import CustomTextField from "../../../components/CustomTextField/CustomTextField";
import UnderLine from "../../../components/UnderLine/UnderLine";
import { useTheme } from "@emotion/react";
import { IoClose } from "react-icons/io5";
import CustomDatePicker from "../../../components/CustomDatePicker/CustomDatePicker";
import dayjs from "dayjs";
import DepositAndCmsForm from "./DepositAndCmsForm";
import CustomDialog from "../../../components/CustomDialog/CustomDialog";


 export const depositData = [
  {
    id: 1,
    date: "01/05/2023",
    receiveFrom: "Client 1",
    amount: "25000.00",
    collectedBy: "Adam Reid",
  },
  {
    id: 2,
    date: "01/05/2023",
    receiveFrom: "Client 2",
    amount: "15000.00",
    collectedBy: "Spencer Reid",
  },
  {
    id: 3,
    date: "01/05/2023",
    receiveFrom: "Client 3",
    amount: "18500.00",
    collectedBy: "Luke Wood",
  },
  {
    id: 4,
    date: "01/05/2023",
    receiveFrom: "Client 4",
    amount: "19500.00",
    collectedBy: "Spencer Will",
  },
];
console.log("depositData : " , depositData);
export const newObj = (newDta) => {
  return { ...newDta, date: dayjs(newDta?.date).format("DD/MM/YYYY") };
};

const BankDeposit = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModal, setupdateModal] = useState(false);

  const depositOnclick = () => {
    setModalOpen(true);
  };
  const theme = useTheme();

  const [depositFields, setDepositFields] = useState({
    date: null,
    receiveFrom:"",
    amount: "",
    collectedBy: "",
  });

  const [bankDepositData, setBankDepositData] = useState(depositData);

  const onDepositDataAdd = (e) => {
    e.preventDefault();
    setBankDepositData((d) => {
      return [...d, { id: Math.random() * 1000000, ...newObj(depositFields) }];
    });
    setDepositFields({
      date: null,
      receiveFrom:"",
      amount: "",
      collectedBy: "",
    });
    setModalOpen(false);
  };

  const onDepositDelete = (row) => {
    setBankDepositData(
      bankDepositData?.filter((mydata) => mydata.id !== row?.id)
    );
  };

  const onUpdateClick = (row) => {
    setupdateModal(true);
  };

  return (
    <Box sx={{ mt: 1 }}>
       

      <DepositAndCmsForm
      title={"BANK DEPOSIT"}
            fields={{ depositFields, setDepositFields }}
            onSubmit={onDepositDataAdd}
          />

     
    </Box>
  );
};

export default BankDeposit;
