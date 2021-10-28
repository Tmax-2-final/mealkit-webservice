import React from 'react';

export default function Title({ title, subtitle}){
    
    return (
        <div className="container">
            <div className="section text-left mb-50 ">
                <h2><strong>{title}</strong></h2>
                <p className="section-content">{subtitle}</p>
            </div>
        </div>

    );
}