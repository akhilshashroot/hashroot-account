import React, { Component } from 'react';
import { Row, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import './style.scss'

class HashrootInvoiceDelete extends React.Component {

    toggleModal = () => {
        this.props.closeDeleteModal()
    }

    deleteHashrootInvoice = () => {
        this.props.getHashrootInvoiceDelete(this.props.data.invoice_id)
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.hashrootinvoice && this.props.hashrootinvoice.hashrootinvoiceDelete ){
            if(prevProps.hashrootinvoice.hashrootinvoiceDelete !== this.props.hashrootinvoice.hashrootinvoiceDelete){
                this.props.records.splice(this.props.index,1)
           
                this.props.getHashrootInvoiceList()
                this.toggleModal()
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <Card className="dept-details-card">
                    <CardBody>
                        <Modal
                            isOpen={this.props.toggleDeleteModal}
                            toggle={this.toggleModal}
                            className="modal-dialog-top"
                            // size="lg"
                        >
                            <ModalHeader toggle={this.toggleModal} className="modal-colored-header bg-dark">HashrootInvoice Delete</ModalHeader>
                            <ModalBody>
                                <Row>
                                    <h4>Are you sure to delete this hashrootinvoice?</h4>
                                </Row>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="dark" onClick={this.toggleModal}>
                                    Cancel
                                </Button>{' '}
                                <Button color="danger" onClick={() => this.deleteHashrootInvoice()}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </Modal>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default HashrootInvoiceDelete