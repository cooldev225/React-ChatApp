import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const TeamWorkModal = ({ modal, toggle }) => {
  return (
    <>
      <Modal
        className='fade show add-popup video-popup'
        isOpen={modal}
        toggle={toggle}
        centered
        size="lg"
      >
        <ModalHeader toggle={toggle}>
          <iframe
            src="https://www.youtube.com//embed/7e90gBu4pas" allowFullScreen >
          </iframe>
        </ModalHeader>
      </Modal>
    </>
  );
};

export default TeamWorkModal;
