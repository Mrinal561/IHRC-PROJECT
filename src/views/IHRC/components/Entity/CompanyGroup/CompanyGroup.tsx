
import React, { useState, useEffect } from 'react';
import CompanyGroupTool from './components/CompanyGroupTool';
import CompanyTable from './components/CompanyTable';
import AdaptableCard from '@/components/shared/AdaptableCard';
import { useAppDispatch } from '@/store';
import { fetchCompanyGroups } from '@/store/slices/companyGroup/companyGroupSlice';
import { CompanyGroupData } from '@/store/slices/companyGroup/companyGroupSlice';

const CompanyGroup = () => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [companyData, setCompanyData] = useState<CompanyGroupData[]>([]);

    const fetchCompanyDataTable = async () => {
        setIsLoading(true);
        try {
            const { payload: data }: any = await dispatch(fetchCompanyGroups());
            if (data && data.data) {
              setCompanyData(data.data);
          }
        } catch (error) {
            console.error('Failed to fetch company groups:', error);
        }
        setIsLoading(false);
    };

    // Initial data fetch
    useEffect(() => {
        fetchCompanyDataTable();
    }, []);

    // Handler to refresh data after changes
    const handleDataChange = () => {
        fetchCompanyDataTable();
       
    };

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10">
                <div className="mb-4 lg:mb-0">
                    <h3 className="text-2xl font-bold">Company Group Manager</h3>
                </div>
                <CompanyGroupTool onDataChange={handleDataChange} />
            </div>
            <CompanyTable 
                companyData={companyData}
                isLoading={isLoading}
                onDataChange={handleDataChange}
            />
        </AdaptableCard>
    );
};

export default CompanyGroup;
