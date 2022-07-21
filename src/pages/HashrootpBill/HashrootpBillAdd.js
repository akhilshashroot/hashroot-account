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
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

// import LoaderWidget from '../../components/Loader';

const leads = [
    { value: '5fc78772db194609be7ca210', label: 'Magmina' },
    { value: '7fc78772db194609be7ca210', label: 'Peter' },
    { value: '6fc78772db194609be7ca210', label: 'Thomas' },
];
class HashrootBillAddEdit extends React.Component {
    state = {
        isLoading: false,
        clientOrigin: false,
        state: false,
        invoiceNum: '',
        sellerName: '',
        sellerAddress: '',
        invoiceDate: '',
        dueDate: '',
        finalAmount: '',
        attachFiles: '',
        updateAttachFile: '',
        editId: '',

        paidDate: '',
        paymentMethod: '',
        bankDetails: '',
        txnId: '',
        country: '',
        currency: '$',
        hsn: '',
        invoiceStatus: 'Unpaid',
        inputFields: '',
        GST: 18,

        //Indian
        keralite: '',
        IGST: '',
        withoutIGST: '',
        stateIndian: '',
        CGST: '',
        SGST: '',
        withoutCGST: '',
        // declaration: '',
        GSTIN: '',
    };

    toggleModal = () => {
        this.props.closeAddEditModal();
    };

    componentDidMount = () => {
        this.setState({
            invoiceNum: this.props?.hashrootinvoice?.hashrootpinvoice?.invo_number_add,
        });

        if (this.props.toggleAddEditModal) {
            if (this.props.data !== null) {
                console.log(this.props.data);
                // this.paymentChange(
                //     this.convertPayment(this.props?.payment?.data).filter(
                //         (e) => e.label === this.props.data.payment_method
                //     )[0]
                // );

                this.countryChange(
                    this.convertCountry(this.props?.country?.data).filter((e) => e.label === this.props.data.country)[0]
                );
                if (this.props.data?.origin == 'International') {
                    this.setState({ clientOrigin: false });
                } else {
                    this.setState({ clientOrigin: true });
                    if (this.props.data?.state == 'Kerala') {
                        this.setState({ state: false });
                    } else {
                        this.setState({ state: true });
                        this.setState({ stateIndian: this.props.data?.state });
                    }
                }

                this.setState({
                    invoiceNum: this.props.data.bill_number,
                    invoiceDate: this.props.data.bill_date,
                    description: this.props.data.bill_desc,
                    sellerName: this.props.data.seller_name,
                    sellerAddress: this.props.data.address,
                    finalAmount: this.props.data.bill_amt,
                    CGST: this.props.data.bill_cgst,
                    SGST: this.props.data.bill_sgst,
                    IGST: this.props.data.bill_igst,
                    GSTIN: this.props.data.gstin,
                    GST: this.props.data.gst_percent,
                    withoutCGST: this.props.data.gst_void,
                    withoutIGST: this.props.data.bill_gst_void,
                    updateAttachFile: this.props.data.bill_file,
                    editId: this.props.data.bill_id,
                    withoutIGST : this.props.data.igst_void,
                });

                // fd.append('bill_file_name',this.state.attachFiles)

                // this.setState({
                //     sellerName: this.props.data.client_name,
                //     sellerAddress: this.props.data.address,
                //     invoiceDate: this.props.data.invo_date,
                //     dueDate: this.props.data.due_date,
                //     inputFields: this.props.data.description,
                //     finalAmount: this.props.data.amount,
                //     quantity: this.props.data.quantity,
                //     paidDate: this.props.data.paid_date,
                //     bankDetails: this.props.data.bank_details,
                //     txnId: this.props.data.transaction_id,
                //     stateIndian: this.props.data.state,
                //     GSTIN: this.props.data.gstin,
                //     invoiceStatus: this.props.data.paid_status,
                //     declaration: this.props.data?.declaration,
                //     invoiceNum: this.props.data?.invo_number,
                //     IGST: this.props.data?.IGST,
                //     withoutIGST: this.props.data.amount,
                //     CGST: this.props.data?.CGST,
                //     SGST: this.props.data?.SGST,
                //     withoutCGST: this.props.data.amount,
                //     hsn: this.props.data?.hsn?.hsn_id,
                //     declaration: '',
                // });
            }
        }
    };
    componentDidUpdate(prevProps, prevState) {
        if (this.props.hashrootbill && this.props.hashrootbill.hashrootpbillAdd) {
            if (prevProps.hashrootbill.hashrootpbillAdd !== this.props.hashrootbill.hashrootpbillAdd) {
                this.props.getHashrootpBillList();

                this.toggleModal();
            }
        }
        if (this.props.hashrootbill && this.props.hashrootbill.hashrootpbillUpdate) {
            if (prevProps.hashrootbill.hashrootpbillUpdate !== this.props.hashrootbill.hashrootpbillUpdate) {
                this.props.getHashrootpBillList();

                this.toggleModal();
            }
        }
    }

