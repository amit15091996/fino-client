import { useTheme } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import CustomTabs from '../../components/CustomTabs/CustomTabs'
import { HiOutlineBanknotes } from "react-icons/hi2";
import { PiBankBold } from "react-icons/pi";
import { Box, Card } from '@mui/material';
import HasAuthority from "../../hooks/HasAuthority"
import CustomTable from '../../components/CustomTable/CustomTable';
import ReportsSerching from './ReportsComponents/ReportsSerching';
import { FinoLabel } from '../../labels/FinoLabel';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedInterceptors from '../../hooks/ProtectedInterceptors';
import AuthHook from '../../hooks/AuthHook';
import { allBankDepositByUserNameService } from '../../redux/slice/bankslice/AllBankDepositByUserName';
import { allCmsTxnByUserNameService } from '../../redux/slice/cmsslice/AllCmsTxnByUserName';
import TableLoader from '../../components/CustomTable/TableHelpers/TableLoader';
import { IsArray } from '../../utils/IsArray';
import { dateFormater } from '../../utils/DateTimeFormatter';
import { TwoDecimalPlaceAdd } from '../../utils/TwoDecimalPlaceAdd';


const Reports = ({ }) => {

  const theme = useTheme()
  const [reportsTab, setReportsTab] = useState(0)
  const { isAdmin, isClient, isManager, isUser } = HasAuthority()
  const dispatch = useDispatch()
  const protectedInterceptors = ProtectedInterceptors()
  const { jwtToken, userName, error, userRoles, fullName } = AuthHook()
  const getAllBankTransaction = (bank) => { dispatch(allBankDepositByUserNameService(bank)) }
  const getAllCmsTransaction = (cms) => { dispatch(allCmsTxnByUserNameService(cms)) }

  const GET_ALL_BANK_DEPOSIT_BY_USERNAME_SLICE_REDUCER = useSelector((state) => state.GET_ALL_BANK_DEPOSIT_BY_USERNAME_SLICE_REDUCER)
  const GET_ALL_CMS_TXN_BY_USERNAME_SLICE_REDUCER = useSelector((state) => state.GET_ALL_CMS_TXN_BY_USERNAME_SLICE_REDUCER)

  useEffect(() => {
    getAllBankTransaction({ protectedInterceptors: protectedInterceptors, mobileNumber: userName })
    getAllCmsTransaction({ protectedInterceptors: protectedInterceptors, mobileNumber: userName })
  }, [])

  const handleReportTabChanges = (e, value) => { setReportsTab(value) }

  const onBankTxnEditClick=(row)=>{}
  const onBankTxnDeleteClick=(row)=>{}
  const onCmsTxnEditClick=(row)=>{}
const onCmsTxnDeleteClick=(row)=>{}

  const reportTabs = [
    {
      label: "Bank  Reports ",
      minWidth: 140,
      component: <>
        <Box>
          <Box sx={{ mt: 2 }}>
            <ReportsSerching />
          </Box>
          <Card sx={{ p: 1, mt: 2, mr: 1, mb: 5 }}>
            {
              GET_ALL_BANK_DEPOSIT_BY_USERNAME_SLICE_REDUCER?.isLoading ? <TableLoader /> :
                <CustomTable TableName={"BANK REPORTS"}
                 onEditClick={onBankTxnEditClick}
                  headCells={FinoLabel.bankDepositTableHead}
                 onDeleteClick={onBankTxnDeleteClick}
                  rows={
                    IsArray(GET_ALL_BANK_DEPOSIT_BY_USERNAME_SLICE_REDUCER?.data?.response)?
                    GET_ALL_BANK_DEPOSIT_BY_USERNAME_SLICE_REDUCER?.data?.response?.map((item)=>{
                      return {...item,bankTransactionDate:dateFormater(item?.bankTransactionDate),
                        collectionAmount:TwoDecimalPlaceAdd(item?.collectionAmount),
                        onlineAmount:TwoDecimalPlaceAdd(item?.onlineAmount),
                        cashAmount:TwoDecimalPlaceAdd(item?.cashAmount),
                        balanceAmount:TwoDecimalPlaceAdd(item?.balanceAmount),
                      }
                    })
                    :[]
                  }
                  isActionRequired={isAdmin}
                />
            }



          </Card>

        </Box>

      </>,
      icon: <PiBankBold fontSize={18} />
    },
    {
      label: "Cms Reports",
      minWidth: 150,
      component: <>
        <Box >
          <Box sx={{ mt: 2 }}>
            <ReportsSerching />
          </Box>
          <Card sx={{ p: 1, mt: 2, mr: 1, mb: 5 }}>
            {
              GET_ALL_CMS_TXN_BY_USERNAME_SLICE_REDUCER?.isLoading ? <TableLoader /> :
                <CustomTable
                  TableName={"CMS REPORTS"}
                  onEditClick={onCmsTxnEditClick}
                  headCells={FinoLabel.cmsTransactionTableHead}
                  onDeleteClick={onCmsTxnDeleteClick}
                  rows={
                    IsArray(GET_ALL_CMS_TXN_BY_USERNAME_SLICE_REDUCER?.data?.response)?
                    GET_ALL_CMS_TXN_BY_USERNAME_SLICE_REDUCER?.data?.response?.map((item)=>{
                      return {...item,cmsTransactionDate:dateFormater(item?.cmsTransactionDate),
                        collectionAmount:TwoDecimalPlaceAdd(item?.collectionAmount),
                        onlineAmount:TwoDecimalPlaceAdd(item?.onlineAmount),
                        cashAmount:TwoDecimalPlaceAdd(item?.cashAmount),
                        balanceAmount:TwoDecimalPlaceAdd(item?.balanceAmount),
                      }
                    })
                    :[]
                  }
                  isActionRequired={isAdmin}
                />
            }


          </Card>

        </Box>
      </>,
      icon: <HiOutlineBanknotes fontSize={18} />
    },

  ]


  return (
    <Box>

      <Box sx={{ mt: 2 }}>
        <CustomTabs tabDetails={reportTabs} value={reportsTab} onChange={handleReportTabChanges} cardPosition={{ display: "flex", justifyContent: "flex-start" }} tabPosition={{ justifyContent: "flex-start" }} />

      </Box>

    </Box>
  )
}

export default Reports