
import React, { useState, useEffect } from 'react';
import { Button, Dialog, Notification, toast } from '@/components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import OutlinedInput from '@/components/ui/OutlinedInput';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import AdaptableCard from '@/components/shared/AdaptableCard';
import CompanyNameTable from './components/CompanyNameTable';
import Filter from './components/Filter';
import { useAppDispatch } from '@/store';
import { fetchCompanies, createCompany } from '@/store/slices/company/companySlice';
import { CompanyData } from '@/@types/company';
import { endpoints } from '@/api/endpoint';
import httpClient from '@/api/http-client';

interface SelectOption {
  value: string;
  label: string;
}

interface NewCompany {
  name: string;
  group_id: number;
}

const CompanyName = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [dialogLoading, setDialogLoading] = useState(false);
  const [companyData, setCompanyData] = useState<CompanyData[]>([]);
  const [dialogIsOpen, setIsOpen] = useState(false);
  const [tableKey, setTableKey] = useState(0);
  
  // Company creation states
  const [companyName, setCompanyName] = useState('');
  const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<SelectOption | null>(null);
  const [companyGroups, setCompanyGroups] = useState([]);
  const [newCompany, setNewCompany] = useState<NewCompany>({
    name: '',
    group_id: 0
  });

  // Update newCompany when inputs change
  useEffect(() => {
    setNewCompany(prev => ({
      ...prev,
      name: companyName,
      group_id: selectedCompanyGroup?.value ? parseInt(selectedCompanyGroup.value) : 0
    }));
  }, [companyName, selectedCompanyGroup]);

  // Load company groups
  const loadCompanyGroups = async () => {
    try {
      const { data } = await httpClient.get(endpoints.companyGroup.getAll(), {
        params: { ignorePlatform: true },
      });
      setCompanyGroups(
        data.data.map((v: any) => ({
          label: v.name,
          value: String(v.id),
        }))
      );
    } catch (error) {
      console.error('Failed to load company groups:', error);
      toast.push(
        <Notification title="Error" type="danger">
          Failed to load company groups
        </Notification>
      );
    }
  };

  useEffect(() => {
    loadCompanyGroups();
  }, []);

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

  useEffect(() => {
    fetchCompanyDataTable();
  }, []);

  const handleDataChange = async () => {
    setTableKey(prevKey => prevKey + 1);
    await fetchCompanyDataTable(1, 10);
  };

  const onDialogOk = async () => {
    if (!newCompany.name.trim() || !newCompany.group_id) {
      toast.push(
        <Notification title="Error" type="danger">
          Please fill in all required fields
        </Notification>
      );
      return;
    }

    setDialogLoading(true);
    try {
     const response= await dispatch(createCompany(newCompany)).unwrap();

     if(response){
       onDialogClose();
       toast.push(
         <Notification title="Success" type="success">
          Company added successfully
        </Notification>
      );
      handleDataChange();
    }
    } catch (error) {
      toast.push(
        <Notification title="Failed" type="danger">
          Failed to add company
        </Notification>
      );
    } finally {
      setDialogLoading(false);
    }
  };

  const onDialogClose = () => {
    setIsOpen(false);
    setCompanyName('');
    setSelectedCompanyGroup(null);
    setNewCompany({ name: '', group_id: 0 });
  };

  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10">
        <div className="mb-4 lg:mb-0">
          <h3 className="text-2xl font-bold">Company Manager</h3>
        </div>
        <div className="flex gap-3 items-center">
          <Filter />
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
      >
        <h5 className="mb-4">Add Company</h5>
        <div className="mb-4 flex flex-col gap-3">
          <label>Select the company group</label>
          <OutlinedSelect
            label="Company Group"
            options={companyGroups}
            value={selectedCompanyGroup}
            onChange={setSelectedCompanyGroup}
          />
        </div>
        <div className="mb-4 flex flex-col gap-3">
          <label>Enter company name</label>
          <OutlinedInput
            label="Company"
            value={companyName}
            onChange={(value: string) => setCompanyName(value)}
          />
        </div>
        <div className="text-right mt-6">
          <Button
            className="ltr:mr-2 rtl:ml-2"
            variant="plain"
            onClick={onDialogClose}
            disabled={dialogLoading}
          >
            Cancel
          </Button>
          <Button
            variant="solid"
            onClick={onDialogOk}
            loading={dialogLoading}
          >
            {dialogLoading ? 'Adding...' : 'Confirm'}
          </Button>
        </div>
      </Dialog>
    </AdaptableCard>
  );
};

export default CompanyName;