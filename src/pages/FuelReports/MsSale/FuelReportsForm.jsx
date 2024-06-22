import { useTheme } from '@emotion/react';
import { Box, Card, Grid, Typography } from '@mui/material';
import React from 'react'
import UnderLine from '../../../components/UnderLine/UnderLine';
import CustomDatePicker from '../../../components/CustomDatePicker/CustomDatePicker';
import CustomTextField from '../../../components/CustomTextField/CustomTextField';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { GlobalStyles } from '../../../styles/GlobalStyles';
import { FinoLabel } from '../../../labels/FinoLabel';
import dayjs, { Dayjs } from 'dayjs';


const FuelReportsForm = ({ onSubmit, isUpdate, title, msSaleFieldsVar }) => {
  const theme = useTheme();
  const { msSaleFields, setMsSaleFields } = msSaleFieldsVar


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
                value={msSaleFields?.MsSaleDate}
                onChange={(newValue) => { setMsSaleFields({ ...msSaleFields, MsSaleDate: newValue }) }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box sx={{ p: 1 }}>
              <CustomTextField
                isDisabled={true}
                isFullwidth={true}
                label={FinoLabel.openingStock}
                placeholder={FinoLabel.openingStock}
                value={msSaleFields?.openingStockOfMSSale}

              />
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box sx={{ p: 1 }}>
              <CustomTextField
                isFullwidth={true}
                label={FinoLabel.inwards}
                placeholder={FinoLabel.inwards}
                isRequired={true}
                type={"number"}
                value={msSaleFields?.inwardOfMSSale}
                onChange={(e) => { setMsSaleFields({ ...msSaleFields, inwardOfMSSale: e.target.value }) }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={2}>
            <Box sx={{ p: 1 }}>
              <CustomTextField
                isFullwidth={true}
                label={FinoLabel.dipStockInCms}
                placeholder={FinoLabel.dipStockInCms}
               
                type={"number"}
                value={msSaleFields?.dipStockOfMSSaleInCentimeters}
                onChange={(e) => { setMsSaleFields({ ...msSaleFields, dipStockOfMSSaleInCentimeters: e.target.value }) }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box sx={{ p: 1 }}>
              <CustomTextField
                isFullwidth={true}
                label={FinoLabel.dipStockLtrs}
                placeholder={FinoLabel.dipStockLtrs}
                isRequired={true}
                type={"number"}
                value={msSaleFields?.dipStockOfMSSaleInLtrs}
                onChange={(e) => { setMsSaleFields({ ...msSaleFields, dipStockOfMSSaleInLtrs: e.target.value }) }}

              />
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box sx={{ p: 1 }}>
              <CustomTextField
                isFullwidth={true}
                label={FinoLabel.testing}
                placeholder={FinoLabel.testing}
               
                type={"number"}
                value={msSaleFields?.testing}
                onChange={(e) => { setMsSaleFields({ ...msSaleFields, testing: e.target.value }) }}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid container >


          <Grid item xs={12} md={2}>

            <Box sx={{ p: 1 }}>
              <CustomTextField
                isFullwidth={true}
                label={FinoLabel.density}
                placeholder={FinoLabel.density}
              
                type={"number"}
                value={msSaleFields?.density}
                onChange={(e) => { setMsSaleFields({ ...msSaleFields, density: e.target.value }) }}
              />
            </Box>

          </Grid>
          <Grid item xs={12} md={2}>
            <Box sx={{ p: 1 }}>
              <CustomTextField
                isFullwidth={true}
                label={FinoLabel.waterDip}
                placeholder={FinoLabel.waterDip}
                type={"number"}
                value={msSaleFields?.waterDip}
                onChange={(e) => { setMsSaleFields({ ...msSaleFields, waterDip: e.target.value }) }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 1 }}>
              <CustomTextField
                isFullwidth={true}
                label={FinoLabel.remarks}
                placeholder={FinoLabel.remarks}
                value={msSaleFields?.remarks}
                onChange={(e) => { setMsSaleFields({ ...msSaleFields, remarks: e.target.value }) }}
              />
            </Box>
          </Grid>
        </Grid>



        <Grid container sx={{ mt: 2, ml: 1, width: "100%" }}>

          <Grid item xs={11.75} md={5.85}>
            <Card variant='outlined' sx={{ width: "100%" }} >
              <Box sx={{ width: "100%", p: 1, borderBottom: GlobalStyles?.borderStyle, ...GlobalStyles.alignmentStyles }}>
                <Typography variant='v5' color={theme?.palette?.p1?.main}>MPD-02</Typography>
              </Box>

              <Box sx={{ width: "100%", display: "flex", borderBottom: GlobalStyles?.borderStyle }}>
                <Box sx={{ p: 0.7, width: "50%", ...GlobalStyles.alignmentStyles, borderRight: GlobalStyles?.borderStyle }}>
                  <Typography variant='v2' color={theme?.palette?.p1?.main}>A1</Typography>
                </Box>
                <Box sx={{ p: 0.7, width: "50%", ...GlobalStyles.alignmentStyles }}>
                  <Typography variant='v2' color={theme?.palette?.p1?.main}>A2</Typography>
                </Box>
              </Box>

              <Box sx={{ width: "100%", display: "flex", borderBottom: GlobalStyles?.borderStyle }}>
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




              <Box sx={{ width: "100%", display: "flex", borderBottom: GlobalStyles?.borderStyle }}>
                <Box sx={{ p: 0.7, width: "25%", ...GlobalStyles.alignmentStyles, borderRight: GlobalStyles?.borderStyle }}>
                  <CustomTextField
                    isFullwidth={true}
                    placeholder={FinoLabel.openingMeter}
                    isDisabled={true}
                    value={msSaleFields?.openingMeterOfMSSaleNozzleOne}
                  />
                </Box>
                <Box sx={{ p: 0.7, width: "25%", ...GlobalStyles.alignmentStyles, borderRight: GlobalStyles?.borderStyle }}>

                  <CustomTextField
                    isFullwidth={true}
                    placeholder={FinoLabel.closingMeter}
                    type={"number"}
                    isRequired={true}
                    value={msSaleFields?.closingMeterOfMSSaleNozzleOne}
                    onChange={(e) => { setMsSaleFields({ ...msSaleFields, closingMeterOfMSSaleNozzleOne: e.target.value }) }}
                  />

                </Box>
                <Box sx={{ p: 0.7, width: "25%", ...GlobalStyles.alignmentStyles, borderRight: GlobalStyles?.borderStyle }}>
                  <CustomTextField
                    isFullwidth={true}
                    placeholder={FinoLabel.openingMeter}
                    isDisabled={true}
                    value={msSaleFields?.openingMeterOfMSSaleNozzleTwo}

                  />
                </Box>
                <Box sx={{ p: 0.7, width: "25%", ...GlobalStyles.alignmentStyles }}>
                  <CustomTextField
                    isFullwidth={true}
                    placeholder={FinoLabel.closingMeter}
                    type={"number"}
                    isRequired={true}
                    value={msSaleFields?.closingMeterOfMSSaleNozzleTwo}
                    onChange={(e) => { setMsSaleFields({ ...msSaleFields, closingMeterOfMSSaleNozzleTwo: e.target.value }) }}
                  />
                </Box>
              </Box>

              <Box sx={{ width: "96%", ...GlobalStyles.alignmentStyles_2, p: 1 }}>
                <Typography variant='v2' color={theme?.palette?.p1?.main}>{FinoLabel.totalMeterSales}
                  <span style={{ fontSize: 15 }}>=&nbsp;{+(msSaleFields?.openingMeterOfMSSaleNozzleOne - msSaleFields?.closingMeterOfMSSaleNozzleOne) - (msSaleFields?.openingMeterOfMSSaleNozzleTwo - msSaleFields?.closingMeterOfMSSaleNozzleTwo)}</span>
                </Typography>

              </Box>

            </Card>

          </Grid>
        </Grid>


        <Box sx={{ p: 1, ...GlobalStyles.alignmentStyles_2 }}>
          <CustomButton
            color={"p1"}
            width={100}
            title={isUpdate ? "UPDATE" : "ADD"}
          />
        </Box>
      </form>
    </Card>
  )
}

export default FuelReportsForm