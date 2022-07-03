import React from 'react';
import PageTitle from '../../components/PageTitle';
import HashrootBillConfig from './HashrootsBillConfig'
class HashrootsBills extends React.Component {

    render() {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'Hashroot-S Bills', active: true },
                    ]}
                    title={'Hashroot -S Bills'}
                />
                <HashrootBillConfig/>
            </>
        )
    }
}

export default HashrootsBills