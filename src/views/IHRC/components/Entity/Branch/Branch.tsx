import React, { useState, useEffect, useCallback } from 'react';
import AdaptableCard from '@/components/shared/AdaptableCard';
import BranchTool from './components/BranchTool';
import { EntityData } from '@/views/IHRC/store/dummyEntityData';
import BranchTable from './components/BranchTable';

interface BranchData extends EntityData {
  Branch: string;
}

const Branch = () => {
  const [branchData, setBranchData] = useState<BranchData[]>([]);
  const [entityData, setEntityData] = useState<EntityData[]>([]);
  const [locationData, setLocationData] = useState<EntityData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load branch data
        const storedBranchData = localStorage.getItem('branchData');
        if (storedBranchData) {
          setBranchData(JSON.parse(storedBranchData));
        }

        // Load company data
        const storedEntityDataList = localStorage.getItem('locationData');
        if (storedEntityDataList) {
          const parsedData = JSON.parse(storedEntityDataList);
          if (Array.isArray(parsedData)) {
            setEntityData(parsedData);
          }
        }

        // Load location data
        const storedLocationData = localStorage.getItem('locationData');
        if (storedLocationData) {
          setLocationData(JSON.parse(storedLocationData));
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
        localStorage.setItem('branchData', JSON.stringify(branchData));
      } catch (err) {
        console.error('Error saving data:', err);
        setError('Error saving data. Please try again.');
      }
    };

    if (!isLoading) {
      saveData();
    }
  }, [branchData, isLoading]);

  const addBranch = useCallback((newBranch: BranchData) => {
    setBranchData(prevList => [...prevList, newBranch]);
  }, []);

  const handleDelete = useCallback((index: number) => {
    setBranchData(prevList => prevList.filter((_, i) => i !== index));
  }, []);

  const handleEdit = useCallback((index: number, newName: string) => {
    setBranchData(prevData => {
      const newData = [...prevData];
      if (newData[index]) {
        newData[index] = { ...newData[index], Branch: newName };
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
          <h3 className="text-2xl font-bold">Branch Manager</h3>
        </div>
        <BranchTool 
          addBranch={addBranch} 
          entityData={entityData}
          locationData={locationData}
        />
      </div>
      <BranchTable  
        data={branchData} 
        onDeleteBranch={handleDelete} 
        onEdit={handleEdit} 
      />
    </AdaptableCard>
  );
};

export default Branch;