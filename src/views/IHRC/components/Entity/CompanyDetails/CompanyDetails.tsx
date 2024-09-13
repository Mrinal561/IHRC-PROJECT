import React, { useState, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PFSetupTable, { PFSetupData } from '../PFSetup/components/PFSetupTable';
import PTSetupTable, { PTSetupData } from '../PTSetup/components/PTSetupTable';
import ESISetupTable, { ESISetupData } from '../ESICSetup/components/EsicSetupTable';
import LWFSetupTable, { LWFSetupData } from '../LWFSetup/components/LWFSetupTable';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import { Button } from '@/components/ui';
import { HiArrowLeft } from 'react-icons/hi';

type SetupOption = {
    value: 'PF' | 'PT' | 'LWF' | 'ESI';
    label: string;
};

const CompanyDetails: React.FC = () => {
    console.log('CompanyDetails component rendering');
    const navigate = useNavigate();

    const location = useLocation();
    const { companyName, companyGroupName } = location.state as { companyName: string; companyGroupName: string };
    const [selectedSetup, setSelectedSetup] = useState<SetupOption>({ value: 'PF', label: 'PF Setup' });

    useEffect(() => {
        console.log('Selected setup:', selectedSetup);
    }, [selectedSetup]);

    const setupOptions: SetupOption[] = [
        { value: 'PF', label: 'PF Setup' },
        { value: 'PT', label: 'PT Setup' },
        { value: 'LWF', label: 'LWF Setup' },
        { value: 'ESI', label: 'ESI Setup' },
    ];


    // Dummy data for each setup type
    const pfData: PFSetupData[] = [
        {
            Company_Group_Name: companyGroupName,
            Company_Name: companyName,
            pfCode: 'ASWQ124795863',
            pfCodeLocation: 'Delhi',
            registrationDate: '2023-01-01',
            pfUserId: 'user1',
            pfPassword: 'password1',
            authorizedSignatory: 'Amit',
            signatoryDesignation: 'Manager',
            signatoryMobile: '1234567890',
            signatoryEmail: 'amit@example.com',
            dscValidDate: '2024-01-01',
            esign: 'ACTIVE',
        },
    ];

    const ptData: PTSetupData[] = [
        {
            Company_Group_Name: companyGroupName,
            Company_Name: companyName,
            ptState: 'West Bengal',
            ptLocation: 'Kolkata',
            ptEnrollmentNumber: '1452789',
            ptRegistrationNumber: 'RA14798563',
            ptRegistrationDate: '2023-05-15',
            ptRemmitanceMode: 'Online',
            ptUserId: 'User1',
            ptPassword: 'password123',
            authorizedSignatory: 'Ajay Thakur',
            signatoryDesignation: 'CFO',
            signatoryMobile: '123456789',
            signatoryEmail: 'ajay@gmail.com',
            ptecPaymentFrequency: 'Yearly',
            ptrcPaymentFrequency: 'Monthly'
        },
    ];

    const lwfData: LWFSetupData[] = [
        {
            Company_Group_Name: companyGroupName,
            Company_Name: companyName,
            lwfState: 'Bihar',
            lwfLocation: 'Muzaffarpur',
            lwfRegistrationNumber: 'RA145789632',
            lwfRegistrationDate: '2023-05-15',
            lwfRemmitanceMode: 'Offline',
            lwfRemmitanceFrequency: 'Yearly',
            lwfUserId: 'User01',
            lwfPassword: 'password1234',
            authorizedSignatory: 'Ajay Thakur',
            signatoryDesignation: 'CFO',
            signatoryMobile: '4578135467',
            signatoryEmail: 'ajay@gmail.com',
            lwfFrequency: 'Monthly',
            lwfPaymentDueDate: '2023-10-20',
            lwfApplicableState: 'West Bengal',
        },
    ];

    const esiData: ESISetupData[] = [
        {
            Company_Group_Name: companyGroupName,
            Company_Name: companyName,
            esiCode: 'ASWQ124795863',
            esiCodeLocation: 'Delhi',
            esiCodeType: 'Main Code',
            esiUserId: 'User01',
            esiPassword: 'password145',
            authorizedSignatory: 'Amit',
            signatoryDesignation: 'Manager',
            signatoryMobile: '145789632',
            signatoryEmail: 'amit@gmail.com',
        },
    ];

    const handleSetupChange = useCallback((newSetup: SetupOption) => {
        console.log('Setup changed to:', newSetup);
        setSelectedSetup(newSetup);
    }, []);

    const handleDelete = useCallback((index: number) => {
        console.log(`Delete ${selectedSetup.value} setup at index ${index}`);
        // Implement delete logic
    }, [selectedSetup]);

    const handleEdit = useCallback((index: number, newData: any) => {
        console.log(`Edit ${selectedSetup.value} setup at index ${index}`, newData);
        // Implement edit logic
    }, [selectedSetup]);


    const handleBack = useCallback(() => {
        navigate(-1); // This will navigate back to the previous page
    }, [navigate]);


    const renderSetupTable = useCallback(() => {
        console.log('Rendering setup table for:', selectedSetup);
        switch (selectedSetup.value) {
            case 'PF':
                return <PFSetupTable data={pfData} onDelete={handleDelete} onEdit={handleEdit} />;
            case 'PT':
                return <PTSetupTable data={ptData} onDelete={handleDelete} onEdit={handleEdit} />;
            case 'LWF':
                return <LWFSetupTable data={lwfData} onDelete={handleDelete} onEdit={handleEdit} />;
            case 'ESI':
                return <ESISetupTable data={esiData} onDelete={handleDelete} onEdit={handleEdit} />;
            default:
                console.log('No matching setup found');
                return null;
        }
    }, [selectedSetup, pfData, ptData, lwfData, esiData, handleDelete, handleEdit]);

    return (
        <div className="p-4">
            <div className='flex justify-between mb-10'>
                <div>
                    <div className='flex gap-2'>

                    <Button
                        onClick={handleBack}
                        variant="plain"
                        size="sm"
                        icon={<HiArrowLeft />}
                        >
                    </Button>
                    <h1 className="text-2xl font-bold mb-4">Company Details: {companyName}</h1>
                        </div>
                    <p className="mb-4">Company Group: {companyGroupName}</p>
                </div>
                <div className="mb-4 w-64">
                    <OutlinedSelect
                        label='Filter'
                        options={setupOptions}
                        value={selectedSetup}
                        onChange={handleSetupChange}
                    />
                </div>
            </div>
            {renderSetupTable()}
        </div>
    );
};

export default CompanyDetails;

