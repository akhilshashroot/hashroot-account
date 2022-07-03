import React, { Component } from 'react';
import { Row, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import './style.scss'

class HashrootBillDelete extends React.Component {

    toggleModal = () => {
        this.props.closeDeleteModal()
    }

    deleteHashrootBill = () => {
        console.log(this.props)
        this.props.getHashrootBillDelete(this.props.data.bill_id)
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.hashrootbill && this.props.hashrootbill.HashrootbillDelete ){
            if(prevProps.hashrootbill.HashrootbillDelete !== this.props.hashrootbill.HashrootbillDelete){
           
                this.props.getHashrootBillList()
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
                            <ModalHeader toggle={this.toggleModal} className="modal-colored-header bg-dark">HashrootBill Delete</ModalHeader>
                            <ModalBody>
                                <Row>
                                    <h4>Are you sure to delete this hashrootbill?</h4>
                                </Row>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="dark" onClick={this.toggleModal}>
                                    Cancel
                                </Button>{' '}
                                <Button color="danger" onClick={() => this.deleteHashrootBill()}>
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

export default HashrootBillDelete