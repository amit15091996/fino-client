import React from 'react'
import { Helmet } from 'react-helmet'

const DynamicHead=({title})=> {

  return (
    <Helmet>
    <meta charSet="utf-8" />
    {/* <link  rel="icon" type="image/svg+xml" href={a1} /> */}
    <title>{title}</title>
   </Helmet>
  )
}
export default DynamicHead;