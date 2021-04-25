import React, {
  useState,
} from 'react'

import axios from 'axios'

export default () => {
  const [isSavingAppointment, setSavingAppointment] = useState(false)
  const [responseSavingAppointment, setResponseSavingAppointment] = useState(false)
  const [errorSavingAppointment, setErrorSavingAppointment] = useState("")

  const createAppointment = async payload => {
    try {
      setSavingAppointment(true)
      setResponseSavingAppointment(false)
      setErrorSavingAppointment("")
      const url = `${process.env.REACT_APP_API_URL}/appointment`
      const {
        data
      } = await axios.post(url, payload)
      setSavingAppointment(false)
      const {
        success,
        e
      } = data
      if (success) {
        setResponseSavingAppointment(true)
      }
      else {
        setErrorSavingAppointment(e.message)
      }
    }
    catch (e) {
      setSavingAppointment(false)
      setResponseSavingAppointment(false)
      setErrorSavingAppointment("")
    }
  }

  return [isSavingAppointment, responseSavingAppointment, errorSavingAppointment, createAppointment]
}