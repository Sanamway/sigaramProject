import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import styles from './index.module.css'
import OrderCreateModal from './OrderCreateModal'
import OrderDeleteModal from './OrderDeleteModal'
import OrderEditModal from './OrderEditModal'

const Order = () => {
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
    // getAllIndusries()
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
    <div className={styles.Container}>
    
      <h2 className={styles.headingMain}>
        Orders {' '}
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
      {/* <button
        type="button"
        onClick={() => setShowModal(true)}
        className={styles.buttonAdd}
      >
        <Image
          src="/images/add_circle_outline.png"
          alt="+"
          style={{ transform: 'translateY(-2.5px)' }}
        />{' '}
        Add a Order
      </button> */}
      <Row>
        <Col>
          <div style={{ position: 'relative' }}>
            <input
              className={styles.searchInput}
              placeholder="Search Orders"
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
                      Order
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
          <thead>
            <tr>
              <th className={styles.theadTh1}>ORDER ID</th>
              <th className={styles.theadTh1}>ORDER NUMBER</th>
              <th className={styles.theadTh1}>
                CART DETAILS{' '}
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
              <th className={styles.theadTh1}>STORE CONTACT INFO</th>
              <th className={styles.theadTh1}>DELIVERY DATE</th>
              <th className={styles.theadTh1}>STATUS</th>
              <th className={styles.theadTh1}>TOTAL AMOUNT</th>
              <th className={styles.theadTh1}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {/* {industries?.map((industry) => {
              const { _id, name, is_active } = industry
              return ( */}


              {/* first row */}


                <tr
                  // key={_id}
                  className={styles.tbodyTr}
                  style={{ margin: '12px 0' }}
                >
                  
                  <td className={styles.tbodyTd1}><b>order id...1</b></td>
                  <td className={styles.tbodyTd1}><b>order no...1</b></td>
                  <td className={styles.tbodyTd1}><b>{name}John</b></td>
                  <td className={styles.tbodyTd1}><b><span style={{ color: '#26C6DA' }}>
                  1234567890</span></b></td>
                  <td className={styles.tbodyTd1}><b>17/10/2021</b></td>
                  <td className={styles.tbodyTd1}>In stock
                    {/* {is_active ? (
                      <span style={{ color: '#26C6DA' }}>In stock</span>
                    ) : (
                      <span style={{ color: '#BDBDBD' }}>Out of stock</span>
                    )} */}
                  </td>

                  <td className={styles.tbodyTd1}><b>Rs 500</b></td>
                  <td className={styles.tbodyTd1}>
                    <button
                      type="button"
                      onClick={() => {
                        setShowDeleteModal(true)
                        // setSelectedName(industry)
                      }}
                      className={styles.modalSaveButton}
                    >  
                      Cancel order
                    </button>
                    
                  </td>
                </tr>
{/* second row */}
                <tr
                // key={_id}
                className={styles.tbodyTr}
                style={{ margin: '12px 0' }}
              >
                <td className={styles.tbodyTd1}><b>order id...2</b></td>
                  <td className={styles.tbodyTd1}><b>order no...2</b></td>
                  <td className={styles.tbodyTd1}><b>{name}Abhishek</b></td>
                  <td className={styles.tbodyTd1}><b><span style={{ color: '#26C6DA' }}>
                  765467882</span></b></td>
                  <td className={styles.tbodyTd1}><b>18/10/2021</b></td>
                  <td className={styles.tbodyTd1}>out of stock</td>
                  <td className={styles.tbodyTd1}><b>Rs 700</b></td>
                  <td className={styles.tbodyTd1}>
                    <button
                      type="button"
                      onClick={() => {
                        setShowDeleteModal(true)
                        // setSelectedName(industry)
                      }}
                      className={styles.modalSaveButton}
                    >  
                      Cancel order
                    </button>
                    
                  </td>
                </tr>

{/* third row */}
<tr
                // key={_id}
                className={styles.tbodyTr}
                style={{ margin: '12px 0' }}
              >
                <td className={styles.tbodyTd1}><b>order id...3</b></td>
                  <td className={styles.tbodyTd1}><b>order no...3</b></td>
                  <td className={styles.tbodyTd1}><b>{name}hassan</b></td>
                  <td className={styles.tbodyTd1}><b><span style={{ color: '#26C6DA' }}>
                  765566782</span></b></td>
                  <td className={styles.tbodyTd1}><b>19/10/2021</b></td>
                  <td className={styles.tbodyTd1}>in stock</td>
                  <td className={styles.tbodyTd1}><b>Rs 200</b></td>
                  <td className={styles.tbodyTd1}>
                    <button
                      type="button"
                      onClick={() => {
                        setShowDeleteModal(true)
                        // setSelectedName(industry)
                      }}
                      className={styles.modalSaveButton}
                    >  
                      Cancel order
                    </button>
                    
                  </td>
                </tr>
                {/* fourth row  */}
                <tr
                // key={_id}
                className={styles.tbodyTr}
                style={{ margin: '12px 0' }}
              >
                <td className={styles.tbodyTd1}><b>order id...4</b></td>
                  <td className={styles.tbodyTd1}><b>order no...4</b></td>
                  <td className={styles.tbodyTd1}><b>{name}sam</b></td>
                  <td className={styles.tbodyTd1}><b><span style={{ color: '#26C6DA' }}>
                  765445682</span></b></td>
                  <td className={styles.tbodyTd1}><b>20/10/2021</b></td>
                  <td className={styles.tbodyTd1}>out of stock</td>
                  <td className={styles.tbodyTd1}><b>Rs 900</b></td>
                  <td className={styles.tbodyTd1}>
                    <button
                      type="button"
                      onClick={() => {
                        setShowDeleteModal(true)
                        // setSelectedName(industry)
                      }}
                      className={styles.modalSaveButton}
                    >  
                      Cancel order
                    </button>
                    
                  </td>
                </tr>
                {/* fifth row */}
                <tr
                // key={_id}
                className={styles.tbodyTr}
                style={{ margin: '12px 0' }}
              >
                <td className={styles.tbodyTd1}><b>order id...5</b></td>
                  <td className={styles.tbodyTd1}><b>order no...5</b></td>
                  <td className={styles.tbodyTd1}><b>{name}sameer</b></td>
                  <td className={styles.tbodyTd1}><b><span style={{ color: '#26C6DA' }}>
                  3452567882</span></b></td>
                  <td className={styles.tbodyTd1}><b>21/10/2021</b></td>
                  <td className={styles.tbodyTd1}>out of stock</td>
                  <td className={styles.tbodyTd1}><b>Rs 1000</b></td>
                  <td className={styles.tbodyTd1}>
                    <button
                      type="button"
                      onClick={() => {
                        setShowDeleteModal(true)
                        // setSelectedName(industry)
                      }}
                      className={styles.modalSaveButton}
                    >  
                      Cancel order
                    </button>
                    
                  </td>
                </tr>
                
              {/* )
            })} */}
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
                    {/* <DropdownTask
                      openEditModal={() => {
                        setShowEditModal(true)
                        setSelectedName(industry)
                      }}
                      openDeleteModal={() => {
                        setShowDeleteModal(true)
                        setSelectedName(industry)
                      }}
                    /> */}
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
      <OrderCreateModal
        show={showModal}
        onHide={() => setShowModal(false)}
        handleClose={() => setShowModal(false)}
        getAllIndusries={getAllIndusries}
      />
      <OrderEditModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        handleClose={() => setShowEditModal(false)}
        getAllIndusries={getAllIndusries}
        selectedIndustry={selectedName}
      />
      <OrderDeleteModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        handleClose={() => setShowDeleteModal(false)}
        getAllIndusries={getAllIndusries}
        selectedIndustry={selectedName}
      />
   </div>
  )
}

export default Order
