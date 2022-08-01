import React, { Component } from 'react';
import {
    Row,
    Col,
    Card,
    CardBody,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    FormGroup,
    Label,
    Input,
    CustomInput,
    UncontrolledTooltip,
} from 'reactstrap';
import './style.scss';
import { AvForm, AvField } from 'availity-reactstrap-validation';
// import DepImg from "../../assets/images/texa/add-hashrootinvoice.png"
import Select from 'react-select';
import DatePicker from 'react-datepicker';
// import LoaderWidget from '../../components/Loader';

const leads = [
    { value: '5fc78772db194609be7ca210', label: 'Magmina' },
    { value: '7fc78772db194609be7ca210', label: 'Peter' },
    { value: '6fc78772db194609be7ca210', label: 'Thomas' },
];
class HashrootInvoiceAddEdit extends React.Component {
    state = {
        isLoading: false,
        clientOrigin: false,
        state: false,
        invoiceNum: '',
        clientName: '',
        clientAddress: '',
        invoiceDate: '',
        dueDate: '',
        finalAmount: '',
        quantity: '',
        paidDate: '',
        paymentMethod: '',
        bankDetails: '',
        txnId: '',
        country: '',
        currency: '$',
        hsn: 1,
        invoiceStatus: 'Unpaid',
        // inputFields: [{ description: '', total: '' }],
        description: '',
        attachFile: '',

        //Indian
        keralite: '',
        IGST: '',
        withoutIGST: '',
        stateIndian: '',
        CGST: '',
        SGST: '',
        withoutCGST: '',
        updateAttachFile: '',
    };

    toggleModal = () => {
        this.props.closeAddEditModal();
    };

    componentDidMount = () => {
        
        
        this.setState({
            invoiceNum: this.props?.hashrootinvoice?.hashrootpinvoice?.invo_number_add,
        });
console.log(this.props.data);
        if (this.props.toggleAddEditModal) {
            if (this.props.data !== null) {
                this.paymentChange(
                    this.convertPayment(this.props?.payment?.data).filter(
                        (e) => e.label === this.props.data.payment_method
                    )[0]
                );
                this.countryChange(
                    this.convertCountry(this.props?.country?.data).filter((e) => e.label === this.props.data.country)[0]
                );
                if (this.props.data.origin == 'International') {
                    this.setState({ clientOrigin: false });
                } else {
                    this.setState({ clientOrigin: true });
                    if (this.props.data.state == 'Kerala') {
                        this.setState({ state: false });
                    } else {
                        this.setState({ state: true });
                    }
                }
                this.setState({
                    clientName: this.props.data.client_name,
                    clientAddress: this.props.data.address,
                    invoiceDate: this.props.data.invo_date,
                    dueDate: this.props.data.due_date,
                    inputFields: this.props.data.description,
                    finalAmount: this.props.data.amount,
                    // quantity: this.props.data.quantity,
                    paidDate: this.props.data.paid_date,
                    bankDetails: this.props.data.bank_details,
                    txnId: this.props.data.transaction_id,
                    stateIndian: this.props.data.state,
                    GSTIN: this.props.data.gstin,
                    invoiceStatus: this.props.data.paid_status,
                    // declaration: this.props.data?.declaration,
                    invoiceNum: this.props.data?.invo_number,
                    IGST: this.props.data?.IGST,
                    withoutIGST: this.props.data.amount,
                    CGST: this.props.data?.CGST,
                    SGST: this.props.data?.SGST,
                    withoutCGST: this.props.data.amount,
                    hsn:this.props.data?.hsn?.hsn_id,
                    description: this.props.data.description,
                    quantity: this.props.data.quantity,
                    updateAttachFile: this.props.data.inv_uploaded
                    // declaration: '',
                });
            }
        }
    };
    componentDidUpdate(prevProps, prevState) {
        if (this.props.hashrootinvoice && this.props.hashrootinvoice.hashrootinvoiceAdd) {
            if (prevProps.hashrootinvoice.hashrootinvoiceAdd !== this.props.hashrootinvoice.hashrootinvoiceAdd) {
                this.props.getHashrootInvoiceList();

                this.toggleModal();
            }
        }
        if (this.props.hashrootinvoice && this.props.hashrootinvoice.hashrootinvoiceUpdate) {
            if (prevProps.hashrootinvoice.hashrootinvoiceUpdate !== this.props.hashrootinvoice.hashrootinvoiceUpdate) {
                this.props.getHashrootInvoiceList();

                this.toggleModal();
            }
        }
    }

