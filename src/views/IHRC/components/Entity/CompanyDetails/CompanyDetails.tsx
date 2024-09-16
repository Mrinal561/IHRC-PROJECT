import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui';
import { HiArrowLeft } from 'react-icons/hi';
import { AdaptableCard } from '@/components/shared';

const CompanyDetails: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { companyName, companyGroupName } = location.state as { companyName: string; companyGroupName: string };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <AdaptableCard className="p-2 max-w-7xl">
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
                <div className="border p-4 rounded-lg shadow-sm bg-white">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">{companyGroupName}</h3>
                    <p>{companyName}</p>
                </div>
                <div className="flex gap-6">
                    <div className="border p-4 rounded-lg shadow-sm bg-white flex-1">
                        <h3 className="text-xl font-semibold mb-4 text-gray-700">PF Setup Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <p className="text-sm mb-2"><strong className="  text-sm mb-2">PF Code:</strong> <span className="  mb-2">DRET12457893</span></p>
                                <p className="text-sm mb-2"><strong className="  text-sm mb-2">PF Code Location:</strong> <span className="  mb-2">Mumbai</span></p>
                                <p className="text-sm mb-2"><strong className="  text-sm mb-2">PF Registration Date:</strong> <span className="  mb-2">2023-01-01</span></p>
                                <p className="text-sm mb-2"><strong className="  text-sm mb-2">PF User ID:</strong> <span className="  mb-2">User01</span></p>
                                <p className="text-sm mb-2"><strong className="  text-sm mb-2">PF Password:</strong> <span className="  mb-2">password01</span></p>
                                <p className="text-sm mb-2"><strong className="  text-sm mb-2">Authorized Signatory:</strong> <span className="  mb-2">Amit</span></p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm mb-2"><strong className="  text-sm mb-2">Designation:</strong> <span className="  mb-2">Manager</span></p>
                                <p className="text-sm mb-2"><strong className="  text-sm mb-2">Mobile:</strong> <span className="  mb-2">9145786945</span></p>
                                <p className="text-sm mb-2"><strong className="  text-sm mb-2">Email:</strong> <span className="  mb-2">amit@gmail.com</span></p>
                                <p className="text-sm mb-2"><strong className="  text-sm mb-2">DSC Validity:</strong> <span className="  mb-2">2026-01-01</span></p>
                            </div>
                        </div>
                    </div>

                    <div className="border p-4 rounded-lg shadow-sm bg-white flex-1">
                        <h3 className="text-xl font-semibold mb-4 text-gray-700">ESI Setup Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <p className="text-sm mb-2"><strong className="  text-sm mb-2">ESI Code Type:</strong> <span className="  mb-2">Main</span></p>
                                <p className="text-sm mb-2"><strong className="  text-sm mb-2">ESI Code:</strong> <span className="  mb-2">DRET12457893</span></p>
                                <p className="text-sm mb-2"><strong className="  text-sm mb-2">ESI Code Location:</strong> <span className="  mb-2">Mumbai</span></p>
                                <p className="text-sm mb-2"><strong className="  text-sm mb-2">ESI User ID:</strong> <span className="  mb-2">User01</span></p>
                                <p className="text-sm mb-2"><strong className="  text-sm mb-2">ESI Password:</strong> <span className="  mb-2">password01</span></p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm mb-2"><strong className="  text-sm mb-2">Authorized Signatory:</strong> <span className="  mb-2">Amit</span></p>
                                <p className="text-sm mb-2"><strong className="  text-sm mb-2">Designation:</strong> <span className="  mb-2">Manager</span></p>
                                <p className="text-sm mb-2"><strong className="  text-sm mb-2">Mobile:</strong> <span className="  mb-2">9145786945</span></p>
                                <p className="text-sm mb-2"><strong className="  text-sm mb-2">Email:</strong> <span className="  mb-2">amit@gmail.com</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border p-4 rounded-lg shadow-sm bg-white flex-1">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">LWF Setup Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <p className="text-sm mb-2"><strong className="  text-sm mb-2">LWF State:</strong> <span className="  mb-2">Maharashtra</span></p>
                            <p className="text-sm mb-2"><strong className="  text-sm mb-2">LWF Location:</strong> <span className="  mb-2">Mumbai</span></p>
                            <p className="text-sm mb-2"><strong className="  text-sm mb-2">LWF Registration Number:</strong> <span className="  mb-2">REG98765354879</span></p>
                            <p className="text-sm mb-2"><strong className="  text-sm mb-2">LWF Registration Date:</strong> <span className="  mb-2">2023-01-01</span></p>
                            <p className="text-sm mb-2"><strong className="  text-sm mb-2">LWF Remmitance Mode:</strong> <span className="  mb-2">Online</span></p>
                            <p className="text-sm mb-2"><strong className="  text-sm mb-2">LWF Remmitance Frequency:</strong> <span className="  mb-2">Yearly</span></p>
                            <p className="text-sm mb-2"><strong className="  text-sm mb-2">LWF User ID:</strong> <span className="  mb-2">User01</span></p>
                            <p className="text-sm mb-2"><strong className="  text-sm mb-2">LWF Password:</strong> <span className="  mb-2">password01</span></p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm mb-2"><strong className="  text-sm mb-2">LWF Frequency:</strong> <span className="  mb-2">Monthly</span></p>
                            <p className="text-sm mb-2"><strong className="  text-sm mb-2">LWF Payment Due Date:</strong> <span className="  mb-2">2023-10-22</span></p>
                            <p className="text-sm mb-2"><strong className="  text-sm mb-2">LWF Applicable State:</strong> <span className="  mb-2">Tamil Nadu</span></p>
                            <p className="text-sm mb-2"><strong className="  text-sm mb-2">Authorized Signatory:</strong> <span className="  mb-2">Amit</span></p>
                            <p className="text-sm mb-2"><strong className="  text-sm mb-2">Designation:</strong> <span className="  mb-2">Manager</span></p>
                            <p className="text-sm mb-2"><strong className="  text-sm mb-2">Mobile:</strong> <span className="  mb-2">9145786945</span></p>
                            <p className="text-sm mb-2"><strong className="  text-sm mb-2">Email:</strong> <span className="  mb-2">amit@gmail.com</span></p>
                        </div>
                    </div>
                </div>

                <div className="border p-4 rounded-lg shadow-sm bg-white flex-1">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">PT Setup Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <p className="text-sm mb-2"><strong className="  text-sm mb-2">PT State:</strong> <span className="  mb-2">Maharashtra</span></p>
                            <p className="text-sm mb-2"><strong className="  text-sm mb-2">PT Location:</strong> <span className="  mb-2">Mumbai</span></p>
                            <p className="text-sm mb-2"><strong className="  text-sm mb-2">PT Enrollment Number:</strong> <span className="  mb-2">PT1234587954</span></p>
                            <p className="text-sm mb-2"><strong className="  text-sm mb-2">PT Registration Number:</strong> <span className="  mb-2">REG98765354879</span></p>
                            <p className="text-sm mb-2"><strong className="  text-sm mb-2">PT Registration Date:</strong> <span className="  mb-2">2023-01-01</span></p>
                            <p className="text-sm mb-2"><strong className="  text-sm mb-2">PT Remmitance Mode:</strong> <span className="  mb-2">Online</span></p>
                            <p className="text-sm mb-2"><strong className="  text-sm mb-2">PT User ID:</strong> <span className="  mb-2">User01</span></p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm mb-2"><strong className="  text-sm mb-2">PT Password:</strong> <span className="  mb-2">password01</span></p>
                            <p className="text-sm mb-2"><strong className="  text-sm mb-2">PTRC Payment Frequency:</strong> <span className="  mb-2">Quarterly</span></p>
                            <p className="text-sm mb-2"><strong className="  text-sm mb-2">PTEC Payment Frequency:</strong> <span className="  mb-2">Monthly</span></p>
                            <p className="text-sm mb-2"><strong className="  text-sm mb-2">Authorized Signatory:</strong> <span className="  mb-2">Amit</span></p>
                            <p className="text-sm mb-2"><strong className="  text-sm mb-2">Designation:</strong> <span className="  mb-2">Manager</span></p>
                            <p className="text-sm mb-2"><strong className="  text-sm mb-2">Mobile:</strong> <span className="  mb-2">9145786945</span></p>
                            <p className="text-sm mb-2"><strong className="  text-sm mb-2">Email:</strong> <span className="mb-2">amit@gmail.com</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </AdaptableCard>
    );
};

export default CompanyDetails;