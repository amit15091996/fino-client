import dayjs from "dayjs";

const monthData = {
  jan: { month: "Jan", value: "01" },
  feb: { month: "Feb", value: "02" },
  mar: { month: "Mar", value: "03" },
  april: { month: "April", value: "04" },
  may: { month: "May", value: "05" },
  june: { month: "June", value: "06" },
  july: { month: "July", value: "07" },
  aug: { month: "Aug", value: "08" },
  sept: { month: "Sept", value: "09" },
  oct: { month: "Oct", value: "10" },
  nov: { month: "Nov", value: "11" },
  dec: { month: "Dec", value: "12" },
};

const makerAction = {
  l2: "L2",
  l3: "L3",
};


export const monthWiseClientTxnAmount = (filteredArray) => {
  let barchartData = [];

  if (Array.isArray(filteredArray)) {
    const currentYearData = filteredArray?.filter((year) => year?.cmsTransactionDate?.split("-")[0] == dayjs().year());

    let janAmount = currentYearData
      ?.filter((item) => item?.cmsTransactionDate?.split("-")[1] === monthData.jan.value)
      ?.map((amounts) => amounts?.collectionAmount)?.reduce((a, b) => a + b, 0);
    barchartData.push({ month: monthData.jan.month, amount: janAmount });

    let febAmount = currentYearData
      ?.filter((item) => item?.cmsTransactionDate?.split("-")[1] === monthData.feb.value)
      ?.map((amounts) => amounts?.collectionAmount)?.reduce((a, b) => a + b, 0);
    barchartData.push({ month: monthData.feb.month, amount: febAmount });

    let marAmount = currentYearData
      ?.filter((item) => item?.cmsTransactionDate?.split("-")[1] === monthData.mar.value)
      ?.map((amounts) => amounts?.collectionAmount)?.reduce((a, b) => a + b, 0);
    barchartData.push({ month: monthData.mar.month, amount: marAmount });

    let aprilAmount = currentYearData
      ?.filter((item) => item?.cmsTransactionDate?.split("-")[1] === monthData.april.value)
      ?.map((amounts) => amounts?.collectionAmount)?.reduce((a, b) => a + b, 0);
    barchartData.push({ month: monthData.april.month, amount: aprilAmount });

    let mayAmount = currentYearData
      ?.filter((item) => item?.cmsTransactionDate?.split("-")[1] === monthData.may.value)
      ?.map((amounts) => amounts?.collectionAmount)?.reduce((a, b) => a + b, 0);
    barchartData.push({ month: monthData.may.month, amount: mayAmount });

    let juneAmount = currentYearData
      ?.filter((item) => item?.cmsTransactionDate?.split("-")[1] === monthData.june.value)
      ?.map((amounts) => amounts?.collectionAmount)?.reduce((a, b) => a + b, 0);
    barchartData.push({ month: monthData.june.month, amount: juneAmount });

    let julyAmount = currentYearData
      ?.filter((item) => item?.cmsTransactionDate?.split("-")[1] === monthData.july.value)
      ?.map((amounts) => amounts?.collectionAmount)?.reduce((a, b) => a + b, 0);
    barchartData.push({ month: monthData.july.month, amount: julyAmount });

    let augAmount = currentYearData
      ?.filter((item) => item?.cmsTransactionDate?.split("-")[1] === monthData.aug.value)
      ?.map((amounts) => amounts?.collectionAmount)?.reduce((a, b) => a + b, 0);
    barchartData.push({ month: monthData.aug.month, amount: augAmount });

    let septAmount = currentYearData
      ?.filter((item) => item?.cmsTransactionDate?.split("-")[1] === monthData.sept.value)
      ?.map((amounts) => amounts?.collectionAmount)?.reduce((a, b) => a + b, 0);
    barchartData.push({ month: monthData.sept.month, amount: septAmount });

    let octAmount = currentYearData
      ?.filter((item) => item?.cmsTransactionDate?.split("-")[1] === monthData.oct.value)
      ?.map((amounts) => amounts?.collectionAmount)?.reduce((a, b) => a + b, 0);
    barchartData.push({ month: monthData.oct.month, amount: octAmount });

    let novAmount = currentYearData
      ?.filter((item) => item?.cmsTransactionDate?.split("-")[1] === monthData.nov.value)
      ?.map((amounts) => amounts?.collectionAmount)?.reduce((a, b) => a + b, 0);
    barchartData.push({ month: monthData.nov.month, amount: novAmount });
    let decAmount = currentYearData
      ?.filter((item) => item?.cmsTransactionDate?.split("-")[1] === monthData.dec.value)
      ?.map((amounts) => amounts?.collectionAmount)?.reduce((a, b) => a + b, 0);
    barchartData.push({ month: monthData.dec.month, amount: decAmount });
    return barchartData;
  } else {
    return [{ month: "", amount: 0 }];
  }
};

