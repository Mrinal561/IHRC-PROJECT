
import React, { useState, useEffect } from 'react';
import { Button, Dialog, Notification, toast } from '@/components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import OutlinedInput from '@/components/ui/OutlinedInput';
import AdaptableCard from '@/components/shared/AdaptableCard';
import CompanyNameTable from './components/CompanyNameTable';
import Filter from './components/Filter';
import { useAppDispatch } from '@/store';
import { fetchCompanies, createCompany } from '@/store/slices/company/companySlice';
import { CompanyData } from '@/@types/company';
import { endpoints } from '@/api/endpoint';
import httpClient from '@/api/http-client';
import Bu from './components/Bu';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { showErrorNotification } from '@/components/ui/ErrorMessage';

interface NewCompany {
  name: string;
  group_id: number;
}

const validationSchema = yup.object().shape({
  name: yup
  .string()
  .required('Company name is required')
  .min(2, 'Company name must be at least 2 characters')
  .max(100, 'Company name must not exceed 100 characters')
  .matches(/^\S.*\S$|^\S$/,'The input must not have leading or trailing spaces'),
  group_id: yup
    .number()
    .min(1, 'Valid company group is required')
    .required('Company group is required')
});

const CompanyName = () => {
  const dispatch = useAppDispatch();
  const [nameFieldTouched, setNameFieldTouched] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [dialogLoading, setDialogLoading] = useState(false);
  const [companyData, setCompanyData] = useState<CompanyData[]>([]);
  const [dialogIsOpen, setIsOpen] = useState(false);
  const [tableKey, setTableKey] = useState(0);
  const navigate = useNavigate();
  const [companyGroup, setCompanyGroup] = useState({ id: 0, name: '' });

  // Load default company group
  const loadDefaultCompanyGroup = async () => {
    try {
      const { data } = await httpClient.get(endpoints.companyGroup.getAll(), {
        params: { ignorePlatform: true },
      });
      
      // Assuming we want the first company group as default
      if (data.data && data.data.length > 0) {
        const defaultGroup = data.data[0];
        const groupData = {
          id: defaultGroup.id,
          name: defaultGroup.name
        };
        setCompanyGroup(groupData);
        // Initialize formik with the default group_id
        formik.setFieldValue('group_id', defaultGroup.id);
      }
    } catch (error) {
      console.error('Failed to load default company group:', error);
      toast.push(
        <Notification title="Error" type="danger">
          Failed to load company group
        </Notification>
      );
    }
  };

  const fetchCompanyDataTable = async (page = 1, pageSize = 10) => {
    setIsLoading(true);
    try {
      const { payload: data }: any = await dispatch(fetchCompanies({
        page,
        page_size: pageSize
      }));
      
      if (data && data.data) {
        setCompanyData(
          data.data.map((v: any) => ({
            ...v,
            company_group_name: v?.CompanyGroup?.name
          })) || []
        );
      }
    } catch (error) {
      console.error('Failed to fetch companies:', error);
      toast.push(
        <Notification title="Error" type="danger">
          Failed to fetch companies
        </Notification>
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDataChange = async () => {
    setTableKey(prevKey => prevKey + 1);
    await fetchCompanyDataTable(1, 10);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      group_id: companyGroup.id, // Initialize with current group_id
    },
    validationSchema,
    enableReinitialize: true, // This ensures form values update when initialValues change
    onSubmit: async (values) => {
      if (values.group_id === 0) {
        showErrorNotification('Valid company group is required');
        return;
      }
      
      setDialogLoading(true);
      try {
        const response = await dispatch(createCompany(values))
          .unwrap()
          .catch((error: any) => {
            if (error.response?.data?.message) {
              showErrorNotification(error.response.data.message);
            } else if (error.message) {
              showErrorNotification(error.message);
            } else if (Array.isArray(error)) {
              showErrorNotification(error);
            } else {
              showErrorNotification(error);
            }
            throw error;
          });

        if(response) {
          onDialogClose();
          toast.push(
            <Notification title="Success" type="success">
              Company added successfully
            </Notification>
          );
          handleDataChange();
        }
      } catch (error) {
        console.error(error);
      } finally {
        setDialogLoading(false);
      }
    },
  });

  useEffect(() => {
    loadDefaultCompanyGroup();
  }, []);

  useEffect(() => {
    fetchCompanyDataTable();
  }, []);

  // useEffect(() => {
  //   if (isTouched) {
  //     formik.validateForm();
  //   }
  // }, [formik.values, isTouched]);

  const onDialogClose = () => {
    setIsOpen(false);
    formik.resetForm();
    setNameFieldTouched(false); 
  };

  const handleInputChange = (value: string) => {
    setNameFieldTouched(true); 
    formik.setFieldValue('name', value);
  };

  const shouldShowNameError = nameFieldTouched && formik.errors.name;

  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10">
        <div className="mb-4 lg:mb-0">
          <h3 className="text-2xl font-bold">Company Manager</h3>
        </div>
        <div className="flex gap-3 items-center">
          <Filter />
          <Bu onUploadSuccess={handleDataChange} />
          <Button
            size="sm"
            icon={<HiPlusCircle />}
            onClick={() => setIsOpen(true)}
            variant="solid"
          >
            Add Company
          </Button>
        </div>
      </div>

      <CompanyNameTable 
        key={tableKey}
        onDataChange={handleDataChange}
        companyData={companyData}
        isLoading={isLoading}
      />

      <Dialog
        isOpen={dialogIsOpen}
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
        shouldCloseOnOverlayClick={false} 
      >
        <form onSubmit={formik.handleSubmit}>
          <h5 className="mb-4">Add Company</h5>
          <div className="mb-4 flex flex-col gap-3">
            <label>Company Group</label>
            <OutlinedInput
              label="Company Group"
              value={companyGroup.name}
              disabled
            />
            {formik.touched.group_id && formik.errors.group_id && (
              <div className="mt-1 text-red-500 text-sm">{formik.errors.group_id}</div>
            )}
          </div>
          <div className="mb-4 flex flex-col gap-3">
            <label>Enter company name <span className="text-red-500">*</span></label>
            <OutlinedInput
              label="Company Name"
              value={formik.values.name}
              onChange={handleInputChange}
            />
            {shouldShowNameError&& (
              <div className="mt-1 text-red-500 text-sm">{formik.errors.name}</div>
            )}
          </div>
          <div className="text-right mt-6">
            <Button
              className="ltr:mr-2 rtl:ml-2"
              variant="plain"
              onClick={onDialogClose}
              disabled={dialogLoading}
              type="button"
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              loading={dialogLoading}
              type="submit"
            >
              {dialogLoading ? 'Adding...' : 'Confirm'}
            </Button>
          </div>
        </form>
      </Dialog>
    </AdaptableCard>
  );
};

export default CompanyName;