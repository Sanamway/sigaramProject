import { Form, Image, Modal } from 'react-bootstrap'
import styles from './index.module.css'

const ContactDetailsModal = ({
  show,
  handleClose,
  email,
  contactNumber,
  headingName,
}) => {
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
            {headingName}
          </p>
        </div>
        <button
          className={styles.modalButtonClose}
          onClick={() => handleClose()}
          type="button"
        >
          <Image
            src="/icons/closeModal.svg"
            alt="X"
            height="14px"
            width="14px"
          />
        </button>
        <h3 className={styles.modalHeadingMain}>Contact Details</h3>
        <Form.Label
          className={styles.modalLabel}
          style={{ marginTop: '30px', marginBottom: '4px' }}
        >
          Email Address
        </Form.Label>
        <div className={styles.copyClipboardButtonDiv}>
          <Form.Control
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            readOnly
            className={styles.modalInput}
            style={{
              fontSize: '14px',
              lineHeight: '20px',
              letterSpacing: '0.25px',
              color: ' #2D4C66',
            }}
          />
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText('jane@gmail.com')
            }}
            className={styles.copyClipboardButton}
          >
            <Image
              src="/icons/copyClipboard.svg"
              alt=""
              width="16.67px"
              height="16.67px"
            />
          </button>
        </div>
        <Form.Label
          className={styles.modalLabel}
          style={{ marginTop: '27px', marginBottom: '4px' }}
        >
          Contact Number
        </Form.Label>
        <div className={styles.copyClipboardButtonDiv}>
          <Form.Control
            type="text"
            onChange={(e) => setMobile(e.target.value)}
            value={'+91 9270732083'}
            readOnly
            className={styles.modalInput}
            style={{
              fontSize: '14px',
              lineHeight: '20px',
              letterSpacing: '0.25px',
              color: ' #2D4C66',
              marginBottom: '15px',
            }}
          />
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText('+91 9270732083')
            }}
            className={styles.copyClipboardButton}
          >
            <Image
              src="/icons/copyClipboard.svg"
              alt=""
              width="16.67px"
              height="16.67px"
            />
          </button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ContactDetailsModal
