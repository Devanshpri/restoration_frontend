import React, {
  useState,
  useEffect,
} from 'react'
import LoadingOverlay from 'react-loading-overlay'
import useFetchMedicalRecord from '../hooks/useFetchMedicalRecord'

import { Modal } from 'react-bootstrap'

import './CustomComponent.css'

const MedicalReport = () => {
 
  const [isLoadingRecords, medicalRecords, errorMessage, fetchRecords] = useFetchMedicalRecord()

  const [show, setShow] = useState(false)
  const [modalData, setModalData] = useState({})

  useEffect(() => {
    fetchRecords()
  }, [])

  const toggleDialog = () => {
    setShow(!show)
  }

  const onImageClick = item => {
    setModalData(item)
    toggleDialog()
  }

  const onModalClose = () => {
    setModalData({})
    toggleDialog()
  }

  const renderMedicalRecordList = list => {
    return (
      list.map(item => {
        return (
          <img
            src={item.location}
            width="200px"
            height="200px"
            className="imageContainer"
            alt={item.key}
            onClick={() => onImageClick(item)}
          />
        )
      })
    )
  }

  const renderMedicalRecord = () => {
    return medicalRecords.map(item  => {
      return (
        <div>
          <h5>{item.title}</h5>
          <div>{renderMedicalRecordList(item.data)}</div>
        </div>
      )
    })
  }

  return (
    <LoadingOverlay
      active={isLoadingRecords}
      spinner
      text='Fetching Records'
     >
    <div className="medicalRecordComponent">
      {renderMedicalRecord()}
    </div>
    <Modal
      show={show}
      onHide={onModalClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Medical Report</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={modalData.location}
          alt={modalData.key}
          width="750px"
          height="700px"
        />
      </Modal.Body>
    </Modal>
  </LoadingOverlay>
  )
}

export default MedicalReport