import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Col, Image, Row, Form, Button, InputGroup } from 'react-bootstrap'
import styles from './index.module.css'
import { useSelector, useDispatch } from 'react-redux'
import CartModal from './CartModal'
import { product } from '../../store/slices/productSlice'
import { toast } from 'react-toastify'
const Products = () => {
  const [windowWidth, setWindowWidth] = useState(0)
  const [sortDirection, setSortDirection] = useState(false)
  const [displayFilterMenu, setDisplayFilterMenu] = useState(false)
  const [displaySortMenu, setDisplaySortMenu] = useState(false)
  const [filterKey, setFilterKey] = useState(null)
  const [sortKey, setSortKey] = useState(null)
  const [addedItems, setAddedItems] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false)
  const [products, setProducts] = useState([])
  const { addedItems: addedProducts } = useSelector((state) => state.product)

  useEffect(() => { setWindowWidth(window.innerWidth) })
  
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




  // Get All Products
  const getAllProducts = (query, page = 1, filterKeyValue, sortKeyValue) => {
    axios({
      method: "GET",
      url: "https://fakestoreapi.com/products/1",
    })
      .then((res) => {
       console.log("sdsfds",res.data)
       let arr =[]
       let x=   {
        id:res?.data.id,
        name:res?.data.title,
        availStock : 100
      }
      arr.push(x)
      // For more data
      arr.push({ id: 2, name: "Hey", qty: 1, availStock: 10 })
       setProducts(
      
        arr
               )
      })
      .catch((err) => {
        console.log(err);
      });
  
  }




  useEffect(() => { getAllProducts(); }, [])


  // Add Inventory Item to Redux
  const dispatch = useDispatch()
  const updateAddedItemsState = (addedItems) => {
    dispatch(product({
      addedItems
    }))
  }
  useEffect(() => {
    updateAddedItemsState(addedItems)
  }, [addedItems])

  // Change Qty
  const handleAlterProductQty = (item, qty) => {
    let newProducts = products.map((el) => {
      if (el.id === item.id) {
        el = { id: el.id, name: el.name, qty: qty, availStock: el.availStock }
        return el
      }
      else return el
    });
    setProducts(newProducts);
  }

  // Add Items in Inventory
  const addItemToCart = (item) => {
    toast.success(`${item.name} Added to Cart`)
    let selectedItems = addedProducts
    if (selectedItems.some(el => el.id === item.id)) {
      let newItems = selectedItems.map((el) => {
        if (el.id === item.id) {
          el = { id: el.id, name: el.name, qty: parseInt(el.qty) + parseInt(item.qty), availStock: el.availStock }
          return el
        }
        else return el
      });
      setAddedItems(newItems);
    }
    else {
      let newItem = { id: item.id, name: item.name, qty: item.qty, availStock: item.availStock }
      setAddedItems(selectedItems.concat(newItem));
    }
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
        Products{' '}
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

      </p>
      <button
        type="button"
        onClick={() => setShowCartModal(true)}
        className={styles.buttonAdd}
      >
        My Cart{`(${addedProducts.length && addedProducts.reduce((sum, current) => { return sum + current.qty }, 0)})`}
      </button>
      <Row>
        <Col>
          <div style={{ position: 'relative' }}>
            <input
              className={styles.searchInput}
              placeholder="Search Products"
              onChange={(e) => getAllProducts(e.target.value)}
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
                      Category Name
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
            <col span="1" style={{ width: '50%' }} />
            <col span="1" style={{ width: '18.5%' }} />
            <col span="1" style={{ width: '22.5%' }} />
          </colgroup>
          <thead>

            <tr>
              <th className={styles.theadTh1}>Id</th>
              <th className={styles.theadTh}>
                Name{' '}
              </th>
              <th className={styles.theadTh1}>Add Quantity</th>
              <th className={styles.theadTh1}>Add Product</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((item) => {
              const { id, name, qty, availStock } = item
              return (
                <tr
                  key={id}
                  className={styles.tbodyTr}
                  style={{ margin: '12px 0' }}
                >
                  <td className={styles.tbodyTd1}>
                    {id}
                  </td>
                  <td className={styles.tbodyTd2}>{name}</td>
                  <td className={styles.tbodyTd1}>

                    <InputGroup size="sm" className="mb-3" style={{ marginTop: "45px" }}>
                      <Button
                        variant="success"
                        disabled={qty === availStock}
                        id="inputGroup-sizing-sm cursor-pointer"
                        style={{ height: "32px" }}
                        onClick={() => handleAlterProductQty(item, parseInt(qty) + 1)}>
                        +
                      </Button>
                      <Form.Label
                        type="number"
                        className="form-control"
                        aria-readonly
                        style={{ height: "32px" }}
                      >
                        {qty}
                      </Form.Label>
                      <Button
                        variant="danger"
                        disabled={qty === 1}
                        style={{ height: "32px" }}
                        id="inputGroup-sizing-sm cursor-pointer"
                        onClick={() => handleAlterProductQty(item, parseInt(qty) - 1)}>-</Button>
                    </InputGroup>

                    {qty === availStock ?
                      <p className="text-danger"><small>Avail Stock {availStock - qty}</small></p> :
                      <p className="text-muted"><small>Avail Stock {availStock - qty}</small></p>}
                  </td>
                  <td className={styles.tbodyTd1}>
                    <Button
                      style={{ width: '100%' }}
                      type="select"
                      size="sm"
                      className={
                        styles.modalSaveButton
                      }
                      onClick={() => addItemToCart(item)}
                    >Add to cart</Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      ) : (
        <div>
          {products?.map((item) => {
            const { id, name, qty, availStock } = item
            return (
              <div key={id} className={styles.tableMobDiv}>
                <div className={styles.tableMobDivFlex}>
                  <span className={styles.tableMobDivFlex1}><small>{id}</small>.{"  "}{name}</span>
                  <span className={styles.tableMobDivFlex2} style={{
                    transform: 'translate(-6px,6px)',
                  }}>
                  </span>
                </div>
                <div className={styles.tableMobDivDown}>
                  <Row><InputGroup size="sm" className="mb-3" style={{ width: '40%' }}>
                    <Button
                      variant="success"
                      style={{ height: "32px" }}
                      disabled={qty === availStock}
                      id="inputGroup-sizing-sm cursor-pointer"
                      onClick={() => handleAlterProductQty(item, parseInt(qty) + 1)}>
                      +
                    </Button>
                    <Form.Label
                      type="number"
                      className="form-control"
                      aria-readonly
                      style={{ height: "32px" }}
                    >
                      <center>{qty}</center>
                    </Form.Label>
                    <Button
                      variant="danger"
                      style={{ height: "32px" }}
                      id="inputGroup-sizing-sm cursor-pointer"
                      onClick={() => handleAlterProductQty(item, parseInt(qty) - 1)}
                      disabled={qty === 1}>-</Button>
                    <br />
                    {qty === availStock ?
                      <p className="text-danger"><small>Avail Stock {availStock - qty}</small></p> :
                      <p className="text-muted"><small>Avail Stock {availStock - qty}</small></p>}
                  </InputGroup>


                    <Button
                      style={{ width: "40%", marginLeft: "40px" }}
                      type="select"
                      size="sm"
                      className={
                        styles.modalSaveButton
                      }

                      onClick={() => addItemToCart(item)}
                    >Add to Cart</Button></Row>
                </div>

              </div>
            )
          })}
        </div>
      )}
      <CartModal
        show={showCartModal}
        onHide={() => setShowCartModal(false)}
        handleClose={() => {
          setShowCartModal(false);
        }}
        fetchAllProducts={() => {
          setAddedItems([])
          getAllProducts()
        }}
      />

    </div>
  )
}

export default Products
