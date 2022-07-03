import React from 'react';
import PageTitle from '../../components/PageTitle';
import HashrootssInvoiceConfig from './HashrootssInvoiceConfig'
class HashrootssInvoices extends React.Component {

    render() {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'Hashroot-SS Invoices', active: true },
                    ]}
                    title={'Hashroot -SS Invoices'}
                />
                <HashrootssInvoiceConfig/>
            </>
        )
    }
}

export default HashrootssInvoices