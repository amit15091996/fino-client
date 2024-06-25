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


export const previousDayOfHsdSaleOne = (dataArray) => {


    if (Array.isArray(dataArray)) {
        const previousDay = dataArray?.find((hsdOne) => dayjs(hsdOne?.hsdTankOneDate).isValid() ? dayjs(hsdOne?.hsdTankOneDate)?.isSame(dayjs().subtract(1, "day"), "dates") : {})

        return previousDay ? previousDay : {}
    } else {
        return {}
    }
}

export const sameDayOfHsdSaleOne = (dataArray) => {


    if (Array.isArray(dataArray)) {
        const sameDay = dataArray?.find((hsdOne) => { return dayjs(hsdOne?.hsdTankOneDate).isValid() ? dayjs(hsdOne?.hsdTankOneDate)?.isSame(dayjs(), "dates") : {} })
        return sameDay ? sameDay : {}
    } else {
        return {}
    }
}


export const allDatesBetweenTwoDatesOfMsSale = (dataArray) => {

    if (Array.isArray(dataArray) && dataArray?.length > 0) {
        const lastEnteredMsSaleDate = dataArray?.reduce((maxDate, minDate) => dayjs(maxDate?.msSaleInsertDateTime) > dayjs(minDate?.msSaleInsertDateTime) ? maxDate : minDate)
        return getAllDatesBetweenDates(lastEnteredMsSaleDate?.msSaleInsertDateTime, dayjs())
    }
    else { return [] }
}


export const allDatesBetweenTwoDatesOfHsdTankOne = (dataArray) => {

    if (Array.isArray(dataArray) && dataArray?.length > 0) {
        const lastEnteredHsdTankOneDate = dataArray?.reduce((maxDate, minDate) => dayjs(maxDate?.hsdTankOneInsertDateTime) > dayjs(minDate?.hsdTankOneInsertDateTime) ? maxDate : minDate)
        return getAllDatesBetweenDates(lastEnteredHsdTankOneDate?.hsdTankOneInsertDateTime, dayjs())
    }
    else { return [] }
}

export const allDatesBetweenTwoDatesOfHsdTankTwo = (dataArray) => {

    if (Array.isArray(dataArray) && dataArray?.length > 0) {
        const lastEnteredHsdTankTwoDate = dataArray?.reduce((maxDate, minDate) => dayjs(maxDate?.hsdTankTwoInsertDateTime) > dayjs(minDate?.hsdTankTwoInsertDateTime) ? maxDate : minDate)
        return getAllDatesBetweenDates(lastEnteredHsdTankTwoDate?.hsdTankTwoInsertDateTime, dayjs())
    }
    else { return [] }
}


export const getAllDatesBetweenDates = (startDate, endDate) => {
    let dateArray = []
    let currentDate = dayjs(startDate).add(1, 'days')
    while (dayjs(currentDate) < dayjs(endDate).subtract(1, "days")) {
        dateArray.push(currentDate.format("DD/MM/YYYY"))
        currentDate = currentDate.add(1, 'days');
    }
    return dateArray
}