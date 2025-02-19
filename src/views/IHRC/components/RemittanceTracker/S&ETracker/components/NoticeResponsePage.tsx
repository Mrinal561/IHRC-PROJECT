

// import React, { useState } from 'react';
// import { Button, DatePicker, Input, Select } from '@/components/ui';
// import OutlinedInput from '@/components/ui/OutlinedInput';
// import { toast, Notification } from '@/components/ui';
// import { Trash2 } from 'lucide-react';
// import OutlinedSelect from '@/components/ui/Outlined/Outlined';

// const NoticeResponsePage = () => {
//   const [forms, setForms] = useState([
//     {
//       id: 0,
//       replyDetails: '',
//       replyDate: null,
//       document: null,
//       status: 'open'
//     },
//     {
//       id: 1,
//       replyDetails: '',
//       replyDate: null,
//       document: null,
//       status: 'open'
//     },
//     {
//       id: 2,
//       replyDetails: '',
//       replyDate: null,
//       document: null,
//       status: 'open'
//     },
//     {
//       id: 3,
//       replyDetails: '',
//       replyDate: null,
//       document: null,
//       status: 'open'
//     },
//     {
//       id: 4,
//       replyDetails: '',
//       replyDate: null,
//       document: null,
//       status: 'open'
//     }
//   ]);

//   const handleChange = (index, field, value) => {
//     setForms(prevForms => {
//       const newForms = [...prevForms];
//       newForms[index] = {
//         ...newForms[index],
//         [field]: value
//       };
//       return newForms;
//     });
//   };

//   const handleDelete = (index) => {
//     setForms(prevForms => {
//       const newForms = [...prevForms];
//       // Reset the current form
//       newForms[index] = {
//         id: index,
//         replyDetails: '',
//         replyDate: null,
//         document: null,
//         status: 'open'
//       };
//       // Set previous form's status to null
//       if (index > 0) {
//         newForms[index - 1] = {
//           ...newForms[index - 1],
//           status: null
//         };
//       }
//       return newForms;
//     });
//   };

//   const handleFileChange = async (index, e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       try {
//         const base64String = await convertToBase64(file);
//         handleChange(index, 'document', base64String);
//       } catch (error) {
//         console.error('Error converting file:', error);
//         toast.push(
//           <Notification title="Error" type="danger">
//             Error processing file
//           </Notification>
//         );
//       }
//     }
//   };

//   const convertToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const base64String = reader.result.split(',')[1];
//         resolve(base64String);
//       };
//       reader.onerror = reject;
//       reader.readAsDataURL(file);
//     });
//   };

//   const handleSubmit = () => {
//     // Only submit forms that are visible (based on previous form's reopen status)
//     const visibleForms = forms.filter((form, index) => {
//       if (index === 0) return true;
//       return forms[index - 1].status === 'reopen';
//     });
    
//     console.log('Form submitted:', visibleForms);
//     toast.push(
//       <Notification title="Success" type="success">
//         Response submitted successfully
//       </Notification>
//     );
//   };

//   const shouldShowForm = (index) => {
//     if (index === 0) return true;
//     return forms[index - 1].status === 'reopen';
//   };

//   const getFormTitle = (index) => {
//     if (index === 0) return 'Initial Response';
//     return `Reopened Response ${index}`;
//   };

//   const statusOptions = (index) => [
//     { value: 'open', label: 'Open' },
//     { value: 'close', label: 'Close' },
//     ...(index < 4 ? [{ value: 'reopen', label: 'Reopen' }] : [])
//   ];

//   return (
//     <div className="w-full p-6">
//       <h1 className="text-2xl font-bold mb-6">Response</h1>

//       {forms.map((form, index) => (
//         shouldShowForm(index) && (
//           <div key={form.id} className="mb-8 p-6 border rounded-lg bg-white shadow-sm">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold">
//                 {getFormTitle(index)}
//               </h2>
//               {index > 0 && (
//                 <Button
//                   variant="plain"
//                   size="sm"
//                   className="text-red-500 hover:text-red-600"
//                   onClick={() => handleDelete(index)}
//                 >
//                   <Trash2 className="w-4 h-4 mr-1" />
//                 </Button>
//               )}
//             </div>
            
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Reply Details Of Notice</label>
//                 <OutlinedInput
//                 label='Notice Reply'
//                   value={form.replyDetails}
//                   onChange={(value) => handleChange(index, 'replyDetails', value)}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Notice Reply Sent On</label>
//                 <DatePicker
//                   clearable
//                   size="sm"
//                   placeholder="Select Date"
//                   value={form.replyDate}
//                   onChange={(date) => handleChange(index, 'replyDate', date)}
//                   inputFormat="DD/MM/YYYY"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Upload Document</label>
//                 <Input
//                   type="file"
//                   onChange={(e) => handleFileChange(index, e)}
//                   className="w-full"
//                   accept=".pdf,.jpg,.jpeg,.png"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Notice Status</label>
//                 <OutlinedSelect
//                 label='Notice Status'
//                   value={statusOptions(index).find(option => option.value === form.status)}
//                   onChange={(option) => handleChange(index, 'status', option.value)}
//                   options={statusOptions(index)}
//                 />
//               </div>
//             </div>
//           </div>
//         )
//       ))}

