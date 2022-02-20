import { gql } from "@apollo/client";

export default gql`
  mutation submitForm($databaseId: ID!, $fieldValues: [FieldValuesInput]) {
    submitGfForm(
      input: {
        id: $databaseId,
        fieldValues: $fieldValues
      }
    ) {
      entry {
        databaseId
        ... on GfSubmittedEntry {
          databaseId
        }
        ... on GfDraftEntry {
          resumeToken
        }
      }
      errors {
        id
        message
      }
    }
  }
`;
