// import React, { useState } from 'react'
// import ComplianceCertificateDetails from './components/ComplianceCertificateDetails'
// import { Button, Dialog, toast, Notification, Dropdown } from '@/components/ui'
// import { FaDownload } from 'react-icons/fa6';
// import { HiDownload } from 'react-icons/hi';
// import CompanyLocationDropdowns from './components/CompanyLocationDropdown';

// const DownloadCertificateButton = () => {
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [selectedYear, setSelectedYear] = useState("Year")
//   const [selectedMonth, setSelectedMonth] = useState("Month")
  

//   const handleAssignClick = () => {
//       setIsDialogOpen(true);
//   };

//   const handleConfirm = () => {
//       setIsDialogOpen(false);
//       toast.push(
//         <Notification
//           title="Success"
//           type="success"
//         >
//           Certificate downloaded successfully!
//         </Notification>,
//         {
//           placement: 'top-end',
//         }
//       );
//     };

//   const handleCancel = () => {
//       setIsDialogOpen(false);
//   };

//   const yearOptions = [
//     { key: '2021', name: '2021' },
//     { key: '2022', name: '2022' },
//     { key: '2023', name: '2023' },
//     { key: '2024', name: '2024' },
//   ]

//   const monthOptions = [
//     { key: '1', name: 'January' },
//     { key: '2', name: 'February' },
//     { key: '3', name: 'March' },
//     { key: '4', name: 'April' },
//     { key: '5', name: 'May' },
//     { key: '6', name: 'June' },
//     { key: '7', name: 'July' },
//     { key: '8', name: 'August' },
//     { key: '9', name: 'September' },
//     { key: '10', name: 'October' },
//     { key: '11', name: 'November' },
//     { key: '12', name: 'December' },
//   ];

//   const handleSelect = (key) => {
//     const selected = monthOptions.find(item => item.key === key);
//     if (selected) {
//       setSelectedMonth(selected.name); // Update the title
//     }
//   };

//   const handleYear = (key) => {
//     const selected = yearOptions.find(item => item.key === key);
//     if (selected) {
//       setSelectedYear(selected.name); // Update the title
//     }
//   };

//   return (
//       <div className='flex gap-2 justify-center items-center'>
//         <div className='border rounded-md'>
//         <CompanyLocationDropdowns />
//         </div>
//         <div className='border rounded-md'>
//         <Dropdown title={selectedMonth} onSelect={handleSelect} className='fl'>
//                 {monthOptions.map((item) => (
//                     <Dropdown.Item
//                         eventKey={item.key}
//                         key={item.key}
//                         >
//                         {item.name}
//                     </Dropdown.Item>
//                 ))}
//             </Dropdown>
//         </div>
//         <div className='border rounded-md '>
//             <Dropdown title={selectedYear} onSelect={handleYear}>
//                 {yearOptions.map((item) => (
//                   <Dropdown.Item
//                   eventKey={item.key}
//                   key={item.key}
//                   >
//                         {item.name}
//                     </Dropdown.Item>
//                 ))}
//             </Dropdown>
//            </div>  
//           <Button
//               variant="solid"
//               size="sm"
//               icon={<HiDownload />}
//               onClick={handleAssignClick}
//           >
//               Download Certificates
//           </Button>

//           <Dialog
//               isOpen={isDialogOpen}
//               onClose={handleCancel}
//               width={400}
//           >
//               <h5 className="mb-4">Confirm Download</h5>
//               <p>Are you sure you want to download certificate?</p>
//               <div className="mt-6 text-right">
//                   <Button
//                       size="sm"
//                       className="mr-2"
//                       onClick={handleCancel}
//                   >
//                       Cancel
//                   </Button>
//                   <Button
//                       variant="solid"
//                       size="sm"
//                       onClick={handleConfirm}
//                   >
//                       Confirm
//                   </Button>
//               </div>
//           </Dialog>
//       </div>
//   );
// };

// const ComplianceCertificate = () => {
//   return (
//     <>
//     <div className="lg:flex items-center justify-between mb-8">
//       <div>
//                 <h3 className="mb-4 lg:mb-0">Compliance Certificate</h3>
//       </div>
//       <div>

//       <DownloadCertificateButton />
//       </div>
//     </div>
//       <ComplianceCertificateDetails />
//     </>
//   )
// }

// export default ComplianceCertificate

import React, { useState } from 'react'
import ComplianceCertificateDetails from './components/ComplianceCertificateDetails'
import { Button, Dialog, toast, Notification, Dropdown } from '@/components/ui'
import { FaDownload } from 'react-icons/fa6';
import { HiDownload } from 'react-icons/hi';
import Company from '../../Home/components/Company';

const DownloadCertificateButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("Year")
  const [selectedMonth, setSelectedMonth] = useState("Month")
  const [selectedCompany, setSelectedCompany] = useState("Company")
  const [selectedLocation, setSelectedLocation] = useState("Location")

  const handleAssignClick = () => {
      setIsDialogOpen(true);
  };

  const handleConfirm = () => {
      setIsDialogOpen(false);
      toast.push(
        <Notification
          title="Success"
          type="success"
        >
          Certificate downloaded successfully!
        </Notification>,
        {
          placement: 'top-end',
        }
      );
    };

  const handleCancel = () => {
      setIsDialogOpen(false);
  };

  const yearOptions = [
    { key: '2021', name: '2021' },
    { key: '2022', name: '2022' },
    { key: '2023', name: '2023' },
    { key: '2024', name: '2024' },
  ]

  const monthOptions = [
    { key: '1', name: 'January' },
    { key: '2', name: 'February' },
    { key: '3', name: 'March' },
    { key: '4', name: 'April' },
    { key: '5', name: 'May' },
    { key: '6', name: 'June' },
    { key: '7', name: 'July' },
    { key: '8', name: 'August' },
    { key: '9', name: 'September' },
    { key: '10', name: 'October' },
    { key: '11', name: 'November' },
    { key: '12', name: 'December' },
  ];

  const companyOptions = [
    { key: 'apple', name: 'Apple' },
    { key: 'google', name: 'Google' },
    { key: 'microsoft', name: 'Microsoft' },
    { key: 'amazon', name: 'Amazon' },
    {key:'tcs',name:'TCS'},
    {key:'paypal', name:'Paypal'}
  ];

  const locationOptions = [
    { key: 'nd', name: 'Delhi' },
    { key: 'mh', name: 'Maharashtra' },
    { key: 'bg', name: 'Bengaluru' },
    { key: 'mb', name: 'Mumbai' },
    { key: 'pu', name: 'Pune' },
  ];

  const handleSelect = (key, options, setter) => {
    const selected = options.find(item => item.key === key);
    if (selected) {
      setter(selected.name);
    }
  };

  return (
      <div className='flex gap-2 justify-center items-center'>
        {/* <div className='border rounded-md'>
          <Dropdown title={selectedCompany} onSelect={(key) => handleSelect(key, companyOptions, setSelectedCompany)}>
            {companyOptions.map((item) => (
              <Dropdown.Item
                eventKey={item.key}
                key={item.key}
              >
                {item.name}
              </Dropdown.Item>
            ))}
          </Dropdown>
        </div> */}
        {/* <div className='border rounded-md'>
          <Dropdown title={selectedLocation} onSelect={(key) => handleSelect(key, locationOptions, setSelectedLocation)}>
            {locationOptions.map((item) => (
              <Dropdown.Item
                eventKey={item.key}
                key={item.key}
              >
                {item.name}
              </Dropdown.Item>
            ))}
          </Dropdown>
        </div> */}
        <div className='border rounded-md'>
          <Dropdown title={selectedYear} onSelect={(key) => handleSelect(key, yearOptions, setSelectedYear)}>
            {yearOptions.map((item) => (
              <Dropdown.Item
                eventKey={item.key}
                key={item.key}
              >
                {item.name}
              </Dropdown.Item>
            ))}
          </Dropdown>
        </div>
        <div className='border rounded-md'>
          <Dropdown title={selectedMonth} onSelect={(key) => handleSelect(key, monthOptions, setSelectedMonth)}>
            {monthOptions.map((item) => (
              <Dropdown.Item
                eventKey={item.key}
                key={item.key}
              >
                {item.name}
              </Dropdown.Item>
            ))}
          </Dropdown>
        </div>
        {/* <Button
            variant="solid"
            size="sm"
            icon={<HiDownload />}
            onClick={handleAssignClick}
        >
            Download Certificates
        </Button> */}

        <Dialog
            isOpen={isDialogOpen}
            onClose={handleCancel}
            width={400}
        >
            <h5 className="mb-4">Confirm Download</h5>
            <p>Are you sure you want to download certificate?</p>
            <div className="mt-6 text-right">
                <Button
                    size="sm"
                    className="mr-2"
                    onClick={handleCancel}
                >
                    Cancel
                </Button>
                <Button
                    variant="solid"
                    size="sm"
                    onClick={handleConfirm}
                >
                    Confirm
                </Button>
            </div>
        </Dialog>
      </div>
  );
};

const ComplianceCertificate = () => {
  return (
    <>
   <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10">
                <div className="mb-4 lg:mb-0">
                    <h3 className="text-2xl font-bold">Compliance Certificate</h3>
                    <p className="text-gray-600">View your company's Compliance Certificate</p>
                </div>
            </div>
    <div className='mb-8'>
    <Company />
    </div>
      <ComplianceCertificateDetails />
    </>
  )
}

export default ComplianceCertificate;