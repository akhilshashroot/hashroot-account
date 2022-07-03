import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Card, CardBody, Button, UncontrolledTooltip, Label } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import HashrootInvoiceDetails from './HashrootsInvoiceDetails';
import HashrootInvoiceAddEdit from './HashrootsInvoiceAdd';
import HashrootInvoiceDelete from './HashrootsInvoiceDelete';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import "../../assets/scss/toastr.scss"
import { connect } from 'react-redux';
import {
    getHashrootsInvoiceList,
    getHashrootsInvoiceAdd,
    getHashrootsInvoiceUpdate,
    getHashrootsInvoiceDelete,
    getHashrootsCloneInvoice,
    downloadInvoices,
} from '../../redux/actions';
import LoaderWidget from '../../components/Loader';
import { CSVExport } from 'react-bootstrap-table2-toolkit';

const { ExportCSVButton } = CSVExport;
const { SearchBar } = Search;

const HashrootInvoiceConfig = (props) => {
    const hashrootinvoiceAddedSucsess = () => toast.success('HashrootInvoice Added Successfully', { transition: Zoom });
    const hashrootinvoiceDeletedSuccess = () =>
        toast.success('HashrootInvoice Deleted Successfully', { transition: Zoom });
    const hashrootinvoiceUpdated = () => toast.info('HashrootInvoice Updated Successfully', { transition: Zoom });
    const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });

    // const history = useHistory();
    const [toggleDetailsModal, setToggleDetailsModal] = useState(false);
    const [toggleAddEditModal, setToggleAddEditModal] = useState(false);
    const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
    const [hashrootinvoiceData, setHashrootInvoiceData] = useState(null);
    const [index, setIndex] = useState(null);

    const columns = [
        {
            dataField: 'invo_number',
            text: 'Invoice Number',
            headerStyle: { width: '10%' },
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            filter: textFilter(),
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p>{row.invo_number}</p>
                </div>
            ),
        },
        {
            dataField: 'invo_date',
            text: 'Invoice Date',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            filter: textFilter(),
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p id="name">{row.invo_date}</p>
                </div>
            ),
        },
        {
            dataField: 'paid_date',
            text: 'Paid Date',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            filter: textFilter(),
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p id="name">{row.paid_date}</p>
                </div>
            ),
        },
        {
            dataField: 'client_name',
            text: 'Client',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            filter: textFilter(),
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p id="name">{row.client_name}</p>
                </div>
            ),
        },
        // {
        //     dataField: 'address',
        //     text: 'Address',
        //     headerClasses: 'bg-dark text-white py-2',
        //     sort: true,
        //     filter: textFilter(),
        //     formatter: (cell, row, rowIndex, formatExtraData) => (
        //         <div style={{ lineHeight: 'normal', margin: 0 }}>
        //             <p id="name">{row.address}</p>
        //         </div>
        //     ),
        // },
        // {
        //     dataField: 'state',
        //     text: 'State',
        //     headerClasses: 'bg-dark text-white py-2',
        //     sort: true,
        //     filter: textFilter(),
        //     formatter: (cell, row, rowIndex, formatExtraData) => (
        //         <div style={{ lineHeight: 'normal', margin: 0 }}>
        //             <p id="name">{row.state}</p>
        //         </div>
        //     ),
        // },
        {
            dataField: 'country',
            text: 'Country',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            filter: textFilter(),
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p id="name">{row.country}</p>
                </div>
            ),
        },
        // {
        //     dataField: 'gstin',
        //     text: 'GSTIN',
        //     headerClasses: 'bg-dark text-white py-2',
        //     sort: true,
        //     filter: textFilter(),
        //     formatter: (cell, row, rowIndex, formatExtraData) => (
        //         <div style={{ lineHeight: 'normal', margin: 0 }}>
        //             <p id="name">{row.gstin}</p>
        //         </div>
        //     ),
        // },
        {
            dataField: 'gst',
            text: 'GST',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            filter: textFilter(),
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p id="name">{row.gst}</p>
                </div>
            ),
        },
        {
            dataField: 'int_amount',
            text: 'USD',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            filter: textFilter(),
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p id="name">{row.int_amount}</p>
                </div>
            ),
        },
        {
            dataField: 'INR',
            text: 'Invoice Value',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            filter: textFilter(),
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p id="name">{row.nat_amount}</p>
                </div>
            ),
        },
        // {
        //     dataField: 'gstvoid',
        //     text: 'Taxable Value',
        //     headerClasses: 'bg-dark text-white py-2',
        //     sort: true,
        //     filter: textFilter(),
        //     formatter: (cell, row, rowIndex, formatExtraData) => (
        //         <div style={{ lineHeight: 'normal', margin: 0 }}>
        //             <p id="name">{row.gstvoid}</p>
        //         </div>
        //     ),
        // },
        // {
        //     dataField: 'IGST',
        //     text: 'IGST',
        //     headerClasses: 'bg-dark text-white py-2',
        //     sort: true,
        //     filter: textFilter(),
        //     formatter: (cell, row, rowIndex, formatExtraData) => (
        //         <div style={{ lineHeight: 'normal', margin: 0 }}>
        //             <p id="name">{row.IGST}</p>
        //         </div>
        //     ),
        // },
        // {
        //     dataField: 'CGST',
        //     text: 'CGST',
        //     headerClasses: 'bg-dark text-white py-2',
        //     sort: true,
        //     filter: textFilter(),
        //     formatter: (cell, row, rowIndex, formatExtraData) => (
        //         <div style={{ lineHeight: 'normal', margin: 0 }}>
        //             <p id="name">{row.CGST}</p>
        //         </div>
        //     ),
        // },
        // {
        //     dataField: 'SGST',
        //     text: 'SGST',
        //     headerClasses: 'bg-dark text-white py-2',
        //     sort: true,
        //     filter: textFilter(),
        //     formatter: (cell, row, rowIndex, formatExtraData) => (
        //         <div style={{ lineHeight: 'normal', margin: 0 }}>
        //             <p id="name">{row.SGST}</p>
        //         </div>
        //     ),
        // },
        // {
        //     dataField: 'HSN',
        //     text: 'HSN',
        //     headerClasses: 'bg-dark text-white py-2',
        //     sort: true,
        //     filter: textFilter(),
        //     formatter: (cell, row, rowIndex, formatExtraData) => (
        //         <div style={{ lineHeight: 'normal', margin: 0 }}>
        //             <p id="name">{row.HSN}</p>
        //         </div>
        //     ),
        // },
        // {
        //     dataField: 'quantity',
        //     text: 'Quantity',
        //     headerClasses: 'bg-dark text-white py-2',
        //     sort: true,
        //     filter: textFilter(),
        //     formatter: (cell, row, rowIndex, formatExtraData) => (
        //         <div style={{ lineHeight: 'normal', margin: 0 }}>
        //             <p id="name">{row.quantity}</p>
        //         </div>
        //     ),
        // },
        {
            dataField: 'paid_status',
            text: 'Paid',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            filter: textFilter(),
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p id="name">{row.paid_status}</p>
                </div>
            ),
        },
        {
            dataField: 'payment_method',
            text: 'Payment Mode',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            filter: textFilter(),
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p id="name">{row.payment_method}</p>
                </div>
            ),
        },

        {
            dataField: 'actions',
            text: 'Actions',
            headerStyle: { width: '20%' },
            headerClasses: 'bg-dark text-white py-2',
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0, cursor: 'pointer' }}>
                    <i className="uil uil-edit widget-icon mr-2" id="edit" onClick={() => edit(row, rowIndex)}></i>
                    <i
                        className="uil uil-trash-alt dept-trash widget-icon bg-danger-lighten text-danger"
                        id="delete"
                        onClick={() => deleteHashrootInvoice(row, rowIndex)}></i>
                    <i
                        className="uil  uil-copy-alt widget-icon ml-2"
                        title="Clone Invoice"
                        onClick={() => invoiceClone(row, rowIndex)}></i>
                    <UncontrolledTooltip placement="top" target="edit">
                        Edit
                    </UncontrolledTooltip>
                    <UncontrolledTooltip placement="top" target="delete">
                        Delete
                    </UncontrolledTooltip>
                </div>
            ),
        },
        {
            dataField: 'Invoice',
            text: 'Invoice',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <i
                        className="uil  uil-file-download widget-icon ml-2 bg-success-lighten text-success"
                        title="Download"
                        onClick={() => downloadInvoices(row, rowIndex)}
                        id="download"></i>
                    <UncontrolledTooltip placement="top" target="download">
                        Download
                    </UncontrolledTooltip>
                    {/* <p id="name">Invoice</p> */}
                </div>
            ),
        },
    ];

    useEffect(() => {
        if (props.hashrootinvoice && !props.hashrootinvoice.hashrootsinvoice) {
            props.getHashrootsInvoiceList();
        }
        if (props?.hashrootinvoice?.hashrootsCloneinvoice) {
            props.getHashrootsInvoiceList();
        }
        if(props?.hashrootinvoice?.downloadInvoices?.pdf_url){
            window.open(props?.hashrootinvoice?.downloadInvoices?.pdf_url, '_blank');
        }
    }, [props?.hashrootinvoice?.hashrootsCloneinvoice,props?.hashrootinvoice?.downloadInvoices?.pdf_url]);

    const handleDetailsModal = (row) => {
        setToggleDetailsModal(true);
        setHashrootInvoiceData(row);
    };
    const closeDetailsModal = () => {
        setToggleDetailsModal(false);
        setHashrootInvoiceData(null);
    };

    const handleAddEditModal = () => {
        setToggleAddEditModal(true);
        setHashrootInvoiceData(null);
    };
    const closeAddEditModal = () => {
        setToggleAddEditModal(false);
        setHashrootInvoiceData(null);
    };

    const edit = (row, index) => {
        setToggleAddEditModal(true);
        setHashrootInvoiceData(row);
        setIndex(index);
    };

    const deleteHashrootInvoice = (row, index) => {
        setHashrootInvoiceData(row);
        setToggleDeleteModal(true);
        setIndex(index);
    };

    const closeDeleteModal = () => {
        setToggleDeleteModal(false);
        setHashrootInvoiceData(null);
        setIndex(null);
    };

    const invoiceClone = (row, index) => {
        let data = {
            invoid: row.invoice_id,
            table_name: 'hashroots_invoice',
        };
        props.getHashrootsCloneInvoice(data);
    };
    const downloadInvoices = (row, index) => {
        let data = {
            id: row.invoice_id,
        };
        props.downloadInvoices(data);
    };

    return (
        <>
            <Card>
                <CardBody>
                    <React.Fragment>
                        <Row>
                            <Col className="text-right mb-1">
                                <Button color="danger" className="mb-2" onClick={() => handleAddEditModal()}>
                                    <i className="mdi mdi-plus-circle mr-2"></i> Add New Hashroot-S Invoice
                                </Button>
                            </Col>
                        </Row>
                        {props.hashrootinvoice && props.hashrootinvoice?.listloading && <LoaderWidget />}
                        {/* {props.hashrootinvoice &&
                            props.hashrootinvoice.hashrootinvoice &&
                            props.hashrootinvoice.hashrootinvoice.data && (
                                <BootstrapTable
                                    bootstrap4
                                    keyField={'dep_id'}
                                    data={
                                        props.hashrootinvoice &&
                                        props.hashrootinvoice.hashrootinvoice &&
                                        props.hashrootinvoice.hashrootinvoice.data
                                    }
                                    columns={columns}
                                    pagination={paginationFactory({ sizePerPage: 10 })}
                                    wrapperClasses="table-responsive"
                                    hover
                                    condensed
                                    noDataIndication={() => 'There are no records to display'}
                                />
                            )} */}
                        {props.hashrootinvoice &&
                            props.hashrootinvoice.hashrootsinvoice &&
                            props.hashrootinvoice.hashrootsinvoice.data && (
                                <ToolkitProvider
                                    bootstrap4
                                    keyField="id"
                                    data={
                                        props.hashrootinvoice &&
                                        props.hashrootinvoice.hashrootsinvoice &&
                                        props.hashrootinvoice.hashrootsinvoice.data
                                    }
                                    columns={columns}
                                    search
                                    columnToggle
                                    exportCSV={ { onlyExportFiltered: true, exportAll: false } }>
                                    {(props) => (
                                        <React.Fragment>
                                            {/* <Row>
                                                <Col md={4} className="d-flex justify-content-between flex-column">
                                                    <Label for="Search">Search</Label>
                                                    <SearchBar id="Search" {...props.searchProps} />
                                                </Col>
                                            </Row> */}
                                            <ExportCSVButton {...props.csvProps} className="btn btn-success m-2">Export</ExportCSVButton>

                                            <BootstrapTable
                                                //  keyField={"desg_id"}
                                                {...props.baseProps}
                                                bordered={true}
                                                pagination={paginationFactory({ sizePerPage: 10 })}
                                                wrapperClasses="table-responsive"
                                                noDataIndication={() => 'There are no records to display'}
                                                filter={filterFactory()}
                                            />
                                        </React.Fragment>
                                    )}
                                </ToolkitProvider>
                            )}

                        {/* Details Modal */}
                        {toggleDetailsModal && (
                            <HashrootInvoiceDetails
                                toggleDetailsModal={toggleDetailsModal}
                                closeDetailsModal={closeDetailsModal}
                                data={hashrootinvoiceData}
                            />
                        )}

                        {/* Add/Edit Modal */}
                        {toggleAddEditModal && (
                            <HashrootInvoiceAddEdit
                                toggleAddEditModal={toggleAddEditModal}
                                closeAddEditModal={closeAddEditModal}
                                emptyAllFields={emptyAllFields}
                                payment={props.auth?.paymentList}
                                country={props.auth?.countriesList}
                                hsn={props.auth?.hsnList}
                                data={hashrootinvoiceData}
                                index={index}
                                hashrootinvoiceAddedSucsess={hashrootinvoiceAddedSucsess}
                                hashrootinvoiceUpdated={hashrootinvoiceUpdated}
                                getHashrootInvoiceAdd={props.getHashrootsInvoiceAdd}
                                getHashrootInvoiceUpdate={props.getHashrootsInvoiceUpdate}
                                hashrootinvoice={props.hashrootinvoice}
                                getHashrootsInvoiceList={props.getHashrootsInvoiceList}
                            />
                        )}

                        {/* Delete Modal */}
                        {toggleDeleteModal && (
                            <HashrootInvoiceDelete
                                toggleDeleteModal={toggleDeleteModal}
                                closeDeleteModal={closeDeleteModal}
                                getHashrootInvoiceDelete={props.getHashrootsInvoiceDelete}
                                data={hashrootinvoiceData}
                                records={
                                    props.hashrootinvoice &&
                                    props.hashrootinvoice.hashrootinvoice &&
                                    props.hashrootinvoice.hashrootinvoice.data
                                }
                                index={index}
                                hashrootinvoiceDeletedSuccess={hashrootinvoiceDeletedSuccess}
                                hashrootinvoice={props.hashrootinvoice}
                                getHashrootsInvoiceList={props.getHashrootsInvoiceList}
                            />
                        )}
                    </React.Fragment>
                </CardBody>
            </Card>
            <ToastContainer />
        </>
    );
};
const mapStateToProps = (state) => {
    return {
        hashrootinvoice: state.Hashroots,
        auth: state.Auth,
    };
};
export default connect(mapStateToProps, {
    getHashrootsInvoiceList,
    getHashrootsInvoiceAdd,
    getHashrootsInvoiceUpdate,
    getHashrootsInvoiceDelete,
    getHashrootsCloneInvoice,
    downloadInvoices,
})(HashrootInvoiceConfig);
