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

const ContractTerminationReasonModal = (props) => {
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
            {t('ctr_reason_name_or')}: <span className="text-primary">{transaction.ctr_reason_name_or}</span>
          </p>
          </tr><tr>
                    <p className="mb-2">
            {t('ctr_reason_name_am')}: <span className="text-primary">{transaction.ctr_reason_name_am}</span>
          </p>
          </tr><tr>
                    <p className="mb-2">
            {t('ctr_reason_name_en')}: <span className="text-primary">{transaction.ctr_reason_name_en}</span>
          </p>
          </tr><tr>
                    <p className="mb-2">
            {t('ctr_description')}: <span className="text-primary">{transaction.ctr_description}</span>
          </p>
          </tr><tr>
                    <p className="mb-2">
            {t('ctr_status')}: <span className="text-primary">{transaction.ctr_status}</span>
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
ContractTerminationReasonModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  transaction: PropTypes.object,
};
export default ContractTerminationReasonModal;
