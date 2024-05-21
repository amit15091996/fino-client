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
import Loading from '../../components/Loading/Loading'
import { useNavigate } from 'react-router-dom'
import { loginService } from '../../redux/slice/userslice/LoginSlice'
import { useDispatch, useSelector } from 'react-redux'
import CustomSnackbar from '../../components/Customsnackbar/CustomSnackbar'
import { useCookies } from 'react-cookie'
import Encodr from 'encodr'

const businessImage = [
  { imageName: "Businessmanamico", url: Businessmanamico },
  { imageName: "Businessmanbro", url: Businessmanbro },
  { imageName: "Businessmancuate", url: Businessmancuate },
  { imageName: "Businessmanpana", url: Businessmanpana },
  { imageName: "Businessmanrafiki", url: Businessmanrafiki },

]


const HomePage = ({ }) => {
  const theme = useTheme()
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const LOGIN_SLICE_REDUCER=useSelector((state)=>state?.LOGIN_SLICE_REDUCER)
  const[loginDetails,setLoginDetails]=useState({mobileNumber:"",password:""})
  const [forgotPasswordDrawer, setforgotPasswordDrawer] = useState(false)
  const[loginSnackbarOpen,setLoginSnackbarOpen]=useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(['FINO_LOGIN_COOKIE']);
  const MSGPACK = new Encodr("msgpack")




  const onForgotPassword = (e) => {setforgotPasswordDrawer(true)}

  const onLogin = async (e) => {
    e.preventDefault();
  const {payload}=await dispatch(loginService(loginDetails))
  console.log(payload);
  if(payload?.statusCode===200){
    setCookie("FINO_LOGIN_COOKIE",MSGPACK.encode(
      {userRoles:payload?.userRoles,
        userName:payload?.userName,
        jwtToken:payload?.jwtToken}), 
      {expires:new Date(payload?.tokenExpirationInMilis)}
    )

    navigate("/Layout/Dashboard");
    setLoginSnackbarOpen(true)
  }
  else{
    setLoginSnackbarOpen(true)
  }

  };


  return (
    <Box sx={{height: "100%", width: "100%", overflow: "auto", display: "flex"}}>

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
            {
              LOGIN_SLICE_REDUCER?.isLoading?<Loading/>:
              <FinoLogin loginDetailsFields={{loginDetails,setLoginDetails}} onLogin={onLogin} onForgotPassword={onForgotPassword}  />
            }
          </Box>
        </Grid>
      </Grid>


<CustomSnackbar open={loginSnackbarOpen} onClose={()=>{setLoginSnackbarOpen(false)}} message={LOGIN_SLICE_REDUCER?.data?.statusMessage} severity={LOGIN_SLICE_REDUCER?.data?.statusCode===200?"success":"info"} />
    
      <CustomDrawer isCloseButtonRequired={true} anchor={"right"} open={forgotPasswordDrawer} onClose={() => { setforgotPasswordDrawer(false) }}>
        <ForgotPassword/>
      </CustomDrawer>

    </Box>
  )
}

export default HomePage