// import React, { useState } from 'react';
// import { Button, DatePicker, Input, Select } from '@/components/ui';
// import OutlinedInput from '@/components/ui/OutlinedInput';
// import { toast, Notification } from '@/components/ui';

// const NoticeResponsePage = () => {
//   const [responses, setResponses] = useState([{
//     replyDetails: '',
//     replyDate: null,
//     document: null,
//     status: 'open'
//   }]);

//   const handleChange = (index, field, value) => {
//     const updatedResponses = [...responses];
//     updatedResponses[index] = {
//       ...updatedResponses[index],
//       [field]: value
//     };
//     setResponses(updatedResponses);
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

//   const handleStatusChange = (index, value) => {
//     handleChange(index, 'status', value);
    
//     // If status is reopen, add a new response section
//     if (value === 'reopen') {
//       setResponses([...responses, {
//         replyDetails: '',
//         replyDate: null,
//         document: null,
//         status: 'open'
//       }]);
//     }
//   };

//   const handleSubmit = () => {
//     // Handle form submission
//     console.log('Form submitted:', responses);
//     toast.push(
//       <Notification title="Success" type="success">
//         Response submitted successfully
//       </Notification>
//     );
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Response</h1>

//       {responses.map((response, index) => (
//         <div key={index} className="mb-8 p-6 border rounded-lg bg-white shadow-sm">
//           <h2 className="text-lg font-semibold mb-4">
//             {index === 0 ? 'Initial Response' : `Additional Response ${index}`}
//           </h2>

//           <div className="space-y-4">
//             <div className="space-y-2">
//               <label className="text-sm font-medium">Reply details of notice</label>
//               <OutlinedInput
//                 value={response.replyDetails}
//                 onChange={(value) => handleChange(index, 'replyDetails', value)}
//                 className="w-full"
//                 multiline
//                 rows={4}
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium">Notice Reply sent on</label>
//               <DatePicker
//                 clearable
//                 size="sm"
//                 placeholder="Select Date"
//                 value={response.replyDate}
//                 onChange={(date) => handleChange(index, 'replyDate', date)}
//                 inputFormat="MM/DD/YYYY"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium">Upload Document</label>
//               <Input
//                 type="file"
//                 onChange={(e) => handleFileChange(index, e)}
//                 className="w-full"
//                 accept=".pdf,.jpg,.jpeg,.png"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium">Notice Status</label>
//               <Select
//                 value={response.status}
//                 onChange={(value) => handleStatusChange(index, value)}
//                 options={[
//                   { value: 'open', label: 'Open' },
//                   { value: 'close', label: 'Close' },
//                   { value: 'reopen', label: 'Reopen' }
//                 ]}
//               />
//             </div>
//           </div>
//         </div>
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

import React, { useState } from 'react';
import { Button, DatePicker, Input, Select } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import { toast, Notification } from '@/components/ui';
import { Trash2 } from 'lucide-react';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';

const NoticeResponsePage = () => {
  const [forms, setForms] = useState([
    {
      id: 0,
      replyDetails: '',
      replyDate: null,
      document: null,
      status: 'open'
    },
    {
      id: 1,
      replyDetails: '',
      replyDate: null,
      document: null,
      status: 'open'
    },
    {
      id: 2,
      replyDetails: '',
      replyDate: null,
      document: null,
      status: 'open'
    },
    {
      id: 3,
      replyDetails: '',
      replyDate: null,
      document: null,
      status: 'open'
    },
    {
      id: 4,
      replyDetails: '',
      replyDate: null,
      document: null,
      status: 'open'
    }
  ]);

  const handleChange = (index, field, value) => {
    setForms(prevForms => {
      const newForms = [...prevForms];
      newForms[index] = {
        ...newForms[index],
        [field]: value
      };
      return newForms;
    });
  };

  const handleDelete = (index) => {
    setForms(prevForms => {
      const newForms = [...prevForms];
      // Reset the current form
      newForms[index] = {
        id: index,
        replyDetails: '',
        replyDate: null,
        document: null,
        status: 'open'
      };
      // Set previous form's status to null
      if (index > 0) {
        newForms[index - 1] = {
          ...newForms[index - 1],
          status: null
        };
      }
      return newForms;
    });
  };

  const handleFileChange = async (index, e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64String = await convertToBase64(file);
        handleChange(index, 'document', base64String);
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

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = () => {
    // Only submit forms that are visible (based on previous form's reopen status)
    const visibleForms = forms.filter((form, index) => {
      if (index === 0) return true;
      return forms[index - 1].status === 'reopen';
    });
    
    console.log('Form submitted:', visibleForms);
    toast.push(
      <Notification title="Success" type="success">
        Response submitted successfully
      </Notification>
    );
  };

  const shouldShowForm = (index) => {
    if (index === 0) return true;
    return forms[index - 1].status === 'reopen';
  };

  const getFormTitle = (index) => {
    if (index === 0) return 'Initial Response';
    return `Reopened Response ${index}`;
  };

  const statusOptions = (index) => [
    { value: 'open', label: 'Open' },
    { value: 'close', label: 'Close' },
    ...(index < 4 ? [{ value: 'reopen', label: 'Reopen' }] : [])
  ];

  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold mb-6">Response</h1>

      {forms.map((form, index) => (
        shouldShowForm(index) && (
          <div key={form.id} className="mb-8 p-6 border rounded-lg bg-white shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {getFormTitle(index)}
              </h2>
              {index > 0 && (
                <Button
                  variant="plain"
                  size="sm"
                  className="text-red-500 hover:text-red-600"
                  onClick={() => handleDelete(index)}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                </Button>
              )}
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Reply Details Of Notice</label>
                <OutlinedInput
                label='Notice Reply'
                  value={form.replyDetails}
                  onChange={(value) => handleChange(index, 'replyDetails', value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Notice Reply Sent On</label>
                <DatePicker
                  clearable
                  size="sm"
                  placeholder="Select Date"
                  value={form.replyDate}
                  onChange={(date) => handleChange(index, 'replyDate', date)}
                  inputFormat="DD/MM/YYYY"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Upload Document</label>
                <Input
                  type="file"
                  onChange={(e) => handleFileChange(index, e)}
                  className="w-full"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Notice Status</label>
                <OutlinedSelect
                label='Notice Status'
                  value={statusOptions(index).find(option => option.value === form.status)}
                  onChange={(option) => handleChange(index, 'status', option.value)}
                  options={statusOptions(index)}
                />
              </div>
            </div>
          </div>
        )
      ))}

      <div className="flex justify-end space-x-2">
        <Button
          variant="plain"
          onClick={() => window.history.back()}
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