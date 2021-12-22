import axios from 'axios'
import { useState } from 'react'
import { Form, Image, Modal } from 'react-bootstrap'
import styles from '../index.module.css'

const ProjectDeleteModal = ({
  show,
  handleClose,
  getAllIndusries,
  selectedIndustry,
}) => {
  const [loading, setLoading] = useState(false)
  const submitHandler = (e) => {
    e.preventDefault()
    setLoading(true)
    axios({
      method: 'DELETE',
      url: `/project-types/${selectedIndustry._id}`,
    })
      .then((res) => {
        handleClose()
        getAllIndusries()
        setLoading(false)
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
            Project Types
          </p>
        </div>
        <h3 className={styles.modalHeadingMain}>Delete Project Type</h3>
        <p className={styles.modalParaMain}>
          Delete a project type for it to not be visible at the front end.
        </p>
        <Form onSubmit={(e) => submitHandler(e)}>
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
              disabled={loading}
              className={
                loading ? styles.modalDisabledButton : styles.modalSaveButton
              }
            >
              Delete
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ProjectDeleteModal
