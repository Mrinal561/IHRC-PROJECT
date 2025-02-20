

// import React, { useState, useEffect } from 'react';
// import { Button, DatePicker, Input } from '@/components/ui';
// import OutlinedInput from '@/components/ui/OutlinedInput';
// import { toast, Notification } from '@/components/ui';
// import OutlinedSelect from '@/components/ui/Outlined/Outlined';
// import { IoArrowBack } from 'react-icons/io5';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import CriticalityAutoSuggest from './CriticalityAutoSuggest';
// import StatusAutoSuggest from './StatusAutoSuggest';
// import httpClient from '@/api/http-client';
// import { endpoints } from '@/api/endpoint';
// import NoticeTypeAutosuggest from './NoticeTypeAutosuggest';

// const NoticeResponsePage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const noticeId = location.state?.noticeId;

//   // Redirect if no noticeId in state
//   useEffect(() => {
//     if (!noticeId) {
//       navigate('/notice-tracker', { replace: true });
//       return;
//     }
//   }, [noticeId, navigate]);
//   const [notice, setNotice] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
  
//   const [form, setForm] = useState({
//     notice_reply: '',
//     notice_sent_at: null,
//     reply_document: null,
//     status: '',
//     notice_type: ''
//   });
//   // const navigate = useNavigate();

//     useEffect(() => {
//         const fetchNoticeDetails = async () => {
//             try {
//                 const response = await httpClient.get(
//                     endpoints.noticeTracker.detail(noticeId),
//                 )
//                 setNotice(response.data)
//             } catch (error) {
//                 console.error('Failed to fetch notice details:', error)
//                 toast.push(
//                     <Notification title="Error" closable={true} type="danger">
//                         Failed to fetch notice details
//                     </Notification>,
//                 )
//             }
//         }

//         if (noticeId) {
//             fetchNoticeDetails()
//         }
//     }, [noticeId])

//     const handleChange = (field, value) => {
//         setForm((prevForm) => ({
//             ...prevForm,
//             [field]: value,
//         }))
//     }

//     const handleFileChange = async (e) => {
//         const file = e.target.files?.[0]
//         if (file) {
//             try {
//                 const base64String = await convertToBase64(file)
//                 handleChange('reply_document', base64String)
//             } catch (error) {
//                 console.error('Error converting file:', error)
//                 toast.push(
//                     <Notification title="Error" closable={true} type="danger">
//                         Error processing file
//                     </Notification>,
//                 )
//             }
//         }
//     }

//     const convertToBase64 = (file: File): Promise<string> => {
//         return new Promise((resolve, reject) => {
//             const reader = new FileReader()
//             reader.onload = () => {
//                 if (reader.result && typeof reader.result === 'string') {
//                     const base64String = reader.result.split(',')[1]
//                     resolve(base64String)
//                 } else {
//                     reject(new Error('Failed to read file as base64'))
//                 }
//             }
//             reader.onerror = reject
//             reader.readAsDataURL(file)
//         })
//     }

//   const handleSubmit = async () => {
//     try {
//       const response = await httpClient.post(endpoints.noticeTracker.noticeReply(noticeId), {
//         notice_sent_at: form.notice_sent_at,
//         notice_reply: form.notice_reply,
//         status: form.status,
//         notice_type: form.notice_type,
//         reply_documents: form.reply_document ? [form.reply_document] : []
//       });
  
//       if (response.data) {
//         toast.push(
//           <Notification title="Success" type="success">
//             Reply submitted successfully
//           </Notification>
//         );
//         navigate(-1); // Navigate back to the previous page
//       }
//     } catch (error) {
//       console.error('Failed to submit reply:', error);
//       toast.push(
//         <Notification title="Error" type="danger">
//           Failed to submit reply
//         </Notification>
//       );
//     }
//   }

//     return (
//         <div className="w-full p-6">
//             <div className="flex items-center gap-2 mb-8">
//                 <Button
//                     size="sm"
//                     className="p-2"
//                     variant="plain"
//                     icon={
//                         <IoArrowBack className="text-gray-500 hover:text-gray-700" />
//                     }
//                     onClick={() => navigate(-1)}
//                 />
//                 <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
//                     Reply
//                 </h1>
//             </div>

