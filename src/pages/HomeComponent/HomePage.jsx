import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import homepage from "../../assets/homepage.png"
import { useTheme } from '@emotion/react'
import { GlobalStyles } from '../../styles/GlobalStyles'
import CustomButton from '../../components/CustomButton/CustomButton'
import { SiContactlesspayment } from "react-icons/si";
import { IoMdLogIn } from "react-icons/io";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import CustomDrawer from '../../components/CustomDrawer/CustomDrawer'
import FinoLogin from './FinoLogin'
import CustomDialog from '../../components/CustomDialog/CustomDialog'
import DynamicHead from "../../components/DynamicHead/DynamicHead"
import { FinoLabel } from '../../labels/FinoLabel'
import Businessmanamico from "../../assets/Businessmanamico.png"
import Businessmanbro from "../../assets/Businessmanbro.png"
import Businessmancuate from "../../assets/Businessmancuate.png"
import Businessmanpana from "../../assets/Businessmanpana.png"
import Businessmanrafiki from "../../assets/Businessmanrafiki.png"
import Carousel from 'react-material-ui-carousel'
import CarouselSlide from 'react-material-ui-carousel';
import FinoSignup from './FinoSignup'
import ForgotPassword from './ForgotPassword'

const businessImage = [
  { imageName: "Businessmanamico", url: Businessmanamico },
  { imageName: "Businessmanbro", url: Businessmanbro },
  { imageName: "Businessmancuate", url: Businessmancuate },
  { imageName: "Businessmanpana", url: Businessmanpana },
  { imageName: "Businessmanrafiki", url: Businessmanrafiki },

]


const HomePage = ({ }) => {
  const theme = useTheme()

  const [loginDialog, setLoginDialog] = useState(false)
  const onLoginButtonClick = () => {
    setLoginDialog(true)
  }

  const [signUpDrawer, setSignUpDrawer] = useState(false)
  const [forgotPasswordDrawer, setforgotPasswordDrawer] = useState(false)

  const onCreateAccount = (e) => {
    setSignUpDrawer(true)

  }

  const onForgotPassword = (e) => {
    setforgotPasswordDrawer(true)

  }


  return (
    <Box sx={{
      height: "100%", width: "100%", overflow: "auto", display: "flex"
      // background:`linear-gradient(90deg, rgba(2,0,36,1), rgba(7,87,022,0.7529061624649859)),url(${homepage}) no-repeat `,
      // backgroundSize:"100% 100%",
      // backgroundRepeat:"no-repeat"

    }}>

      <DynamicHead title={FinoLabel.homePage} key={FinoLabel.homePage} />

      <Grid container>
        <Grid item md={9.5}>
          <Box sx={{ height: "100%", display: { xs: "none", sm: "none", md: "block", lg: "block", xl: "block" } }}>


            <Card sx={{ height: "8%", width: "99.5%", display: "flex" }}>
              <Box sx={{ display: "flex", mt: 0.5, ml: 1 }}>
                <SiContactlesspayment fontSize={30} color={theme?.palette?.p1?.main} />
                <Box sx={{ ml: 1, mt: 0.4 }}>
                  <Typography color={theme?.palette?.p1?.main}  variant='v1'>FINO</Typography>
                </Box>
              </Box>

            </Card>

            <Box sx={{ height: "80%",display:"flex",justifyContent:"flex-start",mt:2}}>

              <Carousel duration={300} animation='slide' sx={{height:"390px",width:"99.5%",alignItems:"center"}}>
                {businessImage?.map(({ imageName, url }) => (
                  <CarouselSlide key={imageName}>
                    <Card component="img" src={url} sx={{height:"350px",width:"100%",objectFit:"contain"}}>
                    </Card>
                  </CarouselSlide>
                ))}
              </Carousel>


            </Box>


          </Box>
        </Grid>
        <Grid item xs={12} md={2.5}>
          <Box sx={{ height: "100%" }}>
            <FinoLogin onForgotPassword={onForgotPassword} onCreateAccount={onCreateAccount} />
          </Box>
        </Grid>
      </Grid>



      <CustomDrawer anchor={"right"} open={signUpDrawer} onClose={() => { setSignUpDrawer(false) }}>
        <FinoSignup/>
      </CustomDrawer>


      <CustomDrawer anchor={"right"} open={forgotPasswordDrawer} onClose={() => { setforgotPasswordDrawer(false) }}>
        <ForgotPassword/>
      </CustomDrawer>



      {/* borderBottom:`1px solid ${theme?.palette?.p3?.main} ` */}

      {/* 
    <Box sx={{height:"8dvh",width:"100%",display:"flex",justifyContent:"space-between"}}>
   
   
        <Box sx={{display:"flex",mt:0.5,ml:1}}>
          <SiContactlesspayment fontSize={30} color={theme?.palette?.p3?.main} />
          <Box sx={{ml:1,mt:0.4}}>
          <Typography color={theme?.palette?.p3?.main} variant='v1'>FINO</Typography>
          </Box>
         </Box>
       
<Box  sx={{display:"flex"}}>
<Box sx={{mt:0.5,mr:2}}>
<CustomButton onClick={onLoginButtonClick} startIcon={<IoMdLogIn/>} variant={"outlined"}  color={"p3"} title={"Login"}/>
</Box>

<Box sx={{mt:0.5,mr:1}}>
<CustomButton startIcon={<FaArrowUpRightFromSquare/>} variant={"outlined"}  color={"p3"} title={"signup"}/>
</Box>
       </Box>


    </Box>   */}




      {/* <CustomDialog open={loginDialog} anchor={"bottom"}  onClose={()=>{setLoginDialog(false)}}>
    <FinoLogin/>
</CustomDialog> */}



    </Box>
  )
}

export default HomePage