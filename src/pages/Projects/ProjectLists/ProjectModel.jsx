import React, { useTransition } from "react"
import PropTypes from "prop-types"
import { useTranslation } from "react-i18next";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap"

const modalStyle = {
  width: '100%',
  height: '100%',
};

const EcommerceOrdersModal = (props) => {
  const { t } = useTranslation();
  const { isOpen, toggle, transaction } = props;

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="modal-xl"
      tabIndex="-1"
      toggle={toggle}
      style={modalStyle}
    >
      <div className="modal-xl">
        <ModalHeader toggle={toggle}>{t("View Details")}</ModalHeader>
        <ModalBody>
          <p className="mb-2">
            {t('prs_id')}: <span className="text-primary">{transaction.prs_id}</span>
          </p>
          <p className="mb-2">
            {t('prs_update_time')}: <span className="text-primary">{transaction.prs_update_time}</span>
          </p>
          <p className="mb-2">
            {t('prs_order_number')}: <span className="text-primary">{transaction.prs_order_number}</span>
          </p>
          <p className="mb-2">
            {t('prs_description')}: <span>{transaction.prs_description}</span>
          </p>
          <p className="mb-2">
            {t('prs_status_name_en')}: <span>{transaction.prs_status_name_en}</span>
          </p>

          {transaction.is_deletable === 1 && (
            <p className="text-danger">This project is deletable</p>
          )}
          
          {transaction.is_editable === 1 && (
            <p className="text-success">Editable</p>
          )}

          <div className="table-responsive">
            <Table className="table align-middle table-nowrap">
              <tbody>
                <tr>
                  <td>
                    <h5 className="font-size-14">
                      {t('prs_status_name_am')}: {transaction.prs_status_name_am}
                    </h5>
                  </td>
                  <td>
                    <h5 className="font-size-14">
                      {t('prs_status_name_or')}: {transaction.prs_status_name_or}
                    </h5>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <h6 className="m-0 text-right">{t('prs_budget_year')}:</h6>
                  </td>
                  <td>{transaction.prs_budget_year || "N/A"}</td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <h6 className="m-0 text-right">{t('prs_created_by')}:</h6>
                  </td>
                  <td>{transaction.prs_created_by}</td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <h6 className="m-0 text-right">{t('prs_color_code')}:</h6>
                  </td>
                  <td style={{ backgroundColor: transaction.prs_color_code }}>{transaction.prs_color_code}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button type="button" color="secondary" onClick={toggle}>
            {t('Close')}
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  );
};

EcommerceOrdersModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  transaction: PropTypes.object,
};

export default EcommerceOrdersModal;
