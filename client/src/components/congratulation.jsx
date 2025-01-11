import React, { useEffect } from 'react';

const PartyCongratulation = () => {

    useEffect(() => {
        const timer = setInterval(() => {
            setVisible((prev) => !prev);
        }, 500);

        return () => clearInterval(timer);
    }, []);

    const colors = ['#FF69B4', '#FFD700', '#00CED1', '#FF6347', '#32CD32'];

    return (
        <div className='h-20 w-20 left-1/2 translate-x-[-50%] fixed ' style={styles.container}>
           
            {colors.map((color, index) => (
                <div
                    key={index}
                    style={{
                        ...styles.confetti,
                        backgroundColor: color,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                    }}
                />
            ))}
            
            <style>
                {`
          @keyframes fall {
            0% { transform: translateY(-100vh) rotate(0deg); }
            100% { transform: translateY(100vh) rotate(360deg); }
          }
          @keyframes scale {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
          }
        `}
            </style>
        </div>
    );
};

const styles = {
    confetti: {
        position: 'absolute',
        width: '10px',
        height: '10px',
        animation: 'fall 3s linear infinite',
    },
 
};

export default PartyCongratulation;

