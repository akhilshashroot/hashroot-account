import React from 'react';
import PageTitle from '../../components/PageTitle';
import HashrootInvoiceConfig from './HashrootsInvoiceConfig'
class HashrootsInvoices extends React.Component {

    render() {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'Hashroot-S Invoices', active: true },
                    ]}
                    title={'Hashroot -S Invoices'}
                />
                <HashrootInvoiceConfig/>
            </>
        )
    }
}

export default HashrootsInvoices