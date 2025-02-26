


import { useState } from 'react';
import Company from './Company';
import DashBoardCompany from './DashBoardCompany';

interface OptionType {
    value: string;
    label: string;
}

interface IhrcDashboardHeaderProps {
    onCompanyChange: (company: OptionType | null) => void;
    onStateChange: (state: OptionType | null) => void;
    onDistrictChange: (district: OptionType | null) => void;
    onLocationChange: (location: OptionType | null) => void;
    onBranchChange: (branch: OptionType | null) => void;
  }

  const IhrcDashboardHeader = ({ onCompanyChange, onStateChange, onDistrictChange, onLocationChange, onBranchChange }: IhrcDashboardHeaderProps) => {
    const handleCompanyChange = (option: OptionType | null) => {
        onCompanyChange(option);
    };

    const handleStateChange = (option: OptionType | null) => {
        onStateChange(option);
    };

    const handleDistrictChange = (option: OptionType | null) => {
        onDistrictChange(option);
    };

    const handleLocationChange = (option: OptionType | null) => {
        onLocationChange(option);
    };

    const handleBranchChange = (option: OptionType | null) => {
        onBranchChange(option);
    };

    return (
        <div className="w-full">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                <div className="mb-3 lg:mb-4">
                    <h3 className="text-2xl font-bold">DASHBOARD</h3>
                    <p className="text-gray-600">View Your Company's Statistics</p>
                </div>
            </div>
            <DashBoardCompany
                onCompanyChange={handleCompanyChange}
                onStateChange={handleStateChange}
                onDistrictChange={handleDistrictChange}
                onLocationChange={handleLocationChange}
                onBranchChange={handleBranchChange}
            />
        </div>
    );
};

export default IhrcDashboardHeader