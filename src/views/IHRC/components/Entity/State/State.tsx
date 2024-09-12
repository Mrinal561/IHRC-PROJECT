
import React, { useState, useEffect, useCallback } from 'react';
import AdaptableCard from '@/components/shared/AdaptableCard';
import StateTool from './components/StateTool';
import { EntityData } from '@/views/IHRC/store/dummyEntityData';
import StateTable from './components/StateTable';

const State = () => {
  const [stateData, setStateData] = useState<EntityData[]>([]);
  const [entityData, setEntityData] = useState<EntityData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load state data
        const storedStateData = localStorage.getItem('stateData');
        if (storedStateData) {
          setStateData(JSON.parse(storedStateData));
        }

        // Load company data
        const storedEntityDataList = localStorage.getItem('companyData');
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
        localStorage.setItem('stateData', JSON.stringify(stateData));
      } catch (err) {
        console.error('Error saving data:', err);
        setError('Error saving data. Please try again.');
      }
    };

    if (!isLoading) {
      saveData();
    }
  }, [stateData, isLoading]);

  const addState = useCallback((newState: EntityData) => {
    setStateData(prevList => [...prevList, newState]);
  }, []);

  const handleDelete = useCallback((index: number) => {
    setStateData(prevList => prevList.filter((_, i) => i !== index));
  }, []);

  const handleEdit = useCallback((index: number, newName: string) => {
    setStateData(prevData => {
      const newData = [...prevData];
      if (newData[index]) {
        newData[index] = { ...newData[index], State: newName };
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
          <h3 className="text-2xl font-bold">State Manager</h3>
        </div>
        <StateTool 
          addState={addState} 
          entityData={entityData}
        />
      </div>
      <StateTable  
        data={stateData} 
        onDeleteCompanyName={handleDelete} 
        onEdit={handleEdit} 
      />
    </AdaptableCard>
  );
};

export default State;