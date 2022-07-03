import React from 'react';
import PageTitle from '../../components/PageTitle';
import SettingsConfig from './SettingsConfig'
class Myprofile extends React.Component {

    render() {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'My Profile', active: true },
                    ]}
                    title={'My Profile'}
                />
                <SettingsConfig/>
            </>
        )
    }
}

export default Myprofile