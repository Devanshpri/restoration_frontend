import React, {
  useState,
} from 'react'

import axios from 'axios'

import moment from 'moment'

import {
  values,
} from 'lodash'

export default () => {
  const [isLoadingMedicineRecords, setLoadingMedicineRecords] = useState(false)
  const [medicalRecords, setMedicalRecords] = useState([])
  const [errorMedicalRecords, setErrorMedicalRecords] = useState("")

  const createDateWiseSegmentList = data => {
    let updatedUserVisit = {}
    data.map(item => {
      const {createdAt} = item
      const day = moment(createdAt).day()
      if (!updatedUserVisit[day]) {
        updatedUserVisit = {
          ...updatedUserVisit,
          [day]: {
            title: moment(createdAt).format("DD MMM YYYY"),
            data: [item],
          },
        };
      } else {
        const {data} = updatedUserVisit[day];
        updatedUserVisit[day].data = [...data.slice(0, data.length), item];
      }
    });
    const processedUpdatedVisit = values(updatedUserVisit).reverse();
    return processedUpdatedVisit
  }

  const fetchRecord = async () => {
    try {
      setLoadingMedicineRecords(true)
      setMedicalRecords([])
      setErrorMedicalRecords("")
      const {
        data
      } = await axios({
        url: `${process.env.REACT_APP_API_URL}/document/${localStorage.getItem('currUserId')}/report`
      })
      setLoadingMedicineRecords(false)
      if (data && data.success) {
        let list = []
        const val = data.response
        for (let i=0; i< val.length; i++) {
          const {
            fileMeta,
            createdAt,
          } = val[i]

          for (let j=0; j< fileMeta.length; j++) {
            list = [
              ...list,
              {
                ...fileMeta[j],
                createdAt
              }
            ]
          }
        }
        setMedicalRecords(createDateWiseSegmentList(list))
      }
      else {
        setErrorMedicalRecords()
      }
    }
    catch (e) {
      setLoadingMedicineRecords(false)
      setMedicalRecords([])
      setErrorMedicalRecords("")
    }
  }

  return [isLoadingMedicineRecords, medicalRecords, errorMedicalRecords, fetchRecord]
}