import { Box, Chip, Typography } from '@mui/material'
import React from 'react'
import { GlobalStyles } from '../../../styles/GlobalStyles'
import UnderLine from '../../../components/UnderLine/UnderLine'

const LeftDates = ({ datesArray }) => {



    return (

        <Box sx={{ width: "100%", height: "100%"}}>
             <Box sx={{p:0.3,ml:0.5}}>
                <Typography variant='v5'>
                    {`Please add below dates report before adding today's report `}
                    <UnderLine />
                </Typography>
            </Box>
            <Box sx={{ width: "100%", height: "100%",display:"flex"}}>
            {
                Array.isArray(datesArray) ? datesArray?.map((date, index) => {
                    return (
                        <Box sx={{ p: 0.3 }}>
                            <Chip size='small' color='p1' variant='filled' label={date} key={`${date}-${index}`}>

                            </Chip></Box>
                    )
                }) : <></>
            }
            </Box>
        
        </Box>
    )
}

export default LeftDates