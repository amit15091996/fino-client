import dayjs from "dayjs"

export const previousDayOfMssale = (dataArray) => {

    if (Array.isArray(dataArray) && dataArray?.length > 0) {
        const previousDay = dataArray?.reduce((startDate, endDate) => (dayjs(startDate?.msSaleDate).isValid() && dayjs(endDate?.msSaleDate).isValid()) ? dayjs(startDate?.msSaleDate) > dayjs(endDate?.msSaleDate) ? startDate : endDate : {})
        return previousDay ? previousDay : {}
    } else {
        return {}
    }
}


export const sameDayOfMssale = (dataArray) => {


    if (Array.isArray(dataArray) && dataArray?.length > 0) {
        const sameDay = dataArray?.find((msSale) => { return dayjs(msSale?.msSaleDate).isValid() ? dayjs(msSale?.msSaleDate)?.isSame(dayjs(), "dates") : {} })
        return sameDay ? sameDay : {}
    } else {
        return {}
    }
}

export const previousDayOfHsdSaleTwo = (dataArray) => {


    if (Array.isArray(dataArray) && dataArray?.length > 0) {
        const previousDay = dataArray?.reduce((startDate, endDate) => (dayjs(startDate?.hsdTankTwoDate).isValid() && dayjs(endDate?.hsdTankTwoDate).isValid()) ? dayjs(startDate?.hsdTankTwoDate) > dayjs(endDate?.hsdTankTwoDate) ? startDate : endDate : {});
        return previousDay ? previousDay : {}
    } else {
        return {}
    }
}

export const sameDayOfHsdSaleTwo = (dataArray) => {


    if (Array.isArray(dataArray) && dataArray?.length > 0) {
        const sameDay = dataArray?.find((hsdtwo) => { return dayjs(hsdtwo?.hsdTankTwoDate).isValid() ? dayjs(hsdtwo?.hsdTankTwoDate)?.isSame(dayjs(), "dates") : {} })
        return sameDay ? sameDay : {}
    } else {
        return {}
    }
}


export const previousDayOfHsdSaleOne = (dataArray) => {


    if (Array.isArray(dataArray) && dataArray?.length > 0) {
        const previousDay = dataArray?.reduce((startDate, endDate) => (dayjs(startDate?.hsdTankOneDate).isValid() && dayjs(endDate?.hsdTankOneDate).isValid()) ? dayjs(startDate?.hsdTankOneDate) > dayjs(endDate?.hsdTankOneDate) ? startDate : endDate : {});

        return previousDay ? previousDay : {}
    } else {
        return {}
    }
}

export const sameDayOfHsdSaleOne = (dataArray) => {


    if (Array.isArray(dataArray) && dataArray?.length > 0) {
        const sameDay = dataArray?.find((hsdOne) => { return dayjs(hsdOne?.hsdTankOneDate).isValid() ? dayjs(hsdOne?.hsdTankOneDate)?.isSame(dayjs(), "dates") : {} })
        return sameDay ? sameDay : {}
    } else {
        return {}
    }
}


export const allDatesBetweenTwoDatesOfMsSale = (dataArray) => {

    if (Array.isArray(dataArray) && dataArray?.length > 0) {
        const lastEnteredMsSaleDate = dataArray?.reduce((maxDate, minDate) => dayjs(maxDate?.msSaleDate) > dayjs(minDate?.msSaleDate) ? maxDate : minDate)
        return getAllDatesBetweenDates(lastEnteredMsSaleDate?.msSaleDate, dayjs().subtract(1, "days"))
    }
    else { return [] }
}


export const allDatesBetweenTwoDatesOfHsdTankOne = (dataArray) => {

    if (Array.isArray(dataArray) && dataArray?.length > 0) {
        const lastEnteredHsdTankOneDate = dataArray?.reduce((maxDate, minDate) => dayjs(maxDate?.hsdTankOneDate) > dayjs(minDate?.hsdTankOneDate) ? maxDate : minDate)
        return getAllDatesBetweenDates(lastEnteredHsdTankOneDate?.hsdTankOneDate, dayjs().subtract(1, "days"))
    }
    else { return [] }
}

