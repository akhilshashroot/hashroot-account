import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Modal, ModalHeader, ModalBody } from 'reactstrap';
// import DepImg from "../../assets/images/texa/hashrootbill.jpg"
import './style.scss'


class DetailsModal extends React.Component {



    toggleModal = () => {
        this.props.closeDetailsModal()
    }

    render() {
        return (
            <React.Fragment>
                <Card className="dept-details-card">
                    <CardBody>
                        <Modal
                            isOpen={this.props.toggleDetailsModal}
                            toggle={this.toggleModal}
                            className="modal-dialog-centered"
                            size="lg"
                        >
                            <ModalHeader toggle={this.toggleModal} className="modal-colored-header bg-primary">HashrootBill Details</ModalHeader>
                            <ModalBody>
                                <Row>
                                    <Col md={6}>
                                        {/* <img src={DepImg} className="dept-img"></img> */}
                                    </Col>
                                    {this.props.data &&
                                        <Col md={6} className="dept-details-col">
                                            <h3>{this.props.data.name && this.props.data.name}</h3>
                                            <p className="dept-details-des">{this.props.data.description && this.props.data.description}</p>
                                            {/* <h5>Head/Lead: {this.props.data.head && this.props.data.head}</h5> */}
                                        </Col>
                                    }
                                </Row>
                            </ModalBody>
                        </Modal>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default DetailsModal