    addHashrootBill() {
        if (
            (this.state.sellerName !== null &&
                this.state.sellerName !== '' &&
                this.state.sellerAddress !== null &&
                this.state.sellerAddress !== '' &&
                this.state.invoiceDate !== null &&
                this.state.invoiceDate !== '' &&
                this.state.finalAmount !== null &&
                this.state.finalAmount !== '',
            this.state.attachFiles !== null && this.state.attachFiles !== '')
        ) {
            const fd = new FormData();
            fd.append('bill_table_name', 'hashrootp_bills');
            fd.append('bill_no', this.state.invoiceNum);
            fd.append('bill_date', this.state.invoiceDate);
            fd.append('bill_desc', this.state.description);
            fd.append('bill_client_name', this.state.sellerName);
            fd.append('bill_client_addr', this.state.sellerAddress);
            fd.append('bill_amount', this.state.finalAmount);
            fd.append('bill_cgst', this.state.CGST);
            fd.append('bill_sgst', this.state.SGST);
            fd.append('bill_igst', this.state.IGST);
            fd.append('gstin', this.state.GSTIN);
            fd.append('bill_state', this.state.stateIndian);
            fd.append('bill_select_state', this.state.state ? 2 : 1);
            fd.append('bill_country', this.state.country?.label);
            fd.append('bill_file_name', this.state.attachFiles);
            fd.append('bill_hrco', this.state.clientOrigin ? 2 : 1);
            fd.append('gst_percentage', this.state.GST);
            fd.append('bill_void_cgst', this.state.withoutCGST);
            // fd.append('bill_gst_void', this.state.withoutIGST);
            fd.append('bill_void_igst', this.state.withoutIGST);
            console.log(this.state.attachFiles);
            this.props.getHashrootBillAdd(fd);
            

            // let data = {
            //     bill_table_name: 'hashrootp_bills',
            //     bill_no: this.state.invoiceNum,
            //     client_name: this.state.sellerName,
            //     client_addr: this.state.sellerAddress,
            //     description: this.state.description,
            //     select_state: this.state.state ? 2 : 1,
            //     hrco: this.state.clientOrigin ? 2 : 1,
            //     amount: this.state.finalAmount,
            //     Bill date
            //     invo_date: this.state.invoiceDate,
            //     hrt_country: this.state.country?.label,

            //     Indian
            //     gst: this.state.GST,
            //     cgst: this.state.CGST,
            //     sgst: this.state.SGST,
            //     void_cgst: this.state.withoutCGST,
            //     igst: this.state.IGST,
            //     void_igst: this.state.withoutIGST,
            //     gstin: this.state.GSTIN,

            //     quantity: this.state.quantity,
            //     due_date: this.state.dueDate,
            //     paid_date: this.state.paidDate,
            //     paid_status: this.state.invoiceStatus,
            //     payment_method: this.state.paymentMethod.label,
            //     bank_details: this.state.bankDetails,

            //     inv_no_hrt: this.state.invoiceNum,
            //     hrt_hsn: this.state.hsn,
            //     description: this.state.inputFields,

            //     state: this.state.stateIndian,
            //     hrt_currency: this.state.currency,
            //     transaction_id: this.state.txnId,
            //     declaration: this.state.declaration,

            //     if(this.state.clientOrigin && !this.state.state){
            //         console.log("keralite")
            //     }else{
            //         console.log("non-keralite")
            //     }
            // };
        } else {
            this.props.emptyAllFields();
        }
    }