//       <div className="flex justify-end space-x-2">
//         <Button
//           variant="plain"
//           onClick={() => window.history.back()}
//         >
//           Cancel
//         </Button>
//         <Button
//           variant="solid"
//           onClick={handleSubmit}
//         >
//           Confirm
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default NoticeResponsePage;
















// import React, { useState } from 'react';
// import { Button, DatePicker, Input } from '@/components/ui';
// import OutlinedInput from '@/components/ui/OutlinedInput';
// import { toast, Notification } from '@/components/ui';
// import OutlinedSelect from '@/components/ui/Outlined/Outlined';
// import { IoArrowBack } from 'react-icons/io5';
// import { useNavigate } from 'react-router-dom';
// import CriticalityAutoSuggest from './CriticalityAutoSuggest';
// import StatusAutoSuggest from './StatusAutoSuggest';

// const NoticeResponsePage = () => {
//   const [form, setForm] = useState({
//     notice_reply: '',
//     notice_sent_at: null,
//     reply_document: null,
//     status: '',
//     criticality: ''
//   });
//   const navigate = useNavigate();
//   const handleChange = (field, value) => {
//     setForm(prevForm => ({
//       ...prevForm,
//       [field]: value
//     }));
//   };

//   const handleFileChange = async (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       try {
//         const base64String = await convertToBase64(file);
//         handleChange('document', base64String);
//       } catch (error) {
//         console.error('Error converting file:', error);
//         toast.push(
//           <Notification title="Error" type="danger">
//             Error processing file
//           </Notification>
//         );
//       }
//     }
//   };

//   const convertToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const base64String = reader.result.split(',')[1];
//         resolve(base64String);
//       };
//       reader.onerror = reject;
//       reader.readAsDataURL(file);
//     });
//   };

//   const handleSubmit = () => {
//     console.log('Form submitted:', form);
//     toast.push(
//       <Notification title="Success" type="success">
//         Reply submitted successfully
//       </Notification>
//     );
//   };

//   const statusOptions = [
//     { value: 'open', label: 'Open' },
//     { value: 'close', label: 'Close' },
//     { value: 'reopen', label: 'Reopen' },
//     { value: 'general', label: 'General' },
//     { value: 'other', label: 'Other' }
//   ];

//   const criticalityOptions = [
//     { value: 'new notice', label: 'New Notice' },
//     { value: 'extension letter', label: 'Extension Letter' },
//     { value: 'response letter', label: 'Response Letter' },
//     { value: 'further notice', label: 'Further Notice' },
//     { value: 'closure', label: 'Closure' }
//   ];

//   return (
//     <div className="w-full p-6">
//         <div className="flex items-center gap-2 mb-8">
//                 <Button
//                     size="sm"
//                     className="p-2"
//                     variant="plain"
//           icon={<IoArrowBack className="text-gray-500 hover:text-gray-700" />}
//           onClick={() => navigate(-1)}
//                 >
//                 </Button>
//       <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Reply</h1>
//       </div>

//       <div className="mb-8 p-6 border rounded-lg bg-white shadow-sm">
//         <h2 className="text-lg font-semibold mb-4">
//         Add A  Reply
//         </h2>
        
