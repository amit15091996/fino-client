import { Box, Card, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomTable from "../../../components/CustomTable/CustomTable";
import { FinoLabel } from "../../../labels/FinoLabel";
import { depositData } from "./BankDeposit";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { GlobalStyles } from "../../../styles/GlobalStyles";
import CustomModal from "../../../components/CustomModal/CustomModal";
import UnderLine from "../../../components/UnderLine/UnderLine";
import { IoClose } from "react-icons/io5";
import DepositAndCmsForm from "./DepositAndCmsForm";
import { useTheme } from "@emotion/react";
import dayjs from "dayjs";

export const newObj = (newDta) => {
  return { ...newDta, date: dayjs(newDta?.date).format("DD/MM/YYYY") };
};

const CmsTransaction = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModal, setupdateModal] = useState(false);

  const depositOnclick = () => {
    setModalOpen(true);
  };
  const theme = useTheme();

  const [depositFields, setDepositFields] = useState({
    date: null,
    sales: "",
    litre: "",
    rate: "",
    amount: "",
    name: "",
  });

  const [bankDepositData, setBankDepositData] = useState(depositData);

  const onDepositDataAdd = (e) => {
    e.preventDefault();
    setBankDepositData((d) => {
      return [...d, { id: Math.random() * 1000000, ...newObj(depositFields) }];
    });
    setDepositFields({
      date: null,
      sales: "",
      litre: "",
      rate: "",
      amount: "",
      name: "",
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
      <Box sx={{ mr: 1, ...GlobalStyles.alignmentStyles_2 }}>
        <CustomButton
          variant={"contained"}
          onClick={depositOnclick}
          color={"secondary"}
          title={"ADD"}
        />
      </Box>

      <Box sx={{ mt: 1, mr: 1 }}>
        <CustomTable
          TableName={"CMS TRANSACTION"}
          onEditClick={onUpdateClick}
          headCells={FinoLabel.bankDepositTableHead}
          onDeleteClick={onDepositDelete}
          rows={bankDepositData}
          isActionRequired={true}
        />
      </Box>

      <CustomModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <Card sx={{ height: 500, width: 350, p: 2 }}>
          <Box
            sx={{
              p: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="v2">ADD CMS TRANSACTION</Typography>
              <UnderLine color={theme?.palette?.p1?.main} />
            </Box>

            <Box>
              <IconButton
                aria-label="close"
                onClick={() => {
                  setModalOpen(false);
                }}
                sx={{ color: (theme) => theme.palette.grey[500] }}
              >
                <IoClose />
              </IconButton>
            </Box>
          </Box>

          <DepositAndCmsForm
            fields={{ depositFields, setDepositFields }}
            onSubmit={onDepositDataAdd}
          />
        </Card>
      </CustomModal>

      <CustomModal
        open={updateModal}
        onClose={() => {
          setupdateModal(false);
        }}
      >
        <Card sx={{ height: 500, width: 350, p: 2 }}>
          <Box
            sx={{
              p: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="v2">UPDATE CMS TRANSACTION</Typography>
              <UnderLine color={theme?.palette?.p1?.main} />
            </Box>

            <Box>
              <IconButton
                aria-label="close"
                onClick={() => {
                  setupdateModal(false);
                }}
                sx={{ color: (theme) => theme.palette.grey[500] }}
              >
                <IoClose />
              </IconButton>
            </Box>
          </Box>

          <DepositAndCmsForm
            fields={{ depositFields, setDepositFields }}
            isUpdate={true}
          />
        </Card>
      </CustomModal>
    </Box>
  );
};

export default CmsTransaction;
