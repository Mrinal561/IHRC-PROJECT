import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui';
import { HiArrowLeft } from 'react-icons/hi';

const ComplianceTableDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // In a real application, you would fetch the compliance details based on the id
    // For this example, we'll use dummy data
    const complianceDetails = dummyData.find(item => item.Compliance_Id === Number(id));

    if (!complianceDetails) {
        return <div>Compliance not found</div>;
    }

    return (
        <div className="p-4">
            <Button
                size="sm"
                icon={<HiArrowLeft />}
                onClick={() => navigate('/app/compliance')}
                className="mb-4"
            >
                Back to Compliance List
            </Button>
            <h1 className="text-2xl font-bold mb-4">Compliance Details</h1>
            <div className="grid grid-cols-2 gap-4">
                {Object.entries(complianceDetails).map(([key, value]) => (
                    <div key={key} className="mb-4">
                        <h2 className="font-semibold">{key.replace(/_/g, ' ')}</h2>
                        <p>{value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ComplianceTableDetails;