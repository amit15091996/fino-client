import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';



export function tabPanelProps(index) {
    return { id: `fino-tab-${index}`, 'aria-controls': `fino-tabpanel-${index}` }
}


const Tabpanel = ({ children, value, index, ...other }) => {

    return (
        <Box elevation={0} role="tabpanel" hidden={value !== index} id={`fino-tabpanel-${index}`} aria-labelledby={`fino-tab-${index}`} {...other} >
            {value === index && (<Box>{children} </Box>)}
        </Box>
    )
}

export default Tabpanel

Tabpanel.propTypes = { children: PropTypes.node, index: PropTypes.number.isRequired, value: PropTypes.number.isRequired };
