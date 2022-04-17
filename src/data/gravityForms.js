import { graphql } from 'gatsby'

export const GravityFormFields = graphql`

  fragment NameField on WpNameField {
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
      isHidden
      key
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
`
