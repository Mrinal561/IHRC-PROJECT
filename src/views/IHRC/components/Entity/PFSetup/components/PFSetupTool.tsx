import React, { useState, useMemo } from 'react';
import { Button, Dialog, Input, Notification, toast } from '@/components/ui';
import { HiPlusCircle, HiUpload } from 'react-icons/hi';
import OutlinedInput from '@/components/ui/OutlinedInput';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import { EntityData } from '@/views/IHRC/store/dummyEntityData';

interface PFSetupToolProps {
  addPFSetup: (newPFSetup: PFSetupData) => void;
  entityData: EntityData[];
  pfCodeLocations: string[];
  existingSignatories: string[];
}

interface SelectOption {
  value: string;
  label: string;
}

interface PFSetupData {
  Company_Group_Name: string;
  Company_Name: string;
  pfCode: string;
  pfCodeLocation: string;
  registrationDate?: string;
  pfUserId?: string;
  pfPassword?: string;
  authorizedSignatory: string;
  signatoryDesignation?: string;
  signatoryMobile?: string;
  signatoryEmail?: string;
  dscValidDate?: string;
  esign?: string;
  pfRegistrationCertificate?: File | null;
}

const PFSetupTool: React.FC<PFSetupToolProps> = ({ addPFSetup, entityData, pfCodeLocations, existingSignatories }) => {
  const [dialogIsOpen, setIsOpen] = useState(false);
  const [pfSetupData, setPFSetupData] = useState<PFSetupData>({
    Company_Group_Name: '',
    Company_Name: '',
    pfCode: '',
    pfCodeLocation: '',
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
    setPFSetupData({
      Company_Group_Name: '',
      Company_Name: '',
      pfCode: '',
      pfCodeLocation: '',
      authorizedSignatory: '',
    });
    setSelectedCompanyGroup(null);
    setSelectedCompanyName(null);
  };

  const handleInputChange = (field: keyof PFSetupData, value: string | File | null) => {
    setPFSetupData(prev => ({ ...prev, [field]: value }));
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
    if (pfSetupData.pfCode && pfSetupData.pfCodeLocation && pfSetupData.authorizedSignatory && selectedCompanyGroup && selectedCompanyName) {
      const newPFSetupData: PFSetupData = {
        ...pfSetupData,
        Company_Group_Name: selectedCompanyGroup.value,
        Company_Name: selectedCompanyName.value,
      };

      addPFSetup(newPFSetupData);
      showSuccessToast(`PF Setup for "${selectedCompanyName.value}" has been successfully added.`);
      onDialogClose();
    } else {
      showFailToast('Please fill in all required fields.');
    }
  };

  return (
    <div>
      <Button variant="solid" onClick={() => setIsOpen(true)} icon={<HiPlusCircle />} size="sm">
        Add PF Setup
      </Button>
      <Dialog 
        isOpen={dialogIsOpen} 
        onClose={() => setIsOpen(false)}
        onRequestClose={() => setIsOpen(false)}
        width={800}
      >
        <h4 className="mb-4 text-xl font-semibold">Add PF Details</h4>
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
              label="PF Code"
              value={pfSetupData.pfCode}
              onChange={(value: string) => handleInputChange('pfCode', value)}
              />
              </div>
              <div className='w-[360px]'>
            <OutlinedSelect
              label="PF Code Location"
              options={pfCodeLocations.map(location => ({ value: location, label: location }))}
              value={pfSetupData.pfCodeLocation ? { value: pfSetupData.pfCodeLocation, label: pfSetupData.pfCodeLocation } : null}
              onChange={(option: SelectOption | null) => handleInputChange('pfCodeLocation', option?.value || '')}
              />
              </div>
              <div className='w-[360px]'>
              <OutlinedInput
            label="Date of Registration"
            value={pfSetupData.registrationDate || ''}
            onChange={(value: string) => handleInputChange('registrationDate', value)}
          />
              </div>
              <div className='w-[360px]'>
              <OutlinedInput
            label="PF User ID (Optional)"
            value={pfSetupData.pfUserId || ''}
            onChange={(value: string) => handleInputChange('pfUserId', value)}
          />
              </div>
              <div className='w-[360px]'>
          <OutlinedInput
            label="Esign"
            value={pfSetupData.esign || ''}
            onChange={(value: string) => handleInputChange('esign', value)}
            />
            </div>
          </div>
          <div className="space-y-4">
            <div className='w-[360px]'>
            <OutlinedSelect
              label="Authorized Signatory"
              options={existingSignatories.map(name => ({ value: name, label: name }))}
              value={pfSetupData.authorizedSignatory ? { value: pfSetupData.authorizedSignatory, label: pfSetupData.authorizedSignatory } : null}
              onChange={(option: SelectOption | null) => handleInputChange('authorizedSignatory', option?.value || '')}
              />
              </div>
              <div className='w-[360px]'>
            <OutlinedInput
              label="Designation"
              value={pfSetupData.signatoryDesignation || ''}
              onChange={(value: string) => handleInputChange('signatoryDesignation', value)}
              />
              </div>
              <div className='w-[360px]'>
            <OutlinedInput
              label="Signatory Mobile"
              value={pfSetupData.signatoryMobile || ''}
              onChange={(value: string) => handleInputChange('signatoryMobile', value)}
              />
              </div>
              <div className='w-[360px]'>
            <OutlinedInput
              label="Signatory Email"
              value={pfSetupData.signatoryEmail || ''}
              onChange={(value: string) => handleInputChange('signatoryEmail', value)}
              />
              </div>
              <div className='w-[360px]'>

              <OutlinedInput
            label="DSC Valid Up To"
            value={pfSetupData.dscValidDate || ''}
            onChange={(value: string) => handleInputChange('dscValidDate', value)}
            />
            </div>
            <div className='w-[360px]'>
                   <OutlinedInput
            label="PF Password (Optional)"
            value={pfSetupData.pfPassword || ''}
            onChange={(value: string) => handleInputChange('pfPassword', value)}
            />
            </div>
            <div className='w-[360px]'>
            <Input
              id="file-upload"
              type="file"
              onChange={(e) => handleInputChange('pfRegistrationCertificate', e.target.files ? e.target.files[0] : null)}
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

export default PFSetupTool;