

// import React, { useState, useEffect, useCallback } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import AdaptableCard from '@/components/shared/AdaptableCard';
// import BranchTool from './components/BranchTool';
// import { EntityData } from '@/views/IHRC/store/dummyEntityData';
// import BranchTable from './components/BranchTable';
// import AddBranchForm from './components/BranchForm';

// interface BranchData extends EntityData {
//   Branch: string;
// }

// const Branch = () => {
//   const [branchData, setBranchData] = useState<BranchData[]>([]);
//   const [locationData, setLocationData] = useState<EntityData[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         // Load branch data
//         const storedBranchData = localStorage.getItem('branchData');
//         if (storedBranchData) {
//           setBranchData(JSON.parse(storedBranchData));
//         }

//         // Load location data
//         const storedLocationData = localStorage.getItem('locationData');
//         if (storedLocationData) {
//           const parsedLocationData = JSON.parse(storedLocationData);
//           setLocationData(parsedLocationData);
//           console.log('Location data loaded:', parsedLocationData);
//         } else {
//           console.log('No location data found in localStorage');
//         }
//       } catch (err) {
//         console.error('Error loading data:', err);
//         setError('Error loading data. Please try refreshing the page.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadData();
//   }, []);

//   const saveBranchData = useCallback((data: BranchData[]) => {
//     try {
//       localStorage.setItem('branchData', JSON.stringify(data));
//     } catch (err) {
//       console.error('Error saving branch data:', err);
//       setError('Error saving data. Please try again.');
//     }
//   }, []);

//   const addBranch = useCallback((newBranch: BranchData) => {
//     setBranchData(prevList => {
//       const updatedList = [...prevList, newBranch];
//       saveBranchData(updatedList);
//       return updatedList;
//     });
//   }, [saveBranchData]);

//   const handleDelete = useCallback((index: number) => {
//     setBranchData(prevList => {
//       const updatedList = prevList.filter((_, i) => i !== index);
//       saveBranchData(updatedList);
//       return updatedList;
//     });
//   }, [saveBranchData]);

//   const handleEdit = useCallback((index: number, newName: string) => {
//     setBranchData(prevData => {
//       const newData = [...prevData];
//       if (newData[index]) {
//         newData[index] = { ...newData[index], Branch: newName };
//         saveBranchData(newData);
//       }
//       return newData;
//     });
//   }, [saveBranchData]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-red-500">{error}</div>;
//   }

//   return (
//     <Routes>
//       <Route path="/" element={
//         <AdaptableCard className="h-full" bodyClass="h-full">
//           <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10">
//             <div className="mb-4 lg:mb-0">
//               <h3 className="text-2xl font-bold">Branch Manager</h3>
//             </div>
//             <BranchTool />
//           </div>
//           <BranchTable  
//             data={branchData} 
//             onDeleteBranch={handleDelete} 
//             onEdit={handleEdit} 
//           />
//         </AdaptableCard>
//       } />
//       <Route path="/add-branch" element={
//         <AddBranchForm 
//           addBranch={addBranch} 
//           locationData={locationData}
//         />
//       } />
//     </Routes>
//   );
// };

// export default Branch;


// import React, { useState, useEffect, useCallback } from 'react';
// import { Routes, Route, useNavigate } from 'react-router-dom';
// import AdaptableCard from '@/components/shared/AdaptableCard';
// import BranchTool from './components/BranchTool';
// import { EntityData } from '@/views/IHRC/store/dummyEntityData';
// import BranchTable from './components/BranchTable';
// import AddBranchForm from './components/BranchForm';

// interface BranchData extends EntityData {
//   Branch: string;
//   BranchAddress: string;
//   BranchOpeningDate: string;
//   BranchHeadCount: string;
//   AuthorityName: string;
//   AuthorityAddress: string;
// }

// const Branch = () => {
//   const [branchData, setBranchData] = useState<BranchData[]>([]);
//   const [locationData, setLocationData] = useState<EntityData[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         // Load branch data
//         const storedBranchData = localStorage.getItem('branchData');
//         if (storedBranchData) {
//           setBranchData(JSON.parse(storedBranchData));
//         }

//         // Load location data
//         const storedLocationData = localStorage.getItem('locationData');
//         if (storedLocationData) {
//           const parsedLocationData = JSON.parse(storedLocationData);
//           setLocationData(parsedLocationData);
//           console.log('Location data loaded:', parsedLocationData);
//         } else {
//           console.log('No location data found in localStorage');
//         }
//       } catch (err) {
//         console.error('Error loading data:', err);
//         setError('Error loading data. Please try refreshing the page.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadData();
//   }, []);