    convertPayment = (data) => {
        let paymentData = [];
        data &&
            data.forEach((value) => {
                paymentData.push({ label: value.payment_method, value: value.method_id });
            });
        return paymentData;
    };

    convertCountry = (data) => {
        let countryData = [];
        data &&
            data.forEach((value) => {
                countryData.push({ label: value.country_name, value: value.country_id });
            });
        return countryData;
    };

    convertHSN = (data) => {
        let HSNData = [];
        data &&
            data.forEach((value) => {
                HSNData.push({ label: value.hsn_name, value: value.hsn_id });
            });
        return HSNData;
    };

    // handleFormChange = (index, event) => {
    //     let data = [...this.state.inputFields];
    //     data[index][event.target.name] = event.target.value;
    //     this.setState({ inputFields: data });
    // };

    // addFields = () => {
    //     let newfield = { description: '', total: '' };
    //     this.setState({ inputFields: [...this.state.inputFields, newfield] });
    // };

    // removeFields = (index) => {
    //     let data = [...this.state.inputFields];
    //     data.splice(index, 1);
    //     this.setState({ inputFields: data });
    // };

    addHashrootInvoice() {
        if (
            this.state.invoiceNum !== null &&
            this.state.invoiceNum !== '' &&
            this.state.clientName !== null &&
            this.state.clientName !== '' &&
            this.state.clientAddress !== null &&
            this.state.clientAddress !== '' &&
            this.state.dueDate !== null &&
            this.state.dueDate !== '' &&
            this.state.finalAmount !== null &&
            this.state.finalAmount !== ''
        ) {
            const fd = new FormData();
            fd.append('table_name', 'hrt_invoice');
            fd.append('inv_no_hrt', this.state.invoiceNum);
            fd.append('client_name', this.state.clientName);
            fd.append('client_addr', this.state.clientAddress);
            fd.append('invo_date', this.state.invoiceDate);
            fd.append('due_date', this.state.dueDate);
            fd.append('description', this.state.description);
            fd.append('amount', this.state.finalAmount);
            fd.append('quantity', this.state.quantity);
            fd.append('paid_date', this.state.paidDate);
            fd.append('payment_method', this.state.paymentMethod.label);
            fd.append('hrco', this.state.clientOrigin ? 2 : 1);
            fd.append('hrt_country', this.state.country?.label);
            fd.append('hrt_currency', this.state.currency);
            fd.append('hrt_hsn', this.state.hsn);
            fd.append('paid_status', this.state.invoiceStatus);
            fd.append('select_state', this.state.state ? 2 : 1);
            fd.append('cgst', this.state.CGST);
             fd.append('sgst', this.state.SGST);
            fd.append('void_cgst', this.state.withoutCGST);
            fd.append('igst', this.state.IGST);
            fd.append('void_igst', this.state.withoutIGST);
            fd.append('state', this.state.stateIndian);
            fd.append('invoice_hrt', this.state.attachFile);
            /*let data = {
                table_name: 'hrt_invoice',
                inv_no_hrt: this.state.invoiceNum,
                client_name: this.state.clientName,
                client_addr: this.state.clientAddress,
                invo_date: this.state.invoiceDate,
                due_date: this.state.dueDate,
                description: this.state.description,
                amount: this.state.finalAmount,
                quantity: this.state.quantity,
                paid_date: this.state.paidDate,
                payment_method: this.state.paymentMethod.label,
                hrco: this.state.clientOrigin ? 2 : 1,
                hrt_country: this.state.country?.label,
                hrt_currency: this.state.currency,
                hrt_hsn: this.state.hsn,
                paid_status: this.state.invoiceStatus,
                select_state: this.state.state ? 2 : 1,
                cgst: this.state.CGST,
                sgst: this.state.SGST,
                void_c0gst: this.state.withoutCGST,
                igst: this.state.IGST,
                void_igst: this.state.withoutIGST,
                state: this.state.stateIndian,
                invoice_hrt: this.state.attachFile,
                // bank_details: this.state.bankDetails,

                // transaction_id: this.state.txnId,
                // gstin: '',
            };*/
            console.log(this.state.attachFile);
            this.props.getHashrootInvoiceAdd(fd);
        } else {
            this.props.emptyAllFields();
        }
    }

