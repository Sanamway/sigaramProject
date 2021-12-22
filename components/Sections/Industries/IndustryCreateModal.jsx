import axios from 'axios'
import { useState } from 'react'
import { Button, Form, Image, Modal } from 'react-bootstrap'
import styles from '../index.module.css'

const IndustryCreateModal = ({ show, handleClose, getAllIndusries }) => {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const submitHandler = (e) => {
    e.preventDefault()
    setLoading(true)
    axios({
      method: 'POST',
      url: `/industries`,
      data: {
        name,
      },
    })
      .then((res) => {
        handleClose()
        getAllIndusries()
        setLoading(false)
        setName('')
      })
      .catch((err) => {
        setLoading(false)
      })
  }
  return (
    <Modal
      show={show}
      onHide={handleClose}
      fullscreen="md-down"
      backdrop="static"
      centered={true}
      dialogClassName={styles.industryModal}
      style={{ background: 'rgba(0, 22, 38, 0.6)' }}
    >
      <Modal.Body className={styles.modalBodyDesktop}>
        <div className={styles.mobileModalDiv} onClick={() => handleClose()}>
          <p className={styles.mobileModalDivH}>
            <Image
              src="/images/arrowBackMobile.png"
              alt=""
              style={{ transform: 'translateY(-1px)', marginRight: '30px' }}
            />{' '}
            New Industry
          </p>
        </div>
        <h3 className={styles.modalHeadingMain}>Add New Industry</h3>
        <p className={styles.modalParaMain}>
          Enter a new industry category for it to be visible at the front end.
        </p>
        <Form onSubmit={(e) => submitHandler(e)}>
          <Form.Label className={styles.modalLabel}>Industry Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter industry name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            className={styles.modalInput}
          />
          <div className={styles.modalButtonDiv}>
            <button
              type="button"
              onClick={handleClose}
              className={styles.modalCancelButton}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || name === ''}
              className={
                loading || name === ''
                  ? styles.modalDisabledButton
                  : styles.modalSaveButton
              }
            >
              Add
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default IndustryCreateModal
