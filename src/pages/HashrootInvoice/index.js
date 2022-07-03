import React from 'react';
import PageTitle from '../../components/PageTitle';
import HashrootInvoiceConfig from './HashrootInvoiceConfig'
class HashrootInvoices extends React.Component {

    render() {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'HashrootInvoices', active: true },
                    ]}
                    title={'HashrootInvoices'}
                />
                <HashrootInvoiceConfig/>
            </>
        )
    }
}

export default HashrootInvoices