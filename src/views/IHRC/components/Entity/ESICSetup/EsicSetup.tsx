import React, { useState, useEffect, useCallback } from 'react';
import AdaptableCard from '@/components/shared/AdaptableCard';
import EsicSetupTable from './components/EsicSetupTable';
import EsicSetupTool from './components/EsicSetupTool';

export interface ESICSetupData {
  Company_Group_Name: string;
  Company_Name: string;
  esicCode: string;
  esicCodeType: string;
  esicCodeLocation: string;
  esicUserId?: string;
  esicPassword?: string;
  authorizedSignatory: string;
  signatoryDesignation?: string;
  signatoryMobile?: string;
  signatoryEmail?: string;
  esicRegistrationCertificate?: File | null;
}

export interface EntityData {
  Company_Group_Name: string;
  Company_Name: string;
}

const EsicSetup: React.FC = () => {
  const [esicSetupData, setEsicSetupData] = useState<ESICSetupData[]>([]);
  const [entityData, setEntityData] = useState<EntityData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const esicCodeLocations = ['Location A', 'Location B', 'Location C'];
  const existingSignatories = ['Amit', 'Krishna Kumar Singh', 'Ajay Thakur'];

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedPFSetupData = localStorage.getItem('esicSetupData');
        if (storedPFSetupData) {
          const parsedData = JSON.parse(storedPFSetupData);
          console.log('Loaded PF Setup data:', parsedData);
          setEsicSetupData(parsedData);
        }

        const storedEntityDataList = localStorage.getItem('companyData');
        if (storedEntityDataList) {
          const parsedData = JSON.parse(storedEntityDataList);
          if (Array.isArray(parsedData)) {
            console.log('Loaded entity data:', parsedData);
            setEntityData(parsedData);
          }
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
        console.log('Saving PF Setup data:', esicSetupData);
        localStorage.setItem('esicSetupData', JSON.stringify(esicSetupData));
      } catch (err) {
        console.error('Error saving data:', err);
        setError('Error saving data. Please try again.');
      }
    };

    if (!isLoading) {
      saveData();
    }
  }, [esicSetupData, isLoading]);

  const addESICSetup = useCallback((newPFSetup: ESICSetupData) => {
    console.log('Adding new PF Setup:', newPFSetup); // Debugging log

    setEsicSetupData((prevList) => {
        const updatedList = [...prevList, newPFSetup];

        console.log('Updated PF Setup list:', updatedList); // Debugging log

        return updatedList;
    });
}, []);

  const handleDelete = useCallback((index: number) => {
    console.log('Deleting PF Setup at index:', index);
    setEsicSetupData(prevList => {
      const updatedList = prevList.filter((_, i) => i !== index);
      console.log('Updated PF Setup list after deletion:', updatedList);
      return updatedList;
    });
  }, []);

  const handleEdit = useCallback((index: number, updatedData: Partial<ESICSetupData>) => {
    console.log('Editing PF Setup at index:', index, 'with data:', updatedData);
    setEsicSetupData(prevData => {
      const newData = [...prevData];
      if (newData[index]) {
        newData[index] = { ...newData[index], ...updatedData };
      }
      console.log('Updated PF Setup list after edit:', newData);
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
            <h3 className="text-2xl font-bold">ESIC Setup Manager</h3>
          </div>
          <EsicSetupTool 
            addESICSetup={addESICSetup} 
            entityData={entityData}
            esicCodeLocations={esicCodeLocations}
            existingSignatories={existingSignatories}
          />
        </div>
        <EsicSetupTable  
          data={esicSetupData} 
          onDelete={handleDelete} 
          onEdit={handleEdit} 
        />
      </AdaptableCard>
  );
};

export default EsicSetup;