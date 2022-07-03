import React from 'react';
import PageTitle from '../../components/PageTitle';
import HashrootBillConfig from './HashrootBillConfig'
class HashrootBills extends React.Component {

    render() {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'HashrootBills', active: true },
                    ]}
                    title={'HashrootBills'}
                />
                <HashrootBillConfig/>
            </>
        )
    }
}

export default HashrootBills