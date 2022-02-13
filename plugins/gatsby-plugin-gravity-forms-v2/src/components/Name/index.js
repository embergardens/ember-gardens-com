import classnames from "classnames";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import React from "react";
import { useFormContext } from "react-hook-form";
import strings from "../../utils/strings";
import { valueToLowerCase } from "../../utils/helpers";
import InputWrapper from "../InputWrapper";
import Input from "../Input";

const NameField = ({
   defaultValue,
   fieldData,
   name,
   gfId,
   wrapClassName,
   wrapId,
}) => {

   const { inputs, ...fieldProps } = fieldData
   const filteredNames = inputs.filter((input) => {
      if ( !input.isHidden ) {
         return input
      }
   })
   const nameInputs = filteredNames.map((input) => {
      return <Input
            fieldData={input}
            key={input.id}
            gfId={gfId}
            name={name}
            defaultValue={defaultValue}
            wrapClassName={wrapClassName}
            wrapId={wrapId}
         />
   })
   return (
      <li>
         <ul className="Nameinput">
            { nameInputs }
         </ul>
      </li>
   )
}

export default NameField

NameField.propTypes = {
   defaultValue: PropTypes.string,
   fieldData: PropTypes.shape({
      cssClass: PropTypes.string,
      inputMaskValue: PropTypes.string,
      maxLength: PropTypes.number,
      placeholder: PropTypes.string,
      isRequired: PropTypes.bool,
      type: PropTypes.string,
      size: PropTypes.string,
   }),
   value: PropTypes.string,
   name: PropTypes.string,
   wrapProps: PropTypes.object,
 };