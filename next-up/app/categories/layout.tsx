import React from 'react';

interface SectionLayoutProps {
    children: React.ReactNode;
}

const SectionLayout: React.FC<SectionLayoutProps> = ({ children }) => {
    return (
        <section>
            {children}
        </section>
    );
};

export default SectionLayout;