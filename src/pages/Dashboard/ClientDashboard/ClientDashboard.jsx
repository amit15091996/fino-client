import { Box, Card, Grid, Typography } from '@mui/material'
import React from 'react'
import { GlobalStyles } from '../../../styles/GlobalStyles'
import { useTheme } from '@emotion/react'
import { MdAccountBalanceWallet } from "react-icons/md";
import UnderLine from '../../../components/UnderLine/UnderLine';
import BarCharts from '../../../components/BarCharts/BarCharts';
import PieCharts from '../../../components/PieCharts/PieCharts';
import ClientSerching from './ClientSerching';
import CustomTable from '../../../components/CustomTable/CustomTable';
import { FinoLabel } from '../../../labels/FinoLabel';


const ClientDashboard = () => {

    const theme = useTheme()



    return (
        <Box>

            <Box sx={{ ...GlobalStyles.alignmentStyles_2 }}>
                <Card sx={{ height: 80, width: 140 }}>
                    <Box sx={{ ...GlobalStyles.alignmentStyles }}>
                        <MdAccountBalanceWallet fontSize={28} color={theme?.palette?.primary?.main} />
                    </Box>
                    <Box sx={{ ...GlobalStyles.alignmentStyles }}>
                        <Typography variant='v2' color="primary">Opening Balance</Typography>
                    </Box>
                    <Box sx={{ mt: 1, ...GlobalStyles.alignmentStyles }}>
                        <Typography variant='v2' color="primary">10000.00</Typography>
                    </Box>
                </Card>
            </Box>


            <Box sx={{ mt: 2 }}>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ mr: 1, mb: 1, mt: 2 }}>
                            <Card>
                                <Box sx={{ ml: 1, mb: 1, mt: 2 }}>
                                    <Typography variant="v5">
                                        Yearly Sale's
                                    </Typography>
                                    <UnderLine color={theme?.palette?.p1?.main} width={21} />
                                </Box>
                                <Box sx={{ p: 2 }}>
                                    <BarCharts />
                                </Box>
                            </Card>

                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ ml: 1, mb: 1, mt: 2 }}>
                            <Card>
                                <Box sx={{ ml: 1, mb: 1, mt: 2 }}>
                                    <Typography variant="v5">
                                        Quarterly Sale's
                                    </Typography>
                                    <UnderLine color={theme?.palette?.p1?.main} width={21} />
                                </Box>
                                <Box sx={{ p: 2, ...GlobalStyles.alignmentStyles }}>
                                    <PieCharts />
                                </Box>
                            </Card>
                        </Box>
                    </Grid>

                </Grid>
            </Box>

            <Box sx={{ mt: 2 }}>
                <ClientSerching />
            </Box>

            <Box sx={{ mt: 2 }}>
                <CustomTable
                    TableName={"YOUR REPORTS"}
                    headCells={FinoLabel.cmsTransactionTableHead}
                    rows={[]}

                />
            </Box>

        </Box>
    )
}

export default ClientDashboard