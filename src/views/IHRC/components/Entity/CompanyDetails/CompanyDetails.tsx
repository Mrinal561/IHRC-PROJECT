import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui';
import { HiArrowLeft } from 'react-icons/hi';

const CompanyDetails: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { companyName, companyGroupName } = location.state as { companyName: string; companyGroupName: string };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className='flex items-center gap-4 mb-8'>
                <Button
                    onClick={handleBack}
                    variant="plain"
                    size="sm"
                    icon={<HiArrowLeft />}
                />
                <div>
                <h3>Company Details</h3>
                </div>
            </div>

            <div className="space-y-6">
                <DetailBox title={companyGroupName}>
                <p>{companyName}</p>
                 </DetailBox>
                <div className="flex gap-6">
                    <DetailBox title="PF Setup Details" className="flex-1">
                        <div className="grid grid-cols-2 gap-4">
                            <DetailColumn>
                                <DetailItem label="PF Code" value="DRET12457893" />
                                <DetailItem label="PF Code Location" value="Mumbai" />
                                <DetailItem label="PF Registration Date" value="2023-01-01" />
                                <DetailItem label="PF User ID" value="User01" />
                                <DetailItem label="PF Password" value="password01" />
                                <DetailItem label="Authorized Signatory" value="Amit" />
                            </DetailColumn>
                            <DetailColumn>
                                <DetailItem label="Designation" value="Tech Head" />
                                <DetailItem label="Mobile" value="9145786945" />
                                <DetailItem label="Email" value="amit@gmail.com" />
                                <DetailItem label="DSC Validity" value="2026-01-01" />
                                <DetailItem label="E Sign" value="Active" />
                            </DetailColumn>
                        </div>
                    </DetailBox>

                    <DetailBox title="ESI Setup Details" className="flex-1">
                        <div className="grid grid-cols-2 gap-4">
                            <DetailColumn>
                                <DetailItem label="ESI Code Type" value="Main" />
                                <DetailItem label="ESI Code" value="DRET12457893" />
                                <DetailItem label="ESI Code Location" value="Mumbai" />
                                <DetailItem label="ESI User ID" value="User01" />
                                <DetailItem label="ESI Password" value="password01" />
                            </DetailColumn>
                            <DetailColumn>
                                <DetailItem label="Authorized Signatory" value="Amit" />
                                <DetailItem label="Designation" value="Tech Head" />
                                <DetailItem label="Mobile" value="9145786945" />
                                <DetailItem label="Email" value="amit@gmail.com" />
                            </DetailColumn>
                        </div>
                    </DetailBox>
                </div>

                <div className="flex gap-6">
                    <DetailBox title="LWF Setup Details" className="flex-1">
                        <div className="grid grid-cols-2 gap-4">
                            <DetailColumn>
                                <DetailItem label="LWF State" value="Maharashtra" />
                                <DetailItem label="LWF Location" value="Mumbai" />
                                <DetailItem label="LWF Registration Number" value="REG98765354879" />
                                <DetailItem label="LWF Registration Date" value="2023-01-01" />
                                <DetailItem label="LWF Remmitance Mode" value="Online" />
                                <DetailItem label="LWF Remmitance Frequency" value="Yearly" />
                                <DetailItem label="LWF User ID" value="User01" />
                                <DetailItem label="LWF Password" value="password01" />
                            </DetailColumn>
                            <DetailColumn>
                                <DetailItem label="LWF Frequency" value="Monthly" />
                                <DetailItem label="LWF Payment Due Date" value="2023-10-22" />
                                <DetailItem label="LWF Applicable State" value="Tamil Nadu" />
                                <DetailItem label="Authorized Signatory" value="Amit" />
                                <DetailItem label="Designation" value="Tech Head" />
                                <DetailItem label="Mobile" value="9145786945" />
                                <DetailItem label="Email" value="amit@gmail.com" />
                            </DetailColumn>
                        </div>
                    </DetailBox>

                    <DetailBox title="PT Setup Details" className="flex-1">
                        <div className="grid grid-cols-2 gap-4">
                            <DetailColumn>
                                <DetailItem label="PT State" value="Maharashtra" />
                                <DetailItem label="PT Location" value="Mumbai" />
                                <DetailItem label="PT Enrollment Number" value="PT1234587954" />
                                <DetailItem label="PT Registration Number" value="REG98765354879" />
                                <DetailItem label="PT Registration Date" value="2023-01-01" />
                                <DetailItem label="PT Remmitance Mode" value="Online" />
                                <DetailItem label="PT User ID" value="User01" />
                            </DetailColumn>
                            <DetailColumn>
                                <DetailItem label="PT Password" value="password01" />
                                <DetailItem label="PTRC Payment Frequency" value="Quarterly" />
                                <DetailItem label="PTEC Payment Frequency" value="Monthly" />
                                <DetailItem label="Authorized Signatory" value="Amit" />
                                <DetailItem label="Designation" value="Tech Head" />
                                <DetailItem label="Mobile" value="9145786945" />
                                <DetailItem label="Email" value="amit@gmail.com" />
                            </DetailColumn>
                        </div>
                    </DetailBox>
                </div>
            </div>
        </div>
    );
};

interface DetailBoxProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

const DetailBox: React.FC<DetailBoxProps> = ({ title, children, className }) => (
    <div className={`border p-6 rounded-lg shadow-sm bg-white ${className}`}>
        <h3 className="text-xl font-semibold mb-4 text-gray-700">{title}</h3>
        {children}
    </div>
);

const DetailColumn: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="space-y-2">
        {children}
    </div>
);

const DetailItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <p className="text-sm">
        <strong className="text-gray-600">{label}:</strong>{' '}
        <span className="text-gray-400">{value}</span>
    </p>
);

export default CompanyDetails;