    updateHashrootInvoice = () => {
        if (
            this.state.clientName !== null &&
            this.state.clientName !== '' &&
            this.state.clientAddress !== null &&
            this.state.clientAddress !== '' &&
            this.state.invoiceNum !== null &&
            this.state.invoiceNum !== '' &&
            this.state.dueDate !== null &&
            this.state.dueDate !== '' &&
            this.state.finalAmount !== null &&
            this.state.finalAmount !== ''
        ) {
            let data = {
                table_name: 'hrt_invoice',
                invo_id: this.props.data.invoice_id,
                invo_date: this.state.invoiceDate,
                due_date: this.state.dueDate,
                paid_date: this.state.paidDate,
                client_name: this.state.clientName,
                client_addr: this.state.clientAddress,
                quantity: this.state.quantity,
                paid_status: this.state.invoiceStatus,
                payment_method: this.state.paymentMethod?.label,
                //bank_details: this.state.bankDetails,
                cgst: this.state.CGST,
                sgst: this.state.SGST,
                void_cgst: this.state.withoutCGST,
                igst: this.state.IGST,
                void_igst: this.state.withoutIGST,
                inv_no_hrt: this.state.invoiceNum,
                hrt_hsn: this.state.hsn,
                description: this.state.inputFields,
                hrt_country: this.state.country?.label,
                select_state: this.state.state ? 2 : 1,
                state: this.state.stateIndian,
                hrco: this.state.clientOrigin ? 2 : 1,
                amount: this.state.finalAmount,
                hrt_currency: this.state.currency,
                transaction_id: this.state.txnId,
                gstin: this.state.GSTIN,
                // declaration: this.state.declaration,
            };
            this.props.getHashrootInvoiceUpdate(data);
        } else {
            this.props.emptyAllFields();
        }
    };

    finalAmountChange = (value) => {
        this.setState({ finalAmount: value });

        if (this.state.clientOrigin && !this.state.state) {
            //keralite

            let amt = value;

            let cgst = (((amt / 118) * 18) / 2).toFixed(2);

            this.setState({ CGST: cgst, SGST: cgst });

            //final

            let sum = +cgst + +cgst; //For avoiding concatenation

            let amt_wtout = (amt - sum).toFixed(2);
            this.setState({ withoutCGST: amt_wtout });

            //			alert(sum);

            // $('#hrt_cgst_void').val(amt_wtout.toFixed(2));//Amount without CGST & SGST
        } else if (this.state.clientOrigin && this.state.state) {
            let amt = value;
            this.setState({ IGST: (amt - amt / 1.18).toFixed(2), withoutIGST: (amt / 1.18).toFixed(2) });
        }
    };
    paymentChange = (e) => {
        this.setState({
            paymentMethod: e,
        });
    };
    countryChange = (e) => {
        this.setState({
            country: e,
        });
    };

    clientOriginChange = (e) => {
        if (e === 'Indian') {
            this.setState({ clientOrigin: true });
            let amt = this.state.finalAmount;

            let cgst = (((amt / 118) * 18) / 2).toFixed(2);

            this.setState({ CGST: cgst, SGST: cgst });

            //final

            let sum = +cgst + +cgst; //For avoiding concatenation

            let amt_wtout = (amt - sum).toFixed(2);
            this.setState({ withoutCGST: amt_wtout });
            this.setState({ IGST: (amt - amt / 1.18).toFixed(2), withoutIGST: (amt / 1.18).toFixed(2) });
        } else {
            this.setState({ clientOrigin: false });
        }
    };

