import { Box, Card, Grid, Typography } from '@mui/material'
import React from 'react'
import { GlobalStyles } from '../../../styles/GlobalStyles'
import { useTheme } from '@emotion/react'
import { MdAccountBalanceWallet } from "react-icons/md";
import UnderLine from '../../../components/UnderLine/UnderLine';
import ClientSerching from './ClientSerching';
import CustomTable from '../../../components/CustomTable/CustomTable';
import { FinoLabel } from '../../../labels/FinoLabel';
import { IsArray } from '../../../utils/IsArray';
import { TwoDecimalPlaceAdd } from '../../../utils/TwoDecimalPlaceAdd';
import TableLoader from '../../../components/CustomTable/TableHelpers/TableLoader';
import CustomAlert from '../../../components/CustomAlert/CustomAlert';
import CustomBarCharts from '../../../components/BarCharts/CustomBarCharts';
import CustomPieCharts from '../../../components/PieCharts/CustomPieCharts';


const ClientDashboard = ({ clientTable, totalAmount, yearOptinsForClientCmsTxn, onDateSerch, 
    onMonthChange, onYearChange, clientDetailsResponse,memorizedClientBar }) => {

    const theme = useTheme()


    return (
        <Box >

            <Box sx={{ ...GlobalStyles.alignmentStyles_2 }}>
                <Card sx={{ height: 80, width: 140 }}>
                    <Box sx={{ ...GlobalStyles.alignmentStyles }}>
                        <MdAccountBalanceWallet fontSize={28} color={theme?.palette?.primary?.main} />
                    </Box>
                    <Box sx={{ ...GlobalStyles.alignmentStyles }}>
                        <Typography variant='v2' color="primary">Total Amount</Typography>
                    </Box>
                    <Box sx={{ mt: 1, ...GlobalStyles.alignmentStyles }}>
                        <Typography variant='v2' color="primary">{`₹ ${totalAmount}`}</Typography>
                    </Box>
                </Card>
            </Box>


            <Box>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ mr: 1, mb: 1, mt: 2 }}>
                            <Card>
                                <Box sx={{ ml: 1, mb: 1, mt: 2 }}>
                                    <Typography variant="v5">
                                        Monthly txn's
                                    </Typography>
                                    <UnderLine color={theme?.palette?.p1?.main} width={21} />
                                </Box>
                                <Box sx={{ p: 2 }}>
                                    <CustomBarCharts width={500} height={200} dataset={memorizedClientBar} series={FinoLabel.clientBarGraphSeries} />
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
                                    <CustomPieCharts chartData={FinoLabel?.clientPieChartSeries([])} />
                                </Box>
                            </Card>
                        </Box>
                    </Grid>

                </Grid>
            </Box>

            <Box sx={{ mt: 2 }}>
                <ClientSerching
                    yearOptions={yearOptinsForClientCmsTxn}
                    onDateSerch={onDateSerch}
                    onMonthChange={onMonthChange}
                    onYearChange={onYearChange}

                />
            </Box>

            <Box sx={{ mt: 2, p: 0.9 }}>
                {
                    clientDetailsResponse?.isLoading ? <TableLoader /> :
                        (IsArray(clientTable) && clientTable?.length > 0) ?
                            <CustomTable
                                TableName={"YOUR REPORTS"}
                                headCells={FinoLabel.cmsTransactionTableHead}
                                rows={IsArray(clientTable) ? clientTable : []}

                            /> : <CustomAlert alertTitle={FinoLabel.noRecordFound} alertDescription={FinoLabel.noRecordFoundDesc} color={"secondary"} variant={"outlined"} severity={"info"} />
                }

            </Box>

        </Box>
    )
}

export default ClientDashboard