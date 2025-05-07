import React from 'react';
import DestinationCarousel from '../component/DestinationCarousel';
import { Outlet } from 'react-router';

const Root = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;