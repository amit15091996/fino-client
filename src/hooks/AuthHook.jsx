import Encodr from 'encodr';
import React, { useCallback, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';

const AuthHook = () => {
const [cookies, setCookie, removeCookie] = useCookies(['FINO_LOGIN_COOKIE']);
const MSGPACK = new Encodr("msgpack")

const userDetails= useCallback(()=>{
  let session={userRoles:[],userName:"",jwtToken:"",error:"",fullName:""}
    try{
      if(cookies){ const decodedSession=MSGPACK.decode(cookies?.FINO_LOGIN_COOKIE?.data)
        session.jwtToken=decodedSession?.jwtToken,
        session.userName=decodedSession?.userName,
        session.userRoles=decodedSession?.userRoles
        session.fullName=decodedSession?.fullName
        return session
       }
      else{
       session.error="unable to decode"
       return session
      }
    }
    catch(err){session.error=err;return session}
  },[cookies])

  
  return userDetails()
}

export default AuthHook