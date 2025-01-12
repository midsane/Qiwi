import React from 'react';
import { createPortal } from 'react-dom';

export const GradientBackground = () => {
    return (
        createPortal(<div className='w-full fixed top-0 left-0 z-[-1] h-full' style={styles.container}>
            <div style={styles.content}>

            </div>
        </div>, document.getElementById('root'))
    );
};


const styles = {
    container: {
        width: '100%',
        height: '100vh',
        background: 'linear-gradient(135deg, #FFD8B2 0%, #FFF4CC 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
    },
    content: {
        textAlign: 'center',
    },
    heading: {
        color: '#FFFFFF',
        fontSize: '2.5rem',
        marginBottom: '20px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
    },
    yellowBox: {
        backgroundColor: '#FFF9C4',
        color: '#333333',
        padding: '15px 30px',
        borderRadius: '5px',
        display: 'inline-block',
        fontWeight: 'bold',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    },
};




