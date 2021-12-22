import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import styles from '../index.module.css'
import DropdownTask from '../Industries/DropdownEdit'
import SkillCreateModal from './SkillCreateModal'
import SkillDeleteModal from './SkillDeleteModal'
import SkillEditModal from './SkillEditModal'

const Skillsets = () => {
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [industries, setIndustries] = useState([])
  const [selectedName, setSelectedName] = useState({})
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [sortDirection, setSortDirection] = useState(false)
  const [displayFilterMenu, setDisplayFilterMenu] = useState(false)
  const [displaySortMenu, setDisplaySortMenu] = useState(false)
  const [filterKey, setFilterKey] = useState(null)
  const [sortKey, setSortKey] = useState(null)
  const [toggleLoader, setToggleLoader] = useState(false)

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
    let url = `/project-type-skills?_limit=30&_page=${page}`
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
      setIndustries(res.data.skills)
    })
  }
  useEffect(() => {
    getAllIndusries()
  }, [])

  const editIndustry = (id, name, e) => {
    setToggleLoader(true)
    axios({
      method: 'PUT',
      url: `/project-type-skills/${id}`,
      data: {
        name,
        is_active: e.target.checked ? true : false,
      },
    })
      .then((res) => {
        getAllIndusries()
        setToggleLoader(false)
      })
      .catch((err) => setToggleLoader(false))
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
        Skillsets{' '}
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
        Add a Skill
      </button>
      <Row>
        <Col>
          <div style={{ position: 'relative' }}>
            <input
              className={styles.searchInput}
              placeholder="Search Skills"
              onChange={(e) => getAllIndusries(e.target.value)}
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
                      Skill
                    </label>
                  </li>
                </ul>
              ) : null}
            </div>
          </div>
        </Col>
      </Row>
      {windowWidth > 999 ? (
        <table className={styles.myTable}>
          <colgroup>
            <col span="1" style={{ width: '10%' }} />
            <col span="1" style={{ width: '65%' }} />
            <col span="1" style={{ width: '12.5%' }} />
            <col span="1" style={{ width: '12.5%' }} />
          </colgroup>
          <thead>
            <tr>
              <th> </th>
              <th className={styles.theadTh}>
                SKILLS{' '}
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
              <th className={styles.theadTh1}>STATUS</th>
              <th className={styles.theadTh1}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {industries?.map((industry) => {
              const { _id, name, is_active } = industry
              return (
                <tr
                  key={_id}
                  className={styles.tbodyTr}
                  style={{ margin: '12px 0' }}
                >
                  <td className={styles.tbodyTd1}>
                    <label className={styles.switch}>
                      <input
                        type="checkbox"
                        id="checkboxView"
                        checked={is_active}
                        onChange={(e) => editIndustry(_id, name, e)}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </td>
                  <td className={styles.tbodyTd2}>{name}</td>
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
                      <Image
                        src="/images/edit.svg"
                        alt="X"
                        height="15.18px"
                        width="15.19px"
                      />
                    </button>
                    <button
                      className={styles.tableButton}
                      type="button"
                      onClick={() => {
                        setShowDeleteModal(true)
                        setSelectedName(industry)
                      }}
                    >
                      <Image
                        src="/images/close_small.svg"
                        alt="X"
                        width="12.5px"
                        height="12.5px"
                      />
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
            const { _id, name, is_active } = industry
            return (
              <div key={_id} className={styles.tableMobDiv}>
                <div className={styles.tableMobDivFlex}>
                  <span className={styles.tableMobDivFlex1}>{name}</span>
                  <span className={styles.tableMobDivFlex2}>
                    <label
                      className={styles.switch}
                      style={{
                        transform: 'translate(-6px,6px)',
                        marginRight: '16px',
                      }}
                    >
                      <input
                        type="checkbox"
                        id="checkboxView"
                        checked={is_active}
                        onChange={(e) => editIndustry(_id, name, e)}
                      />
                      <span className={styles.slider}></span>
                    </label>
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
                  <span>STATUS: </span>
                  <span>
                    {is_active ? (
                      <span style={{ color: '#26C6DA' }}>Active</span>
                    ) : (
                      <span style={{ color: '#BDBDBD' }}>Inactive</span>
                    )}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
      <SkillCreateModal
        show={showModal}
        onHide={() => setShowModal(false)}
        handleClose={() => setShowModal(false)}
        getAllIndusries={getAllIndusries}
      />
      <SkillEditModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        handleClose={() => setShowEditModal(false)}
        getAllIndusries={getAllIndusries}
        selectedIndustry={selectedName}
      />
      <SkillDeleteModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        handleClose={() => setShowDeleteModal(false)}
        getAllIndusries={getAllIndusries}
        selectedIndustry={selectedName}
      />
    </>
  )
}

export default Skillsets
