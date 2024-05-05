import React, { useState } from 'react'
import CustomTable from '../../../components/CustomTable/CustomTable'
import { Box, Card, IconButton, Typography } from '@mui/material'
import { FinoLabel } from '../../../labels/FinoLabel'
import { GlobalStyles } from '../../../styles/GlobalStyles'
import CustomButton from '../../../components/CustomButton/CustomButton'
import CustomModal from '../../../components/CustomModal/CustomModal'
import CustomTextField from '../../../components/CustomTextField/CustomTextField'
import UnderLine from '../../../components/UnderLine/UnderLine'
import { useTheme } from '@emotion/react'
import { IoClose } from "react-icons/io5";
import CustomDatePicker from '../../../components/CustomDatePicker/CustomDatePicker'
import dayjs from 'dayjs'
import DepositAndCmsForm from './DepositAndCmsForm'

export const depositData=[
    {id:1,date:"01/05/2023",sales:"ms",litre:"950",rate:"60.91",amount:"1000.00",name:"Spencer Reid"},
    {id:2,date:"02/05/2023",sales:"HSD",litre:"150",rate:"67.91",amount:"2000.00",name:"Jenifer Jareu"},
    {id:3,date:"03/05/2023",sales:"40 ML",litre:"550",rate:"66.91",amount:"4000.00",name:"P Panda"},
    {id:4,date:"04/05/2023",sales:"20 Ml",litre:"950",rate:"62.91",amount:"7000.00",name:"Dave Batista"},
]

export const newObj=(newDta)=>{ return{...newDta,date:dayjs(newDta?.date).format("DD/MM/YYYY")} }


const BankDeposit = () => {

const [modalOpen,setModalOpen]=useState(false)
const[updateModal,setupdateModal]=useState(false)

const depositOnclick=()=>{setModalOpen(true)}
const theme=useTheme()

const[depositFields,setDepositFields]=useState({
  date:null,sales:"",litre:"",rate:"",amount:"",name:""
})

const[bankDepositData,setBankDepositData]=useState(depositData)


const onDepositDataAdd=(e)=>{
  e.preventDefault()
  setBankDepositData((d)=>{

    return([...d,{id:Math.random()*1000000,...newObj(depositFields)}])
  })
  setDepositFields({date:null,sales:"",litre:"",rate:"",amount:"",name:"" })
  setModalOpen(false)
}

const onDepositDelete=(row)=>{
  setBankDepositData(bankDepositData?.filter((mydata)=>mydata.id !==row?.id))
}


const onUpdateClick=(row)=>{
  setupdateModal(true)
}

  return (
    <Box sx={{mt:1}}>
       
       <Box sx={{mr:1,...GlobalStyles.alignmentStyles_2}}>
        <CustomButton onClick={depositOnclick} variant={"contained"} color={"secondary"} title={"ADD"} />
       </Box>

        <Box sx={{mt:1,mr:1,mb:5}}>
        <CustomTable TableName={"BANK DEPOSIT"} onEditClick={onUpdateClick} headCells={FinoLabel.bankDepositTableHead} onDeleteClick={onDepositDelete} rows={bankDepositData} isActionRequired={true} />
        </Box>

        <CustomModal open={modalOpen} onClose={()=>{setModalOpen(false)}}>



            <Card sx={{height:500,width:350,p:2}}>
            <Box sx={{p:1,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <Box>
              <Typography variant='v2'>ADD DEPOSIT</Typography>
                <UnderLine color={theme?.palette?.p1?.main}/>
              </Box>
               
                <Box>
                <IconButton  aria-label="close" onClick={()=>{setModalOpen(false)}} sx={{color: (theme) => theme.palette.grey[500]}} >
          <IoClose />
        </IconButton>
                </Box>
               
            </Box>
           
           <DepositAndCmsForm fields={{depositFields,setDepositFields}} onSubmit={onDepositDataAdd}/>
            </Card>

        </CustomModal>


        <CustomModal open={updateModal} onClose={()=>{setupdateModal(false)}}>



<Card sx={{height:500,width:350,p:2}}>
<Box sx={{p:1,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
  <Box>
  <Typography variant='v2'>UPDATE DEPOSIT</Typography>
    <UnderLine color={theme?.palette?.p1?.main}/>
  </Box>
   
    <Box>
    <IconButton  aria-label="close" onClick={()=>{setupdateModal(false)}} sx={{color: (theme) => theme.palette.grey[500]}} >
<IoClose />
</IconButton>
    </Box>
   
</Box>

<DepositAndCmsForm fields={{depositFields,setDepositFields}} isUpdate={true}/>
</Card>

</CustomModal>


    </Box>
  )
}

export default BankDeposit