import React, { useState, useEffect, useCallback } from 'react';
import AdaptableCard from '@/components/shared/AdaptableCard';
import CompanyNameTool from './components/CompanyNameTool';
import CompanyNameTable from './components/CompanyNameTable';
import { EntityData } from '@/views/IHRC/store/dummyEntityData'; 

const CompanyName = () => {
  const [companyData, setCompanyData] = useState<EntityData[]>([]);
  const [companyGroups, setCompanyGroups] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load company data
        const storedCompanyData = localStorage.getItem('companyData');
        if (storedCompanyData) {
          setCompanyData(JSON.parse(storedCompanyData));
        }

        // Load company groups
        const storedCompanyGroups = localStorage.getItem('entityDataList');
        if (storedCompanyGroups) {
          const parsedGroups = JSON.parse(storedCompanyGroups);
          const groups = Array.isArray(parsedGroups) 
            ? parsedGroups
                .map((item: EntityData) => item.Company_Group_Name)
                .filter((group): group is string => group !== undefined && group !== null)
            : [];
          setCompanyGroups(groups);
        }
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Error loading data. Please try refreshing the page.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const saveData = () => {
      try {
        localStorage.setItem('companyData', JSON.stringify(companyData));
      } catch (err) {
        console.error('Error saving data:', err);
        setError('Error saving data. Please try again.');
      }
    };

    if (!isLoading) {
      saveData();
    }
  }, [companyData, isLoading]);

  const addCompany = useCallback((newCompany: EntityData) => {
    setCompanyData(prevList => [...prevList, newCompany]);
  }, []);

  const handleDelete = useCallback((index: number) => {
    setCompanyData(prevList => prevList.filter((_, i) => i !== index));
  }, []);

  const handleEdit = useCallback((index: number, newName: string) => {
    setCompanyData(prevData => {
      const newData = [...prevData];
      if (newData[index]) {
        newData[index] = { ...newData[index], Company_Name: newName };
      }
      return newData;
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10">
        <div className="mb-4 lg:mb-0">
          <h3 className="text-2xl font-bold">Company Name Manager</h3>
        </div>
        <CompanyNameTool addCompany={addCompany} companyGroups={companyGroups} />
      </div>
      <CompanyNameTable data={companyData} onDelete={handleDelete} onEdit={handleEdit} />
    </AdaptableCard>
  );
};

export default CompanyName;