import React from 'react'
import { ButtonBlock } from '../blocks/ButtonBlock'
import { CalloutBlock } from '../blocks/CalloutBlock'
import { TextBlock } from '../blocks/TextBlock'
import { ImageBlock } from '../blocks/ImageBlock'

export const ContentDesigner = ({ blocks, hero }) => {

   const content = blocks.map( ( block, index ) => {

      if ( !block.fieldGroupName ) return null

      const name = block.fieldGroupName.split("_").pop()

      switch (name) {
         case 'Textblock':
            return <TextBlock content={block.text} key={`${name}-${index}`} />

         case 'Buttonblock':
            return <ButtonBlock group={block.buttongroup} key={`${name}-${index}`}/>

         case 'ImageBlock':
            return <ImageBlock image={block.image} key={`${name}-${index}`}/>

         case 'CalloutBlock':
            return <CalloutBlock data={block.callout} key={`${name}-${index}`} />
      }
   })

   return <div className={`sectionContent ${ hero ? '-hero' : '' }`}>{ content }</div>

}