//             <div className="mb-8 p-6 border rounded-lg bg-white shadow-sm">
//                 <h2 className="text-lg font-semibold mb-4">Add A Reply</h2>

//                 <div className="space-y-4">
//                     <div className="space-y-2">
//                         <label className="text-sm font-medium">
//                             Details Of The Reply
//                         </label>
//                         <OutlinedInput
//                             label="Details of the Reply"
//                             value={form.notice_reply}
//                             onChange={(value) =>
//                                 handleChange('notice_reply', value)
//                             }
//                             textarea={true}
//                         />
//                     </div>

//                     <div className="space-y-2">
//                         <label className="text-sm font-medium">
//                             Reply Sent On
//                         </label>
//                         <DatePicker
//                             clearable
//                             size="sm"
//                             placeholder="Select Date"
//                             value={form.notice_sent_at}
//                             onChange={(date) =>
//                                 handleChange('notice_sent_at', date)
//                             }
//                             inputFormat="DD/MM/YYYY"
//                         />
//                     </div>

//                     <div className="space-y-2">
//                         <label className="text-sm font-medium">
//                             Upload Document (PDF/Zip/Image, Max 20MB)
//                         </label>
//                         <Input
//                             type="file"
//                             onChange={handleFileChange}
//                             className="w-full"
//                             accept=".pdf,.jpg,.jpeg,.png"
//                         />
//                     </div>

//                     <div className="space-y-2">
//                         <label className="text-sm font-medium">
//                             Notice Status
//                         </label>
//                         <StatusAutoSuggest
//                             value={form.status}
//                             onChange={(value) => handleChange('status', value)}
//                             onStatusSelect={(id) =>
//                                 handleChange('status_id', id)
//                             }
//                             isDisabled={isLoading}
//                         />
//                     </div>

//           <div className="space-y-2">

//           <NoticeTypeAutosuggest
//             value={form.notice_type}
//             onChange={(value) => handleChange('notice_type', value)}
//             onNoticeTypeSelect={(id) => {
//               handleChange('notice_type_id', id)}
//             }
//             isDisabled={isLoading}
//           />
//           </div>
//         </div>
//       </div>

//             <div className="flex justify-end space-x-2">
//                 <Button variant="plain" onClick={() => navigate(-1)}>
//                     Cancel
//                 </Button>
//                 <Button variant="solid" onClick={handleSubmit}>
//                     Confirm
//                 </Button>
//             </div>
//         </div>
//     )
// }


// export default NoticeResponsePage












import React, { useState, useEffect } from 'react';
import { Button, DatePicker, Input } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import { toast, Notification } from '@/components/ui';
import { IoArrowBack } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';
import StatusAutoSuggest from './StatusAutoSuggest';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
import NoticeTypeAutosuggest from './NoticeTypeAutosuggest';
import * as Yup from 'yup';

// Validation Schema
const validationSchema = Yup.object().shape({
  notice_reply: Yup.string()
    .required('Reply details are required')
    .trim(),
  notice_sent_at: Yup.date()
    .required('Reply date is required')
    .max(new Date(), 'Future dates are not allowed')
    .nullable(),
  status: Yup.string()
    .required('Status is required')
    .trim(),
  notice_type: Yup.string()
    .required('Notice type is required')
    .trim(),
  reply_document: Yup.string()
  .required('Notice document is required'),
});

interface FormErrors {
  [key: string]: string;
}

const NoticeResponsePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const noticeId = location.state?.noticeId;
  const [notice, setNotice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [form, setForm] = useState({
    notice_reply: '',
    notice_sent_at: null,
    reply_document: null,
    status: '',
    notice_type: ''
  });

  useEffect(() => {
    if (!noticeId) {
      navigate('/notice-tracker', { replace: true });
      return;
    }
  }, [noticeId, navigate]);

  useEffect(() => {
    const fetchNoticeDetails = async () => {
      try {
        const response = await httpClient.get(
          endpoints.noticeTracker.detail(noticeId)
        );
        setNotice(response.data);
      } catch (error) {
        console.error('Failed to fetch notice details:', error);
        toast.push(
          <Notification title="Error" closable={true} type="danger">
            Failed to fetch notice details
          </Notification>
        );
      }
    };

    if (noticeId) {
      fetchNoticeDetails();
    }
  }, [noticeId]);

  const handleChange = (field: string, value: any) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
    // Clear error when field is changed
    setErrors((prev) => ({
      ...prev,
      [field]: '',
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) { // 20MB limit
        toast.push(
          <Notification title="Error" closable={true} type="danger">
            File size should not exceed 20MB
          </Notification>
        );
        return;
      }
      try {
        const base64String = await convertToBase64(file);
        handleChange('reply_document', base64String);
      } catch (error) {
        console.error('Error converting file:', error);
        toast.push(
          <Notification title="Error" closable={true} type="danger">
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

  const validateForm = async () => {
    try {
      await validationSchema.validate(form, { abortEarly: false });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors: FormErrors = {};
        error.inner.forEach((err) => {
          if (err.path) {
            newErrors[err.path] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        console.error('Validation error:', error);
        toast.push(
          <Notification title="Error" type="danger">
            An unexpected error occurred
          </Notification>
        );
      }
      return false;
    }
  };

  const handleSubmit = async () => {
    const isValid = await validateForm();
    if (!isValid) return;

    try {
      setIsLoading(true);
      const response = await httpClient.post(endpoints.noticeTracker.noticeReply(noticeId), {
        notice_sent_at: form.notice_sent_at,
        notice_reply: form.notice_reply,
        status: form.status,
        notice_type: form.notice_type,
        reply_documents: form.reply_document ? [form.reply_document] : []
      });

      if (response.data) {
        toast.push(
          <Notification title="Success" type="success">
            Reply submitted successfully
          </Notification>
        );
        navigate(-1);
      }
    } catch (error) {
      console.error('Failed to submit reply:', error);
      toast.push(
        <Notification title="Error" type="danger">
          Failed to submit reply
        </Notification>
      );
    } finally {
      setIsLoading(false);
    }
  };

  const showFieldError = (fieldName: string) => {
    return errors[fieldName] ? (
      <span className="text-red-500 text-sm mt-1">{errors[fieldName]}</span>
    ) : null;
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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Reply
        </h1>
      </div>

      <div className="mb-8 p-6 border rounded-lg bg-white shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Add A Reply</h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Details Of The Reply <span className="text-red-500">*</span>
            </label>
            <OutlinedInput
              label="Details of the Reply"
              value={form.notice_reply}
              onChange={(value) => handleChange('notice_reply', value)}
              textarea={true}
              error={!!errors.notice_reply}
            />
            {showFieldError('notice_reply')}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Reply Sent On <span className="text-red-500">*</span>
            </label>
            <DatePicker
              clearable
              size="sm"
              placeholder="Select Date"
              value={form.notice_sent_at}
              onChange={(date) => handleChange('notice_sent_at', date)}
              inputFormat="DD/MM/YYYY"
              maxDate={new Date()}
            />
            {showFieldError('notice_sent_at')}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Upload Document (PDF/Zip/Image, Max 20MB) <span className="text-red-500">*</span>
            </label>
            <Input
              type="file"
              onChange={handleFileChange}
              className="w-full"
              accept=".pdf,.jpg,.jpeg,.png,.zip"
            />
            {showFieldError('reply_document')}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Notice Status
            </label>
            <StatusAutoSuggest
              value={form.status}
              onChange={(value) => handleChange('status', value)}
              onStatusSelect={(id) => handleChange('status_id', id)}
              isDisabled={isLoading}
            />
            {showFieldError('status')}
          </div>

          <div className="space-y-2">
            {/* <label className="text-sm font-medium">
              Notice Type <span className="text-red-500">*</span>
            </label> */}
            <NoticeTypeAutosuggest
              value={form.notice_type}
              onChange={(value) => handleChange('notice_type', value)}
              onNoticeTypeSelect={(id) => handleChange('notice_type_id', id)}
              isDisabled={isLoading}
            />
            {showFieldError('notice_type')}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="plain" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button 
          variant="solid" 
          onClick={handleSubmit}
          loading={isLoading}
          disabled={isLoading}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default NoticeResponsePage;