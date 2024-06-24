import dayjs from "dayjs"

export const previousDayOfMssale = (dataArray) => {


    if (Array.isArray(dataArray)) {
        const previousDay = dataArray?.find((msSale) => dayjs(msSale?.msSaleDate).isValid() ? dayjs(msSale?.msSaleDate)?.isSame(dayjs().subtract(1, "day"), "dates") : {})

        return previousDay ? previousDay : {}
    } else {
        return {}
    }
}


export const sameDayOfMssale = (dataArray) => {


    if (Array.isArray(dataArray)) {
        const sameDay = dataArray?.find((msSale) => { return dayjs(msSale?.msSaleDate).isValid() ? dayjs(msSale?.msSaleDate)?.isSame(dayjs(), "dates") : {} })
        return sameDay ? sameDay : {}
    } else {
        return {}
    }
}

export const previousDayOfHsdSaleTwo = (dataArray) => {


    if (Array.isArray(dataArray)) {
        const previousDay = dataArray?.find((hsdtwo) => dayjs(hsdtwo?.hsdTankTwoDate).isValid() ? dayjs(hsdtwo?.hsdTankTwoDate)?.isSame(dayjs().subtract(1, "day"), "dates") : {})

        return previousDay ? previousDay : {}
    } else {
        return {}
    }
}

export const sameDayOfHsdSaleTwo = (dataArray) => {


    if (Array.isArray(dataArray)) {
        const sameDay = dataArray?.find((hsdtwo) => { return dayjs(hsdtwo?.hsdTankTwoDate).isValid() ? dayjs(hsdtwo?.hsdTankTwoDate)?.isSame(dayjs(), "dates") : {} })
        return sameDay ? sameDay : {}
    } else {
        return {}
    }
}

