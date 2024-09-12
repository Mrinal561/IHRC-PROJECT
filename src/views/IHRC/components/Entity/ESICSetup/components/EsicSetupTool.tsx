import React, { useState, useMemo } from 'react';
import { Button, Dialog, Input, Notification, toast } from '@/components/ui';
import { HiPlusCircle, HiUpload } from 'react-icons/hi';
import OutlinedInput from '@/components/ui/OutlinedInput';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import { EntityData } from '@/views/IHRC/store/dummyEntityData';

interface ESICSetupToolProps {
  addPFSetup: (newPFSetup: ESICSetupData) => void;
  entityData: EntityData[];
  pfCodeLocations: string[];
  existingSignatories: string[];
}

interface SelectOption {
  value: string;
  label: string;
}

interface ESICSetupData {
  Company_Group_Name: string;
  Company_Name: string;
  esicCode: string;
  esicCodeType: string;
  esicCodeLocation: string;
  esicUserId?: string;
  esicPassword?: string;
  authorizedSignatory: string;
  signatoryDesignation?: string;
  signatoryMobile?: string;
  signatoryEmail?: string;
  esicRegistrationCertificate?: File | null;
}

const EsicSetupTool: React.FC<ESICSetupData> = ({ addESICSetup, entityData, esicCodeLocations, existingSignatories }) => {
  const [dialogIsOpen, setIsOpen] = useState(false);
  const [esicSetupData, setEsicSetupData] = useState<ESICSetupData>({
    Company_Group_Name: '',
    Company_Name: '',
    esicCodeType: '',
    esicCode: '',
    esicCodeLocation: '',
    authorizedSignatory: '',
  });
  const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<SelectOption | null>(null);
  const [selectedCompanyName, setSelectedCompanyName] = useState<SelectOption | null>(null);

  const companyGroupOptions = useMemo(() => {
    const groups = [...new Set(entityData.map(item => item.Company_Group_Name))];
    return groups.map(group => ({ value: group, label: group }));
  }, [entityData]);

  const filteredCompanyNameOptions = useMemo(() => {
    if (!selectedCompanyGroup) return [];
    const names = entityData
      .filter(item => item.Company_Group_Name === selectedCompanyGroup.value)
      .map(item => item.Company_Name);
    return [...new Set(names)].map(name => ({ value: name, label: name }));
  }, [entityData, selectedCompanyGroup]);

  const openDialog = () => {
    setIsOpen(true);
  };

  const onDialogClose = () => {
    setIsOpen(false);
    setEsicSetupData({
      Company_Group_Name: '',
      Company_Name: '',
      esicCodeType: '',
      esicCode: '',
      esicCodeLocation: '',
      authorizedSignatory: '',
    });
    setSelectedCompanyGroup(null);
    setSelectedCompanyName(null);
  };

  const handleInputChange = (field: keyof ESICSetupData, value: string | File | null) => {
    setEsicSetupData(prev => ({ ...prev, [field]: value }));
  };

  const showSuccessToast = (message: string) => {
    toast.push(
      <Notification title="Success" type="success">
        {message}
      </Notification>
    );
  };

  const showFailToast = (message: string) => {
    toast.push(
      <Notification title="Error" type="danger">
        {message}
      </Notification>
    );
  };

  const onDialogOk = () => {
    if (esicSetupData.esicCode && esicSetupData.esicCodeLocation && esicSetupData.authorizedSignatory && selectedCompanyGroup && selectedCompanyName) {
      const newPFSetupData: ESICSetupData = {
        ...esicSetupData,
        Company_Group_Name: selectedCompanyGroup.value,
        Company_Name: selectedCompanyName.value,
      };

      addESICSetup(newPFSetupData);
      showSuccessToast(`PF Setup for "${selectedCompanyName.value}" has been successfully added.`);
      onDialogClose();
    } else {
      showFailToast('Please fill in all required fields.');
    }
  };

  return (
    <div>
      <Button variant="solid" onClick={() => setIsOpen(true)} icon={<HiPlusCircle />} size="sm">
        Add ESIC Setup
      </Button>
      <Dialog 
        isOpen={dialogIsOpen} 
        onClose={() => setIsOpen(false)}
        onRequestClose={() => setIsOpen(false)}
        width={800}
      >
        <h4 className="mb-4 text-xl font-semibold">Add ESIC Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
          <div className='w-[360px]'>
            <OutlinedSelect
              label="Company Group Name"
              options={companyGroupOptions}
              value={selectedCompanyGroup}
              onChange={(option: SelectOption | null) => {
                setSelectedCompanyGroup(option);
                setSelectedCompanyName(null);
              }}
              />
              </div>
              <div className='w-[360px]'>
            <OutlinedSelect
              label="Company Name"
              options={filteredCompanyNameOptions}
              value={selectedCompanyName}
              onChange={(option: SelectOption | null) => setSelectedCompanyName(option)}
              />
              </div>
              <div className='w-[360px]'>
            <OutlinedInput
              label="ESIC Code Type"
              value={esicSetupData.esicCodeType}
              onChange={(value: string) => handleInputChange('esicCodeType', value)}
              />
              </div>
              <div className='w-[360px]'>
            <OutlinedInput
              label="ESIC Code"
              value={esicSetupData.esicCode}
              onChange={(value: string) => handleInputChange('esicCode', value)}
              />
              </div>
              <div className='w-[360px]'>
            <OutlinedSelect
              label="ESIC Code Location"
              options={esicCodeLocations.map(location => ({ value: location, label: location }))}
              value={esicSetupData.esicCodeLocation ? { value: esicSetupData.esicCodeLocation, label: esicSetupData.esicCodeLocation } : null}
              onChange={(option: SelectOption | null) => handleInputChange('esicCodeLocation', option?.value || '')}
              />
              </div>
             
              <div className='w-[360px]'>
              <OutlinedInput
            label="PF User ID (Optional)"
            value={esicSetupData.esicUserId || ''}
            onChange={(value: string) => handleInputChange('esicUserId', value)}
          />
              </div>
             
          </div>
          <div className="space-y-4">
            <div className='w-[360px]'>
            <OutlinedSelect
              label="Authorized Signatory"
              options={existingSignatories.map(name => ({ value: name, label: name }))}
              value={esicSetupData.authorizedSignatory ? { value: esicSetupData.authorizedSignatory, label: esicSetupData.authorizedSignatory } : null}
              onChange={(option: SelectOption | null) => handleInputChange('authorizedSignatory', option?.value || '')}
              />
              </div>
              <div className='w-[360px]'>
            <OutlinedInput
              label="Designation"
              value={esicSetupData.signatoryDesignation || ''}
              onChange={(value: string) => handleInputChange('signatoryDesignation', value)}
              />
              </div>
              <div className='w-[360px]'>
            <OutlinedInput
              label="Signatory Mobile"
              value={esicSetupData.signatoryMobile || ''}
              onChange={(value: string) => handleInputChange('signatoryMobile', value)}
              />
              </div>
              <div className='w-[360px]'>
            <OutlinedInput
              label="Signatory Email"
              value={esicSetupData.signatoryEmail || ''}
              onChange={(value: string) => handleInputChange('signatoryEmail', value)}
              />
              </div>
              
            <div className='w-[360px]'>
                   <OutlinedInput
            label="ESIC Password (Optional)"
            value={esicSetupData.esicPassword || ''}
            onChange={(value: string) => handleInputChange('esicPassword', value)}
            />
            </div>
            <div className='w-[360px]'>
            <Input
              id="file-upload"
              type="file"
              onChange={(e) => handleInputChange('esicRegistrationCertificate', e.target.files ? e.target.files[0] : null)}
            />
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-8 space-x-2">
          <Button  onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="solid" onClick={onDialogOk}>
            Confirm
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default EsicSetupTool;