    stateChange = (e) => {
        if (e === 'Keralite') {
            this.setState({ state: false });
        } else {
            this.setState({ state: true });
        }
        let amt = this.state.finalAmount;

        let cgst = (((amt / 118) * 18) / 2).toFixed(2);

        this.setState({ CGST: cgst, SGST: cgst });

        //final

        let sum = +cgst + +cgst; //For avoiding concatenation

        let amt_wtout = (amt - sum).toFixed(2);
        this.setState({ withoutCGST: amt_wtout });
        this.setState({ IGST: (amt - amt / 1.18).toFixed(2), withoutIGST: (amt / 1.18).toFixed(2) });
    };

    /*changeHandler = (event) => {
        this.setState({ attachFile: event.target.files[0] });
    };*/
    onFileChange = (event) => {
        // Update the state
        this.setState({ attachFile: event.target.files[0] });
    };

    downloadBill = () => {
        window.open(this.state.updateAttachFile, '_blank');
    };

    render() {
        const { invoiceNum, clientOrigin } = this.state;
        const { data } = this.props;
        console.log(this.state.paidDate)
        return (
            <React.Fragment>
                <Card className="dept-details-card">
                    <CardBody>
                        <Modal
                            isOpen={this.props.toggleAddEditModal}
                            toggle={this.toggleModal}
                            className="modal-dialog-centered"
                            size="xl">
                            <ModalHeader toggle={this.toggleModal} className="modal-colored-header bg-dark">
                                {data !== null ? 'Edit HashrootInvoice' : 'Add New HashrootInvoice'}
                            </ModalHeader>
                            <ModalBody>
                                {/* {this.props.employee && this.props.employee.employeelistloading && this.props.hashrootinvoice && this.props.hashrootinvoice.listloading && <LoaderWidget />} */}
                                <AvForm>
                                    <Row>
                                        <Col md={6}>
                                            <AvField
                                                name="dept-name"
                                                label="Invoice Number"
                                                type="number"
                                                value={invoiceNum || ''}
                                                onChange={(e) => {
                                                    this.setState({ invoiceNum: e.target.value });
                                                }}
                                                placeholder="Enter Invoice Number"
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <AvField
                                                name="dept-name"
                                                label="Client Name"
                                                type="text"
                                                placeholder="Enter Client Name"
                                                value={this.state.clientName}
                                                onChange={(e) => {
                                                    this.setState({ clientName: e.target.value });
                                                }}
                                            />
                                        </Col>
                                        <Col md={12}>
                                            <FormGroup>
                                                <Label for="exampleText">Client Address</Label>
                                                <Input
                                                    type="textarea"
                                                    name="text"
                                                    id="exampleText"
                                                    rows="3"
                                                    value={this.state.clientAddress}
                                                    onChange={(e) => {
                                                        this.setState({ clientAddress: e.target.value });
                                                    }}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                {/* <Label for="exampleDate">Invoice Date</Label>
                                                <Input
                                                    type="date"
                                                    name="date"
                                                    id="exampleDate"
                                                    placeholder="Invoice Date"
                                                    value={this.state.invoiceDate}
                                                    onChange={(e) => {
                                                        this.setState({ invoiceDate: e.target.value });
                                                    }}
                                                /> */}
                                                <div className="d-flex justify-content-around align-items-baseline">
                                                    <Label for="exampleDate">Invoice Date</Label>
                                                    <DatePicker
                                                        className="form-control"
                                                        type="date"
                                                        name="date"
                                                        id="exampleDate"
                                                        placeholder="Invoice Date"
                                                        value={this.state.invoiceDate}
                                                        onChange={(e) => {
                                                            this.setState({
                                                                invoiceDate: e.toLocaleDateString('en-US'),
                                                            });
                                                        }}
                                                    />
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <div className="d-flex justify-content-around align-items-baseline">
                                                    <Label for="exampleDate">Due Date</Label>
                                                    {/* <Input
                                                    type="date"
                                                    name="date"
                                                    id="exampleDate"
                                                    placeholder="Due Date"
                                                    value={this.state.dueDate}
                                                    onChange={(e) => {
                                                        this.setState({ dueDate: e.target.value });
                                                    }}
                                                /> */}
                                                    <DatePicker
                                                        className="form-control"
                                                        type="date"
                                                        name="date"
                                                        id="exampleDate"
                                                        placeholder="Due Date"
                                                        value={this.state.dueDate}
                                                        onChange={(e) => {
                                                            this.setState({ dueDate: e.toLocaleDateString('en-US') });
                                                        }}
                                                    />
                                                </div>
                                            </FormGroup>
                                        </Col>

                                        <Col md={12}>
                                            <FormGroup>
                                                <Label for="exampleText">Description</Label>
                                                <Input
                                                    type="textarea"
                                                    name="description"
                                                    id="exampleText"
                                                    rows="3"
                                                    value={this.state.description}
                                                    onChange={(e) => this.setState({ description: e.target.value })}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col md={6}>
                                            <AvField
                                                name="dept-name"
                                                label="Final Amount"
                                                type="text"
                                                placeholder="Enter Final Amount"
                                                value={this.state.finalAmount}
                                                onChange={(e) => {
                                                    this.finalAmountChange(e.target.value);
                                                }}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <AvField
                                                name="dept-name"
                                                label="Quantity"
                                                type="text"
                                                placeholder="Enter Quantity"
                                                value={this.state.quantity}
                                                onChange={(e) => {
                                                    this.setState({ quantity: e.target.value });
                                                }}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                            <div className="d-flex justify-content-around align-items-baseline">
                                                <Label for="exampleDate">Paid Date</Label>
                                               {/*<Input
                                                    type="date"
                                                    name="date"
                                                    id="exampleDate"
                                                    placeholder="Select Date"
                                                    value={this.state.paidDate}
                                                    onChange={(e) => {
                                                        this.setState({ paidDate: e.toLocaleDateString('en-US') });
                                                    }}
                                                />*/}
                                                <DatePicker
                                                        className="form-control"
                                                        type="date"
                                                        name="date"
                                                        id="exampleDate"
                                                        placeholder="Paid Date"
                                                        value={this.state.paidDate}
                                                        onChange={(e) => {
                                                            this.setState({ paidDate: e.toLocaleDateString('en-US') });
                                                        }}
                                                    />
                                                </div>
                                            </FormGroup>
                                        </Col>

                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="team">Payment Method</Label>
                                                <Select
                                                    label="team"
                                                    className="react-select mb-3"
                                                    classNamePrefix="react-select"
                                                    defaultValue={this.state.paymentMethod || ''}
                                                    onChange={(e) => this.paymentChange(e)}
                                                    options={this.convertPayment(this.props?.payment?.data)}></Select>
                                                
                                            </FormGroup>
                                        </Col>
                                        {/* <Col md={6}>
                                            <FormGroup>
                                                <Label for="exampleText">Bank details</Label>
                                                <Input
                                                    type="textarea"
                                                    name="text"
                                                    id="exampleText"
                                                    rows="3"
                                                    value={this.state.bankDetails}
                                                    onChange={(e) => {
                                                        this.setState({ bankDetails: e.target.value });
                                                    }}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <AvField
                                                name="dept-name"
                                                label="Transaction Id"
                                                type="text"
                                                placeholder="Enter Transaction Id"
                                                value={this.state.txnId}
                                                onChange={(e) => {
                                                    this.setState({ txnId: e.target.value });
                                                }}
                                            />
                                        </Col> */}
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="exampleCheckbox">Client Origin :</Label>
                                                <CustomInput
                                                    type="radio"
                                                    id="exampleCustomCheckbox"
                                                    label="Indian"
                                                    name="Indian"
                                                    checked={this.state.clientOrigin == true}
                                                    onChange={(e) => this.clientOriginChange(e.target.name)}
                                                />
                                                <CustomInput
                                                    type="radio"
                                                    id="exampleCustomCheckbox1"
                                                    label="International"
                                                    name="International"
                                                    checked={this.state.clientOrigin == false}
                                                    onChange={(e) => this.clientOriginChange(e.target.name)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        {clientOrigin ? (
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="exampleCheckbox">State</Label>
                                                    <CustomInput
                                                        type="radio"
                                                        id="state1"
                                                        label="Keralite"
                                                        checked={this.state.state == false}
                                                        name="Keralite"
                                                        onChange={(e) => this.stateChange(e.target.name)}
                                                    />
                                                    <CustomInput
                                                        type="radio"
                                                        id="state2"
                                                        label="Non-Keralite"
                                                        name="Non-Keralite"
                                                        checked={this.state.state == true}
                                                        onChange={(e) => this.stateChange(e.target.name)}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        ) : (
                                            <Col md={6}></Col>
                                        )}
                                        {!clientOrigin && (
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="team">Select Country</Label>
                                                    <Select
                                                        label="team"
                                                        className="react-select mb-3"
                                                        classNamePrefix="react-select"
                                                        defaultValue={this.state.country}
                                                        options={this.convertCountry(this.props?.country?.data)}
                                                        onChange={(e) => {
                                                            this.countryChange(e);
                                                        }}></Select>
                                                </FormGroup>
                                            </Col>
                                        )}
                                        {!clientOrigin && (
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="exampleSelect">Select Currency</Label>
                                                    <Input
                                                        type="select"
                                                        name="select"
                                                        id="exampleSelect"
                                                        value={this.state.currency}
                                                        onChange={(e) => {
                                                            this.setState({ currency: e.target.value });
                                                        }}>
                                                        <option value="$">Dollar</option>
                                                        <option value="€">Euro</option>
                                                        <option value="£">Pound</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        )}

                                        {clientOrigin && this.state.state && (
                                            <Col md={4}>
                                                <AvField
                                                    name="dept-name"
                                                    label="IGST"
                                                    type="text"
                                                    placeholder="0.0"
                                                    value={this.state.IGST}
                                                    onChange={(e) => {
                                                        this.setState({ IGST: e.target.value });
                                                    }}
                                                />
                                            </Col>
                                        )}
                                        {clientOrigin && this.state.state && (
                                            <Col md={4}>
                                                <AvField
                                                    name="dept-name"
                                                    label="Amount without IGST"
                                                    type="text"
                                                    placeholder="Enter Quantity"
                                                    value={this.state.withoutIGST}
                                                    onChange={(e) => {
                                                        this.setState({ withoutIGST: e.target.value });
                                                    }}
                                                />
                                            </Col>
                                        )}
                                        {clientOrigin && this.state.state && (
                                            <Col md={4}>
                                                <AvField
                                                    name="dept-name"
                                                    label="STATE:"
                                                    type="text"
                                                    placeholder="Enter Your State"
                                                    value={this.state.stateIndian}
                                                    onChange={(e) => {
                                                        this.setState({ stateIndian: e.target.value });
                                                    }}
                                                />
                                            </Col>
                                        )}
                                        {clientOrigin && !this.state.state && (
                                            <Col md={4}>
                                                <AvField
                                                    name="dept-name"
                                                    label="CGST"
                                                    type="text"
                                                    placeholder="0.0"
                                                    value={this.state.CGST}
                                                    onChange={(e) => {
                                                        this.setState({ CGST: e.target.value });
                                                    }}
                                                />
                                            </Col>
                                        )}
                                        {clientOrigin && !this.state.state && (
                                            <Col md={4}>
                                                <AvField
                                                    name="dept-name"
                                                    label="SGST"
                                                    type="text"
                                                    placeholder="0.0"
                                                    value={this.state.SGST}
                                                    onChange={(e) => {
                                                        this.setState({ SGST: e.target.value });
                                                    }}
                                                />
                                            </Col>
                                        )}
                                        {clientOrigin && !this.state.state && (
                                            <Col md={4}>
                                                <AvField
                                                    name="dept-name"
                                                    label="Amount without CGST & SGST"
                                                    type="text"
                                                    placeholder="0.0"
                                                    value={this.state.withoutCGST}
                                                    onChange={(e) => {
                                                        this.setState({ withoutCGST: e.target.value });
                                                    }}
                                                />
                                            </Col>
                                        )}
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="team">Select HSN</Label>
                                                <Input
                                                    type="select"
                                                    name="select"
                                                    id="exampleSelect"
                                                    value={this.state.hsn}
                                                    onChange={(e) => {
                                                        this.setState({ hsn: e.target.value });
                                                    }}>
                                                    <option value="1">
                                                        998313 : IT Consulting &amp; Support Services
                                                    </option>
                                                    <option value="2">998314 : IT Design and Development</option>
                                                    <option value="3">
                                                        998315 : Hosting and Infrastructure Provisioning Service
                                                    </option>
                                                    <option value="4">
                                                        998316 : IT Infrastructure &amp; Network Management
                                                    </option>
                                                    <option value="5">998319 : Other IT services</option>
                                                    <option value="6">
                                                        9992 : Other education &amp; training services
                                                    </option>
                                                </Input>
                                                {/*<Select
                                                    label="team"
                                                    className="react-select mb-3"
                                                    classNamePrefix="react-select"
                                                    options={this.convertHSN(this.props?.hsn?.data)}
                                                onChange={(e) => this.setState({ hsn: e.value })}></Select>*/}
                                            </FormGroup>
                                        </Col>
                                        {/*<Col md={6} className="pt-2">
                                            <label htmlFor="attach">Attach Files</label> <br />
                                            <input type="file" id="attach" onChange={(e) => this.changeHandler(e)} />
                                            </Col>*/}
                                            {data !== null ? (
                                            <Col md={12}>
                                                <Label for="myfile">Update Files</Label>
                                                <Input
                                                    type="file"
                                                    id="myfile"
                                                    name="myfile"
                                                    onChange={(e) => this.onFileChange(e)}
                                                />
                                            </Col>
                                        ) : (
                                            <Col md={12}>
                                                <Label for="myfile">Attach Files</Label>
                                                <Input
                                                    type="file"
                                                    id="myfile"
                                                    name="myfile"
                                                    onChange={(e) => this.onFileChange(e)}
                                                />
                                            </Col>
                                        )}
                                        {data !== null && (
                                            <div>
                                                <i
                                                    className="uil  uil-file-download widget-icon ml-2 bg-success-lighten text-success"
                                                    title="Download"
                                                    onClick={() => this.downloadBill()}
                                                    id="download"></i>
                                                <UncontrolledTooltip placement="top" target="download">
                                                    Download
                                                </UncontrolledTooltip>
                                            </div>
                                        )}
                                        <Col md={12}>
                                            <FormGroup>
                                                <Label for="exampleCheckbox" className="text-center">
                                                    Invoice Status
                                                </Label>
                                                <div className="d-flex justify-content-around">
                                                <CustomInput
                                                        type="radio"
                                                        id="Paid"
                                                        label="Paid"
                                                        checked={this.state.invoiceStatus == 'Paid'}
                                                        name="invoice"
                                                        onChange={(e) => this.setState({ invoiceStatus: e.target.id })}
                                                    />
                                                    <CustomInput
                                                        type="radio"
                                                        id="Unpaid"
                                                        label="Unpaid"
                                                        name="invoice"
                                                        checked={this.state.invoiceStatus == 'Unpaid'}
                                                        onChange={(e) => this.setState({ invoiceStatus: e.target.id })}
                                                    />
                                                    <CustomInput
                                                        type="radio"
                                                        id="Cancelled"
                                                        label="Cancelled"
                                                        name="invoice"
                                                        checked={this.state.invoiceStatus == 'Cancelled'}
                                                        onChange={(e) => this.setState({ invoiceStatus: e.target.id })}
                                                    />
                                                    <CustomInput
                                                        type="radio"
                                                        id="Refunded"
                                                        label="Refunded"
                                                        name="invoice"
                                                        checked={this.state.invoiceStatus == 'Refunded'}
                                                        onChange={(e) => this.setState({ invoiceStatus: e.target.id })}
                                                    />
                                                </div>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </AvForm>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onClick={this.toggleModal}>
                                    Cancel
                                </Button>{' '}
                                {data !== null ? (
                                    <Button color="success" onClick={() => this.updateHashrootInvoice()}>
                                        Update HashrootInvoice
                                    </Button>
                                ) : (
                                    <Button color="success" onClick={() => this.addHashrootInvoice()}>
                                        Add HashrootInvoice
                                    </Button>
                                )}
                            </ModalFooter>
                        </Modal>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default HashrootInvoiceAddEdit;
