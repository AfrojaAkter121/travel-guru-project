import React from 'react';
import Navbar from '../component/Navbar';
import { Outlet } from 'react-router';

const Authentication = () => {
    return (
        <div className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat" 
        style={{ 
          backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.52), rgba(0,0,0,0.73)), url('https://i.ibb.co/Q32xyqTX/beautiful-diamond-beach-penida-island-bali-indonesia-181624-41884.jpg')"
        }}>
        <header>
            <Navbar></Navbar>
        </header>
        <main className=" bg-opacity-80 min-h-screen">
            <Outlet></Outlet>
        </main>
    </div>
    
    );
};

export default Authentication;