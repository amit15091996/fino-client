import { Box, Card } from '@mui/material'
import React, { useState } from 'react'
import { GlobalStyles } from '../../styles/GlobalStyles'
import CustomTextField from '../../components/CustomTextField/CustomTextField'
import CustomButton from '../../components/CustomButton/CustomButton'
import CustomTable from '../../components/CustomTable/CustomTable'
import { FinoLabel } from '../../labels/FinoLabel'


const AddClients = () => {

const [clientName,setClientName]=useState({clientName:""})
const [clientList,setClientList]=useState([])

const onAddClick=(e)=>{
    e.preventDefault()
    setClientList((prev)=>{
        return [...prev,{id:Math.round(Math.random()*1000000),...clientName}] 

    })
    setClientName({clientName:""})
}

const onDelete=(row)=>{
    setClientList(clientList?.filter((cl)=>cl?.id!==row?.id))
}


  return (
    <Box>
    <Card sx={{p:1.8,width:400,mt:2}}>
        <form onSubmit={onAddClick}> 
        <Box sx={{...GlobalStyles.alignmentStyles_1}}>
            <Box sx={{width:"80%"}}>
                <CustomTextField value={clientName.clientName} onChange={(e)=>{setClientName({...clientName,clientName:e.target.value})}} isFullwidth={true} label={"Client Name"} placeholder={"Client Name"}></CustomTextField>
            </Box>

            <Box sx={{width:"20%",ml:2}}>
                <CustomButton  isFullwidth={true} title={"ADD"} color={"primary"}/>
            </Box>
        </Box>
        </form>
       

    </Card>

    <Card sx={{p:1.8,width:400,mt:4}}>
        <CustomTable
        TableName={"Client's List "}
headCells={FinoLabel.clientTableHead}
rows={clientList}
isActionRequired={true}
onDeleteClick={onDelete}
        />


    </Card>


    </Box>
    
  )
}

export default AddClients