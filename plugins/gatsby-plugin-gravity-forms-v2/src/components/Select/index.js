import classnames from "classnames";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import { useFormContext } from "react-hook-form";
import InputWrapper from "../InputWrapper";
import { valueToLowerCase } from "../../utils/helpers";

const Select = ({ fieldData, name, ...wrapProps }) => {
  const { choices, cssClass, isRequired } = fieldData;

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <InputWrapper
      errors={errors?.[name] || {}}
      inputData={fieldData}
      labelFor={name}
      {...wrapProps}
    >
      <select
        aria-invalid={errors}
        aria-required={isRequired}
        className={classnames(
          "gravityform__field__input",
          "gravityform__field__input__select",
          "gfield_select",
          cssClass,
        )}
        id={name}
        name={name}
        {...register(name, {
          required: isRequired && "This field is required",
        })}
      >
        {choices.map(({ isSelected, text, value }, index) => {
          return (
            <option
              defaultValue={isSelected}
              key={`${name}-${index}`}
              value={value}
            >
              {text}
            </option>
          );
        })}
      </select>
    </InputWrapper>
  );
};

export default Select;

Select.propTypes = {
  fieldData: PropTypes.shape({
    choices: PropTypes.array,
    cssClass: PropTypes.string,
    isRequired: PropTypes.bool,
    size: PropTypes.string,
  }),
  register: PropTypes.func,
  wrapProps: PropTypes.object,
};

export const SelectField = graphql`
  fragment SelectField on WpSelectField {
    adminLabel
    adminOnly
    canPrepopulate
    autocompleteAttribute
    choices {
      isSelected
      text
      value
    }
    conditionalLogic {
      actionType
      logicType
      rules {
        fieldId
        operator
        value
      }
    }
    cssClass
    defaultValue
    description
    descriptionPlacement
    enableAutocomplete
    enableChoiceValue
    enableEnhancedUI
    enablePrice
    errorMessage
    formId
    id
    inputName
    isRequired
    label
    layoutGridColumnSpan
    layoutSpacerGridColumnSpan
    noDuplicates
    pageNumber
    placeholder
    size
    type
    value
    visibility
  }
`;
