import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Form, Image, Modal } from 'react-bootstrap'
import Select from 'react-select'
import styles from '../index.module.css'

const ProjectPendingCreateModal = ({
  show,
  handleClose,
  getAllIndusries,
  projectTypes,
  allSkills,
  selectedIndustry,
  getPendingProject,
}) => {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [skills, setSkills] = useState([])
  const [relatedProjects, setRelatedProjects] = useState([])

  const multiselectSkillChangeHandler = (selected) => {
    console.log('selected:', selected)
    let selectedArray =
      selected
        ?.reduce((acc, val) => {
          return [acc, val.value]
        }, [])
        .flat(Infinity) ?? []
    console.log('QWE:', selectedArray)
    const newSelectedArray = selectedArray
    setSkills(newSelectedArray)
  }
  const multiselectChangeHandler = (selected) => {
    console.log('selected:', selected)
    let selectedArray =
      selected
        ?.reduce((acc, val) => {
          return [acc, val.value]
        }, [])
        .flat(Infinity) ?? []
    console.log('QWE:', selectedArray)
    const newSelectedArray = selectedArray
    setRelatedProjects(newSelectedArray)
  }
  useEffect(() => {
    setName(selectedIndustry.name)
  }, [selectedIndustry])
  const submitHandler = (e) => {
    e.preventDefault()
    setLoading(true)
    axios({
      method: 'PUT',
      url: `/project-types/requests/${selectedIndustry._id}`,
      data: {
        name,
        skills,
        related_types: relatedProjects,
      },
    })
      .then((res) => {
        handleClose()
        getAllIndusries()
        getPendingProject()
        setLoading(false)
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
        <h3 className={styles.modalHeadingMain}>Add a New Project Type</h3>
        <p className={styles.modalParaMain}>
          Enter a new industry category for it to be visible at the front end.
        </p>
        <Form onSubmit={(e) => submitHandler(e)}>
          <Form.Label
            className={styles.modalLabel}
            style={{ marginBottom: '4px' }}
          >
            Project Type
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Add a Project Type"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            className={styles.modalInput}
          />
          <Form.Label
            className={styles.modalLabel}
            style={{ marginTop: '28px', marginBottom: '4px' }}
          >
            Tag Skills
          </Form.Label>
          <Select
            isMulti
            onChange={(selected) => multiselectSkillChangeHandler(selected)}
            options={allSkills?.map((skill) => {
              return { value: skill._id, label: skill.name }
            })}
            styles={colourStyles}
            placeholder="Tag Skills Required for this Project Type"
            isClearable={false}
          />
          <Form.Label
            className={styles.modalLabel}
            style={{ marginTop: '28px', marginBottom: '4px' }}
          >
            Tag Related Project Types
          </Form.Label>
          <Select
            isMulti
            onChange={(selected) => multiselectChangeHandler(selected)}
            options={projectTypes?.map((type) => {
              return { value: type._id, label: type.name }
            })}
            styles={colourStyles}
            placeholder="Tag Related Project Types"
            isClearable={false}
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

export default ProjectPendingCreateModal
