import React from 'react';
import PageTitle from '../../components/PageTitle';
import HashrootBillConfig from './HashrootssBillConfig'
class HashrootssBills extends React.Component {

    render() {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'Hashroot-SS Bills', active: true },
                    ]}
                    title={'Hashroot -SS Bills'}
                />
                <HashrootBillConfig/>
            </>
        )
    }
}

export default HashrootssBills