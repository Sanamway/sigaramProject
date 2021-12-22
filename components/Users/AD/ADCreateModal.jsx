import axios from 'axios'
import { useState } from 'react'
import { Button, Form, Image, Modal } from 'react-bootstrap'
import Select from 'react-select'
import styles from '../index.module.css'

const ADCreateModal = ({
  show,
  handleClose,
  getAllIndusries,
  projectTypes,
  allSkills,
}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [loading, setLoading] = useState(false)
  const [skills, setSkills] = useState([])

  const multiselectSkillChangeHandler = (selected) => {
    console.log('selected:', selected)
    let selectedArray =
      selected
        ?.reduce((acc, val) => {
          return [acc, val.value]
        }, [])
        .flat(Infinity) ?? []
    console.log('QWE:', selectedArray)
    const newSelectedArray = selected
    setSkills(newSelectedArray)
  }
  const submitHandler = (e) => {
    e.preventDefault()
    setLoading(true)
    axios({
      method: 'POST',
      url: `/users`,
      data: {
        name,
        email,
        mobile,
        industries:
          skills.length === 0
            ? []
            : skills?.map((skill) => {
                return { id: skill.value, name: skill.label }
              }),
      },
    })
      .then((res) => {
        handleClose()
        getAllIndusries()
        setLoading(false)
        setName('')
        setEmail('')
        setMobile('')
        setSkills([])
      })
      .catch((err) => {
        setLoading(false)
      })
  }
  const colourStyles = {
    control: (styles, { data, isDisabled, isFocused, isSelected }) => ({
      ...styles,
      padding: '2px 8px',
      background: '#F5F6F9',
      border: isFocused
        ? '1px solid #BACCDD'
        : isSelected
        ? '1px solid #BACCDD'
        : '1px solid #BACCDD',
      '&:hover': {
        borderColor: '#BACCDD',
      },
      boxSizing: 'border-box',
      borderRadius: '4px',
      outline: 'none',
      boxShadow: isFocused ? 'none' : isSelected ? 'none' : 'none',
    }),
    menuPortal: () => {
      return {
        backgroundColor: '#E0F7FA',
      }
    },
    singleValue: (styles) => {
      return {
        ...styles,
        color: 'red',
        '&:hover': {
          backgroundColor: '#E0F7FA',
        },
      }
    },
    indicatorSeparator: (styles) => {
      return {
        display: 'none',
      }
    },
    placeholder: (styles) => {
      return {
        ...styles,
        color: '#BACCDD',
        fontSize: '14px',
        lineHeight: '20px',
        letterSpacing: '0.25px',
      }
    },
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected
          ? data.color
          : isFocused
          ? '#E0F7FA'
          : null,
        '&:hover': {
          backgroundColor: '#E0F7FA',
        },
        cursor: isDisabled ? 'not-allowed' : 'default',

        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled && (isSelected ? data.color : '#BACCDD'),
        },
      }
    },
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: '#BACCDD',
        padding: '3px 6px',
      }
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: '#2D4C66',
    }),
  }
  console.log('skill', skills)
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
            New AirTeams AD
          </p>
        </div>
        <h3 className={styles.modalHeadingMain}>Add a new AirTeams AD</h3>
        <p className={styles.modalParaMain}>
          Share a few details of the new Air Teams Client servicing executive to
          be assigned to the project.
        </p>
        <Form onSubmit={(e) => submitHandler(e)}>
          <div className={styles.modalBodyScrollable}>
            <Form.Label
              className={styles.modalLabel}
              style={{ marginBottom: '4px' }}
            >
              Full Name
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              className={styles.modalInput}
            />
            <Form.Label
              className={styles.modalLabel}
              style={{ marginTop: '27px', marginBottom: '4px' }}
            >
              Email ID
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email ID"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className={styles.modalInput}
            />
            <Form.Label
              className={styles.modalLabel}
              style={{ marginTop: '27px', marginBottom: '4px' }}
            >
              Contact Number
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter contact number"
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
              required
              className={styles.modalInput}
            />
            <Form.Label
              className={styles.modalLabel}
              style={{ marginTop: '27px', marginBottom: '4px' }}
            >
              Industries Worked With
            </Form.Label>
            <Select
              isMulti
              onChange={(selected) => multiselectSkillChangeHandler(selected)}
              options={allSkills?.map((skill) => {
                return { value: skill._id, label: skill.name }
              })}
              styles={colourStyles}
              placeholder="Select industries"
              isClearable={false}
            />
          </div>
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
              disabled={
                loading ||
                name === '' ||
                email === '' ||
                mobile === '' ||
                skills.length === 0
              }
              className={
                loading ||
                name === '' ||
                email === '' ||
                mobile === '' ||
                skills.length === 0
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

export default ADCreateModal
