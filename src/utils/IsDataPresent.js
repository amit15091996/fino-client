export const isDataPresent = (data) => (data !== undefined && data !== null && data !== "" && data !== '') ? true : false
export const isDataAvailable = (data) => (data !== undefined && data !== null && data !== "" && data !== '') ? data : "N/A"

export const isAnyDataAvailableInsideAnObject = (objectData) => {
    if (typeof objectData === "object") {
      const newDataArray=Object.keys(objectData)?.map((key) => { if (isDataPresent(objectData[key])) { return "Y" } else { return "N" } })
       
        return newDataArray?.every((item) => item ==="Y") ? true : false
    }
    else { return false }
}