//   const saveBranchData = useCallback((data: BranchData[]) => {
//     try {
//       localStorage.setItem('branchData', JSON.stringify(data));
//     } catch (err) {
//       console.error('Error saving branch data:', err);
//       setError('Error saving data. Please try again.');
//     }
//   }, []);

//   const addBranch = useCallback((newBranch: BranchData) => {
//     setBranchData(prevList => {
//       const updatedList = [...prevList, newBranch];
//       saveBranchData(updatedList);
//       return updatedList;
//     });
//     navigate('/');
//   }, [saveBranchData, navigate]);

//   const handleDelete = useCallback((index: number) => {
//     setBranchData(prevList => {
//       const updatedList = prevList.filter((_, i) => i !== index);
//       saveBranchData(updatedList);
//       return updatedList;
//     });
//   }, [saveBranchData]);

//   const handleEdit = useCallback((index: number, newName: string) => {
//     setBranchData(prevData => {
//       const newData = [...prevData];
//       if (newData[index]) {
//         newData[index] = { ...newData[index], Branch: newName };
//         saveBranchData(newData);
//       }
//       return newData;
//     });
//   }, [saveBranchData]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-red-500">{error}</div>;
//   }

//   return (
//     <Routes>
//       <Route path="/" element={
//         <AdaptableCard className="h-full" bodyClass="h-full">
//           <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10">
//             <div className="mb-4 lg:mb-0">
//               <h3 className="text-2xl font-bold">Branch Manager</h3>
//             </div>
//             <BranchTool />
//           </div>
//           <BranchTable  
//             data={branchData} 
//             onDeleteBranch={handleDelete} 
//             onEdit={handleEdit} 
//           />
//         </AdaptableCard>
//       } />
//       <Route path="/add-branch" element={
//         <AddBranchForm 
//           addBranch={addBranch} 
//           locationData={locationData}
//         />
//       } />
//     </Routes>
//   );
// };

// export default Branch;

import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AdaptableCard from '@/components/shared/AdaptableCard';
import BranchTool from './components/BranchTool';
import { EntityData } from '@/views/IHRC/store/dummyEntityData';
import BranchTable from './components/BranchTable';
import AddBranchForm from './components/BranchForm';

interface BranchData extends EntityData {
  Branch: string;
  BranchAddress: string;
  BranchOpeningDate: string;
  BranchHeadCount: string;
  AuthorityName: string;
  AuthorityAddress: string;
}

const Branch = () => {
  const [branchData, setBranchData] = useState<BranchData[]>([]);
  const [locationData, setLocationData] = useState<EntityData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load branch data
        const storedBranchData = localStorage.getItem('branchData');
        if (storedBranchData) {
          setBranchData(JSON.parse(storedBranchData));
        }

        // Load location data
        const storedLocationData = localStorage.getItem('locationData');
        if (storedLocationData) {
          const parsedLocationData = JSON.parse(storedLocationData);
          setLocationData(parsedLocationData);
          console.log('Location data loaded:', parsedLocationData);
        } else {
          console.log('No location data found in localStorage');
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

  const saveBranchData = useCallback((data: BranchData[]) => {
    try {
      localStorage.setItem('branchData', JSON.stringify(data));
    } catch (err) {
      console.error('Error saving branch data:', err);
      setError('Error saving data. Please try again.');
    }
  }, []);

  const addBranch = useCallback((newBranch: BranchData) => {
    setBranchData(prevList => {
      const updatedList = [...prevList, newBranch];
      saveBranchData(updatedList);
      return updatedList;
    });
    navigate('/');
  }, [saveBranchData, navigate]);

  const handleDelete = useCallback((index: number) => {
    setBranchData(prevList => {
      const updatedList = prevList.filter((_, i) => i !== index);
      saveBranchData(updatedList);
      return updatedList;
    });
  }, [saveBranchData]);

  const handleEdit = useCallback((index: number, newName: string) => {
    setBranchData(prevData => {
      const newData = [...prevData];
      if (newData[index]) {
        newData[index] = { ...newData[index], Branch: newName };
        saveBranchData(newData);
      }
      return newData;
    });
  }, [saveBranchData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <Routes>
      <Route path="/" element={
        <AdaptableCard className="h-full" bodyClass="h-full">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10">
            <div className="mb-4 lg:mb-0">
              <h3 className="text-2xl font-bold">Branch Manager</h3>
            </div>
            <BranchTool />
          </div>
          <BranchTable  
            data={branchData} 
            onDeleteBranch={handleDelete} 
            onEdit={handleEdit} 
          />
        </AdaptableCard>
      } />
      <Route path="/add-branch" element={
        <AddBranchForm 
          addBranch={addBranch} 
          locationData={locationData}
        />
      } />
    </Routes>
  );
};

export default Branch;