import React from 'react'
import { ButtonBlock } from '../blocks/ButtonBlock'
import { TextBlock } from '../blocks/TextBlock'
import { ImageBlock } from '../blocks/ImageBlock'

export const ContentDesigner = ({ blocks, hero }) => {

   const content = blocks.map( ( block, index ) => {
      const name = block.fieldGroupName.split("_").pop()

      switch (name) {
         case 'Textblock':
            return <TextBlock content={block.text} key={`${name}-${index}`} />

         case 'Buttonblock':
            return <ButtonBlock group={block.buttongroup} key={`${name}-${index}`}/>

         case 'Imageblock':
            return <ImageBlock image={block.image} key={`${name}-${index}`}/>
      }
   })

   return <div className={`sectionContent ${ hero ? '-hero' : '' }`}>{ content }</div>

}