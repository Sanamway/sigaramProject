import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import styles from '../index.module.css'
import DropdownTask from '../DropdownTask'
import ADCreateModal from './ADCreateModal'
import ADDeleteModal from './ADDeleteModal'
import ADEditModal from './ADEditModal'
import ContactDetailsModal from '../ContactDetailsModal'

const AD = () => {
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [industries, setIndustries] = useState([])
  const [selectedName, setSelectedName] = useState({})
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [sortDirection, setSortDirection] = useState(false)
  const [skills, setSkills] = useState([])
  const [displayFilterMenu, setDisplayFilterMenu] = useState(false)
  const [displaySortMenu, setDisplaySortMenu] = useState(false)
  const [filterKey, setFilterKey] = useState(null)
  const [sortKey, setSortKey] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searchInputValue, setSearchInputValue] = useState('')
  const [showContactModal, setShowContactModal] = useState(false)
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
    let url = `/users/?role=admin`
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
  const getAllSkills = () => {
    axios({
      method: 'GET',
      url: `/industries`,
    }).then((res) => {
      setSkills(res.data.industries)
    })
  }
  useEffect(() => {
    getAllIndusries()
  }, [])
  useEffect(() => {
    getAllSkills()
  }, [])

  const editIndustry = (id, name, skills, related_types, e) => {
    axios({
      method: 'PUT',
      url: `/project-types/${id}`,
      data: {
        name,
        is_active: e.target.checked ? true : false,
        skills,
        related_types,
      },
    }).then((res) => {
      getAllIndusries()
    })
  }
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
        AirTeams AD{' '}
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
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo.
      </p>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className={styles.buttonAdd}
      >
        <Image
          src="/images/add_circle_outline.png"
          alt="+"
          style={{ transform: 'translateY(-2.5px)' }}
        />{' '}
        Add a New AirTeams Account Director
      </button>
      <Row>
        <Col>
          <div style={{ position: 'relative' }}>
            <input
              className={styles.searchInput}
              placeholder="Search AD"
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
          <table className={styles.myTable}>
            <colgroup>
              <col span="1" style={{ width: '8.5%' }} />
              <col span="1" style={{ width: '16%' }} />
              <col span="1" style={{ width: '26%' }} />
              <col span="1" style={{ width: '24.5%' }} />
              <col span="1" style={{ width: '12.5%' }} />
              <col span="1" style={{ width: '12.5%' }} />
            </colgroup>
            <thead>
              <tr>
                <th style={{ textAlign: 'center' }}>#</th>
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
                <th className={styles.theadTh}>INDUSTRIES WORKED WITH</th>
                <th className={styles.theadTh}>CONTACT DETAILS</th>
                <th className={styles.theadTh1}>Status</th>
                <th className={styles.theadTh1}>Action</th>
              </tr>
            </thead>
            <tbody>
              {industries?.map((industry, index) => {
                const {
                  id,
                  name,
                  is_active,
                  industries: industriesToShow,
                } = industry
                return (
                  <tr
                    key={id}
                    className={styles.tbodyTr}
                    style={{ margin: '12px 0' }}
                  >
                    <td className={styles.tbodyTd1}>{index + 1}</td>
                    <td className={styles.tbodyTd2}>{name}</td>
                    <td className={styles.tbodyTd2}>
                      {industriesToShow?.map((skill) => (
                        <span
                          key={skill._id}
                          className={styles.tableMultiselectValues}
                        >
                          {skill.name}
                        </span>
                      ))}
                    </td>
                    <td className={styles.tbodyTd2}>
                      <button
                        type="button"
                        className={styles.contactButton}
                        onClick={() => {
                          setShowContactModal(true)
                          setSelectedItem(industry)
                        }}
                      >
                        View contact details
                      </button>
                    </td>
                    <td className={styles.tbodyTd1}>
                      {is_active ? (
                        <span style={{ color: '#26C6DA' }}>Active</span>
                      ) : (
                        <span style={{ color: '#BDBDBD' }}>Inactive</span>
                      )}
                    </td>
                    <td className={styles.tbodyTd1}>
                      <button
                        type="button"
                        onClick={() => {
                          setShowEditModal(true)
                          setSelectedName(industry)
                        }}
                        className={styles.tableButton}
                      >
                        <Image src="/images/edit.svg" alt="" />
                      </button>
                      <button
                        className={styles.tableButton}
                        type="button"
                        onClick={() => {
                          setShowDeleteModal(true)
                          setSelectedName(industry)
                        }}
                      >
                        <Image src="/images/close_small.svg" alt="X" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : (
          <div>
            {industries?.map((industry) => {
              const {
                id,
                name,
                is_active,
                industries: industriesToShow,
              } = industry
              return (
                <div key={id} className={styles.tableMobDiv}>
                  <div className={styles.tableMobDivFlex}>
                    <span className={styles.tableMobDivFlex1}>{name}</span>
                    <span className={styles.tableMobDivFlex2}>
                      <DropdownTask
                        openEditModal={() => {
                          setShowEditModal(true)
                          setSelectedName(industry)
                        }}
                        openDeleteModal={() => {
                          setShowDeleteModal(true)
                          setSelectedName(industry)
                        }}
                      />
                    </span>
                  </div>
                  <div className={styles.tableMobDivDown}>
                    <span>INDUSTRIES WORKED WITH: </span>
                    <br />
                    <div className={styles.tableMobDivDownInfo}>
                      {industriesToShow?.map((skill) => (
                        <span
                          key={skill._id}
                          className={styles.tableMultiselectValues}
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
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
                          setShowContactModal(true)
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
                </div>
              )
            })}
          </div>
        )}
      </>

      <ADCreateModal
        show={showModal}
        onHide={() => setShowModal(false)}
        handleClose={() => setShowModal(false)}
        getAllIndusries={getAllIndusries}
        projectTypes={industries}
        allSkills={skills}
      />
      <ADEditModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        handleClose={() => setShowEditModal(false)}
        getAllIndusries={getAllIndusries}
        selectedIndustry={selectedName}
        projectTypes={industries}
        allSkills={skills}
      />
      <ADDeleteModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        handleClose={() => setShowDeleteModal(false)}
        getAllIndusries={getAllIndusries}
        selectedIndustry={selectedName}
      />
      <ContactDetailsModal
        show={showContactModal}
        onHide={() => setShowContactModal(false)}
        handleClose={() => setShowContactModal(false)}
        headingName="AirTeams AD"
        email={selectedItem.email}
      />
    </>
  )
}

export default AD
