import * as React from 'react'
import { RouteComponentProps } from '@reach/router'
import {
  useGetInviteQuery,
  RegisterComponent,
  RegisterInput,
} from '../generated/graphql'
import { Section } from '../components/Section'
import { Columns } from '../components/Columns'
import { Column } from '../components/Column'
import { Formik, Field } from 'formik'
import { registerSchema } from '@stenstroem-dev/shared'
import { MainContextState, MainContext } from '../context/MainContext'
import { Account } from '../models/account.model'
import { faEnvelope } from '../icons'
import { InputField } from '../components/InputField'

interface Props extends RouteComponentProps {
  id?: string
}

export const Register: React.FunctionComponent<Props> = ({
  id,
}): JSX.Element => {
  let formRef: Formik<RegisterInput>
  const handleReturnKey = (e: React.KeyboardEvent<any>): void => {
    if (e.keyCode === 13) {
      e.preventDefault()
      formRef.submitForm()
    }
  }
  const { setAccount } = React.useContext<MainContextState>(MainContext)
  const { loading, error, data } = useGetInviteQuery({ variables: { id } })
  if (loading) return <p>Loading...</p>
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

  if (!data.getInvite) {
    return (
      <Section>
        <div className="content">
          <h5 className="is-5">Ingen gyldig invitation fundet</h5>
        </div>
      </Section>
    )
  }

  return (
    <RegisterComponent>
      {(onMutate): JSX.Element => (
        <Section>
          <Columns isCentered isMobile>
            <Column mobileWidth={10} tabletWidth={6} desktopWidth={4}>
              <Formik<RegisterInput>
                ref={(el): Formik<RegisterInput> => (formRef = el)}
                validationSchema={registerSchema}
                initialValues={{
                  email: data.getInvite,
                  name: '',
                  password: '',
                }}
                onSubmit={(values, actions): void => {
                  actions.setSubmitting(true)
                  onMutate({ variables: { input: values } })
                    .then((response): void => {
                      if (response && response.data.register) {
                        response.data.register.forEach((err) =>
                          actions.setFieldError(err.path, err.message)
                        )
                      } else {
                        setAccount(Account.accountFromCookie())
                      }
                    })
                    .catch((err): void => {
                      // todo - add error notification
                      actions.resetForm({
                        password: '',
                        email: values.email,
                        name: values.name,
                      })
                    })
                    .finally((): void => actions.setSubmitting(false))
                }}
              >
                {({ submitForm, isSubmitting }): JSX.Element => (
                  <div onKeyDown={handleReturnKey}>
                    <Field
                      type="email"
                      name="email"
                      icon={faEnvelope}
                      label="Email"
                      placeholder="din@email.com"
                      component={InputField}
                      readOnly
                    />
                  </div>
                )}
              </Formik>
            </Column>
          </Columns>
        </Section>
      )}
    </RegisterComponent>
  )
}
