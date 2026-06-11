import React from 'react';
import DealsSection from '../DealsSection.jsx';
import { prescriptionProducts } from '../../data/prescriptionProducts.js';

const SectionHeader = ({ title, subtitle }) => (
    <div className="text-center max-w-3xl mx-auto mt-4 px-4">
        <h2 className="text-xl sm:text-4xl font-extrabold  tracking-tight text-gray-900 inline-block">
            {title}
        </h2>
        {subtitle && (
            <p className="text-[#9444A1]/70 text-xs sm:text-sm mt-2 font-bold tracking-widest uppercase">
                {subtitle}
            </p>
        )}
        <div className="w-12 h-1 bg-[#9444A1] mx-auto mt-2 rounded-full opacity-70"></div>
    </div>
);

const ProductRow = () => {
    return (
        <div className=''>

            <div className=''>
                <SectionHeader
                    title="Parasiticides & Pest Control"
                    subtitle="External & Internal Treatments"
                />
                <DealsSection deals={prescriptionProducts.parasiticides} />
            </div>
            <div>
                <SectionHeader
                    title="Medicated Skin & Ear Care"
                    subtitle="Specialty Dermatology & Otology"
                />
                <DealsSection deals={prescriptionProducts.medicatedSkin} />
            </div>
            <div>
                <SectionHeader
                    title="Internal Medicine & Anti-Infectives"
                    subtitle="Prescription Therapeutics"
                />
                <DealsSection deals={prescriptionProducts.internalMedicine} />
            </div>
            <div>
                <SectionHeader
                    title="Pain Management & Nutritional Care"
                    subtitle="Bone, Joint & Vitality Support"
                />
                <DealsSection deals={prescriptionProducts.painManagement} />
            </div>

        </div>
    );
};

export default ProductRow;