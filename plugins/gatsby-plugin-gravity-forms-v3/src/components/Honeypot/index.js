import React from 'react'
import classnames from "classnames"

import InputWrapper from '../InputWrapper'
import { useFormContext } from 'react-hook-form'

const Honeypot = ({ defaultValue, gfId, name, ...wrapProps }) => {
   const { setError, formState: { errors } } = useFormContext()
   const fieldData = {label: 'NAME'}

   const handleOnChange = (event) => {
      if ( event.target.value !== '' ) {
         const fieldId = `input_${gfId}`
         setError(fieldId, {type: 'illegal', message:'gf_validation: a bot has attempted to fill out the form.' })
      }
   }
   return (
      <InputWrapper
         errors={errors?.[name] || {}}
         labelFor={name}
         inputData={fieldData}
         {...wrapProps}
      >
         <input
            className={classnames(
               "gravityform__field__input",
               "gravityform__field__input__validation",
               "large"
            )}
            defaultValue={defaultValue}
            name={name}
            id={name}
            autoComplete="new-password"
            onChange={handleOnChange}
         />
         <div className="gravityform__field__description">
            This field is for validation purposes and should be left unchanged.
         </div>
      </InputWrapper>
   )
}

export default Honeypot