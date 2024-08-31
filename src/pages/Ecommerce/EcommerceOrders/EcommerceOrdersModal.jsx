import React from "react"
import PropTypes from "prop-types"
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap"
import img7 from "../../../assets/images/product/img-7.png"
import img4 from "../../../assets/images/product/img-4.png"
const modalStyle = {
  width: '100%',
  height: '100%',
};

const EcommerceOrdersModal = (props) => {
  const { isOpen, toggle, transaction } = props;
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
      style={modalStyle}
     
    >
      <div className="modal-content" >
        <ModalHeader toggle={toggle}>Order Details</ModalHeader>
        <ModalBody>
          <p className="mb-2">
            Product id: <span className="text-primary">{transaction.prs_id || "#SK2540"}</span>
          </p>
          <p className="mb-4">
          prs_update_time: <span className="text-primary">{transaction.prs_update_time || "Neal Matthews"}</span>
          </p>

          <div className="table-responsive">
            <Table className="table align-middle table-nowrap">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {/* <th scope="row">
                    <div>
                      <img src={img7} alt="" className="avatar-sm" />
                    </div>
                  </th> */}
                  <td>
                    <div>
                      <h5 className="text-truncate font-size-14">
                        {transaction.prs_status_name_am}
                      </h5>
                      <p className="text-muted mb-0">$ 225 x 1</p>
                    </div>
                  </td>
                  <td>{transaction.prs_status_name_en}</td>
                </tr>
                <tr>
                  <th scope="row">
                    {/* <div>
                      <img src={img4} alt="" className="avatar-sm" />
                    </div> */}
                  </th>
                  <td>
                    <div>
                      <h5 className="text-truncate font-size-14">
                        {transaction.prs_status_name_or}
                      </h5>
                      <p className="text-muted mb-0">$ 145 x 1</p>
                    </div>
                  </td>
                  <td>$ 145</td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <h6 className="m-0 text-right">Project status:</h6>
                  </td>
                  <td>$ {transaction.prs_status || 400}</td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <h6 className="m-0 text-right">Shipping:</h6>
                  </td>
                  <td>Free</td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <h6 className="m-0 text-right">prs_order_number:</h6>
                  </td>
                  <td>$ {transaction.prs_order_number || 0}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button type="button" color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  )
}

EcommerceOrdersModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default EcommerceOrdersModal
