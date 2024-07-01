import React, { useEffect, useRef, useState } from 'react';

const Otp = ({ otpLength = 6 }) => {
    const [otpFields, setOtpFields] = useState(new Array(otpLength).fill(''));
    const ref = useRef([]);

    const handleKeyDown = (e, index) => {
        const key = e.key;
        const code = e.code;

        if(key==="ArrowLeft"){
            if(index>0){
                ref.current[index-1].focus();
                return;
            }
        }
        if(key==="ArrowRight"){
            if (index + 1 < otpFields.length) {
                ref.current[index + 1].focus();
                return;
            }
        }

        const copyOtpFields = [...otpFields];

        // Handle Backspace or Delete keys
        if (key === 'Backspace' || code === 'Delete') {
            console.log('delete clicked');
            copyOtpFields[index] = '';
            setOtpFields(copyOtpFields);
            if(index>0){
                ref.current[index-1].focus();
            }
            return;
        }

        // Only allow numeric keys
        if (isNaN(key)) {
            return;
        }

        copyOtpFields[index] = key;

        // Move focus to next input
        if (index + 1 < otpFields.length) {
            ref.current[index + 1].focus();
        }

        setOtpFields(copyOtpFields);
    };

    useEffect(() => {
        ref.current["0"].focus();
    }, [])

    return (
        <div className="container">
            {otpFields.map((value, index) => (
                <input
                    type="text"
                    key={index}
                    value={value}
                    ref={(currentInput) => (ref.current[index] = currentInput)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                />
            ))}
        </div>
    );
};

export default Otp;
