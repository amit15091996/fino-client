import { Box, Card, Grid, Typography } from '@mui/material'
import React from 'react'
import CustomDatePicker from '../../../components/CustomDatePicker/CustomDatePicker'
import CustomTextField from '../../../components/CustomTextField/CustomTextField'
import CustomButton from '../../../components/CustomButton/CustomButton'
import { GlobalStyles } from '../../../styles/GlobalStyles'
import UnderLine from '../../../components/UnderLine/UnderLine'
import { useTheme } from '@emotion/react'
import { FinoLabel } from '../../../labels/FinoLabel'
import CustomTooltips from '../../../components/CustomTooltips/CustomTooltips'



const HsdSaleTankOne = ({ onSubmit, isUpdate, title, hsdTankOneFieldsVar, previousDayHsdTankOneSales, sameDayTankOneSales }) => {
  const theme = useTheme();
  const { hsdTankOneFields, setHsdTankOneFields } = hsdTankOneFieldsVar





  return (
    <Card sx={{ p: 2 }} >

      {
        title && <Box sx={{ ml: 1, mb: 1 }}>
          <Typography variant="v5">
            {title}
          </Typography>
          <UnderLine color={theme?.palette?.p1?.main} width={21} />
        </Box>
      }



      <form onSubmit={onSubmit}>

        <Grid container >
          <Grid item xs={12} md={2}>
            <Box sx={{ p: 1 }}>
              <CustomDatePicker
              isDisabled={isUpdate}
                isFullWidth={true}
                isRequired={true}
                label={FinoLabel.date}
                value={hsdTankOneFields?.HsdTankOneDate}
                onChange={(newValue) => { setHsdTankOneFields({ ...hsdTankOneFields, HsdTankOneDate: newValue }) }}
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
                value={previousDayHsdTankOneSales?.openingStockOfHsdTankOne}

              />
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box sx={{ p: 1 }}>
              <CustomTextField
                type={"number"}
                isRequired={true}
                isFullwidth={true}
                label={FinoLabel.inwards}
                placeholder={FinoLabel.inwards}
                value={hsdTankOneFields?.inwardOfHsdTankOne}
                onChange={(e) => { setHsdTankOneFields({ ...hsdTankOneFields, inwardOfHsdTankOne: e.target.value }) }}
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
                value={hsdTankOneFields?.dipStockOfHsdTankOneInCentimeters}
                onChange={(e) => { setHsdTankOneFields({ ...hsdTankOneFields, dipStockOfHsdTankOneInCentimeters: e.target.value }) }}
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
                value={hsdTankOneFields?.dipStockOfHsdTankOneInLtrs}
                onChange={(e) => { setHsdTankOneFields({ ...hsdTankOneFields, dipStockOfHsdTankOneInLtrs: e.target.value }) }}
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
                value={hsdTankOneFields?.testing}
                onChange={(e) => { setHsdTankOneFields({ ...hsdTankOneFields, testing: e.target.value }) }}
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
                value={hsdTankOneFields?.density}
                onChange={(e) => { setHsdTankOneFields({ ...hsdTankOneFields, density: e.target.value }) }}
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
                value={hsdTankOneFields?.waterDip}
                onChange={(e) => { setHsdTankOneFields({ ...hsdTankOneFields, waterDip: e.target.value }) }}

              />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 1 }}>
              <CustomTextField
                isFullwidth={true}
                label={FinoLabel.remarks}
                placeholder={FinoLabel.remarks}
                value={hsdTankOneFields?.remarks}
                onChange={(e) => { setHsdTankOneFields({ ...hsdTankOneFields, remarks: e.target.value }) }}

              />
            </Box>
          </Grid>
        </Grid>



        <Grid container sx={{ mt: 2, ml: 1, width: "100%" }}>

          <Grid item xs={11.75} md={6}>
            <Box sx={{ mr: 1, mt: 1 }}>
              <Card variant='outlined' sx={{ width: "100%" }} >
                <Box sx={{ width: "100%", p: 1, borderBottom: `1.5px solid ${GlobalStyles.sideTopNavborderColor}`, ...GlobalStyles.alignmentStyles }}>
                  <Typography variant='v5' color={theme?.palette?.p1?.main}>MPD-01</Typography>
                </Box>

                <Box sx={{ width: "100%", display: "flex", borderBottom: `1.5px solid ${GlobalStyles.sideTopNavborderColor}` }}>
                  <Box sx={{ p: 0.7, width: "50%", ...GlobalStyles.alignmentStyles, borderRight: GlobalStyles?.borderStyle }}>
                    <Typography variant='v2' color={theme?.palette?.p1?.main}>A2</Typography>
                  </Box>
                  <Box sx={{ p: 0.7, width: "50%", ...GlobalStyles.alignmentStyles }}>
                    <Typography variant='v2' color={theme?.palette?.p1?.main}>B2</Typography>
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
                      value={previousDayHsdTankOneSales?.closingMeterOfHsdTankOneNozzleOne}

                    />
                  </Box>
                  <Box sx={{ p: 0.7, width: "25%", ...GlobalStyles.alignmentStyles, borderRight: GlobalStyles?.borderStyle }}>

                    <CustomTextField
                      type={"number"}
                      isRequired={true}
                      isFullwidth={true}
                      placeholder={FinoLabel.closingMeter}
                      value={hsdTankOneFields?.closingMeterOfHsdTankOneNozzleOne}
                      onChange={(e) => { setHsdTankOneFields({ ...hsdTankOneFields, closingMeterOfHsdTankOneNozzleOne: e.target.value }) }}
                    />

                  </Box>
                  <Box sx={{ p: 0.7, width: "25%", ...GlobalStyles.alignmentStyles, borderRight: GlobalStyles?.borderStyle }}>
                    <CustomTextField
                      isFullwidth={true}
                      placeholder={FinoLabel.openingMeter}
                      isDisabled={true}
                      value={previousDayHsdTankOneSales?.closingMeterOfHsdTankOneNozzleTwo}

                    />
                  </Box>
                  <Box sx={{ p: 0.7, width: "25%", ...GlobalStyles.alignmentStyles }}>
                    <CustomTextField
                      type={"number"}
                      isRequired={true}
                      isFullwidth={true}
                      placeholder={FinoLabel.closingMeter}
                      value={hsdTankOneFields?.closingMeterOfHsdTankOneNozzleTwo}
                      onChange={(e) => { setHsdTankOneFields({ ...hsdTankOneFields, closingMeterOfHsdTankOneNozzleTwo: e.target.value }) }}
                    />
                  </Box>
                </Box>

                <Box sx={{ width: "96%", ...GlobalStyles.alignmentStyles_2, p: 1 }}>
                  <Typography variant='v2' color={theme?.palette?.p1?.main}>{FinoLabel.totalMeterSales}
                    <span style={{ fontSize: 15 }}>=&nbsp;{(hsdTankOneFields?.closingMeterOfHsdTankOneNozzleOne || hsdTankOneFields?.closingMeterOfHsdTankOneNozzleTwo) ? +(hsdTankOneFields?.closingMeterOfHsdTankOneNozzleOne - previousDayHsdTankOneSales?.closingMeterOfHsdTankOneNozzleOne) - (hsdTankOneFields?.closingMeterOfHsdTankOneNozzleTwo - previousDayHsdTankOneSales?.closingMeterOfHsdTankOneNozzleTwo) : 0.00}</span>
                  </Typography>

                </Box>

              </Card>
            </Box>
          </Grid>
          <Grid item xs={11.75} md={6}>
            <Box sx={{ mr: 1, mt: 1 }}>
              <Card variant='outlined' sx={{ width: "100%" }} >
                <Box sx={{ width: "100%", p: 1, borderBottom: `1.5px solid ${GlobalStyles.sideTopNavborderColor}`, ...GlobalStyles.alignmentStyles }}>
                  <Typography variant='v5' color={theme?.palette?.p1?.main}>MPD-02</Typography>
                </Box>

                <Box sx={{ width: "100%", display: "flex", borderBottom: `1.5px solid ${GlobalStyles.sideTopNavborderColor}` }}>
                  <Box sx={{ p: 0.7, width: "50%", ...GlobalStyles.alignmentStyles, borderRight: GlobalStyles?.borderStyle }}>
                    <Typography variant='v2' color={theme?.palette?.p1?.main}>A2</Typography>
                  </Box>
                  <Box sx={{ p: 0.7, width: "50%", ...GlobalStyles.alignmentStyles }}>
                    <Typography variant='v2' color={theme?.palette?.p1?.main}>B2</Typography>
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
                      value={previousDayHsdTankOneSales?.closingMeterOfHsdTankOneNozzleThree}

                    />
                  </Box>


                  <Box sx={{ p: 0.7, width: "25%", ...GlobalStyles.alignmentStyles, borderRight: GlobalStyles?.borderStyle }}>

                    <CustomTextField
                      type={"number"}
                      isRequired={true}
                      isFullwidth={true}
                      placeholder={FinoLabel.closingMeter}
                      value={hsdTankOneFields?.closingMeterOfHsdTankOneNozzleThree}
                      onChange={(e) => { setHsdTankOneFields({ ...hsdTankOneFields, closingMeterOfHsdTankOneNozzleThree: e.target.value }) }}
                    />

                  </Box>
                  <Box sx={{ p: 0.7, width: "25%", ...GlobalStyles.alignmentStyles, borderRight: GlobalStyles?.borderStyle }}>
                    <CustomTextField
                      isFullwidth={true}
                      placeholder={FinoLabel.openingMeter}
                      isDisabled={true}
                      value={previousDayHsdTankOneSales?.closingMeterOfHsdTankOneNozzleFour}
                    />
                  </Box>
                  <Box sx={{ p: 0.7, width: "25%", ...GlobalStyles.alignmentStyles }}>
                    <CustomTextField
                      type={"number"}
                      isRequired={true}
                      isFullwidth={true}
                      placeholder={FinoLabel.closingMeter}
                      value={hsdTankOneFields?.closingMeterOfHsdTankOneNozzleFour}
                      onChange={(e) => { setHsdTankOneFields({ ...hsdTankOneFields, closingMeterOfHsdTankOneNozzleFour: e.target.value }) }}
                    />
                  </Box>
                </Box>

                <Box sx={{ width: "96%", ...GlobalStyles.alignmentStyles_2, p: 1 }}>
                  <Typography variant='v2' color={theme?.palette?.p1?.main}>{FinoLabel.totalMeterSales}
                    <span style={{ fontSize: 15 }}>=&nbsp;{(hsdTankOneFields?.closingMeterOfHsdTankOneNozzleThree || hsdTankOneFields?.closingMeterOfHsdTankOneNozzleFour) ? +(hsdTankOneFields?.closingMeterOfHsdTankOneNozzleThree - previousDayHsdTankOneSales?.closingMeterOfHsdTankOneNozzleThree) - (hsdTankOneFields?.closingMeterOfHsdTankOneNozzleFour - previousDayHsdTankOneSales?.closingMeterOfHsdTankOneNozzleFour) : 0.00}</span>
                  </Typography>

                </Box>

              </Card>
            </Box>
          </Grid>
        </Grid>


        {
          sameDayTankOneSales?.hsdTankOneAddedForDay ?
            <Box sx={{ p: 1, ...GlobalStyles.alignmentStyles_2 }}>
              <CustomTooltips title={"DATA ALREADY ADDED FOR TODAY"}><Box>
                <CustomButton
                  color={"p1"}
                  width={130}
                  title={"ADD"}
                  isDisabled={true}
                /></Box></CustomTooltips></Box> : <Box sx={{ mt:3,...GlobalStyles.alignmentStyles_2 }}>
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

export default HsdSaleTankOne