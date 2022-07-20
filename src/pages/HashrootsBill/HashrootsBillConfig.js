import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Card, CardBody, Button, UncontrolledTooltip, Label } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import HashrootBillDetails from './HashrootsBillDetails';
import HashrootBillAddEdit from './HashrootsBillAdd';
import HashrootBillDelete from './HashrootsBillDelete';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import "../../assets/scss/toastr.scss"
import { connect } from 'react-redux';
import {
    getHashrootsBillList,
    getHashrootsBillAdd,
    getHashrootsBillUpdate,
    getHashrootsBillDelete,
    getHashrootsCloneBill,
    downloadBill,
} from '../../redux/actions';
import LoaderWidget from '../../components/Loader';
import { CSVExport } from 'react-bootstrap-table2-toolkit';

const { ExportCSVButton } = CSVExport;
const { SearchBar } = Search;

const HashrootBillConfig = (props) => {
    const hashrootbillAddedSucsess = () => toast.success('HashrootBill Added Successfully', { transition: Zoom });
    const hashrootbillDeletedSuccess = () => toast.success('HashrootBill Deleted Successfully', { transition: Zoom });
    const hashrootbillUpdated = () => toast.info('HashrootBill Updated Successfully', { transition: Zoom });
    const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });

    // const history = useHistory();
    const [toggleDetailsModal, setToggleDetailsModal] = useState(false);
    const [toggleAddEditModal, setToggleAddEditModal] = useState(false);
    const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
    const [hashrootbillData, setHashrootBillData] = useState(null);
    const [index, setIndex] = useState(null);

    const columns = [
        {
            dataField: 'bill_number',
            text: 'Bill Number',
            headerStyle: { width: '10%' },
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            filter: textFilter(),
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p>{row.bill_number}</p>
                </div>
            ),
        },
        {
            dataField: 'bill_date',
            text: 'Bill Date',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            filter: textFilter(),
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p id="name">{row.bill_date}</p>
                </div>
            ),
        },
        {
            dataField: 'bill_desc',
            text: 'Description',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            filter: textFilter(),
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p id="name">{row.bill_desc}</p>
                </div>
            ),
        },
        {
            dataField: 'seller_name',
            text: 'Seller Name',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            filter: textFilter(),
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p id="name">{row.seller_name}</p>
                </div>
            ),
        },
        /*{
            dataField: 'address',
            text: 'Address',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            filter: textFilter(),
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p id="name">{row.address}</p>
                </div>
            ),
        },*/
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
        /*{
            dataField: 'state',
            text: 'State',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            filter: textFilter(),
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p id="name">{row.state}</p>
                </div>
            ),
        },*/
        {
            dataField: 'bill_amt',
            text: 'Amount',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            filter: textFilter(),
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p id="name">{row.bill_amt}</p>
                </div>
            ),
        },
        /*{
            dataField: 'gstin',
            text: 'GSTIN',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            filter: textFilter(),
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p id="name">{row.gstin}</p>
                </div>
            ),
        },
        {
            dataField: 'bill_igst',
            text: 'IGST',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            filter: textFilter(),
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p id="name">{row.bill_igst}</p>
                </div>
            ),
        },
        {
            dataField: 'bill_cgst',
            text: 'CGST',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            filter: textFilter(),
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p id="name">{row.bill_cgst}</p>
                </div>
            ),
        },
        {
            dataField: 'bill_sgst',
            text: 'SGST',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            filter: textFilter(),
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p id="name">{row.bill_sgst}</p>
                </div>
            ),
        },
        {
            dataField: 'gst_void',
            text: 'Without Tax',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            filter: textFilter(),
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <p id="name">{row.gst_void}</p>
                </div>
            ),
        },*/

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
                        onClick={() => deleteHashrootBill(row, rowIndex)}></i>
                    <i
                        className="uil  uil-copy-alt widget-icon ml-2"
                        title="Clone Bill"
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
            dataField: 'Bill',
            text: 'Bill',
            headerClasses: 'bg-dark text-white py-2',
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) => (
                <div style={{ lineHeight: 'normal', margin: 0 }}>
                    <i
                        className="uil  uil-file-download widget-icon ml-2 bg-success-lighten text-success"
                        title="Download"
                        onClick={() => downloadBill(row, rowIndex)}
                        id="download"></i>
                    <UncontrolledTooltip placement="top" target="download">
                        Download
                    </UncontrolledTooltip>
                    {/* <p id="name">Bill</p> */}
                </div>
            ),
        },
    ];

    useEffect(() => {
        if (props.hashrootbill && !props.hashrootbill.hashrootpinvoice) {
            props.getHashrootsBillList();
        }
        if (props?.hashrootbill?.hashrootpClonebill) {
            props.getHashrootsBillList();
        }
        if (props?.hashrootbill?.downloadBill?.pdf_url) {
            window.open(props?.hashrootbill?.downloadBill?.pdf_url, '_blank');
        }
    }, [props?.hashrootbill?.hashrootpClonebill, props?.hashrootbill?.downloadBill?.pdf_url]);

    const handleDetailsModal = (row) => {
        setToggleDetailsModal(true);
        setHashrootBillData(row);
    };
    const closeDetailsModal = () => {
        setToggleDetailsModal(false);
        setHashrootBillData(null);
    };

    const handleAddEditModal = () => {
        setToggleAddEditModal(true);
        setHashrootBillData(null);
    };
    const closeAddEditModal = () => {
        setToggleAddEditModal(false);
        setHashrootBillData(null);
    };

    const edit = (row, index) => {
        setToggleAddEditModal(true);
        setHashrootBillData(row);
        setIndex(index);
    };

    const deleteHashrootBill = (row, index) => {
        setHashrootBillData(row);
        setToggleDeleteModal(true);
        setIndex(index);
    };

    const closeDeleteModal = () => {
        setToggleDeleteModal(false);
        setHashrootBillData(null);
        setIndex(null);
    };

    const invoiceClone = (row, index) => {
        let data = {
            bill_id: row.bill_id,
            table_name: 'hashroots_bills',
        };
        props.getHashrootsCloneBill(data);
    };
    const downloadBill = (row, index) => {
        window.open(row.bill_file, '_blank');
    };

    return (
        <>
            <Card>
                <CardBody>
                    <React.Fragment>
                        <Row>
                            <Col className="text-right mb-1">
                                <Button color="danger" className="mb-2" onClick={() => handleAddEditModal()}>
                                    <i className="mdi mdi-plus-circle mr-2"></i> Add New Hashroot-S Bill
                                </Button>
                            </Col>
                        </Row>
                        {props.hashrootbill && props.hashrootbill?.listloading && <LoaderWidget />}
                        {/* {props.hashrootbill &&
                            props.hashrootbill.hashrootbill &&
                            props.hashrootbill.hashrootbill.data && (
                                <BootstrapTable
                                    bootstrap4
                                    keyField={'dep_id'}
                                    data={
                                        props.hashrootbill &&
                                        props.hashrootbill.hashrootbill &&
                                        props.hashrootbill.hashrootbill.data
                                    }
                                    columns={columns}
                                    pagination={paginationFactory({ sizePerPage: 10 })}
                                    wrapperClasses="table-responsive"
                                    hover
                                    condensed
                                    noDataIndication={() => 'There are no records to display'}
                                />
                            )} */}
                        {props.hashrootbill &&
                            props.hashrootbill.hashrootpbill &&
                            props.hashrootbill.hashrootpbill.data && (
                                <ToolkitProvider
                                    bootstrap4
                                    keyField="id"
                                    data={
                                        props.hashrootbill &&
                                        props.hashrootbill.hashrootpbill &&
                                        props.hashrootbill.hashrootpbill.data
                                    }
                                    columns={columns}
                                    search
                                    columnToggle
                                    exportCSV={{ onlyExportFiltered: true, exportAll: false }}>
                                    {(props) => (
                                        <React.Fragment>
                                            {/* <Row>
                                                <Col md={4} className="d-flex justify-content-between flex-column">
                                                    <Label for="Search">Search</Label>
                                                    <SearchBar id="Search" {...props.searchProps} />
                                                </Col>
                                            </Row> */}
                                            <ExportCSVButton {...props.csvProps} className="btn btn-success m-2">
                                                Export
                                            </ExportCSVButton>

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
                            <HashrootBillDetails
                                toggleDetailsModal={toggleDetailsModal}
                                closeDetailsModal={closeDetailsModal}
                                data={hashrootbillData}
                            />
                        )}

                        {/* Add/Edit Modal */}
                        {toggleAddEditModal && (
                            <HashrootBillAddEdit
                                toggleAddEditModal={toggleAddEditModal}
                                closeAddEditModal={closeAddEditModal}
                                emptyAllFields={emptyAllFields}
                                payment={props.auth?.paymentList}
                                country={props.auth?.countriesList}
                                hsn={props.auth?.hsnList}
                                data={hashrootbillData}
                                index={index}
                                hashrootbillAddedSucsess={hashrootbillAddedSucsess}
                                hashrootbillUpdated={hashrootbillUpdated}
                                getHashrootBillAdd={props.getHashrootsBillAdd}
                                getHashrootBillUpdate={props.getHashrootsBillUpdate}
                                hashrootbill={props.hashrootbill}
                                getHashrootsBillList={props.getHashrootsBillList}
                            />
                        )}

                        {/* Delete Modal */}
                        {toggleDeleteModal && (
                            <HashrootBillDelete
                                toggleDeleteModal={toggleDeleteModal}
                                closeDeleteModal={closeDeleteModal}
                                getHashrootBillDelete={props.getHashrootsBillDelete}
                                data={hashrootbillData}
                                records={
                                    props.hashrootbill &&
                                    props.hashrootbill.hashrootbill &&
                                    props.hashrootbill.hashrootbill.data
                                }
                                index={index}
                                hashrootbillDeletedSuccess={hashrootbillDeletedSuccess}
                                hashrootbill={props.hashrootbill}
                                getHashrootsBillList={props.getHashrootsBillList}
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
        hashrootbill: state.HashrootsBill,
        auth: state.Auth,
    };
};
export default connect(mapStateToProps, {
    getHashrootsBillList,
    getHashrootsBillAdd,
    getHashrootsBillUpdate,
    getHashrootsBillDelete,
    getHashrootsCloneBill,
    downloadBill,
})(HashrootBillConfig);
