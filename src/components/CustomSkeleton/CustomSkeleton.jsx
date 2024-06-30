import { Skeleton } from '@mui/material'
import React from 'react'

const CustomSkeleton = ({ variant, width, height, animation,bgcolor }) => {
    return (
        <>
            <Skeleton
                variant={variant ? variant : "rounded"}
                width={width ? width : "100%"}
                height={height ? height : "100%"}
                animation={animation ? animation : "wave"}
                sx={{ bgcolor: bgcolor ? bgcolor : "#87bfff" }}
            />

        </>
    )
}

export default CustomSkeleton