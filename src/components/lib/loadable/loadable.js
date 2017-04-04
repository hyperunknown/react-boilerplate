import React, { Component } from 'react';
import Loadable from 'react-loadable';

let moduleIds = [];

/**
 * Wraps `Loadable` in order to support `flushServerSideRequires` (or a variation thereof)
 * as proposed here -- https://medium.com/@thejameskyle/react-loadable-2674c59de178
 */
const WrappedLoadable = options => {
    const BaseComponent = Loadable(options);
    return class extends Component {
        constructor() {
            super();
            moduleIds.push(options.webpackRequireWeakId());
        }

        render() {
            return <BaseComponent {...this.props} />
        }
    }
}

WrappedLoadable.flushModuleIds = () => {
    const ids = moduleIds;
    moduleIds = [];
    return ids;
}

export default WrappedLoadable;