import dayjs from "dayjs"

export const dateFormater=(date)=>dayjs(date).isValid()?dayjs(date).format("DD/MM/YYYY"):"N/A"
export const dateToJavaUtilDate=(date)=>dayjs(date).isValid()?dayjs(date).format("YYYY-MM-DD"):"N/A"