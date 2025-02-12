import { useState } from 'react';
import Company from './Company';
import DashBoardCompany from './DashBoardCompany';

interface OptionType {
    value: string;
    label: string;
}
interface IhrcDashboardHeaderProps {
    onCompanyChange: (companyId: string) => void;
}

const IhrcDashboardHeader = ({ onCompanyChange }: IhrcDashboardHeaderProps) => {
    const handleCompanyChange = (option: OptionType | null) => {
        if (option) {
            console.log(option.value)
            onCompanyChange(option.value);
        }
    };
  

  
    return (
        <div className="w-full">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10">
                <div className="mb-4 lg:mb-0">
                    <h3 className="text-2xl font-bold">DASHBOARD</h3>
                    <p className="text-gray-600">View Your Company's Statistics</p>
                </div>
            </div>
                <DashBoardCompany
                onCompanyChange={handleCompanyChange} />
        </div>
    );
};

export default IhrcDashboardHeader;

