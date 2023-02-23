import * as React from 'react'
import { IProps } from '../../types/types'
import { Form, IField } from './Form'

interface IContent {
  heading: string
  text: string
  ['button_text']: string
  ['checkbox_text']: string
  ['default_validation_message']: string
  ['success_message']: string
  fields: IField[]
  formspree_project: string
}

export const FormScreen: React.FC<IProps<IContent>> = ({ blok }) => {
  return (
    <div className="section form-screen">
      <div className="container form-screen__container">
        <div className="form-screen__content">
          <div className="h2 form-screen__h2">{blok.heading}</div>
          <p className="form-screen__text">{blok.text}</p>
          <Form
            buttonText={blok['button_text']}
            checkboxText={blok['checkbox_text']}
            validationText={blok['default_validation_message']}
            successMessage={blok['success_message']}
            fields={blok.fields}
            formspreeId={blok.formspree_project}
          />
        </div>
      </div>
    </div>
  )
}
