import React from 'react'

export const SvgFilters = () => {
   const svgStyle = {
      height: 0,
      left: 0,
      position: 'fixed',
      top: 0,
      zIndex: -2000
   }

   return(
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 0" style={svgStyle}>
         <filter id="ember-haze" x="-10%" y="-10%" width="120%" height="120%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feColorMatrix
               type="matrix"
               values="1 0 0 0 0
                     1 0 0 0 0
                     1 0 0 0 0
                     0 0 0 1 0"
               in="SourceGraphic"
               result="colormatrix"
            />
            <feComponentTransfer in="colormatrix" result="componentTransfer">
               <feFuncR type="table" tableValues="0.44 0.73 0.96"/>
               <feFuncG type="table" tableValues="0.32 0.35 0.52"/>
               <feFuncB type="table" tableValues="0.57 0.5 0.45"/>
               <feFuncA type="table" tableValues="0 0.8"/>
            </feComponentTransfer>
            <feBlend mode="multiply" in="componentTransfer" in2="SourceGraphic" result="blend"/>
         </filter>
         <clipPath id="moon" clipPathUnits="objectBoundingBox">
            <path d="M0,1 C0.287,0.487,0,0,0,0 H1 V1" />
         </clipPath>
      </svg>
   )
}