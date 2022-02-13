import { gql } from "@apollo/client";

export default gql`
  mutation submitForm($formId: Int!, $fieldValues: [FieldValuesInput]) {
    submitGfForm(
      input: { formId: $formId, fieldValues: $fieldValues }
    ) {
      entry {
        id
      }
      errors {
        id
        message
      }
    }
  }
`;
