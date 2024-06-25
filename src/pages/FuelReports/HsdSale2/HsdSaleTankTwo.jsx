import { useTheme } from '@emotion/react';
import { Box, Card, Grid, Typography } from '@mui/material';
import React from 'react'
import { FinoLabel } from '../../../labels/FinoLabel';
import CustomDatePicker from '../../../components/CustomDatePicker/CustomDatePicker';
import CustomTextField from '../../../components/CustomTextField/CustomTextField';
import UnderLine from '../../../components/UnderLine/UnderLine';
import { GlobalStyles } from '../../../styles/GlobalStyles';
import CustomButton from '../../../components/CustomButton/CustomButton';
import dayjs from 'dayjs';
import CustomTooltips from '../../../components/CustomTooltips/CustomTooltips';



const HsdSaleTankTwo = ({ onSubmit, isUpdate, title, hsdTankTwoFieldsVar, previousDayHsdTankTwoSales, sameDayTankTwoSales }) => {
  const theme = useTheme();
  const { hsdTankTwoFields, setHsdTankTwoFields } = hsdTankTwoFieldsVar


  return (
    <Card sx={{ p: 2 }} >

      <Box sx={{ ml: 1, mb: 1 }}>
        <Typography variant="v5">
          {title}
        </Typography>
        <UnderLine color={theme?.palette?.p1?.main} width={21} />
      </Box>

      <form onSubmit={onSubmit}>

        <Grid container >
          <Grid item xs={12} md={2}>
            <Box sx={{ p: 1 }}>
              <CustomDatePicker
                maxDate={dayjs()}
                isFullWidth={true}
                isRequired={true}
                label={FinoLabel.date}
                value={hsdTankTwoFields?.HsdTankTwoDate}
                onChange={(newValue) => { setHsdTankTwoFields({ ...hsdTankTwoFields, HsdTankTwoDate: newValue }) }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box sx={{ p: 1 }}>
              <CustomTextField
                isFullwidth={true}
                label={FinoLabel.openingStock}
                placeholder={FinoLabel.openingStock}
                isDisabled={true}
                value={previousDayHsdTankTwoSales?.dipStockOfHsdTankTwo}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box sx={{ p: 1 }}>
              <CustomTextField
                type={"number"}
                isFullwidth={true}
                label={FinoLabel.inwards}
                placeholder={FinoLabel.inwards}
                value={hsdTankTwoFields?.inwardOfHsdTankTwo}
                onChange={(e) => { setHsdTankTwoFields({ ...hsdTankTwoFields, inwardOfHsdTankTwo: e.target.value }) }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box sx={{ p: 1 }}>
              <CustomTextField
                type={"number"}
                isFullwidth={true}
                label={FinoLabel.dipStockInCms}
                placeholder={FinoLabel.dipStockInCms}
                value={hsdTankTwoFields?.dipStockOfHsdTankTwoInCentimeters}
                onChange={(e) => { setHsdTankTwoFields({ ...hsdTankTwoFields, dipStockOfHsdTankTwoInCentimeters: e.target.value }) }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box sx={{ p: 1 }}>
              <CustomTextField
                type={"number"}
                isRequired={true}
                isFullwidth={true}
                label={FinoLabel.dipStockLtrs}
                placeholder={FinoLabel.dipStockLtrs}
                value={hsdTankTwoFields?.dipStockOfHsdTankTwoInLtrs}
                onChange={(e) => { setHsdTankTwoFields({ ...hsdTankTwoFields, dipStockOfHsdTankTwoInLtrs: e.target.value }) }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box sx={{ p: 1 }}>
              <CustomTextField
                type={"number"}
                isFullwidth={true}
                label={FinoLabel.testing}
                placeholder={FinoLabel.testing}
                value={hsdTankTwoFields?.testing}
                onChange={(e) => { setHsdTankTwoFields({ ...hsdTankTwoFields, testing: e.target.value }) }}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid container >
          <Grid item xs={12} md={2}>

            <Box sx={{ p: 1 }}>
              <CustomTextField
                type={"number"}
                isFullwidth={true}
                label={FinoLabel.density}
                placeholder={FinoLabel.density}
                value={hsdTankTwoFields?.density}
                onChange={(e) => { setHsdTankTwoFields({ ...hsdTankTwoFields, density: e.target.value }) }}
              />
            </Box>

          </Grid>

          <Grid item xs={12} md={2}>
            <Box sx={{ p: 1 }}>
              <CustomTextField
                type={"number"}
                isFullwidth={true}
                label={FinoLabel.waterDip}
                placeholder={FinoLabel.waterDip}
                value={hsdTankTwoFields?.waterDip}
                onChange={(e) => { setHsdTankTwoFields({ ...hsdTankTwoFields, waterDip: e.target.value }) }}

              />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 1 }}>
              <CustomTextField
                isFullwidth={true}
                label={FinoLabel.remarks}
                placeholder={FinoLabel.remarks}
                value={hsdTankTwoFields?.remarks}
                onChange={(e) => { setHsdTankTwoFields({ ...hsdTankTwoFields, remarks: e.target.value }) }}

              />
            </Box>
          </Grid>
        </Grid>



        <Grid container sx={{ mt: 2, ml: 1, width: "100%" }}>

          <Grid item xs={11.75} md={5.85}>
            <Box sx={{ mr: 1, mt: 1 }}>
              <Card variant='outlined' sx={{ width: "100%" }} >
                <Box sx={{ width: "100%", p: 1, borderBottom: `1.5px solid ${GlobalStyles.sideTopNavborderColor}`, ...GlobalStyles.alignmentStyles }}>
                  <Typography variant='v5' color={theme?.palette?.p1?.main}>MPD-01</Typography>
                </Box>

                <Box sx={{ width: "100%", display: "flex", borderBottom: `1.5px solid ${GlobalStyles.sideTopNavborderColor}` }}>
                  <Box sx={{ p: 0.7, width: "50%", ...GlobalStyles.alignmentStyles, borderRight: GlobalStyles?.borderStyle }}>
                    <Typography variant='v2' color={theme?.palette?.p1?.main}>A1</Typography>
                  </Box>
                  <Box sx={{ p: 0.7, width: "50%", ...GlobalStyles.alignmentStyles }}>
                    <Typography variant='v2' color={theme?.palette?.p1?.main}>B1</Typography>
                  </Box>
                </Box>

                <Box sx={{ width: "100%", display: "flex", borderBottom: `1.5px solid ${GlobalStyles.sideTopNavborderColor}` }}>
                  <Box sx={{ p: 0.7, width: "25%", ...GlobalStyles.alignmentStyles, borderRight: GlobalStyles?.borderStyle }}>
                    <Typography variant='v2' color={theme?.palette?.p1?.main}>{FinoLabel.openingMeter}</Typography>
                  </Box>
                  <Box sx={{ p: 0.7, width: "25%", ...GlobalStyles.alignmentStyles, borderRight: GlobalStyles?.borderStyle }}>
                    <Typography variant='v2' color={theme?.palette?.p1?.main}>{FinoLabel.closingMeter}</Typography>
                  </Box>
                  <Box sx={{ p: 0.7, width: "25%", ...GlobalStyles.alignmentStyles, borderRight: GlobalStyles?.borderStyle }}>
                    <Typography variant='v2' color={theme?.palette?.p1?.main}>{FinoLabel.openingMeter}</Typography>
                  </Box>
                  <Box sx={{ p: 0.7, width: "25%", ...GlobalStyles.alignmentStyles }}>
                    <Typography variant='v2' color={theme?.palette?.p1?.main}>{FinoLabel.closingMeter}</Typography>
                  </Box>
                </Box>

                <Box sx={{ width: "100%", display: "flex", borderBottom: `1.5px solid ${GlobalStyles.sideTopNavborderColor}` }}>
                  <Box sx={{ p: 0.7, width: "25%", ...GlobalStyles.alignmentStyles, borderRight: GlobalStyles?.borderStyle }}>
                    <CustomTextField
                      isFullwidth={true}
                      placeholder={FinoLabel.openingMeter}
                      isDisabled={true}
                      value={previousDayHsdTankTwoSales?.closingMeterOfHsdTankTwoNozzleOne}
                    />
                  </Box>
                  <Box sx={{ p: 0.7, width: "25%", ...GlobalStyles.alignmentStyles, borderRight: GlobalStyles?.borderStyle }}>

                    <CustomTextField
                      type={"number"}
                      isRequired={true}
                      isFullwidth={true}
                      placeholder={FinoLabel.closingMeter}
                      value={hsdTankTwoFields?.closingMeterOfHsdTankTwoNozzleOne}
                      onChange={(e) => { setHsdTankTwoFields({ ...hsdTankTwoFields, closingMeterOfHsdTankTwoNozzleOne: e.target.value }) }}
                    />

                  </Box>
                  <Box sx={{ p: 0.7, width: "25%", ...GlobalStyles.alignmentStyles, borderRight: GlobalStyles?.borderStyle }}>
                    <CustomTextField

                      isFullwidth={true}
                      placeholder={FinoLabel.openingMeter}
                      isDisabled={true}
                      value={previousDayHsdTankTwoSales?.closingMeterOfHsdTankTwoNozzleTwo}
                    />
                  </Box>
                  <Box sx={{ p: 0.7, width: "25%", ...GlobalStyles.alignmentStyles }}>
                    <CustomTextField
                      type={"number"}
                      isRequired={true}
                      isFullwidth={true}
                      placeholder={FinoLabel.closingMeter}
                      value={hsdTankTwoFields?.closingMeterOfHsdTankTwoNozzleTwo}
                      onChange={(e) => { setHsdTankTwoFields({ ...hsdTankTwoFields, closingMeterOfHsdTankTwoNozzleTwo: e.target.value }) }}
                    />
                  </Box>
                </Box>

                <Box sx={{ width: "96%", ...GlobalStyles.alignmentStyles_2, p: 1 }}>
                  <Typography variant='v2' color={theme?.palette?.p1?.main}>{FinoLabel.totalMeterSales}
                    <span style={{ fontSize: 15 }}>=&nbsp;{(hsdTankTwoFields?.closingMeterOfHsdTankTwoNozzleOne || hsdTankTwoFields?.closingMeterOfHsdTankTwoNozzleTwo) ? +(hsdTankTwoFields?.closingMeterOfHsdTankTwoNozzleOne - previousDayHsdTankTwoSales?.closingMeterOfHsdTankTwoNozzleOne) - (hsdTankTwoFields?.closingMeterOfHsdTankTwoNozzleTwo - previousDayHsdTankTwoSales?.closingMeterOfHsdTankTwoNozzleTwo) : 0.00}</span>
                  </Typography>
                </Box>
              </Card>
            </Box>
          </Grid>

        </Grid>


        {
          sameDayTankTwoSales?.hsdTankTwoAddedForDay? 
          <Box sx={{ p: 1, ...GlobalStyles.alignmentStyles_2 }}>
              <CustomTooltips title={"DATA ALREADY ADDED FOR TODAY"}><Box>
             <CustomButton
            color={"p1"}
            width={130}
            title={"ADD"}
            isDisabled={true}
          /></Box></CustomTooltips></Box> : <Box sx={{ p: 1, ...GlobalStyles.alignmentStyles_2 }}>
            <CustomButton
              color={"p1"}
              width={130}
              title={isUpdate ? "UPDATE" : "ADD"}
            />
          </Box>
        }
      </form>
    </Card>
  )
}

export default HsdSaleTankTwo