import classnames from "classnames";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import { useMutation } from "@apollo/client";
import { useForm, FormProvider } from "react-hook-form";
import FormGeneralError from "./components/FormGeneralError";
import FieldBuilder from "./container/FieldBuilder";
import {
  handleGravityFormsValidationErrors,
  // manageMainFormError,
} from "./utils/manageErrors";
import {
  submissionHasOneFieldEntry,
  cleanGroupedFields,
} from "./utils/manageFormData";
import submitMutation from "./submitMutation";
import formatPayload from "./utils/formatPayload";
import { valueToLowerCase } from "./utils/helpers";
/**
 * Component to take Gravity Form graphQL data and turn into
 * a fully functional form.
 * @param {mixed} data Form dataset from graphQL
 */
const GravityFormForm = ({
  data,
  presetValues,
  successCallback,
  errorCallback,
}) => {
  // Split out data depending on how it is passed in.
  let form;
  if (data?.wpGravityFormsForm) {
    form = data.wpGravityFormsForm;
  } else {
    form = data;
  }

  const {
    button,
    confirmations,
    description,
    descriptionPlacement,
    labelPlacement,
    subLabelPlacement,
    formFields,
    formId,
    title,
  } = form;

  const [submitForm, { data: submittionData, loading }] = useMutation(
    submitMutation
  );

  // Handle Gravity Form Submittion state.
  // Thanks to: https://developers.wpengine.com/blog/gravity-forms-in-headless-wordpress-gatsby
  const haveEntryId = Boolean(submittionData?.submitGfForm?.entryId);
  const haveFieldErrors = Boolean(
    submittionData?.submitGfForm?.errors?.length
  );
  const wasSuccessfullySubmitted = haveEntryId && !haveFieldErrors;

  // Pull in form functions
  const methods = useForm();
  const {
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = methods;

  const [generalError, setGeneralError] = useState("");

  const onSubmitCallback = async (values) => {
    // Make sure we are not already waiting for a response
    if (!loading) {
      // Clean error

      // Check that at least one field has been filled in
      if (submissionHasOneFieldEntry(values)) {
        setGeneralError("");
        console.log({values}, formFields.nodes)
        const formRes = formatPayload({
          serverData: formFields?.nodes,
          clientData: values,
        });

        console.log({formRes})

        submitForm({
          variables: {
            formId: formId,
            fieldValues: formRes,
          },
        })
          .then(
            ({
              data: {
                submitGfForm: { entryId, errors },
              },
            }) => {
              // Success
              if (entryId) {
                console.log('success?')
                successCallback({
                  data: formRes,
                  reset,
                });
              }
              // We have a problem
              if (errors?.length) {
                handleGravityFormsValidationErrors(errors, setError);
                console.log({ errors, setError })
                errorCallback({ data: formRes, error: errors, reset });
              }
            }
          )
          .catch((error) => {
            setGeneralError("unknownError");
            console.log({ error, reset })
            errorCallback({ data: formRes, error, reset });
          });
      } else {
        setGeneralError("leastOneField");
      }
    }
  };

  if (wasSuccessfullySubmitted) {
    const confirmation = confirmations?.find((el) => el.isDefault);

    return (
      <div className="gform_confirmation_wrapper">
        <div
          className="gform_confirmation_message"
          /* eslint-disable react/no-danger */
          dangerouslySetInnerHTML={{ __html: confirmation?.message }}
        />
      </div>
    );
  }

  return (
    <div className="gform_wrapper" id={`gform_wrapper_${formId}`}>
      <div className="gform_anchor" id={`gf_${formId}`} />

      <FormProvider {...methods}>
        <form
          className={
            loading
              ? `gravityform gravityform--loading gravityform--id-${formId}`
              : `gravityform gravityform--id-${formId}`
          }
          id={`gfrom_${formId}`}
          key={`gfrom_-${formId}`}
          onSubmit={handleSubmit(onSubmitCallback)}
        >
          {generalError && <FormGeneralError errorCode={generalError} />}
          <div className="gform_body">
            <ul
              className={classnames(
                "gform_fields",
                {
                  [`form_sublabel_${valueToLowerCase(
                    subLabelPlacement
                  )}`]: valueToLowerCase(subLabelPlacement),
                },
                `description_${valueToLowerCase(descriptionPlacement)}`,
                `${valueToLowerCase(labelPlacement)}`
              )}
              id={`gform_fields_${formId}`}
            >
              <FieldBuilder
                formLoading={loading}
                formFields={formFields.nodes}
                presetValues={presetValues}
                labelPlacement={labelPlacement}
              />
            </ul>
          </div>

          <div className={`gform_footer ${valueToLowerCase(labelPlacement)}`}>
            <button
              className="gravityform__button gform_button button"
              disabled={loading}
              id={`gform_submit_button_${formId}`}
              type="submit"
            >
              {loading ? (
                <span className="gravityform__button__loading_span">
                  Loading
                </span>
              ) : (
                button?.text
              )}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

GravityFormForm.propTypes = {
  errorCallback: PropTypes.func,
  data: PropTypes.object.isRequired,
  successCallback: PropTypes.func,
  presetValues: PropTypes.shape({}),
};

GravityFormForm.defaultProps = {
  errorCallback: () => {},
  successCallback: () => {},
  presetValues: {},
};

export default GravityFormForm;

export const GravityFormFields = graphql`
  fragment GravityFormFields on WpGravityFormsForm {
    formId
    title
    description
    descriptionPlacement
    labelPlacement
    subLabelPlacement
    button {
      ...Button
    }
    confirmations {
      ...FormConfirmation
    }
    formFields {
      nodes {
        id
        type
        ...CaptchaField
        ...CheckboxField
        ...DateField
        ...EmailField
        ...HtmlField
        ...HiddenField
        ...MultiSelectField
        ...RadioField
        ...SelectField
        ...TextAreaField
        ...TextField
        ...NumberField
        ...PhoneField
      }
    }
  }
`;
