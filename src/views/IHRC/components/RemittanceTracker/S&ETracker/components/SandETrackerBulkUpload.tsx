// import React, { useState } from 'react';
// import { Button, Dialog, Input, Notification, toast } from '@/components/ui';
// import { HiDownload, HiUpload } from 'react-icons/hi';
// import { useNavigate } from 'react-router-dom';

// const documentPath = "../store/AllMappedCompliancesDetails.xls";


// interface SandETrackerBulkUploadProps {
//     onUploadConfirm: () => void;
//   }


// const SandETrackerBulkUpload: React.FC<SandETrackerBulkUploadProps> = ({ onUploadConfirm }) => {
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [remark, setRemark] = useState('');
//   const [file, setFile] = useState<File | null>(null);
//   const navigate = useNavigate();

//   const handleUploadClick = () => {
//     setIsDialogOpen(true);
//   };

//   const handleConfirm = () => {
//     setIsDialogOpen(false);
//     navigate('/uploadeds&eDetails')    
//   };


//   const handleCancel = () => {
//     setIsDialogOpen(false);
//     setRemark('');
//     setFile(null);
//   };

//   const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.preventDefault();
//     // Implement the download functionality here
//     // For example, you could use the `fetch` API to download the file
//     fetch(documentPath)
//       .then(response => response.blob())
//       .then(blob => {
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.style.display = 'none';
//         a.href = url;
//         a.download = 'AllMappedCompliancesDetails.xls';
//         document.body.appendChild(a);
//         a.click();
//         window.URL.revokeObjectURL(url);
//       })
//       .catch(() => console.error('Download failed'));
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       setFile(event.target.files[0]);
//     }
//   };

//   return (
//     <>
//       <Button 
//         variant="solid" 
//         size="sm" 
//         icon={<HiUpload />} 
//         onClick={handleUploadClick}
//       >
//         Upload S&E
//       </Button>

//       <Dialog
//         isOpen={isDialogOpen}
//         onClose={handleCancel}
//         width={450}
//       >
//         <h5 className="mb-4">Upload S&E</h5>
//         <div className="my-4 flex gap-2 items-center">
//           <p>Download S&E Upload Format</p>
//           <a href={documentPath} onClick={handleDownload} className="text-blue-600 hover:underline">
//             <Button size="xs" icon={<HiDownload />}>Download</Button>
//           </a>
//         </div>
//         <div className="flex flex-col gap-2">
//           <p>Upload S&E File:</p>
//           <Input
//             type="file"
//             onChange={handleFileChange}
//             className="mb-4"
//           />
//         </div>
//         <p>Please Enter the Remark:</p>
//         <textarea
//           className="w-full p-2 border rounded mb-2"
//           rows={3}
//           placeholder="Enter remark"
//           value={remark}
//           onChange={(e) => setRemark(e.target.value)}
//         />
//         <div className="mt-6 text-right">
//           <Button
//             size="sm"
//             className="mr-2"
//             onClick={handleCancel}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="solid"
//             size="sm"
//             onClick={handleConfirm}
//           >
//             Confirm
//           </Button>
//         </div>
//       </Dialog>
//     </>
//   );
// };

// export default SandETrackerBulkUpload;

import React, { useState } from 'react';
import { Button, DatePicker, Dialog } from '@/components/ui';
import { HiPlus } from 'react-icons/hi';
import OutlinedInput from '@/components/ui/OutlinedInput';

const NoticeUploadDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    serialNumber: '',
    companyGroupName: '',
    entityName: '',
    state: '',
    location: '',
    noticeType: '',
    noticeReceivedDate: null,
    letterNumber: '',
    relatedAct: '',
    noticeCopy: null,
    noticeDetails: ''
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFormData(prev => ({
        ...prev,
        noticeCopy: event.target.files![0]
      }));
    }
  };

  const handleSubmit = () => {
    console.log(formData);
    handleClose();
  };

  const handleClose = () => {
    setIsOpen(false);
    setFormData({
      serialNumber: '',
      companyGroupName: '',
      entityName: '',
      state: '',
      location: '',
      noticeType: '',
      noticeReceivedDate: null,
      letterNumber: '',
      relatedAct: '',
      noticeCopy: null,
      noticeDetails: ''
    });
  };

  return (
    <>
      <Button
        variant="solid"
        size="sm"
        icon={<HiPlus />}
        onClick={() => setIsOpen(true)}
      >
        Add Notice
      </Button>

      <Dialog
        isOpen={isOpen}
        onClose={handleClose}
        width={800}
        height={600}
      >
        <h5 className="mb-4">Upload Notice Details</h5>

        <div className="p-4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Row 1 */}
          <div className="flex gap-4 items-center">
            <div className="flex flex-col gap-2 w-1/3">
              <label>S.N.</label>
              <OutlinedInput 
                label="Serial Number"
                value={formData.serialNumber}
                onChange={(value) => handleChange('serialNumber', value)}
              />
            </div>
            <div className="flex flex-col gap-2 w-2/3">
              <label>Company Group Name</label>
              <OutlinedInput 
                label="Company Group Name"
                value={formData.companyGroupName}
                onChange={(value) => handleChange('companyGroupName', value)}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex gap-4 items-center">
            <div className="flex flex-col gap-2 w-1/2">
              <label>Entity Name</label>
              <OutlinedInput 
                label="Entity Name"
                value={formData.entityName}
                onChange={(value) => handleChange('entityName', value)}
              />
            </div>
            <div className="flex flex-col gap-2 w-1/4">
              <label>State</label>
              <OutlinedInput 
                label="State"
                value={formData.state}
                onChange={(value) => handleChange('state', value)}
              />
            </div>
            <div className="flex flex-col gap-2 w-1/4">
              <label>Location</label>
              <OutlinedInput 
                label="Location"
                value={formData.location}
                onChange={(value) => handleChange('location', value)}
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex gap-4 items-center">
            <div className="flex flex-col gap-2 w-1/2">
              <label>Notice Type</label>
              <OutlinedInput 
                label="Notice Type"
                value={formData.noticeType}
                onChange={(value) => handleChange('noticeType', value)}
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <label>Notice Received on</label>
              <DatePicker
                size="sm"
                placeholder="Select Date"
                value={formData.noticeReceivedDate}
                onChange={(date) => handleChange('noticeReceivedDate', date)}
              />
            </div>
          </div>

          {/* Row 4 */}
          <div className="flex gap-4 items-center">
            <div className="flex flex-col gap-2 w-1/2">
              <label>Letter no / Notice reference number</label>
              <OutlinedInput 
                label="Reference Number"
                value={formData.letterNumber}
                onChange={(value) => handleChange('letterNumber', value)}
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <label>Notice related to which Act</label>
              <OutlinedInput 
                label="Related Act"
                value={formData.relatedAct}
                onChange={(value) => handleChange('relatedAct', value)}
              />
            </div>
          </div>

          {/* Row 5 */}
          <div className="flex gap-4 items-center">
            <div className="flex flex-col gap-2 w-full">
              <label>Notice Copy (Mandatory)</label>
              <input 
                type="file"
                onChange={handleFileChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          {/* Row 6 */}
          {/* <div className="flex gap-4 items-center">
            <div className="flex flex-col gap-2 w-full">
              <label>Details of Notice</label>
              <textarea
                className="w-full p-2 border rounded-md h-24"
                value={formData.noticeDetails}
                onChange={(e) => handleChange('noticeDetails', e.target.value)}
                placeholder="Enter Notice Details"
              />
            </div>
          </div> */}
        </div>

        <div className="flex justify-end mt-6 p-4 ">
          <Button 
            variant="plain" 
            onClick={handleClose} 
            className="mr-2"
          >
            Cancel
          </Button>
          <Button 
            variant="solid" 
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default NoticeUploadDialog;