import React, { useState } from 'react'
import CustomAutoComplete from '../../../components/CustomAutoComplete/CustomAutoComplete'
import { FinoLabel } from '../../../labels/FinoLabel'
import CustomDatePicker from '../../../components/CustomDatePicker/CustomDatePicker'
import CustomButton from '../../../components/CustomButton/CustomButton'
import { Box, Card, Grid, MenuItem } from '@mui/material'
import CustomDropDown, { menuItemStyle } from '../../../components/CustomDropDown/CustomDropDown'

const ClientSerching = ({onDateSerch, yearOptions, onYearChange, onMonthChange}) => {

  const [serachDates, setSerachDates] = useState({ fromDate: null, toDate: null })
  const [year, setYear] = useState("")
  const [month, setMonth] = useState("")


  return (
    <Box >
      <Grid container>
        <Grid xs={12} md={2.7}>

          <Card variant="outlined" sx={{ m: 0.6 }}>
            <Box sx={{ p: 1 }}>
              <CustomAutoComplete
                value={year} onChange={(e,data) => { setYear(data); onYearChange && onYearChange(data) }}
                options={yearOptions ? yearOptions : []}
                label={"Year"} isFullWidth={true} />

            </Box>
          </Card>
        </Grid>

        <Grid xs={12} md={2.7}>
          <Card variant="outlined" sx={{ m: 0.6 }} >
            <Box sx={{ p: 1 }}>
              <CustomDropDown
                value={month}
                onChange={(e) => { setMonth(e.target.value); onMonthChange && onMonthChange(e.target.value) }}
                label={FinoLabel.month}
                placeholder={FinoLabel.month}
                isFullwidth={true}
                children={FinoLabel.MonthList.map((item) => { return (<MenuItem style={menuItemStyle} id={item.id} value={item.value} key={item.value}>{item.month}</MenuItem>) })}
              />
            </Box>
          </Card>
        </Grid>

        <Grid xs={12} md={6.6}>

          <form onSubmit={(e) => { onDateSerch && onDateSerch(e, serachDates) }}>

            <Card variant="outlined" sx={{ display: "flex", m: 0.6 }}>
              <Box sx={{ p: 1, width: "33.33%" }}>
                <CustomDatePicker
                  isRequired={true}
                  value={serachDates?.fromDate}
                  onChange={(e) => { setSerachDates({ ...serachDates, fromDate: e }) }}
                  isFullWidth={true}
                  label={FinoLabel.fromDate}
                />
              </Box>

              <Box sx={{ p: 1, width: "33.33%" }}>
                <CustomDatePicker
                  isRequired={true}
                  value={serachDates?.toDate}
                  onChange={(e) => { setSerachDates({ ...serachDates, toDate: e }) }}
                  isFullWidth={true}
                  label={FinoLabel.toDate}
                />
              </Box>

              <Box sx={{ p: 1, display: "flex", width: "33.33%", justifyContent: "center" }}>
                <Box>
                  <CustomButton color={"secondary"} width={"75px"} title={"Search"} />
                </Box>
                <Box sx={{ ml: 2 }}>
                  <CustomButton onClick={() => { setSerachDates({ fromDate: null, toDate: null }) }} color={"error"} type={"button"} width={"75px"} title={"Clear"} />

                </Box>
              </Box>

            </Card>
          </form>


        </Grid>


      </Grid>
    </Box>

  )
}

export default ClientSerching