export const allDatesBetweenTwoDatesOfHsdTankTwo = (dataArray) => {

    if (Array.isArray(dataArray) && dataArray?.length > 0) {
        const lastEnteredHsdTankTwoDate = dataArray?.reduce((maxDate, minDate) => dayjs(maxDate?.hsdTankTwoDate) > dayjs(minDate?.hsdTankTwoDate) ? maxDate : minDate)
        return getAllDatesBetweenDates(lastEnteredHsdTankTwoDate?.hsdTankTwoDate, dayjs().subtract(1, "days"))
    }
    else { return [] }
}


export const getAllDatesBetweenDates = (startDate, endDate) => {
    let dateArray = []
    let currentDate = dayjs(startDate).add(1, 'days')
    while (dayjs(currentDate) < dayjs(endDate)) {
        dateArray.push(currentDate.format("DD/MM/YYYY"))
        currentDate = currentDate.add(1, 'days');
    }
    return dateArray
}




export const previousDayOfMssaleWhileEdit = (dataArray, editDate) => {
    if (Array.isArray(dataArray) && dataArray?.length > 0) {
        const previousDay = dataArray?.find((previousDate) => (dayjs(previousDate?.msSaleDate).isValid() && dayjs(editDate, "DD/MM/YYYY").isValid()) ? dayjs(editDate, "DD/MM/YYYY").subtract(1, "days").isSame(dayjs(previousDate?.msSaleDate)) : {})
        return previousDay ? previousDay : {}
    } else {
        return {}
    }
}

export const previousDayOfHsdTankOneWhileEdit = (dataArray, editDate) => {
    if (Array.isArray(dataArray) && dataArray?.length > 0) {
        const previousDay = dataArray?.find((previousDate) => (dayjs(previousDate?.hsdTankOneDate).isValid() && dayjs(editDate, "DD/MM/YYYY").isValid()) ? dayjs(editDate, "DD/MM/YYYY").subtract(1, "days").isSame(dayjs(previousDate?.hsdTankOneDate)) : {})
        return previousDay ? previousDay : {}
    } else {
        return {}
    }
}


export const previousDayOfHsdTankTwoWhileEdit = (dataArray, editDate) => {
    if (Array.isArray(dataArray) && dataArray?.length > 0) {
        const previousDay = dataArray?.find((previousDate) => (dayjs(previousDate?.hsdTankTwoDate).isValid() && dayjs(editDate, "DD/MM/YYYY").isValid()) ? dayjs(editDate, "DD/MM/YYYY").subtract(1, "days").isSame(dayjs(previousDate?.hsdTankTwoDate)) : {})
        return previousDay ? previousDay : {}
    } else {
        return {}
    }
}


//previous Day Data

// export const previousDayOfMssale = (dataArray) => {


//     if (Array.isArray(dataArray)) {
//         const previousDay = dataArray?.find((msSale) => dayjs(msSale?.msSaleDate).isValid() ? dayjs(msSale?.msSaleDate)?.isSame(dayjs().subtract(1, "day"), "dates") : {})

//         return previousDay ? previousDay : {}
//     } else {
//         return {}
//     }
// }




// export const previousDayOfHsdSaleTwo = (dataArray) => {


//     if (Array.isArray(dataArray)) {
//         const previousDay = dataArray?.find((hsdtwo) => dayjs(hsdtwo?.hsdTankTwoDate).isValid() ? dayjs(hsdtwo?.hsdTankTwoDate)?.isSame(dayjs().subtract(1, "day"), "dates") : {})

//         return previousDay ? previousDay : {}
//     } else {
//         return {}
//     }
// }




// export const previousDayOfHsdSaleOne = (dataArray) => {


//     if (Array.isArray(dataArray)) {
//         const previousDay = dataArray?.find((hsdOne) => dayjs(hsdOne?.hsdTankOneDate).isValid() ? dayjs(hsdOne?.hsdTankOneDate)?.isSame(dayjs().subtract(1, "day"), "dates") : {})

//         return previousDay ? previousDay : {}
//     } else {
//         return {}
//     }
// }


