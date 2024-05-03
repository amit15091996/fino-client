import { Modal } from '@mui/material'
import React from 'react'
import { GlobalStyles } from '../../styles/GlobalStyles'

const CustomModal = ({open,onClose,children}) => {
  return (
    <React.Fragment>
        <Modal sx={{...GlobalStyles.alignmentStyles}} open={open} onClose={onClose}>
        {children}
        </Modal>
    </React.Fragment>
  )
}

export default CustomModal