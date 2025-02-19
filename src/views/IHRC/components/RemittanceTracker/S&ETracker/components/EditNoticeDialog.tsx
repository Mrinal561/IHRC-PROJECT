// import React, { useState, useEffect } from 'react';
// import { Button, DatePicker, Dialog, Input } from '@/components/ui';
// import OutlinedInput from '@/components/ui/OutlinedInput';
// import OutlinedSelect from '@/components/ui/Outlined/Outlined';
// import { toast, Notification } from '@/components/ui';
// import { useDispatch } from 'react-redux';
// import { fetchNoticeById, updateNotice } from '@/store/slices/noticeTracker/noticeTrackerSlice';
// import { showErrorNotification } from '@/components/ui/ErrorMessage';

// interface EditNoticeDialogProps {
//   isOpen: boolean;
//   onClose: () => void;
//   noticeId: number | null;
//   onSuccess?: () => void;
// }

// const EditNoticeDialog: React.FC<EditNoticeDialogProps> = ({
//   isOpen,
//   onClose,
//   noticeId,
//   onSuccess
// }) => {
//   const dispatch = useDispatch();
//   const [isLoading, setIsLoading] = useState(false);
//   const [fileBase64, setFileBase64] = useState<string>('');
  
//   const initialFormData = {
//     notice_type: '',
//     notice_date: null,
//     reference_number: '',
//     related_act: '',
//     notice_document: null,
//   };
  
//   const [formData, setFormData] = useState(initialFormData);

//   // Notice type options
//   const noticeTypeOptions = [
//     { value: 'inspection', label: 'Inspection' },
//     { value: 'show_cause', label: 'Show Cause' },
//     { value: 'demand', label: 'Demand' },
//     { value: 'other', label: 'Other' }
//   ];

//   useEffect(() => {
//     const loadNoticeData = async () => {
//       if (noticeId) {
//         try {
//           setIsLoading(true);
//           const response = await dispatch(fetchNoticeById(noticeId)).unwrap();
          
//           setFormData({
//             notice_type: response.notice_type || '',
//             notice_date: response.notice_date || null,
//             reference_number: response.reference_number || '',
//             related_act: response.related_act || '',
//             notice_document: response.notice_document || null,
//           });
//         } catch (error) {
//           console.error('Failed to load notice:', error);
//           showErrorNotification('Failed to load notice details');
//         } finally {
//           setIsLoading(false);
//         }
//       }
//     };

//     if (isOpen && noticeId) {
//       loadNoticeData();
//     }
//   }, [dispatch, noticeId, isOpen]);

//   const handleChange = (field: string, value: any) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       try {
//         const base64String = await convertToBase64(file);
//         setFileBase64(base64String);
//         setFormData(prev => ({
//           ...prev,
//           notice_document: base64String
//         }));
//       } catch (error) {
//         console.error('Error converting file:', error);
//         showErrorNotification('Error processing file');
//       }
//     }
//   };

//   const convertToBase64 = (file: File): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const base64String = (reader.result as string).split(',')[1];
//         resolve(base64String);
//       };
//       reader.onerror = reject;
//       reader.readAsDataURL(file);
//     });
//   };

//   const handleSubmit = async () => {
//     if (!noticeId) return;

//     try {
//       setIsLoading(true);
//       await dispatch(updateNotice({ id: noticeId, ...formData })).unwrap();
      
//       toast.push(
//         <Notification title="Success" type="success">
//           Notice updated successfully
//         </Notification>
//       );
//       onSuccess?.();
//       onClose();
//     } catch (error) {
//       console.error('Failed to update notice:', error);
//       showErrorNotification('Failed to update notice');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Dialog
//       isOpen={isOpen}
//       onClose={onClose}
//       width={800}
//     >
//       <div className="p-6">
//         <h5 className="text-lg font-semibold mb-6">Edit Notice Details</h5>

//         <div className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <label className="text-sm font-medium">Notice Type</label>
//               <OutlinedSelect
//                 label="Select Notice Type"
//                 options={noticeTypeOptions}
//                 value={noticeTypeOptions.find(option => option.value === formData.notice_type)}
//                 onChange={(option) => handleChange('notice_type', option?.value || '')}
//               />
//             </div>
//             <div className="space-y-2">
//               <label className="text-sm font-medium">Notice Received on</label>
//               <DatePicker
//                 clearable
//                 size="sm"
//                 placeholder="Select Date"
//                 value={formData.notice_date}
//                 onChange={(date) => handleChange('notice_date', date)}
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <label className="text-sm font-medium">Letter/ Notice reference number</label>
//               <OutlinedInput 
//                 label="Reference Number"
//                 value={formData.reference_number}
//                 onChange={(value) => handleChange('reference_number', value)}
//               />
//             </div>
//             <div className="space-y-2">
//               <label className="text-sm font-medium">Notice related to which Act</label>
//               <OutlinedInput 
//                 label="Related Act"
//                 value={formData.related_act}
//                 onChange={(value) => handleChange('related_act', value)}
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-medium">Update Notice Document</label>
//             <Input 
//               type="file"
//               onChange={handleFileChange}
//               className="w-full"
//               accept=".pdf,.jpg,.jpeg,.png"
//             />
//           </div>
//         </div>

