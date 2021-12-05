import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const BackgroundMedia = ({ image }) => {
   const imageData = getImage(image?.node?.localFile)

   if (!imageData) return null

   return (
      <div className="backgroundMedia">
         <GatsbyImage
            alt={image.node.altText}
            image={imageData}
            className="backgroundMedia__img"
         />
      </div>
   )
}

export default BackgroundMedia