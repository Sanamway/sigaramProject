import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import ContactDetailsModal from '../ContactDetailsModal'
import styles from '../index.module.css'

const Creators = () => {
  const [industries, setIndustries] = useState([])
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [sortDirection, setSortDirection] = useState(false)
  const [displayFilterMenu, setDisplayFilterMenu] = useState(false)
  const [displaySortMenu, setDisplaySortMenu] = useState(false)
  const [filterKey, setFilterKey] = useState(null)
  const [sortKey, setSortKey] = useState(null)
  const [searchInputValue, setSearchInputValue] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setDisplayFilterMenu(false)
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
  function useOutsideAlerterSort(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setDisplaySortMenu(false)
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

  const sortRef = useRef(null)
  useOutsideAlerterSort(sortRef)
  const handleResize = (e) => {
    setWindowWidth(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const getAllIndusries = (query, page = 1, filterKeyValue, sortKeyValue) => {
    let url = `/users/?role=creator`
    if (query) {
      url += `&name=${encodeURIComponent(query)}`
    }
    if (filterKeyValue) {
      url += `&is_active=${filterKeyValue}`
    }
    if (sortKeyValue) {
      const dir = sortDirection === true ? 'desc' : 'asc'
      url += `&sort_by=${sortKeyValue}&sort_dir=${dir}`
    }
    axios({
      method: 'GET',
      url,
    }).then((res) => {
      setIndustries(res.data.users)
    })
  }
  useEffect(() => {
    getAllIndusries()
  }, [])
  const filterKeyChangeHandler = (e) => {
    const { value } = e.target
    if (e.target.checked) {
      setFilterKey(value)
      getAllIndusries(null, 1, value)
    } else {
      setFilterKey(null)
      getAllIndusries(null, 1, null)
    }
    setDisplayFilterMenu(false)
  }
  const sortKeyChangeHandler = (e) => {
    const { value } = e.target
    if (e.target.checked) {
      setSortKey(value)
      getAllIndusries(null, 1, filterKey, value)
    } else {
      setSortKey(null)
      getAllIndusries(null, 1, filterKey, null)
    }
    setDisplaySortMenu(false)
  }
  return (
    <>
      <h2 className={styles.headingMain}>
        Creators{' '}
        {sortKey === 'name' && (
          <button className={styles.sortButtonCaretSm}>
            {sortDirection === false ? (
              <i
                className="fa fa-caret-down"
                aria-hidden="true"
                onClick={() => {
                  setSortDirection(true)
                  getAllIndusries(null, 1, filterKey, sortKey)
                }}
              ></i>
            ) : (
              <i
                className="fa fa-caret-up"
                aria-hidden="true"
                onClick={() => {
                  setSortDirection(false)
                  getAllIndusries(null, 1, filterKey, sortKey)
                }}
              ></i>
            )}
          </button>
        )}
      </h2>
      <p className={styles.paraMain}>
        List of all creators with their contact information. Check the status of
        their projects or view their profiles here.
      </p>
      <Row>
        <Col>
          <div style={{ position: 'relative' }}>
            <input
              className={styles.searchInput}
              placeholder="Search Creators"
              value={searchInputValue}
              onChange={(e) => {
                getAllIndusries(e.target.value)
                setSearchInputValue(e.target.value)
              }}
            />
            <Image
              src="/images/searchIcon.png"
              alt=""
              height="16px"
              width="16px"
              className={styles.searchInputIcon}
            />
          </div>
        </Col>
        <Col>
          <div className={styles.filterSortDiv}>
            <div className={styles.filterByDiv}>
              <span onClick={() => setDisplayFilterMenu(!displayFilterMenu)}>
                Filter by{' '}
                <i className="fa fa-caret-down" aria-hidden="true"></i>
              </span>
              {displayFilterMenu ? (
                <ul ref={wrapperRef}>
                  <li className={filterKey === 'true' && styles.filterByDivLi}>
                    <label>
                      <span
                        style={{ border: 'none', background: 'transparent' }}
                      >
                        <label className={styles.containerCheckbox}>
                          <input
                            type="checkbox"
                            value="true"
                            checked={filterKey === 'true'}
                            onChange={(e) => filterKeyChangeHandler(e)}
                          />
                          <span className={styles.checkmark}></span>
                        </label>
                      </span>
                      Active
                    </label>
                  </li>
                  <li className={filterKey === 'false' && styles.filterByDivLi}>
                    <label>
                      <span
                        style={{ border: 'none', background: 'transparent' }}
                      >
                        <label className={styles.containerCheckbox}>
                          <input
                            type="checkbox"
                            value="false"
                            checked={filterKey === 'false'}
                            onChange={(e) => filterKeyChangeHandler(e)}
                          />
                          <span className={styles.checkmark}></span>
                        </label>
                      </span>
                      Inactive
                    </label>
                  </li>
                </ul>
              ) : null}
            </div>
            <div className={styles.sortByDiv}>
              <span onClick={() => setDisplaySortMenu(!displaySortMenu)}>
                Sort by <i className="fa fa-caret-down" aria-hidden="true"></i>
              </span>
              {displaySortMenu ? (
                <ul ref={sortRef}>
                  <li
                    className={sortKey === 'name' && styles.sortByDivLi}
                    style={{ padding: '12px' }}
                  >
                    <label>
                      <span
                        style={{ border: 'none', background: 'transparent' }}
                      >
                        <input
                          type="checkbox"
                          value="name"
                          checked={sortKey === 'name'}
                          onChange={(e) => sortKeyChangeHandler(e)}
                          style={{ display: 'none' }}
                        />
                      </span>
                      Name
                    </label>
                  </li>
                </ul>
              ) : null}
            </div>
          </div>
        </Col>
      </Row>
      <>
        {windowWidth > 999 ? (
          <>
            <table className={styles.myTable} style={{ marginBottom: '5px' }}>
              <colgroup>
                <col span="1" style={{ width: '6.5%' }} />
                <col span="1" style={{ width: '10%' }} />
                <col span="1" style={{ width: '28.5%' }} />
                <col span="1" style={{ width: '21%' }} />
                <col span="1" style={{ width: '19%' }} />
                <col span="1" style={{ width: '15%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th style={{ textAlign: 'center' }}>#</th>
                  <th> </th>
                  <th className={styles.theadTh}>
                    NAME{' '}
                    {sortKey === 'name' && (
                      <button className={styles.sortButtonCaret}>
                        {sortDirection === false ? (
                          <i
                            className="fa fa-caret-down"
                            aria-hidden="true"
                            onClick={() => {
                              setSortDirection(true)
                              getAllIndusries(null, 1, filterKey, sortKey)
                            }}
                          ></i>
                        ) : (
                          <i
                            className="fa fa-caret-up"
                            aria-hidden="true"
                            onClick={() => {
                              setSortDirection(false)
                              getAllIndusries(null, 1, filterKey, sortKey)
                            }}
                          ></i>
                        )}
                      </button>
                    )}
                  </th>
                  <th className={styles.theadTh}>CONTACT DETAILS</th>
                  <th className={styles.theadTh1}>Status</th>
                  <th className={styles.theadTh1}>Action</th>
                </tr>
              </thead>
            </table>
            {industries?.map((industry, index) => {
              const { id, name, is_active } = industry
              return (
                <div key={id} className={styles.clientsDataDiv}>
                  <div className={styles.clientsDataDivItems}>{index + 1}</div>
                  <div className={styles.clientsDataDivItems}>
                    <Image
                      src="/images/Bitmap.svg"
                      alt=""
                      style={{ transform: 'translateY(-12px)' }}
                      width="48px"
                      height="48px"
                    />
                  </div>
                  <div
                    className={styles.clientsDataDivItems}
                    style={{
                      textAlign: 'left',
                      marginLeft: '23px',
                      paddingRight: '10px',
                    }}
                  >
                    {name}
                  </div>
                  <div className={styles.clientsDataDivItems}>
                    <button
                      type="button"
                      className={styles.contactButton}
                      onClick={() => {
                        setShowModal(true)
                        setSelectedItem(industry)
                      }}
                    >
                      View contact details
                    </button>
                  </div>
                  <div className={styles.clientsDataDivItems}>
                    {is_active ? (
                      <span style={{ color: '#26C6DA' }}>Active</span>
                    ) : (
                      <span style={{ color: '#BDBDBD' }}>Inactive</span>
                    )}
                  </div>
                  <div className={styles.clientsDataDivItems}>
                    <button
                      type="button"
                      className={styles.viewProfileButton}
                      style={{
                        textAlign: 'center',
                        transform: 'translateY(-6px)',
                      }}
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              )
            })}
          </>
        ) : (
          <div>
            {industries?.map((industry) => {
              const { id, name, is_active } = industry
              return (
                <div key={id} className={styles.tableMobDiv}>
                  <div className={styles.tableMobDivFlex}>
                    <span className={styles.tableMobDivFlex1}>
                      <Image
                        src="/images/Bitmap.svg"
                        alt=""
                        width="48px"
                        height="48px"
                      />
                      <span style={{ marginLeft: '15px' }}>{name}</span>
                    </span>
                  </div>
                  <div className={styles.tableMobDivDown}>
                    <span>CONTACT DETAILS: </span>
                    <br />
                    <div className={styles.tableMobDivDownInfo}>
                      <button
                        type="button"
                        className={styles.contactButton}
                        style={{ paddingLeft: '0' }}
                        onClick={() => {
                          setShowModal(true)
                          setSelectedItem(industry)
                        }}
                      >
                        View contact details
                      </button>
                    </div>
                  </div>
                  <div className={styles.tableMobDivDown}>
                    <span>STATUS: </span>
                    <div className={styles.tableMobDivDownInfo}>
                      {is_active ? (
                        <div style={{ color: '#26C6DA' }}>Active</div>
                      ) : (
                        <div style={{ color: '#BDBDBD' }}>Inactive</div>
                      )}
                    </div>
                  </div>
                  <div className={styles.tableMobDivDown}>
                    <div className={styles.tableMobDivDownInfo}>
                      <button
                        type="button"
                        className={styles.viewProfileButton}
                        style={{
                          textAlign: 'center',
                          width: '100%',
                        }}
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </>
      <ContactDetailsModal
        show={showModal}
        onHide={() => setShowModal(false)}
        handleClose={() => setShowModal(false)}
        headingName="Creators"
        email={selectedItem.email}
      />
    </>
  )
}

export default Creators
