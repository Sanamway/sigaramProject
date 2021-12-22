import { Button, Form, Image, Modal, Row, Col, InputGroup } from 'react-bootstrap'
import styles from './index.module.css'
import { useRouter } from 'next/dist/client/router'
import { useSelector, useDispatch } from 'react-redux'
import { updateProduct } from '../../store/slices/productSlice'
import { toast } from 'react-toastify'
const CartModal = ({ show, handleClose, fetchAllProducts }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { addedItems: addedProducts } = useSelector((state) => state.product)

  // Update addItems State 
  const updateAddedItemsState = (items) => {
    let addedItems = items
    dispatch(updateProduct({
      addedItems
    }))
  }

  //Remove item from table
  const handleRemoveProduct = (item) => {
    toast.warn(`${item.name} Removed from Cart`)
    let updatedCartItems = addedProducts.filter((el) => item.id !== el.id)
    updateAddedItemsState(updatedCartItems)
  }

  // Reset cart
  const handleResetCart = () => {
    handleClose();
    fetchAllProducts();
  }


  // Checkout to Complete Order Page 
  const handleCompleteOrder = () => {
    router.push("/complete-order");
  }


  // Handle Qty Change
  const handleAlterProductQty = (item, qty) => {
    let updatedCartItems = addedProducts.map((el) => {
      if (el.id === item.id) {
        el = { id: el.id, name: el.name, qty: qty, availStock: el.availStock }
        return el
      }
      else return el
    });
    updateAddedItemsState(updatedCartItems)
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
            All Products
          </p>
        </div>

        <Row position="absolute"><Col align="left"><h3 className={styles.modalHeadingMain}>Added Products</h3></Col> <Col align="right"><button
          className={styles.tableButton}
          type="button"
          onClick={() => {
            handleClose()
          }}
        >

         X
        </button></Col></Row>
        <p className={styles.modalParaMain}>
          Complete order to place order.
        </p>
        {addedProducts?.map((item, idx) => {
          const { id, name, qty, availStock } = item
          return (

            <div key={id} className={styles.tableMobDiv}>
              <div className={styles.tableMobDivFlex}>
                <span className={styles.tableMobDivFlex1}>
                  <Row><Col align="left"><small>{id}</small>.{"  "}{name}</Col>
                    <Col align="right"><Button
                      className={styles.tableButton}
                      variant="danger"
                      type="button"
                      onClick={() => handleRemoveProduct(item)}
                      style={{ width: "10%" }}
                    >
                      <Image src="/images/deleteTrachIcon.png" alt="X" />
                    </Button></Col></Row></span>
                <span className={styles.tableMobDivFlex2} style={{
                  transform: 'translate(-6px,6px)',
                }}>
                </span>
              </div>
              <div className={styles.tableMobDivDown}>
                <Row><InputGroup size="sm" className="mb-3" style={{ width: '40%' }}>
                  <Button
                    variant="success"
                    onClick={() => handleAlterProductQty(item, parseInt(qty) + 1)}
                    id="inputGroup-sizing-sm cursor-pointer"
                    style={{ height: "32px" }}
                  >
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
                    id="inputGroup-sizing-sm cursor-pointer"
                    onClick={() => handleAlterProductQty(item, parseInt(qty) - 1)}
                    disabled={qty === 1}
                    style={{ height: "32px" }}>-</Button>
                </InputGroup>
                  {qty === availStock ?
                    <p className="text-danger"><small>Avail Stock {availStock - qty}</small></p> :
                    <p className="text-muted"><small>Avail Stock {availStock - qty}</small></p>}
                </Row>
              </div>

            </div>

          )
        })}
        <div className={styles.modalButtonDiv}>
          <button
            type="button"
            onClick={() => handleResetCart()}
            className={styles.modalDangerButton}
            style={{ width: "50%" }}
          >
            Reset Cart
          </button>
          <button
            type="submit"
            onClick={() => handleCompleteOrder()}
            className={
              styles.modalSaveButton
            }
            style={{ width: "50%" }}
          >
            Complete Order
          </button>
        </div>

      </Modal.Body>

    </Modal>
  )
}

export default CartModal
