import * as React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm as useFormSpree } from '@formspree/react'
import * as yup from 'yup'
import { Button } from '../Button'
import { keysGenerator } from '../../utils/keysGenerator'
import { Expire } from '../Expire'

interface IFormInputs {
  name: string
  second_name: string
  email: string
  phone: string
  details: string
  acceptTerms: boolean
}

type TFieldNames =
  | 'acceptTerms'
  | 'name'
  | 'second_name'
  | 'email'
  | 'phone'
  | 'details'

export interface IField {
  type: string
  name: TFieldNames
  text: string
  validationText: string
  required: boolean
  ['error_message']: string
}

interface IContent {
  validationText?: string
  fields?: IField[]
  checkboxText?: string
  buttonText?: string
  successMessage?: string
  formspreeId?: string
}

export const Form: React.FC<IContent> = props => {
  const VALIDATION_TEXT = props.validationText || 'Something went wrong'

  const requireFields = props.fields.filter(f => f.required)

  const shapeSchema = {
    acceptTerms: yup.bool().oneOf([true], 'Accept Ts & Cs is required'),
  }

  requireFields.forEach(f => {
    if (f.name === 'email') {
      shapeSchema[f.name] = yup
        .string()
        .email(f.error_message)
        .required(f.error_message)
    } else {
      shapeSchema[f.name] = yup.string().required(f.error_message)
    }
  })

  const schema = yup.object().shape(shapeSchema)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInputs>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  })

  const [isLoading, setIsLoading] = React.useState(false)
  const [isFormSended, setIsFormSended] = React.useState(false)

  const formSpree = useFormSpree(props.formspreeId || 'xvodylaq')

  const onSubmit = (data: IFormInputs) => {
    delete data.acceptTerms
    setIsLoading(true)
    setIsFormSended(true)
    setIsLoading(false)

    formSpree[1](data)
    reset()
    setIsFormSended(false)
  }

  const errorStyle = { border: '1px solid #F54D4D' }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="form form-screen__form"
      noValidate
    >
      <div className="form__inputs">
        {props.fields.map(field => {
          return field.type === 'textarea' ? (
            <textarea
              key={keysGenerator(8)}
              className="form__input"
              style={errors.details?.message && errorStyle}
              name={field.text}
              placeholder={field.text + (field.required ? ' *' : '')}
              {...register('details')}
            ></textarea>
          ) : (
            <input
              key={keysGenerator(8)}
              className="form__input"
              style={errors[field.name]?.message && errorStyle}
              name={field.text}
              type={field.type}
              data-error={errors[field.name]?.message}
              placeholder={field.text + (field.required ? ' *' : '')}
              {...register(field.name)}
            />
          )
        })}
      </div>
      <div className="form__bottom">
        <div className="input-checkbox__wrapper">
          <input
            className="input-checkbox"
            id="input-checkbox"
            type="checkbox"
            {...register('acceptTerms')}
          />
          <label className="checkbox" htmlFor="input-checkbox">
            <span style={errors.acceptTerms?.message && errorStyle}>
              <svg width="12px" height="10px" viewBox="0 0 12 10">
                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
              </svg>
            </span>
            <span>{props.checkboxText}*</span>
          </label>
        </div>
        <Button
          text={props.buttonText}
          type="submit"
          isIcon={false}
          className={`${isLoading ? 'form__btn loading' : 'form__btn'}`}
        >
          <span className="form__btn-loader">
            <svg className="circular" viewBox="25 25 50 50">
              <circle
                stroke="white"
                className="path"
                cx="50"
                cy="50"
                r="20"
                fill="none"
                strokeWidth="4"
                strokeMiterlimit="10"
              />
            </svg>
          </span>
        </Button>
      </div>
      {Object.keys(errors).length > 0 && (
        <>
          <div className="form__message form__message--error">
            {Object.keys(errors).length > 1 ? (
              <p>{VALIDATION_TEXT}</p>
            ) : (
              Object.keys(errors).map(key => (
                <p key={keysGenerator(8)}>{errors[key]?.message}</p>
              ))
            )}
          </div>
        </>
      )}
      {isFormSended && (
        <Expire delay={5000}>
          <div className="form__message form__message--success">
            {props.successMessage}
          </div>
        </Expire>
      )}
    </form>
  )
}
