import React from 'react';
import PageTitle from '../../components/PageTitle';
import HashrootInvoiceConfig from './HashrootpInvoiceConfig'
class HashrootpInvoices extends React.Component {

    render() {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'Hashroot-P Invoices', active: true },
                    ]}
                    title={'Hashroot -P Invoices'}
                />
                <HashrootInvoiceConfig/>
            </>
        )
    }
}

export default HashrootpInvoices