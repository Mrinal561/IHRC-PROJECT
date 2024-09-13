import React, { useState, useEffect, useCallback } from 'react';
import AdaptableCard from '@/components/shared/AdaptableCard';
import DistrictTool from './components/DistrictTool';
import { EntityData } from '@/views/IHRC/store/dummyEntityData';
import DistrictTable from './components/DistrictTable';

const District = () => {
  const [districtData, setDistrictData] = useState<EntityData[]>([]);
  const [entityData, setEntityData] = useState<EntityData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load district data
        const storedDistrictData = localStorage.getItem('districtData');
        if (storedDistrictData) {
          setDistrictData(JSON.parse(storedDistrictData));
        }

        // Load company and state data
        const storedEntityDataList = localStorage.getItem('stateData');
        if (storedEntityDataList) {
          const parsedData = JSON.parse(storedEntityDataList);
          if (Array.isArray(parsedData)) {
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
        localStorage.setItem('districtData', JSON.stringify(districtData));
      } catch (err) {
        console.error('Error saving data:', err);
        setError('Error saving data. Please try again.');
      }
    };

    if (!isLoading) {
      saveData();
    }
  }, [districtData, isLoading]);

  const addDistricts = useCallback((newDistricts: EntityData[]) => {
    setDistrictData(prevList => [...prevList, ...newDistricts]);
  }, []);

  const handleDelete = useCallback((index: number) => {
    setDistrictData(prevList => prevList.filter((_, i) => i !== index));
  }, []);

  const handleEdit = useCallback((index: number, newName: string) => {
    setDistrictData(prevData => {
      const newData = [...prevData];
      if (newData[index]) {
        newData[index] = { ...newData[index], District: newName };
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
          <h3 className="text-2xl font-bold">District Manager</h3>
        </div>
        <DistrictTool 
          addDistricts={addDistricts} 
          entityData={entityData}
        />
      </div>
      <DistrictTable  
        data={districtData} 
        onDeleteDistrict={handleDelete} 
        onEdit={handleEdit} 
      />
    </AdaptableCard>
  );
};

export default District;