import React from 'react'

export const TextBlock = ({ content }) => {
   return (
      <div className="textBlock" dangerouslySetInnerHTML={{__html: content}} />
   )
}