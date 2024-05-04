import { Box } from '@mui/material'
import React from 'react'
import CustomDatePicker from '../../../components/CustomDatePicker/CustomDatePicker'
import CustomTextField from '../../../components/CustomTextField/CustomTextField'
import CustomButton from '../../../components/CustomButton/CustomButton'

const DepositAndCmsForm = ({onSubmit,fields,isUpdate}) => {

    const{depositFields,setDepositFields}=fields


  return (
    <Box>
         <form onSubmit={onSubmit}>
            <Box sx={{p:1,mt:1}}>
            <CustomDatePicker isFullWidth={true} value={depositFields.date} onChange={(e)=>{setDepositFields({...depositFields,date:e})}} label={"Transaction Date"}/>
          </Box>
           <Box sx={{p:1,mt:1}}>
            <CustomTextField  isFullwidth={true} label={"Sales"} placeholder={"Sales"}  value={depositFields.sales} onChange={(e)=>{setDepositFields({...depositFields,sales:e.target.value})}} />

           </Box>
           <Box sx={{p:1,mt:1}}>
            <CustomTextField isFullwidth={true} label={"Litre"} placeholder={"Litre"}   value={depositFields.litre} onChange={(e)=>{setDepositFields({...depositFields,litre:e.target.value})}} />

           </Box>
           <Box sx={{p:1,mt:1}}>
            <CustomTextField isFullwidth={true}  label={"Rate"} placeholder={"Rate"}  value={depositFields.rate} onChange={(e)=>{setDepositFields({...depositFields,rate:e.target.value})}}/>

           </Box>
           <Box sx={{p:1,mt:1}}>
            <CustomTextField isFullwidth={true}  label={"Amount"} placeholder={"Amount"}  value={depositFields.amount} onChange={(e)=>{setDepositFields({...depositFields,amount:e.target.value})}} />

           </Box>
           <Box sx={{p:1,mt:1}}>
            <CustomTextField isFullwidth={true}  label={"Name"} placeholder={"Name"}  value={depositFields.name} onChange={(e)=>{setDepositFields({...depositFields,name:e.target.value})}} />

           </Box>

           <Box sx={{p:1,mt:2}}>
            <CustomButton title={isUpdate?"UPDATE":"ADD"} isFullwidth={true}/>
           </Box>
           </form>

    </Box>
    
  )
}

export default DepositAndCmsForm