export const monthWiseBankTxnAmount = (filteredArray) => {
  let barchartData = [];

  if (Array.isArray(filteredArray)) {
    const currentYearData = filteredArray?.filter((year) => year?.bankTransactionDate?.split("-")[0] == dayjs().year());

    let janAmount = currentYearData
      ?.filter((item) => item?.bankTransactionDate?.split("-")[1] === monthData.jan.value)
      ?.map((amounts) => amounts?.collectionAmount)?.reduce((a, b) => a + b, 0);
    barchartData.push({ month: monthData.jan.month, amount: janAmount });

    let febAmount = currentYearData
      ?.filter((item) => item?.bankTransactionDate?.split("-")[1] === monthData.feb.value)
      ?.map((amounts) => amounts?.collectionAmount)?.reduce((a, b) => a + b, 0);
    barchartData.push({ month: monthData.feb.month, amount: febAmount });

    let marAmount = currentYearData
      ?.filter((item) => item?.bankTransactionDate?.split("-")[1] === monthData.mar.value)
      ?.map((amounts) => amounts?.collectionAmount)?.reduce((a, b) => a + b, 0);
    barchartData.push({ month: monthData.mar.month, amount: marAmount });

    let aprilAmount = currentYearData
      ?.filter((item) => item?.bankTransactionDate?.split("-")[1] === monthData.april.value)
      ?.map((amounts) => amounts?.collectionAmount)?.reduce((a, b) => a + b, 0);
    barchartData.push({ month: monthData.april.month, amount: aprilAmount });

    let mayAmount = currentYearData
      ?.filter((item) => item?.bankTransactionDate?.split("-")[1] === monthData.may.value)
      ?.map((amounts) => amounts?.collectionAmount)?.reduce((a, b) => a + b, 0);
    barchartData.push({ month: monthData.may.month, amount: mayAmount });

    let juneAmount = currentYearData
      ?.filter((item) => item?.bankTransactionDate?.split("-")[1] === monthData.june.value)
      ?.map((amounts) => amounts?.collectionAmount)?.reduce((a, b) => a + b, 0);
    barchartData.push({ month: monthData.june.month, amount: juneAmount });

    let julyAmount = currentYearData
      ?.filter((item) => item?.bankTransactionDate?.split("-")[1] === monthData.july.value)
      ?.map((amounts) => amounts?.collectionAmount)?.reduce((a, b) => a + b, 0);
    barchartData.push({ month: monthData.july.month, amount: julyAmount });

    let augAmount = currentYearData
      ?.filter((item) => item?.bankTransactionDate?.split("-")[1] === monthData.aug.value)
      ?.map((amounts) => amounts?.collectionAmount)?.reduce((a, b) => a + b, 0);
    barchartData.push({ month: monthData.aug.month, amount: augAmount });

    let septAmount = currentYearData
      ?.filter((item) => item?.bankTransactionDate?.split("-")[1] === monthData.sept.value)
      ?.map((amounts) => amounts?.collectionAmount)?.reduce((a, b) => a + b, 0);
    barchartData.push({ month: monthData.sept.month, amount: septAmount });

    let octAmount = currentYearData
      ?.filter((item) => item?.bankTransactionDate?.split("-")[1] === monthData.oct.value)
      ?.map((amounts) => amounts?.collectionAmount)?.reduce((a, b) => a + b, 0);
    barchartData.push({ month: monthData.oct.month, amount: octAmount });

    let novAmount = currentYearData
      ?.filter((item) => item?.bankTransactionDate?.split("-")[1] === monthData.nov.value)
      ?.map((amounts) => amounts?.collectionAmount)?.reduce((a, b) => a + b, 0);
    barchartData.push({ month: monthData.nov.month, amount: novAmount });
    let decAmount = currentYearData
      ?.filter((item) => item?.bankTransactionDate?.split("-")[1] === monthData.dec.value)
      ?.map((amounts) => amounts?.collectionAmount)?.reduce((a, b) => a + b, 0);
    barchartData.push({ month: monthData.dec.month, amount: decAmount });
    return barchartData;
  } else {
    return [{ month: "", amount: 0 }];
  }
};



export const PieChartDataSet = (dataArray) => {

  if (Array.isArray(dataArray)) {
    let pieArray = []
    let q1 = dataArray?.slice(0, 3)?.reduce((a, b) => a + b, 0)
    pieArray.push(q1)
    let q2 = dataArray?.slice(3, 6)?.reduce((a, b) => a + b, 0)
    pieArray.push(q2)
    let q3 = dataArray?.slice(6, 9)?.reduce((a, b) => a + b, 0)
    pieArray.push(q3)
    let q4 = dataArray?.slice(9, 12)?.reduce((a, b) => a + b, 0)
    pieArray.push(q4)
    return pieArray
  }
  else {
    return []
  }

}