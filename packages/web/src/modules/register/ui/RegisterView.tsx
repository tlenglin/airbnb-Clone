import * as React from 'react'
import * as Antd from 'antd'
import { withFormik, FormikErrors, FormikProps, Field, Form } from 'formik'
import { validUserSchema } from '@abb/common'
import { InputField } from '../../shared/inputField'

const { Form: AntdForm, Icon, Button } = Antd
interface FormValues {
  email: string
  password: string
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues>>
}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    return (
      <Form style={{ display: 'flex' }}>
        <div style={{ width: 400, margin: 'auto' }}>
          <Field
            name="email"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Email"
            component={InputField}
          />
          <Field
            name="password"
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
            component={InputField}
          />

          <AntdForm.Item>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </AntdForm.Item>
          <AntdForm.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Register
            </Button>
          </AntdForm.Item>
          <AntdForm.Item>
            Or <a href="">login now!</a>
          </AntdForm.Item>
        </div>
      </Form>
    )
  }
}

export const RegisterView = withFormik<Props, FormValues>({
  validationSchema: validUserSchema,
  mapPropsToValues: () => ({
    email: '',
    password: ''
  }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values)
    if (errors) {
      setErrors(errors)
    }
  }
})(C)
