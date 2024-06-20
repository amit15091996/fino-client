import React from 'react'
import { Card, Skeleton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"


const loadingArray = [1, 2, 3, 4, 5, 6]

const TableLoader = () => {

    return (
        <Card  >
            <Table>
                <TableHead>
                    <TableRow>
                        {loadingArray.map((item) => {
                            return (
                                <TableCell size='small' id={item}>
                                    <Skeleton animation="wave" sx={{borderRadius:1}} variant='rectangular' ></Skeleton>
                                </TableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        loadingArray.map((item2) => {

                            return (
                                <TableRow id={item2}>
                                    {loadingArray.map((item) => {
                                        return (
                                            <TableCell size='small' id={item}>
                                                <Skeleton sx={{borderRadius:1}} animation="wave" variant='rectangular' ></Skeleton>
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            )
                        })


                    }

                </TableBody>

            </Table>
        </Card>

    )
}

export default TableLoader;