//         <div className="flex justify-end mt-6 space-x-2">
//           <Button 
//             variant="plain" 
//             onClick={onClose}
//           >
//             Cancel
//           </Button>
//           <Button 
//             variant="solid" 
//             onClick={handleSubmit}
//             loading={isLoading}
//           >
//             Update
//           </Button>
//         </div>
//       </div>
//     </Dialog>
//   );
// };

// export default EditNoticeDialog;

// import React, { useState, useEffect } from 'react';
// import { Button, DatePicker, Dialog, Input, Tooltip } from '@/components/ui';
// import OutlinedInput from '@/components/ui/OutlinedInput';
// import OutlinedSelect from '@/components/ui/Outlined/Outlined';
// import { toast, Notification } from '@/components/ui';
// import { useDispatch } from 'react-redux';
// import { fetchNoticeById, updateNotice } from '@/store/slices/noticeTracker/noticeTrackerSlice';
// import { showErrorNotification } from '@/components/ui/ErrorMessage';
// import { Eye } from 'lucide-react';

// interface EditNoticeDialogProps {
//   isOpen: boolean;
//   onClose: () => void;
//   noticeId: number | null;
//   onSuccess?: () => void;
// }
// interface NoticeTypeOption {
//   value: string;
//   label: string;
//   id?: string;
// }


// const EditNoticeDialog: React.FC<EditNoticeDialogProps> = ({
//   isOpen,
//   onClose,
//   noticeId,
//   onSuccess
// }) => {
//   const dispatch = useDispatch();
//   const [isLoading, setIsLoading] = useState(false);
//   const [fileBase64, setFileBase64] = useState<string>('');
  
//   const initialFormData = {
//     notice_type: '',
//     notice_date: null,
//     reference_number: '',
//     related_act: '',
//     notice_document: null,
//   };
  
//   const [formData, setFormData] = useState(initialFormData);
//   const noticeTypeOptions: NoticeTypeOption[] = [
//     { value: 'inspection', label: 'Inspection', id: '1' },
//     { value: 'show_cause', label: 'Show Cause', id: '2' },
//     { value: 'demand', label: 'Demand', id: '3' },
//     { value: 'other', label: 'Other', id: '4' }
//   ];

//   useEffect(() => {
//     const loadNoticeData = async () => {
//       if (noticeId) {
//         try {
//           setIsLoading(true);
//           const response = await dispatch(fetchNoticeById(noticeId)).unwrap();
//           console.log('Fetched notice data:', response); // Added console log

//           // Convert the date string to a Date object if it exists
//           const noticeDate = response.notice_date ? new Date(response.notice_date) : null;
          
//           const formattedData = {
//             notice_type: response.notice_type || '',
//             notice_date: noticeDate,
//             reference_number: response.reference_number || '',
//             related_act: response.related_act || '',
//             notice_document: response.notice_document || null,
//           };

//           console.log('Formatted form data:', formattedData); // Added console log
//           setFormData(formattedData);
//         } catch (error) {
//           console.error('Failed to load notice:', error);
//           showErrorNotification('Failed to load notice details');
//         } finally {
//           setIsLoading(false);
//         }
//       }
//     };

//     if (isOpen && noticeId) {
//       loadNoticeData();
//     }
//   }, [dispatch, noticeId, isOpen]);

