import { useCallback, useRef, useState } from 'react'

// Centraliza valores, validação, erros por campo e envio de formulários.
export function useForm({ initialValues, validate, onSubmit }) {
  const initial = useRef(initialValues)
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    const next = { ...values, [name]: type === 'checkbox' ? checked : value }
    setValues(next)
    if (touched[name]) setErrors(validate(next))
  }

  const handleBlur = (event) => {
    setTouched((prev) => ({ ...prev, [event.target.name]: true }))
    setErrors(validate(values))
  }

  const reset = useCallback(() => {
    setValues(initial.current)
    setErrors({})
    setTouched({})
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)
    setTouched(Object.fromEntries(Object.keys(values).map((key) => [key, true])))
    if (Object.keys(found).length > 0) return
    setSubmitting(true)
    try {
      await onSubmit(values, { reset })
    } finally {
      setSubmitting(false)
    }
  }

  const register = (name) => ({ id: name, name, value: values[name], onChange: handleChange, onBlur: handleBlur })
  const fieldError = (name) => (touched[name] ? errors[name] : undefined)

  return { values, errors, submitting, register, fieldError, handleSubmit, reset }
}
