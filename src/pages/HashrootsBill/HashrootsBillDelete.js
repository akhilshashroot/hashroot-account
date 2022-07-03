import React, { Component } from 'react';
import { Row, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import './style.scss'

class HashrootBillDelete extends React.Component {

    toggleModal = () => {
        this.props.closeDeleteModal()
    }

    deleteHashrootBill = () => {
        this.props.getHashrootBillDelete(this.props.data.bill_id)
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.hashrootbill && this.props.hashrootbill.hashrootpbillDelete ){
            if(prevProps.hashrootbill.hashrootpbillDelete !== this.props.hashrootbill.hashrootpbillDelete){
                // this.props.records.splice(this.props.index,1)
           
                this.props.getHashrootsBillList()
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