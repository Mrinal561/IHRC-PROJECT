import React, { useState, useEffect, useCallback } from 'react';
import AdaptableCard from '@/components/shared/AdaptableCard';
import LocationTool from './components/LocationTool';
import { EntityData } from '@/views/IHRC/store/dummyEntityData';
import LocationTable from './components/LocationTable';


const Location = () => {
  const [locationData, setLocationData] = useState<EntityData[]>([]);
  const [entityData, setEntityData] = useState<EntityData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load location data
        const storedLocationData = localStorage.getItem('locationData');
        if (storedLocationData) {
          setLocationData(JSON.parse(storedLocationData));
        }

        // Load company data
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
        localStorage.setItem('locationData', JSON.stringify(locationData));
      } catch (err) {
        console.error('Error saving data:', err);
        setError('Error saving data. Please try again.');
      }
    };

    if (!isLoading) {
      saveData();
    }
  }, [locationData, isLoading]);

  const addLocation = useCallback((newLocation: EntityData) => {
    setLocationData(prevList => [...prevList, newLocation]);
  }, []);

  const handleDelete = useCallback((index: number) => {
    setLocationData(prevList => prevList.filter((_, i) => i !== index));
  }, []);

  const handleEdit = useCallback((index: number, newName: string) => {
    setLocationData(prevData => {
      const newData = [...prevData];
      if (newData[index]) {
        newData[index] = { ...newData[index], Location: newName };
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
          <h3 className="text-2xl font-bold">Location Manager</h3>
        </div>
        <LocationTool 
          addLocation={addLocation} 
          entityData={entityData}
        />
      </div>
      <LocationTable  
        data={locationData} 
        onDeleteLocation={handleDelete} 
        onEdit={handleEdit} 
      />
    </AdaptableCard>
  );
};

export default Location;