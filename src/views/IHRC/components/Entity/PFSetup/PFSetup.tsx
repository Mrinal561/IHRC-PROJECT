// import React, { useState, useEffect, useCallback } from 'react';
// import AdaptableCard from '@/components/shared/AdaptableCard';
// import PFSetupTable from './components/PFSetupTable';
// import PFSetupTool from './components/PFSetupTool';

// interface EntityData {
//   Company_Group_Name?: string;
//   Company_Name?: string;
// }

// interface PFSetupData {
//   companyGroup: string;
//   companyName: string;
//   pfCode: string;
//   pfCodeLocation: string;
//   pfUserId?: string;
//   pfPassword?: string;
//   authorizedSignatory: string;
//   signatoryMobile?: string;
//   signatoryEmail?: string;
//   dscValidDate?: string;
// }

// const PFSetup = () => {
//   const [pfSetupData, setPFSetupData] = useState<PFSetupData[]>([]);
//   const [entityData, setEntityData] = useState<EntityData[]>([]);
//   const [pfCodeLocations, setPFCodeLocations] = useState<string[]>([]);
//   const [existingSignatories, setExistingSignatories] = useState<string[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         setIsLoading(true);
//         // Load PF Setup data
//         const storedPFSetupData = localStorage.getItem('pfSetupData');
//         if (storedPFSetupData) {
//           setPFSetupData(JSON.parse(storedPFSetupData));
//         }

//         // Load entity data (company groups and names)
//         const storedEntityData = localStorage.getItem('companyData');
//         if (storedEntityData) {
//           setEntityData(JSON.parse(storedEntityData));
//         }

//         // Load other data (you might want to fetch these from an API in a real application)
//         setPFCodeLocations(['Location A', 'Location B', 'Location C']);
//         setExistingSignatories(['John Doe', 'Jane Smith', 'Bob Johnson']);
//       } catch (err) {
//         console.error('Error loading data:', err);
//         setError('Error loading data. Please try refreshing the page.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadData();
//   }, []);

//   useEffect(() => {
//     const saveData = () => {
//       try {
//         localStorage.setItem('pfSetupData', JSON.stringify(pfSetupData));
//       } catch (err) {
//         console.error('Error saving data:', err);
//         setError('Error saving data. Please try again.');
//       }
//     };

//     if (!isLoading) {
//       saveData();
//     }
//   }, [pfSetupData, isLoading]);

//   const addPFSetup = useCallback((newPFSetup: PFSetupData) => {
//     setPFSetupData(prevList => [...prevList, newPFSetup]);
//   }, []);

//   const handleDelete = useCallback((index: number) => {
//     setPFSetupData(prevList => prevList.filter((_, i) => i !== index));
//   }, []);

//   const handleEdit = useCallback((index: number, updatedPFSetup: PFSetupData) => {
//     setPFSetupData(prevData => {
//       const newData = [...prevData];
//       newData[index] = updatedPFSetup;
//       return newData;
//     });
//   }, []);

//   // Extract unique company groups
//   const companyGroups = Array.from(new Set(entityData.map(item => item.Company_Group_Name).filter((name): name is string => !!name)));

//   // Function to get company names for a specific group
//   const getCompanyNames = (group: string) => {
//     return entityData
//       .filter(item => item.Company_Group_Name === group)
//       .map(item => item.Company_Name)
//       .filter((name): name is string => !!name);
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-red-500">{error}</div>;
//   }

//   return (
//     <AdaptableCard className="h-full" bodyClass="h-full">
//       <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10">
//         <div className="mb-4 lg:mb-0">
//           <h3 className="text-2xl font-bold">PF Setup Manager</h3>
//         </div>
//         <PFSetupTool 
//           addPFSetup={addPFSetup} 
//           companyGroups={companyGroups}
//           getCompanyNames={getCompanyNames}
//           pfCodeLocations={pfCodeLocations}
//           existingSignatories={existingSignatories}
//         />
//       </div>
//       <PFSetupTable 
//         data={pfSetupData} 
//         onDelete={handleDelete} 
//         onEdit={handleEdit} 
//       />
//     </AdaptableCard>
//   );
// };

// export default PFSetup;



import React, { useState, useEffect, useCallback } from 'react';
import AdaptableCard from '@/components/shared/AdaptableCard';
import PFSetupTool from './components/PFSetupTool';
import PFSetupTable from './components/PFSetupTable';
// import { ErrorBoundary } from 'react-error-boundary';

export interface PFSetupData {
  Company_Group_Name: string;
  Company_Name: string;
  pfCode: string;
  pfCodeLocation: string;
  registrationDate?: string;
  pfUserId?: string;
  pfPassword?: string;
  authorizedSignatory: string;
  signatoryDesignation?: string;
  signatoryMobile?: string;
  signatoryEmail?: string;
  dscValidDate?: string;
  esign?: string;
  pfRegistrationCertificate?: File | null;
}

export interface EntityData {
  Company_Group_Name: string;
  Company_Name: string;
}

const ErrorFallback = ({ error }: { error: Error }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
};

const PFSetup: React.FC = () => {
  const [pfSetupData, setPFSetupData] = useState<PFSetupData[]>([]);
  const [entityData, setEntityData] = useState<EntityData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const pfCodeLocations = ['Location A', 'Location B', 'Location C'];
  const existingSignatories = ['John Doe', 'Jane Smith', 'Alice Johnson'];

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedPFSetupData = localStorage.getItem('pfSetupData');
        if (storedPFSetupData) {
          const parsedData = JSON.parse(storedPFSetupData);
          console.log('Loaded PF Setup data:', parsedData);
          setPFSetupData(parsedData);
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
        console.log('Saving PF Setup data:', pfSetupData);
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
    console.log('Adding new PF Setup:', newPFSetup); // Debugging log

    setPFSetupData((prevList) => {
        const updatedList = [...prevList, newPFSetup];

        console.log('Updated PF Setup list:', updatedList); // Debugging log

        return updatedList;
    });
}, []);

  const handleDelete = useCallback((index: number) => {
    console.log('Deleting PF Setup at index:', index);
    setPFSetupData(prevList => {
      const updatedList = prevList.filter((_, i) => i !== index);
      console.log('Updated PF Setup list after deletion:', updatedList);
      return updatedList;
    });
  }, []);

  const handleEdit = useCallback((index: number, updatedData: Partial<PFSetupData>) => {
    console.log('Editing PF Setup at index:', index, 'with data:', updatedData);
    setPFSetupData(prevData => {
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
            <h3 className="text-2xl font-bold">PF Setup Manager</h3>
          </div>
          <PFSetupTool 
            addPFSetup={addPFSetup} 
            entityData={entityData}
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