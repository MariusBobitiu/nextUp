"use client"

import React, { useState } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClose = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setIsAnimating(false);
            onClose();
        }, 300); // Adjust the duration as needed
    };

    if (!isOpen && !isAnimating) {
        return null;
    }

    return (
        <div className={`modal ${isOpen ? 'open' : ''} ${isAnimating ? 'animating' : ''}`}>
            <div className="modal-content">
                {children}
            </div>
            <div className="modal-overlay" onClick={handleClose} />
        </div>
    );
};

export default Modal;