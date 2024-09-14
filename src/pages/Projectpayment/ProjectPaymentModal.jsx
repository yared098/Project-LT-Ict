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

const ProjectPaymentModal = (props) => {
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
        <tr>
                    <p className="mb-2">
            {t('prp_project_id')}: <span className="text-primary">{transaction.prp_project_id}</span>
          </p>
          </tr><tr>
                    <p className="mb-2">
            {t('prp_type')}: <span className="text-primary">{transaction.prp_type}</span>
          </p>
          </tr><tr>
                    <p className="mb-2">
            {t('prp_payment_date_et')}: <span className="text-primary">{transaction.prp_payment_date_et}</span>
          </p>
          </tr><tr>
                    <p className="mb-2">
            {t('prp_payment_date_gc')}: <span className="text-primary">{transaction.prp_payment_date_gc}</span>
          </p>
          </tr><tr>
                    <p className="mb-2">
            {t('prp_payment_amount')}: <span className="text-primary">{transaction.prp_payment_amount}</span>
          </p>
          </tr><tr>
                    <p className="mb-2">
            {t('prp_payment_percentage')}: <span className="text-primary">{transaction.prp_payment_percentage}</span>
          </p>
          </tr><tr>
                    <p className="mb-2">
            {t('prp_description')}: <span className="text-primary">{transaction.prp_description}</span>
          </p>
          </tr><tr>
                    <p className="mb-2">
            {t('prp_status')}: <span className="text-primary">{transaction.prp_status}</span>
          </p>
          </tr>

          {transaction.is_deletable === 1 && (
            <p className="text-danger">data is deletable</p>
          )}
          
          {transaction.is_editable === 1 && (
            <p className="text-success">Editable</p>
          )}
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
ProjectPaymentModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  transaction: PropTypes.object,
};
export default ProjectPaymentModal;
