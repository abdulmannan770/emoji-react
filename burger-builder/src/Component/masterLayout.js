import React, { Component, Fragment } from 'react';
import Header from './Header/index';

class MasterLayout extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Fragment>
                <Header />
                {this.props.children}
            </Fragment>
        )
    }
}

export default MasterLayout;