import { Box, Card, Chip, Grid, IconButton, Typography } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { GlobalStyles } from '../../styles/GlobalStyles'
import CustomTextField from '../../components/CustomTextField/CustomTextField'
import CustomButton from '../../components/CustomButton/CustomButton'
import CustomTable from '../../components/CustomTable/CustomTable'
import { FinoLabel } from '../../labels/FinoLabel'
import { addClientsService } from '../../redux/slice/clientslice/addClients'
import { useDispatch, useSelector } from 'react-redux'
import CustomSnackbar from '../../components/Customsnackbar/CustomSnackbar'
import ProtectedInterceptors from '../../hooks/ProtectedInterceptors'
import { getAllClientsService } from '../../redux/slice/clientslice/getAllClients'
import Loading from '../../components/Loading/Loading'
import TableLoader from '../../components/CustomTable/TableHelpers/TableLoader'
import { IsArray } from '../../utils/IsArray'
import CustomAlert from '../../components/CustomAlert/CustomAlert'
import { isDataPresent } from '../../utils/IsDataPresent'
import CustomDialog from '../../components/CustomDialog/CustomDialog'
import { FcDeleteRow } from 'react-icons/fc'
import { deleteClientService } from '../../redux/slice/clientslice/deleteAClient'
import CustomTooltips from '../../components/CustomTooltips/CustomTooltips'
import { IoClose } from 'react-icons/io5'
import DynamicHead from '../../components/DynamicHead/DynamicHead'
import AuthHook from '../../hooks/AuthHook'
import lock from "../../assets/lock.jpg"