//   const handleChange = (field: string, value: any) => {
//     console.log(`Updating ${field}:`, value); // Added console log
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       try {
//         const base64String = await convertToBase64(file);
//         setFileBase64(base64String);
//         setFormData(prev => ({
//           ...prev,
//           notice_document: base64String
//         }));
//       } catch (error) {
//         console.error('Error converting file:', error);
//         showErrorNotification('Error processing file');
//       }
//     }
//   };

//   const convertToBase64 = (file: File): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const base64String = (reader.result as string).split(',')[1];
//         resolve(base64String);
//       };
//       reader.onerror = reject;
//       reader.readAsDataURL(file);
//     });
//   };

//   const handleSubmit = async () => {
//     if (!noticeId) return;
  
//     try {
//       setIsLoading(true);
//       console.log('Original form data:', formData);
      
//       // Prepare the notice data
//       const noticeData = {
//         notice_type: formData.notice_type,
//         notice_date: formData.notice_date ? formData.notice_date.toISOString() : null,
//         reference_number: formData.reference_number,
//         related_act: formData.related_act,
//         notice_document: formData.notice_document
//       };
      
//       console.log('Submitting payload:', {
//         id: noticeId.toString(),
//         noticeData: noticeData
//       });
  
//       await dispatch(updateNotice({
//         id: noticeId.toString(),
//         noticeData: noticeData
//       }))
//       .unwrap()
//       .catch((error: any) => {
//         throw error;
//       });
      
//       toast.push(
//         <Notification title="Success" type="success">
//           Notice updated successfully
//         </Notification>
//       );
//       onSuccess?.();
//       onClose();
//     } catch (error) {
//       console.error('Failed to update notice:', error);
//     //   showErrorNotification('Failed to update notice');
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const handleDocumentView = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (formData.notice_document) {
//         const fullPath = `${import.meta.env.VITE_API_GATEWAY}/${formData.notice_document}`;
//         window.open(fullPath, '_blank');
//     }
//  };

//   return (
//     <Dialog
//       isOpen={isOpen}
//       onClose={onClose}
//       width={800}  shouldCloseOnOverlayClick={false} 
//     >
//       <div className="p-6">
//         <h5 className="text-lg font-semibold mb-6">Edit Notice Details</h5>

//         <div className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <label className="text-sm font-medium">Notice Type</label>
//               <OutlinedSelect
//                 label="Select Notice Type"
//                 value={noticeTypeOptions.find(option => option.value === formData.notice_type) || null}
//                 options={noticeTypeOptions}
//                 onChange={(selectedOption) => {
//                   const noticeType = noticeTypeOptions.find(n => n.value === selectedOption.value);
//                   if (noticeType) {
//                     handleChange('notice_type', selectedOption.value);
//                   }
//                 }}
//               />
//             </div>
//             <div className="space-y-2">
//               <label className="text-sm font-medium">Notice Received on</label>
//               <DatePicker
//                 clearable
//                 size="sm"
//                 placeholder="Select Date"
//                 value={formData.notice_date}
//                 onChange={(date) => handleChange('notice_date', date)}
//                 inputFormat="MM/DD/YYYY" // Added date format
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <label className="text-sm font-medium">Letter/ Notice reference number</label>
//               <OutlinedInput 
//                 label="Reference Number"
//                 value={formData.reference_number}
//                 onChange={(value) => handleChange('reference_number', value)}
//               />
//             </div>
//             <div className="space-y-2">
//               <label className="text-sm font-medium">Notice related to which Act</label>
//               <OutlinedInput 
//                 label="Related Act"
//                 value={formData.related_act}
//                 onChange={(value) => handleChange('related_act', value)}
//               />
//             </div>
//           </div>

//           <div className="space-y-2 flex gap-2 flex-col">
//             <label className="text-sm font-medium">Update Notice Document</label>
//             <div className='flex gap-2'>

            
//             <Input 
//               type="file"
//               onChange={handleFileChange}
//               className="w-full"
//               accept=".pdf,.jpg,.jpeg,.png"
//             />
//              <Tooltip title="View Document">
//             <button
//                 onClick={handleDocumentView}
//                 className="p-2 hover:bg-gray-100 rounded-full flex-shrink-0"
//                 title="View Document"
//               >
//                 <Eye size={20} />
//               </button>
//               </Tooltip>
//               </div>
//           </div>
//         </div>

//         <div className="flex justify-end mt-6 space-x-2">
//           <Button 
//             variant="plain" 
//             onClick={onClose}
//           >
//             Cancel
//           </Button>
//           <Button 
//             variant="solid" 
//             onClick={handleSubmit}
//             loading={isLoading}
//           >
//             Confirm
//           </Button>
//         </div>
//       </div>
//     </Dialog>
//   );
// };

// export default EditNoticeDialog;

import React, { useState, useEffect } from 'react';
import { Button, DatePicker, Dialog, Input, Tooltip } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import { toast, Notification } from '@/components/ui';
import { useDispatch } from 'react-redux';
import { fetchNoticeById, updateNotice } from '@/store/slices/noticeTracker/noticeTrackerSlice';
import { showErrorNotification } from '@/components/ui/ErrorMessage';
import { Eye } from 'lucide-react';
import NoticeTypeAutosuggest from './NoticeTypeAutosuggest';
import NoticeActAutosuggest from './NoticeActAutosuggest';

interface EditNoticeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  noticeId: number | null;
  onSuccess?: () => void;
}

const EditNoticeDialog: React.FC<EditNoticeDialogProps> = ({
  isOpen,
  onClose,
  noticeId,
  onSuccess
}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [fileBase64, setFileBase64] = useState<string>('');
  
  const initialFormData = {
    notice_type: '',
    notice_type_id: null,
    notice_date: null,
    reference_number: '',
    related_act: '',
    related_act_id: null,
    notice_document: null,
  };
  
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const loadNoticeData = async () => {
      if (noticeId) {
        try {
          setIsLoading(true);
          const response = await dispatch(fetchNoticeById(noticeId)).unwrap();
          
          // Convert the date string to a Date object if it exists
          const noticeDate = response.notice_date ? new Date(response.notice_date) : null;
          
          const formattedData = {
            notice_type: response.notice_type || '',
            notice_type_id: response.notice_type_id || null,
            notice_date: noticeDate,
            reference_number: response.reference_number || '',
            related_act: response.related_act || '',
            related_act_id: response.related_act_id || null,
            notice_document: response.notice_document || null,
          };

          setFormData(formattedData);
        } catch (error) {
          console.error('Failed to load notice:', error);
          showErrorNotification('Failed to load notice details');
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (isOpen && noticeId) {
      loadNoticeData();
    }
  }, [dispatch, noticeId, isOpen]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64String = await convertToBase64(file);
        setFileBase64(base64String);
        setFormData(prev => ({
          ...prev,
          notice_document: base64String
        }));
      } catch (error) {
        console.error('Error converting file:', error);
        showErrorNotification('Error processing file');
      }
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async () => {
    if (!noticeId) return;
  
    try {
      setIsLoading(true);
      
      const noticeData = {
        notice_type: formData.notice_type,
        notice_type_id: formData.notice_type_id,
        notice_date: formData.notice_date ? formData.notice_date.toISOString() : null,
        reference_number: formData.reference_number,
        related_act: formData.related_act,
        related_act_id: formData.related_act_id,
        notice_document: formData.notice_document
      };
  
      await dispatch(updateNotice({
        id: noticeId.toString(),
        noticeData: noticeData
      })).unwrap();
      
      toast.push(
        <Notification title="Success" type="success">
          Notice updated successfully
        </Notification>
      );
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Failed to update notice:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDocumentView = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formData.notice_document) {
      const fullPath = `${import.meta.env.VITE_API_GATEWAY}/${formData.notice_document}`;
      window.open(fullPath, '_blank');
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      width={800}
      shouldCloseOnOverlayClick={false} 
    >
      <div className="p-6">
        <h5 className="text-lg font-semibold mb-6">Edit Notice Details</h5>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <NoticeTypeAutosuggest
                value={formData.notice_type}
                onChange={(value) => handleChange('notice_type', value)}
                onNoticeTypeSelect={(id) => handleChange('notice_type_id', id)}
                isDisabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Notice Received on</label>
              <DatePicker
                clearable
                size="sm"
                placeholder="Select Date"
                value={formData.notice_date}
                onChange={(date) => handleChange('notice_date', date)}
                inputFormat="MM/DD/YYYY"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Letter/ Notice reference number</label>
              <OutlinedInput 
                label="Reference Number"
                value={formData.reference_number}
                onChange={(value) => handleChange('reference_number', value)}
              />
            </div>
            <div className="space-y-2">
              <NoticeActAutosuggest
                value={formData.related_act}
                onChange={(value) => handleChange('related_act', value)}
                onNoticeActSelect={(id) => handleChange('related_act_id', id)}
                isDisabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2 flex gap-2 flex-col">
            <label className="text-sm font-medium">Update Notice Document</label>
            <div className='flex gap-2'>
              <Input 
                type="file"
                onChange={handleFileChange}
                className="w-full"
                accept=".pdf,.jpg,.jpeg,.png,.zip,"
              />
              <Tooltip title="View Document">
                <button
                  onClick={handleDocumentView}
                  className="p-2 hover:bg-gray-100 rounded-full flex-shrink-0"
                  title="View Document"
                >
                  <Eye size={20} />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-2">
          <Button 
            variant="plain" 
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            variant="solid" 
            onClick={handleSubmit}
            loading={isLoading}
          >
            Confirm
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default EditNoticeDialog;