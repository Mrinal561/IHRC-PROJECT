import React, { useState } from 'react';
import { Button, Dialog, Notification, toast } from '@/components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import OutlinedInput from '@/components/ui/OutlinedInput';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';

interface PFSetupData {
  companyGroup: string;
  companyName: string;
  pfCode: string;
  pfCodeLocation: string;
  pfUserId?: string;
  pfPassword?: string;
  authorizedSignatory: string;
  signatoryMobile?: string;
  signatoryEmail?: string;
  dscValidDate?: string;
}

interface PFSetupToolProps {
  addPFSetup: (newPFSetup: PFSetupData) => void;
  companyGroups: string[];
  companyNames: string[];
  pfCodeLocations: string[];
  existingSignatories: string[];
}

const PFSetupTool: React.FC<PFSetupToolProps> = ({
  addPFSetup,
  companyGroups,
  companyNames,
  pfCodeLocations,
  existingSignatories,
}) => {
  const [dialogIsOpen, setIsOpen] = useState(false);
  const [pfSetupData, setPFSetupData] = useState<PFSetupData>({
    companyGroup: '',
    companyName: '',
    pfCode: '',
    pfCodeLocation: '',
    authorizedSignatory: '',
  });
  const [isNewSignatory, setIsNewSignatory] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => {
    setIsOpen(false);
    setPFSetupData({
      companyGroup: '',
      companyName: '',
      pfCode: '',
      pfCodeLocation: '',
      authorizedSignatory: '',
    });
    setIsNewSignatory(false);
  };

  const handleInputChange = (field: keyof PFSetupData, value: string) => {
    setPFSetupData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignatoryChange = (value: string) => {
    setIsNewSignatory(value === 'new');
    handleInputChange('authorizedSignatory', value === 'new' ? '' : value);
  };

  const validateForm = () => {
    const requiredFields = ['companyGroup', 'companyName', 'pfCode', 'pfCodeLocation', 'authorizedSignatory'];
    const missingFields = requiredFields.filter(field => !pfSetupData[field as keyof PFSetupData]);
    
    if (missingFields.length > 0) {
      toast.push(<Notification title="Error" type="danger">Please fill all required fields.</Notification>);
      return false;
    }

    if (isNewSignatory && (!pfSetupData.signatoryMobile || !pfSetupData.signatoryEmail || !pfSetupData.dscValidDate)) {
      toast.push(<Notification title="Error" type="danger">Please fill all new signatory details.</Notification>);
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      addPFSetup(pfSetupData);
      toast.push(<Notification title="Success" type="success">PF Setup added successfully.</Notification>);
      closeDialog();
    }
  };

  return (
    <div>
      <Button variant="solid" onClick={openDialog} icon={<HiPlusCircle />} size="sm">
        Add PF Setup
      </Button>
      <Dialog isOpen={dialogIsOpen} onClose={closeDialog} onRequestClose={closeDialog}>
        <h5 className="mb-4">Add PF Setup</h5>
        <div className="space-y-4">
          <OutlinedSelect
            label="Company Group"
            options={companyGroups.map(group => ({ value: group, label: group }))}
            value={pfSetupData.companyGroup}
            onChange={(value: string) => handleInputChange('companyGroup', value)}
          />
          <OutlinedSelect
            label="Company Name"
            options={companyNames.map(name => ({ value: name, label: name }))}
            value={pfSetupData.companyName}
            onChange={(value: string) => handleInputChange('companyName', value)}
          />
          <OutlinedInput
            label="PF Code"
            value={pfSetupData.pfCode}
            onChange={(value: string) => handleInputChange('pfCode', value)}
          />
          <OutlinedSelect
            label="PF Code Location"
            options={pfCodeLocations.map(location => ({ value: location, label: location }))}
            value={pfSetupData.pfCodeLocation}
            onChange={(value: string) => handleInputChange('pfCodeLocation', value)}
          />
          <OutlinedInput
            label="PF User ID (Optional)"
            value={pfSetupData.pfUserId || ''}
            onChange={(value: string) => handleInputChange('pfUserId', value)}
          />
          <OutlinedInput
            label="PF Password (Optional)"
            value={pfSetupData.pfPassword || ''}
            onChange={(value: string) => handleInputChange('pfPassword', value)}
          />
          <OutlinedSelect
            label="Authorized Signatory"
            options={[
              ...existingSignatories.map(name => ({ value: name, label: name })),
              { value: 'new', label: 'Add New Signatory' }
            ]}
            value={pfSetupData.authorizedSignatory}
            onChange={(value: string) => handleSignatoryChange(value)}
          />
          {isNewSignatory && (
            <>
              <OutlinedInput
                label="Signatory Name"
                value={pfSetupData.authorizedSignatory}
                onChange={(value: string) => handleInputChange('authorizedSignatory', value)}
              />
              <OutlinedInput
                label="Signatory Mobile"
                value={pfSetupData.signatoryMobile || ''}
                onChange={(value: string) => handleInputChange('signatoryMobile', value)}
              />
              <OutlinedInput
                label="Signatory Email"
                value={pfSetupData.signatoryEmail || ''}
                onChange={(value: string) => handleInputChange('signatoryEmail', value)}
              />
              <OutlinedInput
                label="DSC Valid Date"
                value={pfSetupData.dscValidDate || ''}
                onChange={(value: string) => handleInputChange('dscValidDate', value)}
              />
            </>
          )}
        </div>
        <div className="text-right mt-6">
          <Button className="mr-2" variant="plain" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="solid" onClick={handleSubmit}>
            Confirm
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default PFSetupTool;