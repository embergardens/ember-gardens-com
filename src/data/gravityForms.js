import { graphql } from 'gatsby'

export const GravityFormFields = graphql`
  fragment gfForm on WpGfForm {
    databaseId
    title
    description
    descriptionPlacement
    labelPlacement
    subLabelPlacement
    button {
      ...GfButton
    }
    confirmations {
      ...FormConfirmation
    }
    formFields {
      nodes {
        id
        type
        ...GfCaptchaField
        ...GfCheckboxField
        ...GfDateField
        ...GfEmailField
        ...GfHtmlField
        ...GfHiddenField
        ...GfMultiSelectField
        ...GfNameField
        ...GfRadioField
        ...GfSelectField
        ...GfTextAreaField
        ...GfTextField
        ...GfNumberField
        ...GfPhoneField
      }
    }
  }

  fragment GfCaptchaField on WpCaptchaField {
    captchaLanguage
    captchaTheme
    captchaType
    conditionalLogic {
      rules {
        fieldId
        operator
        value
      }
      actionType
      logicType
    }
    cssClass
    description
    descriptionPlacement
    displayOnly
    errorMessage
    id
    label
    layoutGridColumnSpan
    layoutSpacerGridColumnSpan
    pageNumber
    simpleCaptchaBackgroundColor
    simpleCaptchaFontColor
    simpleCaptchaSize
    type
  }

  fragment GfCheckboxField on WpCheckboxField {
    adminLabel
    canPrepopulate
    checkboxValues {
      inputId
      value
    }
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
    description
    descriptionPlacement
    hasChoiceValue
    hasSelectAll
    errorMessage

    id
    inputName
    inputs {
      id
      label
      name
    }
    isRequired
    label
    layoutGridColumnSpan
    layoutSpacerGridColumnSpan
    pageNumber
    type
    visibility
  }

  fragment GfNameField on WpNameField {
    adminLabel
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
    description
    descriptionPlacement
    id
    inputName
    inputs {
      autocompleteAttribute
      customLabel
      defaultValue
      id
      label
      name
      placeholder
    }
    isRequired
    label
    labelPlacement
    nameValues {
      first
      last
      middle
      prefix
      suffix
    }
    pageNumber
    type
    value
    visibility
  }

  fragment GfRadioField on WpRadioField {
    adminLabel
    canPrepopulate
    choices {
      isOtherChoice
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
    description
    descriptionPlacement
    hasChoiceValue
    hasOtherChoice
    errorMessage
    id
    inputName
    isRequired
    label
    layoutGridColumnSpan
    layoutSpacerGridColumnSpan
    shouldAllowDuplicates
    pageNumber
    type
    value
    visibility
  }

  fragment GfTextField on WpTextField {
    id
    cssClass
    errorMessage
    defaultValue
    description
    descriptionPlacement
    visibility
    value
    type
    placeholder
    pageNumber
    shouldAllowDuplicates
    maxLength
    layoutSpacerGridColumnSpan
    layoutGridColumnSpan
    label
    inputName
    isRequired
    isPasswordInput
    hasAutocomplete
    autocompleteAttribute
    canPrepopulate
    adminLabel
    conditionalLogic {
      actionType
      logicType
      rules {
        fieldId
        operator
        value
      }
    }
  }

  fragment GfHtmlField on WpHtmlField {
    conditionalLogic {
      actionType
      logicType
      rules {
        fieldId
        operator
        value
      }
    }
    content
    cssClass
    hasMargins
    displayOnly
    id
    label
    layoutGridColumnSpan
    layoutSpacerGridColumnSpan
    pageNumber
    type
  }

  fragment GfDateField on WpDateField {
    adminLabel
    canPrepopulate
    calendarIconType
    calendarIconUrl
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
    dateFormat
    dateType
    defaultValue
    description
    descriptionPlacement
    errorMessage
    id
    inputName
    inputs {
      customLabel
      defaultValue
      id
      label
      placeholder
    }
    isRequired
    label
    layoutGridColumnSpan
    layoutSpacerGridColumnSpan
    shouldAllowDuplicates
    pageNumber
    placeholder
    subLabelPlacement
    type
    value
    visibility
  }

  fragment GfEmailField on WpEmailField {
    adminLabel
    canPrepopulate
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
    description
    descriptionPlacement
    hasEmailConfirmation
    hasAutocomplete
    errorMessage
    id
    inputs {
      autocompleteAttribute
      customLabel
      defaultValue
      id
      label
      name
      placeholder
    }
    isRequired
    label
    layoutGridColumnSpan
    layoutSpacerGridColumnSpan
    shouldAllowDuplicates
    pageNumber
    placeholder
    subLabelPlacement
    type
    value
    visibility
  }

  fragment GfHiddenField on WpHiddenField {
    canPrepopulate
    defaultValue
    id
    inputName
    label
    layoutGridColumnSpan
    layoutSpacerGridColumnSpan
    pageNumber
    type
    value
  }

  fragment GfNumberField on WpNumberField {
    adminLabel
    canPrepopulate
    autocompleteAttribute
    calculationFormula
    calculationRounding
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
    hasAutocomplete
    isCalculation
    errorMessage
    id
    inputName
    isRequired
    label
    layoutGridColumnSpan
    layoutSpacerGridColumnSpan
    shouldAllowDuplicates
    numberFormat
    pageNumber
    placeholder
    rangeMax
    rangeMin
    type
    value
    visibility
  }

  fragment GfPhoneField on WpPhoneField {
    adminLabel
    canPrepopulate
    autocompleteAttribute
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
    hasAutocomplete
    errorMessage
    id
    inputName
    isRequired
    label
    layoutGridColumnSpan
    layoutSpacerGridColumnSpan
    shouldAllowDuplicates
    pageNumber
    phoneFormat
    placeholder
    type
    value
    visibility
  }

  fragment GfTextAreaField on WpTextAreaField {
    adminLabel
    canPrepopulate
    conditionalLogic {
      actionType
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
    errorMessage
    id
    inputName
    isRequired
    label
    layoutGridColumnSpan
    layoutSpacerGridColumnSpan
    maxLength
    shouldAllowDuplicates
    pageNumber
    placeholder
    type
    hasRichTextEditor
    value
    visibility
  }

  fragment GfSelectField on WpSelectField {
    adminLabel
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
    hasAutocomplete
    hasChoiceValue
    hasEnhancedUI
    errorMessage
    id
    inputName
    isRequired
    label
    layoutGridColumnSpan
    layoutSpacerGridColumnSpan
    shouldAllowDuplicates
    pageNumber
    placeholder
    type
    value
    visibility
  }

  fragment GfMultiSelectField on WpMultiSelectField {
    adminLabel
    canPrepopulate
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
    description
    descriptionPlacement
    hasChoiceValue
    hasEnhancedUI
    errorMessage
    id
    inputName
    isRequired
    label
    layoutGridColumnSpan
    layoutSpacerGridColumnSpan
    pageNumber
    type
    values
    visibility
  }

  fragment GfButton on WpFormButton {
    conditionalLogic {
      actionType
      logicType
      rules {
        fieldId
        operator
        value
      }
    }
    imageUrl
    text
    type
  }
`