    updateHashrootBill = () => {
        if (
            this.state.sellerName !== null &&
            this.state.sellerName !== '' &&
            this.state.sellerAddress !== null &&
            this.state.sellerAddress !== '' &&
            this.state.invoiceDate !== null &&
            this.state.invoiceDate !== '' &&
            this.state.finalAmount !== null &&
            this.state.finalAmount !== ''
        ) {
            const fd = new FormData();
            fd.append('bill_table_name', 'hashrootp_bills');
            fd.append('bill_no', this.state.invoiceNum);
            fd.append('bill_date', this.state.invoiceDate);
            fd.append('bill_desc', this.state.description);
            fd.append('bill_client_name', this.state.sellerName);
            fd.append('bill_client_addr', this.state.sellerAddress);
            fd.append('bill_amount', this.state.finalAmount);
            fd.append('bill_cgst', this.state.CGST);
            fd.append('bill_sgst', this.state.SGST);
            fd.append('bill_igst', this.state.IGST);
            fd.append('gstin', this.state.GSTIN);
            fd.append('bill_state', this.state.stateIndian);
            fd.append('bill_select_state', this.state.state ? 2 : 1);
            fd.append('bill_country', this.state.country?.label);
            fd.append('bill_file_name', this.state.attachFiles);
            fd.append('bill_hrco', this.state.clientOrigin ? 2 : 1);
            fd.append('gst_percentage', this.state.GST);
            fd.append('bill_void_cgst', this.state.withoutCGST);
            fd.append('bill_id', this.state.editId);
            fd.append('bill_void_igst', this.state.withoutIGST);

            this.props.getHashrootBillUpdate(fd);

            // let data = {
            //     bill_table_name: 'hashrootp_bills',
            //     bill_no: this.state.invoiceNum,
            //     client_name: this.state.sellerName,
            //     client_addr: this.state.sellerAddress,
            //     description: this.state.description,
            //     select_state: this.state.state ? 2 : 1,
            //     hrco: this.state.clientOrigin ? 2 : 1,
            //     amount: this.state.finalAmount,
            //     Bill date
            //     invo_date: this.state.invoiceDate,
            //     hrt_country: this.state.country?.label,

            //     Indian
            //     gst: this.state.GST,
            //     cgst: this.state.CGST,
            //     sgst: this.state.SGST,
            //     void_cgst: this.state.withoutCGST,
            //     igst: this.state.IGST,
            //     void_igst: this.state.withoutIGST,
            //     gstin: this.state.GSTIN,

            //     quantity: this.state.quantity,
            //     due_date: this.state.dueDate,
            //     paid_date: this.state.paidDate,
            //     paid_status: this.state.invoiceStatus,
            //     payment_method: this.state.paymentMethod.label,
            //     bank_details: this.state.bankDetails,

            //     inv_no_hrt: this.state.invoiceNum,
            //     hrt_hsn: this.state.hsn,
            //     description: this.state.inputFields,

            //     state: this.state.stateIndian,
            //     hrt_currency: this.state.currency,
            //     transaction_id: this.state.txnId,
            //     declaration: this.state.declaration,

            //     if(this.state.clientOrigin && !this.state.state){
            //         console.log("keralite")
            //     }else{
            //         console.log("non-keralite")
            //     }
            // };
        } else {
            this.props.emptyAllFields();
        }
        // if (
        //     this.state.sellerName !== null &&
        //     this.state.sellerName !== '' &&
        //     this.state.sellerAddress !== null &&
        //     this.state.sellerAddress !== '' &&
        //     this.state.invoiceNum !== null &&
        //     this.state.invoiceNum !== '' &&
        //     this.state.dueDate !== null &&
        //     this.state.dueDate !== '' &&
        //     this.state.finalAmount !== null &&
        //     this.state.finalAmount !== ''
        // ) {
        //     console.log(this.state.hsn);
        //     let data = {
        //         table_name: 'hashrootp_invoice',
        //         invo_id: this.props.data.invoice_id,
        //         invo_date: this.state.invoiceDate,
        //         due_date: this.state.dueDate,
        //         paid_date: this.state.paidDate,
        //         client_name: this.state.sellerName,
        //         client_addr: this.state.sellerAddress,
        //         quantity: this.state.quantity,
        //         paid_status: this.state.invoiceStatus,
        //         payment_method: this.state.paymentMethod?.label,
        //         bank_details: this.state.bankDetails,
        //         cgst: this.state.CGST,
        //         sgst: this.state.SGST,
        //         void_cgst: this.state.withoutCGST,
        //         igst: this.state.IGST,
        //         void_igst: this.state.withoutIGST,
        //         inv_no_hrt: this.state.invoiceNum,
        //         hrt_hsn: this.state.hsn,
        //         description: this.state.inputFields,
        //         hrt_country: this.state.country?.label,
        //         select_state: this.state.state ? 2 : 1,
        //         state: this.state.stateIndian,
        //         hrco: this.state.clientOrigin ? 2 : 1,
        //         amount: this.state.finalAmount,
        //         hrt_currency: this.state.currency,
        //         transaction_id: this.state.txnId,
        //         gstin: this.state.GSTIN,
        //         declaration: this.state.declaration,
        //     };
        //     this.props.getHashrootBillUpdate(data);
        // } else {
        //     this.props.emptyAllFields();
        // }
    };

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

