import React, { useState } from 'react'
import CustomTable from '../../../components/CustomTable/CustomTable'
import { Box, Card, Typography } from '@mui/material'
import { FinoLabel } from '../../../labels/FinoLabel'
import { GlobalStyles } from '../../../styles/GlobalStyles'
import CustomButton from '../../../components/CustomButton/CustomButton'
import CustomModal from '../../../components/CustomModal/CustomModal'
import CustomTextField from '../../../components/CustomTextField/CustomTextField'
import UnderLine from '../../../components/UnderLine/UnderLine'
import { useTheme } from '@emotion/react'

export const depositData=[
    {date:"01/05/2023",amount:"1000.00",name:"Spencer Reid"},
    {date:"02/05/2023",amount:"2000.00",name:"Jenifer Jareu"},
    {date:"03/05/2023",amount:"4000.00",name:"P Panda"},
    {date:"04/05/2023",amount:"7000.00",name:"Dave Batista"},
    {date:"05/05/2023",amount:"9000.00",name:"Arron Hothner"},
    {date:"01/05/2023",amount:"1000.00",name:"Spencer Reid"},
    {date:"02/05/2023",amount:"2000.00",name:"Jenifer Jareu"},
    {date:"03/05/2023",amount:"4000.00",name:"P Panda"},
    {date:"04/05/2023",amount:"7000.00",name:"Dave Batista"},
    {date:"05/05/2023",amount:"9000.00",name:"Arron Hothner"},
    {date:"01/05/2023",amount:"1000.00",name:"Spencer Reid"},
    {date:"02/05/2023",amount:"2000.00",name:"Jenifer Jareu"},
    {date:"03/05/2023",amount:"4000.00",name:"P Panda"},
    {date:"04/05/2023",amount:"7000.00",name:"Dave Batista"},
    {date:"05/05/2023",amount:"9000.00",name:"Arron Hothner"},
    {date:"05/05/2023",amount:"9000.00",name:"Arron Hothner"},
    {date:"01/05/2023",amount:"1000.00",name:"Spencer Reid"},
    {date:"02/05/2023",amount:"2000.00",name:"Jenifer Jareu"},
    {date:"03/05/2023",amount:"4000.00",name:"P Panda"},
    {date:"04/05/2023",amount:"7000.00",name:"Dave Batista"},
    {date:"05/05/2023",amount:"9000.00",name:"Arron Hothner"},
    {date:"01/05/2023",amount:"1000.00",name:"Spencer Reid"},
    {date:"02/05/2023",amount:"2000.00",name:"Jenifer Jareu"},
    {date:"03/05/2023",amount:"4000.00",name:"P Panda"},
    {date:"04/05/2023",amount:"7000.00",name:"Dave Batista"},
    {date:"05/05/2023",amount:"9000.00",name:"Arron Hothner"},
]


const BankDeposit = () => {

const [modalOpen,setModalOpen]=useState(false)
const depositOnclick=()=>{setModalOpen(true)}
const theme=useTheme()


  return (
    <Box sx={{mt:1}}>
       
       <Box sx={{mr:1,...GlobalStyles.alignmentStyles_2}}>
        <CustomButton onClick={depositOnclick} variant={"contained"} color={"secondary"} title={"ADD"}/>
       </Box>

        <Box sx={{mt:1,mr:1,mb:5}}>
        <CustomTable TableName={"BANK DEPOSIT"} headCells={FinoLabel.bankDepositTableHead} rows={depositData} />
        </Box>

        <CustomModal open={modalOpen} onClose={()=>{setModalOpen(false)}}>
            <Card sx={{height:300,width:350}}>
            <Box sx={{p:1,mt:1}}>
                <Typography variant='v2'>ADD DEPOSIT</Typography>
                <UnderLine color={theme?.palette?.p1?.main}/>
            </Box>
          
           <Box sx={{p:1,mt:1}}>
            <CustomTextField isFullwidth={true}/>

           </Box>
           <Box sx={{p:1,mt:1}}>
            <CustomTextField isFullwidth={true}/>

           </Box>
           <Box sx={{p:1,mt:1}}>
            <CustomTextField isFullwidth={true}/>

           </Box>

           <Box sx={{p:1,mt:1}}>
            <CustomButton title={"ADD"} isFullwidth={true}/>
           </Box>

            </Card>

        </CustomModal>
    </Box>
  )
}

export default BankDeposit