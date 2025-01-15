import React, { useEffect, useState } from 'react';
import { endpoints } from '@/api/endpoint';
import httpClient from '@/api/http-client';
import { Button, Checkbox, Input, toast, Notification } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import { Field, Formik, Form } from 'formik';
import { IoArrowBack } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import DatePicker from '@/components/ui/DatePicker/DatePicker';
import { format } from 'date-fns';
import SubCategoryAutosuggest from './SubCategoryAutosuggest';

interface FormValues {
  agreementType: string;
  ownerName: string;
  partnerName: string;
  partnerContact: string;
  startDate: string;
  endDate: string;
  agreementDocument: File | null;
  subCategory: string;
  // Non-editable fields
  companyGroup: string;
  company: string;
  branch: string;
  applicableForAllCompany: boolean;
}

const validationSchema = Yup.object().shape({
  agreementType: Yup.string().required('Agreement Type is required'),
  ownerName: Yup.string().required('Owner Name is required'),
  partnerName: Yup.string().required('Partner Name is required'),
  partnerContact: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Partner Contact is required'),
  startDate: Yup.date().required('Start Date is required'),
  endDate: Yup.date()
    .min(Yup.ref('startDate'), 'End date must be after start date')
    .required('End Date is required'),
  subCategory: Yup.string().required('Sub Category is required'),
  agreementDocument: Yup.mixed()
    .test('fileSize', 'File size must be less than 20MB', (value) => {
      if (!value || !(value instanceof File)) return true;
      return value.size <= 20 * 1024 * 1024;
    })
    .test('fileType', 'Only PDF, ZIP, and image files are allowed', (value) => {
      if (!value || !(value instanceof File)) return true;
      const allowedTypes = ['application/pdf', 'application/zip', 'image/jpeg', 'image/png', 'image/gif'];
      return allowedTypes.includes(value.type);
    }),
});

const BranchAgreementEditForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state?.agreementId;
  const [loading, setLoading] = useState(true);
  const [branchOfficeType, setBranchOfficeType] = useState('');
  const [companyGroups, setCompanyGroups] = useState<string[]>([]);
  const [companyGroupId, setCompanyGroupId] = useState('');

  const [initialValues, setInitialValues] = useState<FormValues>({
    agreementType: '',
    ownerName: '',
    partnerName: '',
    partnerContact: '',
    startDate: '',
    endDate: '',
    agreementDocument: null,
    subCategory: '',
    companyGroup: '',
    company: '',
    branch: '',
    applicableForAllCompany: false,
  });

  const showNotification = (type: 'success' | 'info' | 'danger' | 'warning', message: string) => {
    toast.push(
      <Notification title={type.charAt(0).toUpperCase() + type.slice(1)} type={type}>
        {message}
      </Notification>
    );
  };

  const loadInitialData = async () => {
    try {
      const agreementResponse = await httpClient.get(endpoints.branchAgreement.detail(id));
      const agreement = agreementResponse.data.main_agreement;

      setBranchOfficeType(agreement.Branch.office_type);
      
      setInitialValues({
        agreementType: agreement.agreement_type || '',
        ownerName: agreement.owner_name || '',
        partnerName: agreement.partner_name || '',
        partnerContact: agreement.partner_number || '',
        startDate: agreement.start_date ? format(new Date(agreement.start_date), 'yyyy-MM-dd') : '',
        endDate: agreement.end_date ? format(new Date(agreement.end_date), 'yyyy-MM-dd') : '',
        agreementDocument: null,
        subCategory: agreement.sub_category || '',
        // Non-editable fields
        companyGroup: agreement.Branch.Company.group_name || '',
        company: agreement.Branch.Company.name || '',
        branch: agreement.Branch.name || '',
        applicableForAllCompany: agreement.applicable_for_all || false,
      });
      setLoading(false);
    } catch (error) {
      console.error('Failed to load initial data:', error);
      showNotification('danger', 'Failed to load agreement data');
    }
  };

  useEffect(() => {
    if (id) {
      loadInitialData();
    }
  }, [id]);

    const handleFormSubmit = async (
      values: FormValues,
      { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
      try {
        const formData = new FormData();
        formData.append('agreement_type', values.agreementType);
        formData.append('owner_name', values.ownerName);
        formData.append('partner_name', values.partnerName);
        // Convert partner_number to number
        formData.append('partner_number', String(parseInt(values.partnerContact, 10)));
        formData.append('start_date', format(new Date(values.startDate), 'yyyy-MM-dd'));
        formData.append('end_date', format(new Date(values.endDate), 'yyyy-MM-dd'));
        formData.append('sub_category', values.subCategory);
        // Ensure applicable_for_all is boolean
        formData.append('applicable_for_all', values.applicableForAllCompany ? 'true' : 'false');
  
        if (values.agreementDocument instanceof File) {
          formData.append('agreement_document', values.agreementDocument);
        }
  
        await httpClient.put(
          endpoints.branchAgreement.update(id),
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
  
        showNotification('success', 'Agreement updated successfully');
        navigate('/branch-agreements');
      } catch (error) {
        console.error('Failed to update agreement:', error);
        showNotification('danger', 'Failed to update agreement');
      } finally {
        setSubmitting(false);
      }
    }
    
  

  const loadCompanyGroups = async () => {
    try {
      const { data } = await httpClient.get(endpoints.companyGroup.getAll(), {
        params: { ignorePlatform: true }
      });
      if (data.data && data.data.length > 0) {
        const defaultGroup = data.data[0];
        setCompanyGroups(defaultGroup.name);
        setCompanyGroupId(defaultGroup.id);
        // loadCompanies(defaultGroup.id);
      }
    } catch (error) {
      console.error('Failed to load company groups:', error);
      showNotification('danger', 'Failed to load company groups');
    }
  };

  useEffect(() => {
    loadCompanyGroups();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-2 bg-white rounded-lg">
      <div className="flex gap-2 items-center mb-3">
        <Button
          size="sm"
          variant="plain"
          icon={<IoArrowBack className="text-gray-500 hover:text-gray-700" />}
          onClick={() => navigate('/branch-agreements')}
        />
        <h3 className="text-2xl font-semibold">Edit Branch Agreement</h3>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
        enableReinitialize
      >
        {({ errors, touched, values, setFieldValue, isSubmitting }) => (
          <Form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Non-editable fields */}
              <div className="space-y-2">
                <label>Company Group</label>
                <OutlinedInput 
                  value={companyGroups}
                  disabled 
                />
              </div>

              <div className="space-y-2">
                <label>Company</label>
                <OutlinedInput 
                  value={values.company}
                  disabled 
                />
              </div>

              <div className="space-y-2">
                <label>Branch</label>
                <OutlinedInput 
                  value={values.branch}
                  disabled 
                />
              </div>

              {branchOfficeType && (
                <div className="space-y-2">
                  <label>Office Type</label>
                  <OutlinedInput 
                    value={branchOfficeType}
                    disabled 
                  />
                </div>
              )}

              {/* Editable fields */}
              <div className="space-y-2">
                <label htmlFor="agreementType">Agreement Type <span className="text-red-500">*</span></label>
                <Field name="agreementType">
                  {({ field }) => (
                    <OutlinedInput
                      {...field}
                      label="Agreement Type"
                      value={field.value}
                      onChange={(value) => setFieldValue('agreementType', value)}
                      error={errors.agreementType && touched.agreementType}
                    />
                  )}
                </Field>
                {errors.agreementType && touched.agreementType && (
                  <p className="text-red-500 text-sm">{errors.agreementType}</p>
                )}
              </div>
              <div className="space-y-2">
               
                <SubCategoryAutosuggest
                  value={values.subCategory}
                  onChange={(value) => setFieldValue('subCategory', value)}
                  onSubCategorySelect={(value) => {
                    setFieldValue('subCategoryId', value);
                  }}
                  isDisabled={isSubmitting}
                />
                {errors.subCategory && touched.subCategory && (
                  <p className="text-red-500 text-sm">{errors.subCategory}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="ownerName">Owner Name <span className="text-red-500">*</span></label>
                <Field name="ownerName">
                  {({ field }) => (
                    <OutlinedInput
                      {...field}
                      label="Owner Name"
                      value={field.value}
                      onChange={(value) => setFieldValue('ownerName', value)}
                      error={errors.ownerName && touched.ownerName}
                    />
                  )}
                </Field>
                {errors.ownerName && touched.ownerName && (
                  <p className="text-red-500 text-sm">{errors.ownerName}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="partnerName">Partner Name <span className="text-red-500">*</span></label>
                <Field name="partnerName">
                  {({ field }) => (
                    <OutlinedInput
                      {...field}
                      label="Partner Name"
                      value={field.value}
                      onChange={(value) => setFieldValue('partnerName', value)}
                      error={errors.partnerName && touched.partnerName}
                    />
                  )}
                </Field>
                {errors.partnerName && touched.partnerName && (
                  <p className="text-red-500 text-sm">{errors.partnerName}</p>
                )}
              </div>


              <div className="space-y-2">
                <label htmlFor="partnerContact">Partner Contact <span className="text-red-500">*</span></label>
                <Field name="partnerContact">
                  {({ field }) => (
                    <OutlinedInput
                      {...field}
                      label="Partner Contact"
                      value={field.value}
                      onChange={(value) => setFieldValue('partnerContact', value)}
                      error={errors.partnerContact && touched.partnerContact}
                    />
                  )}
                </Field>
                {errors.partnerContact && touched.partnerContact && (
                  <p className="text-red-500 text-sm">{errors.partnerContact}</p>
                )}
              </div>
              

              <div className="space-y-2">
                <label htmlFor="startDate">Start Date <span className="text-red-500">*</span></label>
                <DatePicker
                  label="Start Date"
                  value={values.startDate}
                  onChange={(date) => setFieldValue('startDate', date ? format(date, 'yyyy-MM-dd') : '')}
                />
                {errors.startDate && touched.startDate && (
                  <p className="text-red-500 text-sm">{errors.startDate}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="endDate">End Date <span className="text-red-500">*</span></label>
                <DatePicker
                  label="End Date"
                  value={values.endDate}
                  onChange={(date) => setFieldValue('endDate', date ? format(date, 'yyyy-MM-dd') : '')}
                  minDate={values.startDate ? new Date(values.startDate) : undefined}
                />
                {errors.endDate && touched.endDate && (
                  <p className="text-red-500 text-sm">{errors.endDate}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="agreementDocument">Agreement Document</label>
                <Input
                  type="file"
                  accept=".pdf,.zip,.jpeg,.jpg,.png,.gif"
                  onChange={(e) => {
                    const file = e.currentTarget.files?.[0];
                    if (file) {
                      if (file.size > 20 * 1024 * 1024) {
                        showNotification('danger', 'File size exceeds 20MB limit');
                        e.target.value = '';
                        return;
                      }
                      setFieldValue('agreementDocument', file);
                    }
                  }}
                />
                {errors.agreementDocument && touched.agreementDocument && (
                  <p className="text-red-500 text-sm">{errors.agreementDocument}</p>
                )}
              </div>
            </div>

            {/* Applicable for all company checkbox */}
            {branchOfficeType === 'coorporate_office' && (
              <div className="col-span-2">
                <label className="flex items-center space-x-2">
                  <Checkbox
                    checked={values.applicableForAllCompany}
                    onChange={(checked) => setFieldValue('applicableForAllCompany', checked)}
                  />
                  <span>Applicable for all company</span>
                </label>
              </div>
            )}

            <div className="flex gap-4 justify-end">
              <Button type="submit" disabled={isSubmitting} variant="solid">
                {isSubmitting ? 'Confirming....' : 'Confirm'}
              </Button>
              <Button
                variant="solid"
                onClick={() => navigate('/branch-agreements')}
              >
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BranchAgreementEditForm;