    handleFormChange = (index, event) => {
        let data = [...this.state.inputFields];
        data[index][event.target.name] = event.target.value;
        this.setState({ inputFields: data });
        let total = this.state.inputFields.reduce((acc, init) => {
            return acc + Number(init.total);
        }, 0);
        if (this.state.clientOrigin == false) {
            this.setState({ finalAmount: total.toFixed(2) });
        } else {
            let final = (total * 18) / 100 + total;
            this.setState({ finalAmount: final.toFixed(2) });
            if (this.state.state == false) {
                let CGST = ((total * 9) / 100).toFixed(2);
                this.setState({ CGST: CGST, SGST: CGST, withoutCGST: total });
                // console.log('kerlaite');
            } else {
                let IGST = ((total * 18) / 100).toFixed(2);
                this.setState({ IGST: IGST, withoutIGST: total });
                // console.log('nonkerlaite');
            }
        }
    };

    addFields = () => {
        let newfield = { description: '', total: '' };
        this.setState({ inputFields: [...this.state.inputFields, newfield] });
    };

    removeFields = (index) => {
        let data = [...this.state.inputFields];
        data.splice(index, 1);
        this.setState({ inputFields: data });
        let total = data.reduce((acc, init) => {
            return acc + Number(init.total);
        }, 0);
        if (this.state.clientOrigin == false) {
            this.setState({ finalAmount: total.toFixed(2) });
        } else {
            let final = (total * 18) / 100 + total;
            this.setState({ finalAmount: final.toFixed(2) });
            if (this.state.state == false) {
                let CGST = ((total * 9) / 100).toFixed(2);
                this.setState({ CGST: CGST, SGST: CGST, withoutCGST: total });
                // console.log('kerlaite');
            } else {
                let IGST = ((total * 18) / 100).toFixed(2);
                this.setState({ IGST: IGST, withoutIGST: total });
                // console.log('nonkerlaite');
            }
        }
    };

    finalAmountChange = (finalAmount) => {
        this.setState({ finalAmount: finalAmount });
        let amt = finalAmount; //final amount eg:500
        let gst_percent = this.state.GST;
        //percentage value eg:18
        let percent_plus_hundred = 100 + parseFloat(gst_percent);
        /// eg:100+18

        if (this.state.clientOrigin == false) {
            this.setState({ finalAmount: finalAmount });
        } else {
            if (this.state.state == false) {
                let cgst = ((gst_percent / percent_plus_hundred) * amt) / 2;
                let sgst = ((gst_percent / percent_plus_hundred) * amt) / 2;
                this.setState({ CGST: cgst.toFixed(2), SGST: cgst.toFixed(2) });

                let sum = +cgst + +sgst; //For avoiding concatenation

                let amt_wtout = amt - sum;
                this.setState({ withoutCGST: amt_wtout.toFixed(2) });
                // console.log('kerlaite');
            } else {
                let igst = (gst_percent / percent_plus_hundred) * amt; // bill_iigst eg:(18/118)/500
                let amt_wtout = amt - igst;
                this.setState({ IGST: igst.toFixed(2), withoutIGST: amt_wtout.toFixed(2) });

                // console.log('nonkerlaite');
            }
        }
    };

    paymentChange = (e) => {
        this.setState({
            paymentMethod: e,
        });
    };

    hsnChange = (e) => {
        this.setState({
            hsn: e.hsn_id,
        });
    };

