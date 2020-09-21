import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const SearchModal = props => {
  const [show, setShow] = useState(false);

  const handleCloseButton = () => {
    props.clearId();
    setShow(false);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        {props.species ? 'Edit Species' : 'Select the species'}
      </Button>

      <Modal
        show={show}
        onHide={handleCloseButton}
        scrollable
        centered
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Search for your plant species</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseButton}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Add Species
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SearchModal;
