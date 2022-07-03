import React from 'react';
import PageTitle from '../../components/PageTitle';
import HashrootBillConfig from './HashrootpBillConfig'
class HashrootpBills extends React.Component {

    render() {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'Hashroot-P Bills', active: true },
                    ]}
                    title={'Hashroot -P Bills'}
                />
                <HashrootBillConfig/>
            </>
        )
    }
}

export default HashrootpBills