    countryChange = (e) => {
        this.setState({
            country: e,
        });
    };

    convertClientOrigin(e) {
        if (e == 'Indian') {
            // let total = this.state.inputFields.reduce((acc, init) => {
            //     return acc + Number(init.total);
            // }, 0);

            // let final = (total * 18) / 100 + total;
            // this.setState({ finalAmount: final.toFixed(2) });
            // if (this.state.state == false) {
            //     let CGST = ((total * 9) / 100).toFixed(2);
            //     this.setState({ CGST: CGST, SGST: CGST, withoutCGST: total });
            //     // console.log('kerlaite');
            // } else {
            //     let IGST = ((total * 18) / 100).toFixed(2);
            //     this.setState({ IGST: IGST, withoutIGST: total });
            //     // console.log('nonkerlaite');
            // }

            this.setState({ clientOrigin: true });
        } else {
            // let total = this.state.inputFields.reduce((acc, init) => {
            //     return acc + Number(init.total);
            // }, 0);
            // this.setState({ finalAmount: total.toFixed(2) });
            this.setState({ clientOrigin: false });
        }
    }

    convertState(e) {
        let amt = this.state.finalAmount; //final amount eg:500
        let gst_percent = this.state.GST;
        //percentage value eg:18
        let percent_plus_hundred = 100 + parseFloat(gst_percent);
        /// eg:100+18
        if (e == 'Keralite') {
            let cgst = ((gst_percent / percent_plus_hundred) * amt) / 2;
            let sgst = ((gst_percent / percent_plus_hundred) * amt) / 2;
            this.setState({ CGST: cgst.toFixed(2), SGST: cgst.toFixed(2) });

            let sum = +cgst + +sgst; //For avoiding concatenation

            let amt_wtout = amt - sum;
            this.setState({ withoutCGST: amt_wtout.toFixed(2) });

            this.setState({ state: false });
        } else {
            let igst = (gst_percent / percent_plus_hundred) * amt; // bill_iigst eg:(18/118)/500
            let amt_wtout = amt - igst;
            this.setState({ IGST: igst.toFixed(2), withoutIGST: amt_wtout.toFixed(2) });
            this.setState({ state: true });
        }
    }

    gstChange = (value) => {
        this.setState({ GST: value });
        let amt = this.state.finalAmount; //final amount eg:500
        let gst_percent = value;
        //percentage value eg:18
        let percent_plus_hundred = 100 + parseFloat(gst_percent);
        /// eg:100+18

        if (this.state.state == false) {
            let cgst = ((gst_percent / percent_plus_hundred) * amt) / 2;
            let sgst = ((gst_percent / percent_plus_hundred) * amt) / 2;
            this.setState({ CGST: cgst.toFixed(2), SGST: cgst.toFixed(2) });

            let sum = +cgst + +sgst; //For avoiding concatenation

            let amt_wtout = amt - sum;
            this.setState({ withoutCGST: amt_wtout.toFixed(2) });
            // console.log('kerlaite');
        } else {
            let igst = (gst_percent / percent_plus_hundred) * amt; // bill_iigst eg:(18/118)/500
            let amt_wtout = amt - igst;
            this.setState({ IGST: igst.toFixed(2), withoutIGST: amt_wtout.toFixed(2) });

            // console.log('nonkerlaite');
        }
    };

    onFileChange = (event) => {
        // Update the state
        this.setState({ attachFiles: event.target.files[0] });
    };

    downloadBill = () => {
        window.open(this.state.updateAttachFile, '_blank');
    };

