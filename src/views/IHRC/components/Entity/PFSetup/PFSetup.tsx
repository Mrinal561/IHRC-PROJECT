import React, { useState, useEffect, useCallback } from 'react';
import AdaptableCard from '@/components/shared/AdaptableCard';
import PFSetupTable from './components/PFSetupTable';
import PFSetupTool from './components/PFSetupTool';

interface EntityData {
  Company_Group_Name?: string;
  Company_Name?: string;
}

interface PFSetupData {
  companyGroup: string;
  companyName: string;
  pfCode: string;
  pfCodeLocation: string;
  pfUserId?: string;
  pfPassword?: string;
  authorizedSignatory: string;
  signatoryMobile?: string;
  signatoryEmail?: string;
  dscValidDate?: string;
}

const PFSetup = () => {
  const [pfSetupData, setPFSetupData] = useState<PFSetupData[]>([]);
  const [entityData, setEntityData] = useState<EntityData[]>([]);
  const [pfCodeLocations, setPFCodeLocations] = useState<string[]>([]);
  const [existingSignatories, setExistingSignatories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load PF Setup data
        const storedPFSetupData = localStorage.getItem('pfSetupData');
        if (storedPFSetupData) {
          setPFSetupData(JSON.parse(storedPFSetupData));
        }

        // Load entity data (company groups and names)
        const storedEntityData = localStorage.getItem('entityDataList');
        if (storedEntityData) {
          setEntityData(JSON.parse(storedEntityData));
        }

        // Load other data (you might want to fetch these from an API in a real application)
        setPFCodeLocations(['Location A', 'Location B', 'Location C']);
        setExistingSignatories(['John Doe', 'Jane Smith', 'Bob Johnson']);
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
        localStorage.setItem('pfSetupData', JSON.stringify(pfSetupData));
      } catch (err) {
        console.error('Error saving data:', err);
        setError('Error saving data. Please try again.');
      }
    };

    if (!isLoading) {
      saveData();
    }
  }, [pfSetupData, isLoading]);

  const addPFSetup = useCallback((newPFSetup: PFSetupData) => {
    setPFSetupData(prevList => [...prevList, newPFSetup]);
  }, []);

  const handleDelete = useCallback((index: number) => {
    setPFSetupData(prevList => prevList.filter((_, i) => i !== index));
  }, []);

  const handleEdit = useCallback((index: number, updatedPFSetup: PFSetupData) => {
    setPFSetupData(prevData => {
      const newData = [...prevData];
      newData[index] = updatedPFSetup;
      return newData;
    });
  }, []);

  // Extract unique company groups and names from entityData
  const companyGroups = Array.from(new Set(entityData.map(item => item.Company_Group_Name).filter((name): name is string => !!name)));
  const companyNames = Array.from(new Set(entityData.map(item => item.Company_Name).filter((name): name is string => !!name)));

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
          <h3 className="text-2xl font-bold">PF Setup Manager</h3>
        </div>
        <PFSetupTool 
          addPFSetup={addPFSetup} 
          companyGroups={companyGroups}
          companyNames={companyNames}
          pfCodeLocations={pfCodeLocations}
          existingSignatories={existingSignatories}
        />
      </div>
      <PFSetupTable 
        data={pfSetupData} 
        onDelete={handleDelete} 
        onEdit={handleEdit} 
      />
    </AdaptableCard>
  );
};

export default PFSetup;