const AddClients = () => {
    const dispatch = useDispatch()
    const protectedInterceptors = ProtectedInterceptors()
    const getAllClients = () => { dispatch(getAllClientsService(protectedInterceptors)) }
    const { jwtToken, userName, error, userRoles, fullName } = AuthHook()


    const [clientName, setClientName] = useState({ clientName: "", bankName: "", snack: false, refresh: false })
    const [clientDelete, setClientDelete] = useState({ dialog: false, snack: false, row: {}, refresh: false })

    const ADD_CLIENT_SLICE_REDUCER = useSelector((state) => state?.ADD_CLIENT_SLICE_REDUCER)
    const GET_ALL_CLIENTS_SLICE_REDUCER = useSelector((state) => state?.GET_ALL_CLIENTS_SLICE_REDUCER)
    const DELETE_CLIENT_SLICE_REDUCER = useSelector((state) => state?.DELETE_CLIENT_SLICE_REDUCER)



    useEffect(() => {
        getAllClients();
    }, [clientName?.refresh, clientDelete?.refresh])

    const onAddClick = async (e) => {
        e.preventDefault()
        const { payload } = await dispatch(addClientsService({ protectedInterceptors: protectedInterceptors, payload: clientName }))
        if (payload?.statusCode === 200) {
            setClientName((prev) => ({ ...prev, bankName: "", clientName: "", snack: true, refresh: !prev.refresh }))
        }
        else {
            setClientName((prev) => ({ ...prev, snack: true }))

        }
    }
    const onDelete = (row) => { setClientDelete((prev) => ({ ...prev, dialog: true, row: row })) }
    const onDeleteDialogConfirm = async (e) => {
        e.preventDefault();
        const { payload } = await dispatch(deleteClientService({ protectedInterceptors: protectedInterceptors, clientId: clientDelete?.row?.clientId }))
        if (payload?.statusCode === 200) {
            setClientDelete((prev) => ({ ...prev, dialog: false, row: {}, snack: true, refresh: !prev.refresh }))
        }
        else {
            setClientDelete((prev) => ({ ...prev, dialog: false, row: {}, snack: true }))
        }

    }


    const clientList = useMemo(() => {
        return (
            IsArray(GET_ALL_CLIENTS_SLICE_REDUCER?.data?.response) ? (
                GET_ALL_CLIENTS_SLICE_REDUCER?.data?.response?.map((item) => {
                    let { bankName, ...clients } = item;
                    return clients;
                })
            )?.filter((cll) => isDataPresent(cll?.clientName)) : []
        )


    }, [GET_ALL_CLIENTS_SLICE_REDUCER])

    const bankList = useMemo(() => {
        return (
            IsArray(GET_ALL_CLIENTS_SLICE_REDUCER?.data?.response) ? (
                GET_ALL_CLIENTS_SLICE_REDUCER?.data?.response?.map((item) => {
                    let { clientName, ...banks } = item;
                    return banks;
                })
            )?.filter((cll) => isDataPresent(cll?.bankName)) : []
        )


    }, [GET_ALL_CLIENTS_SLICE_REDUCER])


    return (
        <Box>

            <DynamicHead title={`CLIENT LIST'S OF ${fullName?.toLocaleUpperCase()}`} />



            <Grid container>
                <Grid item xs={12} md={6}>
                    <Box sx={{ p: 1.5 }}>
                        {/* <Card sx={{ p: 1.8, mt: 2 }}>
                            {
                                isDataPresent(clientName?.clientName) && ADD_CLIENT_SLICE_REDUCER?.isLoading ? <Loading minHeight={30} minWidth={"100%"} /> : <form onSubmit={onAddClick}>
                                    <Box sx={{ ...GlobalStyles.alignmentStyles_1 }}>
                                        <Box sx={{ width: "80%" }}>
                                            <CustomTextField value={clientName.clientName} onChange={(e) => { setClientName({ ...clientName, clientName: e.target.value }) }} isFullwidth={true} label={"Client Name"} placeholder={"Client Name"}></CustomTextField>
                                        </Box>

                                        <Box sx={{ width: "20%", ml: 2 }}>
                                            <CustomButton isFullwidth={true} title={"ADD"} color={"primary"} />
                                        </Box>
                                    </Box>
                                </form>
                            }
                        </Card> */}
                        <Card sx={{ p: 1.8, mt:2}}>

                            {
                                GET_ALL_CLIENTS_SLICE_REDUCER?.isLoading ? <TableLoader /> :
                                    (
                                        IsArray(clientList) && clientList?.length > 0 ?
                                            <CustomTable
                                                TableName={"Client's List "}
                                                headCells={FinoLabel.clientTableHead}
                                                rows={clientList}
                                                onDeleteClick={onDelete}
                                            /> : <CustomAlert alertTitle={FinoLabel.noRecordFound} alertDescription={FinoLabel.noRecordFoundDesc} color={"secondary"} variant={"outlined"} severity={"info"} />
                                    )

                            }




                        </Card>

                    </Box>

                </Grid>

                <Grid item xs={12} md={6}>
                    <Box sx={{ p: 1.5 }}>
                        <Card sx={{ p: 1.8, mt: 2 }}>
                            {
                                isDataPresent(clientName?.bankName) && ADD_CLIENT_SLICE_REDUCER?.isLoading ? <Loading minHeight={30} minWidth={"100%"} /> : <form onSubmit={onAddClick}>
                                    <Box sx={{ ...GlobalStyles.alignmentStyles_1 }}>
                                        <Box sx={{ width: "80%" }}>
                                            <CustomTextField isRequired={true} value={clientName.bankName} onChange={(e) => { setClientName({ ...clientName, bankName: e.target.value }) }} isFullwidth={true} label={"Bank Name"} placeholder={"Bank Name"}></CustomTextField>
                                        </Box>

                                        <Box sx={{ width: "20%", ml: 2 }}>
                                            <CustomButton isFullwidth={true} title={"ADD"} color={"primary"} />
                                        </Box>
                                    </Box>
                                </form>
                            }

                        </Card>
                        <Card sx={{ p: 1.8, mt: 4 }}>

                            {
                                GET_ALL_CLIENTS_SLICE_REDUCER?.isLoading ? <TableLoader /> :
                                    (
                                        IsArray(bankList) && bankList?.length > 0 ?

                                            <CustomTable
                                                TableName={"Bank's List "}
                                                headCells={FinoLabel.bankTableHead}
                                                rows={bankList}
                                                isEditNotRequired={true}
                                                isActionRequired={true}
                                                onDeleteClick={onDelete}
                                            /> : <CustomAlert alertTitle={FinoLabel.noRecordFound} alertDescription={FinoLabel.noRecordFoundDesc} color={"secondary"} variant={"outlined"} severity={"info"} />
                                    )

                            }

                        </Card>

                    </Box>

                </Grid>
            </Grid>



            <CustomDialog open={clientDelete?.dialog} onClose={() => setClientDelete((prev) => { return { ...prev, dialog: false } })}>

                {
                    DELETE_CLIENT_SLICE_REDUCER?.isLoading ? <Loading /> :
                        <Box sx={{ p: 1 }}>
                            <Box sx={{ ...GlobalStyles.alignmentStyles_2 }} ><CustomTooltips title={"CLOSE"}> <IconButton aria-label="close" onClick={() => setClientDelete((prev) => { return { ...prev, dialog: false } })} sx={{ color: (theme) => theme?.palette?.p1?.main }} >
                                <IoClose /></IconButton> </CustomTooltips></Box>

                            <Box sx={{ p: 2, flexWrap: "wrap" }}>
                                <Typography color={"info"} variant='v2' >Do you really wish to Remove this Data with Id  &nbsp;<span><Chip size="small" variant="outlined" color="p1" label={`${clientDelete?.row?.clientId} `} /></span></Typography>
                            </Box>
                            <Box sx={{ p: 1, mt: 2, ...GlobalStyles.alignmentStyles_2 }}>
                                <CustomButton title={"DELETE"} onClick={onDeleteDialogConfirm} variant={"outlined"} color={"p1"} endIcon={<FcDeleteRow />} />
                            </Box>

                        </Box>
                }


            </CustomDialog>



            <CustomSnackbar open={clientName?.snack} onClose={() => { setClientName((prev) => { return { ...prev, snack: false } }) }} message={ADD_CLIENT_SLICE_REDUCER?.data?.statusMessage} severity={ADD_CLIENT_SLICE_REDUCER?.data?.statusCode === 200 ? "success" : "info"} />

            <CustomSnackbar open={clientDelete?.snack} onClose={() => { setClientDelete((prev) => { return { ...prev, snack: false } }) }} message={DELETE_CLIENT_SLICE_REDUCER?.data?.statusMessage} severity={DELETE_CLIENT_SLICE_REDUCER?.data?.statusCode === 200 ? "success" : "info"} />





        </Box>

    )
}

export default AddClients