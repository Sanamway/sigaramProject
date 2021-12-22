import { useEffect, useRef, useState } from 'react'
import { Image } from 'react-bootstrap'
import styles from '../index.module.css'

const DropdownTask = (props) => {
  const [displayMenu, setDisplayMenu] = useState(false)

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setDisplayMenu(false)
        }
      }

      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }

  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef)
  return (
    <div
      className={styles.dropdownTask}
      style={{ background: 'transparent', width: '20px' }}
      ref={wrapperRef}
    >
      <div
        className="button"
        style={{ fontSize: '14px' }}
        onClick={() => setDisplayMenu(true)}
      >
        <Image src="/images/ShowMore.svg" alt="V" width={14} />
      </div>

      {displayMenu ? (
        <ul>
          <li
            onClick={() => {
              props.openEditModal()
              setDisplayMenu(false)
            }}
          >
            <span
              className="active"
              style={{ border: 'none', background: 'transparent' }}
            >
              <Image
                src="/images/edit.svg"
                alt=""
                height="13.5px"
                width="13.5px"
                style={{ transform: 'translateY(-2px)' }}
              />
              &nbsp; Edit
            </span>
          </li>
          <li
            onClick={() => {
              props.openDeleteModal()
              setDisplayMenu(false)
            }}
          >
            <span
              className="active"
              style={{ border: 'none', background: 'transparent' }}
            >
              <Image
                src="/images/deleteTrachIcon.png"
                alt="X"
                width="10.5px"
                height="13.5px"
              />
              &nbsp; Delete
            </span>
          </li>
        </ul>
      ) : null}
    </div>
  )
}

export default DropdownTask