//         <div className="space-y-4">
//           <div className="space-y-2">
//             <label className="text-sm font-medium"> Details Of The Reply</label>
//             <OutlinedInput
//               label="Details of the Reply"
//               value={form.replyDetails}
//               onChange={(value) => handleChange('replyDetails', value)}
//               textarea={true}
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-medium">Reply Sent On</label>
//             <DatePicker
//               clearable
//               size="sm"
//               placeholder="Select Date"
//               value={form.replyDate}
//               onChange={(date) => handleChange('replyDate', date)}
//               inputFormat="DD/MM/YYYY"
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-medium">Upload Document(PDF/Zip/Image, Max 20MB)</label>
//             <Input
//               type="file"
//               onChange={handleFileChange}
//               className="w-full"
//               accept=".pdf,.jpg,.jpeg,.png"
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-medium">Notice Status</label>
//             <OutlinedSelect
//               label="Notice Status"
//               value={statusOptions.find(option => option.value === form.status)}
//               onChange={(option) => handleChange('status', option.value)}
//               options={statusOptions}
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-medium">Criticality</label>
//             <OutlinedSelect
//               label="Criticality"
//               value={criticalityOptions.find(option => option.value === form.criticality)}
//               onChange={(option) => handleChange('criticality', option.value)}
//               options={criticalityOptions}
//             />
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-end space-x-2">
//         <Button
//           variant="plain"
//           onClick={() => window.history.back()}
//         >
//           Cancel
//         </Button>
//         <Button
//           variant="solid"
//           onClick={handleSubmit}
//         >
//           Confirm
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default NoticeResponsePage;






















import React, { useState, useEffect } from 'react';
import { Button, DatePicker, Input } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import { toast, Notification } from '@/components/ui';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import CriticalityAutoSuggest from './CriticalityAutoSuggest';
import StatusAutoSuggest from './StatusAutoSuggest';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';

const NoticeResponsePage = () => {
  const { noticeId } = useParams();
  const [notice, setNotice] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
  const [form, setForm] = useState({
    notice_reply: '',
    notice_sent_at: null,
    reply_document: null,
    status: '',
    criticality: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNoticeDetails = async () => {
      try {
        const response = await httpClient.get(endpoints.noticeTracker.detail(noticeId));
        setNotice(response.data);
      } catch (error) {
        console.error('Failed to fetch notice details:', error);
        toast.push(
          <Notification title="Error" type="danger">
            Failed to fetch notice details
          </Notification>
        );
      }
    };

    if (noticeId) {
      fetchNoticeDetails();
    }
  }, [noticeId]);

  const handleChange = (field, value) => {
    setForm(prevForm => ({
      ...prevForm,
      [field]: value
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64String = await convertToBase64(file);
        handleChange('reply_document', base64String);
      } catch (error) {
        console.error('Error converting file:', error);
        toast.push(
          <Notification title="Error" type="danger">
            Error processing file
          </Notification>
        );
      }
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result && typeof reader.result === 'string') {
          const base64String = reader.result.split(',')[1];
          resolve(base64String);
        } else {
          reject(new Error('Failed to read file as base64'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await httpClient.post(endpoints.noticeTracker.noticeReply(noticeId), {
        notice_sent_at: form.notice_sent_at,
        notice_reply: form.notice_reply,
        status: form.status,
        criticality: form.criticality,
        reply_documents: form.reply_document ? [form.reply_document] : []
      });
  
      if (response.data) {
        toast.push(
          <Notification title="Success" type="success">
            Reply submitted successfully
          </Notification>
        );
        navigate(-1); // Navigate back to the previous page
      }
    } catch (error) {
      console.error('Failed to submit reply:', error);
      toast.push(
        <Notification title="Error" type="danger">
          Failed to submit reply
        </Notification>
      );
    }
  };

  return (
    <div className="w-full p-6">
      <div className="flex items-center gap-2 mb-8">
        <Button
          size="sm"
          className="p-2"
          variant="plain"
          icon={<IoArrowBack className="text-gray-500 hover:text-gray-700" />}
          onClick={() => navigate(-1)}
        />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Reply</h1>
      </div>

      <div className="mb-8 p-6 border rounded-lg bg-white shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Add A Reply</h2>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Details Of The Reply</label>
            <OutlinedInput
              label="Details of the Reply"
              value={form.notice_reply}
              onChange={(value) => handleChange('notice_reply', value)}
              textarea={true}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Reply Sent On</label>
            <DatePicker
              clearable
              size="sm"
              placeholder="Select Date"
              value={form.notice_sent_at}
              onChange={(date) => handleChange('notice_sent_at', date)}
              inputFormat="DD/MM/YYYY"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Upload Document (PDF/Zip/Image, Max 20MB)</label>
            <Input
              type="file"
              onChange={handleFileChange}
              className="w-full"
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Notice Status</label>
            <StatusAutoSuggest
              value={form.status}
              onChange={(value) => handleChange('status', value)}
              onStatusSelect={(id) => handleChange('status_id', id)}
              isDisabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Criticality</label>
            <CriticalityAutoSuggest
              value={form.criticality}
              onChange={(value) => handleChange('criticality', value)}
              onCriticalitySelect={(id) => handleChange('criticality_id', id)}
              isDisabled={isLoading}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          variant="plain"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button
          variant="solid"
          onClick={handleSubmit}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default NoticeResponsePage;