    render() {
        const { invoiceNum, clientOrigin } = this.state;
        const { data } = this.props;
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
                                {data !== null ? 'Edit Hashroot-P Bill' : 'Add New Hashroot-P Bill'}
                            </ModalHeader>
                            <ModalBody>
                                {/* {this.props.employee && this.props.employee.employeelistloading && this.props.hashrootinvoice && this.props.hashrootinvoice.listloading && <LoaderWidget />} */}
                                <AvForm>
                                    <Row>
                                        <Col md={6}>
                                            <AvField
                                                name="dept-name"
                                                label="Bill Number"
                                                type="text"
                                                value={invoiceNum || ''}
                                                onChange={(e) => {
                                                    this.setState({ invoiceNum: e.target.value });
                                                }}
                                                placeholder="Enter Bill Number"
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <AvField
                                                name="dept-name"
                                                label="Seller Name"
                                                type="text"
                                                placeholder="Enter Seller Name"
                                                value={this.state.sellerName}
                                                onChange={(e) => {
                                                    this.setState({ sellerName: e.target.value });
                                                }}
                                            />
                                        </Col>
                                        <Col md={12}>
                                            <FormGroup>
                                                <Label for="exampleText">Seller Address</Label>
                                                <Input
                                                    type="textarea"
                                                    name="text"
                                                    id="exampleText"
                                                    rows="3"
                                                    value={this.state.sellerAddress}
                                                    onChange={(e) => {
                                                        this.setState({ sellerAddress: e.target.value });
                                                    }}
                                                />
                                            </FormGroup>
                                        </Col>

                                        {/* {this.state.inputFields.map((input, index) => {
                                            return ( */}
                                        <Col md={12}>
                                            <FormGroup>
                                                <Label for="exampleText">Bill Description</Label>
                                                <Input
                                                    type="textarea"
                                                    name="description"
                                                    id="exampleText"
                                                    rows="3"
                                                    value={this.state.description}
                                                    onChange={(e) => this.setState({ description: e.target.value })}
                                                />
                                            </FormGroup>
                                            {/* <Row>
                                                        <Col md={12}>
                                                            <AvField
                                                                name="total"
                                                                label="Total"
                                                                type="number"
                                                                placeholder="Enter Total"
                                                                value={input.total}
                                                                onChange={(event) =>
                                                                    this.handleFormChange(index, event)
                                                                }
                                                            />
                                                        </Col>
                                                        <Col md={6}>
                                                            <AvField
                                                                name="quantity"
                                                                label="Quantity"
                                                                type="text"
                                                                placeholder="Enter Quantity"
                                                                value={input.quantity}
                                                                onChange={(event) =>
                                                                    this.handleFormChange(index, event)
                                                                }
                                                            />
                                                        </Col>
                                                    </Row>

                                                    <Button
                                                        className="btn btn-success m-2"
                                                        onClick={() => this.addFields()}>
                                                        Add More
                                                    </Button>
                                                    {index !== 0 && (
                                                        <Button
                                                            className="btn btn-danger m-2"
                                                            onClick={() => this.removeFields(index)}>
                                                            Remove
                                                        </Button>
                                                    )} */}
                                        </Col>
                                        {/* );
                                        })} */}
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="exampleCheckbox">Seller Origin :</Label>
                                                <CustomInput
                                                    type="radio"
                                                    id="exampleCustomCheckbox"
                                                    label="Indian"
                                                    checked={this.state.clientOrigin}
                                                    name="Indian"
                                                    onChange={(e) => this.convertClientOrigin(e.target.name)}
                                                />
                                                <CustomInput
                                                    type="radio"
                                                    id="exampleCustomCheckbox1"
                                                    label="International"
                                                    checked={!this.state.clientOrigin}
                                                    name="International"
                                                    onChange={(e) => this.convertClientOrigin(e.target.name)}
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
                                                        checked={!this.state.state}
                                                        name="Keralite"
                                                        onChange={(e) => this.convertState(e.target.name)}
                                                    />
                                                    <CustomInput
                                                        type="radio"
                                                        id="state2"
                                                        label="Non-Keralite"
                                                        name="Non-Keralite"
                                                        checked={this.state.state}
                                                        onChange={(e) => this.convertState(e.target.name)}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        ) : (
                                            <Col md={6}></Col>
                                        )}
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="finalAmount">Final Amount</Label>
                                                <Input
                                                    id="finalAmount"
                                                    name="dept-name"
                                                    label="Final Amount"
                                                    type="text"
                                                    placeholder="Enter Final Amount"
                                                    value={this.state.finalAmount}
                                                    onChange={(e) => {
                                                        this.finalAmountChange(e.target.value);
                                                    }}
                                                />
                                            </FormGroup>
                                        </Col>
                                        {clientOrigin && (
                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label for="gst">GST</Label>
                                                    <Input
                                                        type="select"
                                                        name="select"
                                                        id="gst"
                                                        value={this.state.GST}
                                                        onChange={(e) => this.gstChange(e.target.value)}>
                                                        <option value="0">0%</option>
                                                        <option value="5">5%</option>
                                                        <option value="12">12%</option>
                                                        <option value="18">18%</option>
                                                        <option value="28">28%</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        )}

                                        <Col md={4}>
                                            <FormGroup style={{ paddingTop: '0em' }}>
                                                <Label for="billDate" className="pr-4">
                                                    Bill Date
                                                </Label>
                                                <DatePicker
                                                    className="form-control"
                                                    type="date"
                                                    name="date"
                                                    id="billDate"
                                                    placeholder="Bill Date"
                                                    value={this.state.invoiceDate}
                                                    onChange={(e) => {
                                                        this.setState({
                                                            invoiceDate: e.toLocaleDateString('en-US'),
                                                        });
                                                    }}
                                                />
                                            </FormGroup>
                                        </Col>
                                        {/* <Col md={6}>
                                            <FormGroup>
                                                <div className="d-flex justify-content-around align-items-baseline mt-3">
                                                    <Label for="exampleDate">Paid Date</Label>
                                                    <DatePicker
                                                        className="form-control"
                                                        type="date"
                                                        name="date"
                                                        id="exampleDate"
                                                        placeholder="Select Date"
                                                        value={this.state.paidDate}
                                                        onChange={(e) => {
                                                            this.setState({
                                                                paidDate: e.toLocaleDateString('en-US'),
                                                            });
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
                                        </Col> */}
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
                                        {/* {!clientOrigin && (
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="exampleSelect">Select Currency</Label>
                                                    <Input
                                                        type="select"
                                                        name="select"
                                                        id="exampleSelect"
                                                        onChange={(e) => {
                                                            this.setState({ currency: e.target.value });
                                                        }}>
                                                        <option value="$">Dollar</option>
                                                        <option value="€">Euro</option>
                                                        <option value="£">Pound</option>
                                                        <option value="₹">INR</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        )} */}

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
                                                    name="State"
                                                    label="STATE:"
                                                    type="text"
                                                    placeholder="Enter Your State"
                                                    value={this.state?.stateIndian}
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
                                        {/* <Col md={6}>
                                        
                                            <FormGroup>
                                                <Label for="exampleSelect">Select HSN</Label>
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
                                            </FormGroup>
                                        </Col> */}
                                        {clientOrigin ? (
                                            <Col md={6}>
                                                <AvField
                                                    name="dept-name"
                                                    label="GSTIN"
                                                    type="text"
                                                    placeholder="Enter GSTIN"
                                                    value={this.state.GSTIN}
                                                    onChange={(e) => this.setState({ GSTIN: e.target.value })}
                                                />
                                            </Col>
                                        ) : (
                                            <Col md={6}></Col>
                                        )}
                                        {data !== null ? (
                                            <Col md={12}>
                                                <Label for="myfile">Update Bill</Label>
                                                <Input
                                                    type="file"
                                                    id="myfile"
                                                    name="myfile"
                                                    onChange={(e) => this.onFileChange(e)}
                                                />
                                            </Col>
                                        ) : (
                                            <Col md={12}>
                                                <Label for="myfile">Attach Bill</Label>
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

                                        {/* <Col md={12}>
                                            <FormGroup>
                                                <Label for="exampleCheckbox" className="text-center">
                                                    Bill Status
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
                                        </Col> */}
                                        {/* <Col md={12}>
                                            <FormGroup>
                                                <Label for="exampleText">Declaration</Label>
                                                <Input
                                                    type="textarea"
                                                    name="description"
                                                    id="exampleText"
                                                    rows="3"
                                                    value={this.state.declaration}
                                                    onChange={(e) => this.setState({ declaration: e.target.value })}
                                                />
                                            </FormGroup>
                                        </Col> */}
                                    </Row>
                                </AvForm>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onClick={this.toggleModal}>
                                    Cancel
                                </Button>{' '}
                                {data !== null ? (
                                    <Button color="success" onClick={() => this.updateHashrootBill()}>
                                        Update Hashroot-P Bill
                                    </Button>
                                ) : (
                                    <Button color="success" onClick={() => this.addHashrootBill()}>
                                        Add Hashroot-P Bill
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

const mapStateToProps = (state) => {
    return {
        hashrootbill: state.HashrootpBill,
    };
};
export default connect(mapStateToProps, {})(HashrootBillAddEdit);
