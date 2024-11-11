import React from 'react';
// import { useLocation } from 'react-router-dom';
import { HistoryComplianceDataRow } from './HistoryPageTable'; // Import the interface for StatusDataRow
import { useLocation, useNavigate } from 'react-router-dom';
import AdaptableCard from '@/components/shared/AdaptableCard';
import Badge from '@/components/ui/Badge';
import { Button } from '@/components/ui';
import { IoArrowBack } from 'react-icons/io5'; 

const ComplianceDetails: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate()
  const complianceData = state as HistoryComplianceDataRow;
  const categorizationColor: Record<string, { label: string; dotClass: string; textClass: string }> = {
    'LICENSE / REGISTRATION': {
      label: 'License / Registration',
      dotClass: 'bg-emerald-500',
      textClass: 'text-emerald-500',
    },
    'REPORTING': {
      label: 'Reporting',
      dotClass: 'bg-emerald-500',
      textClass: 'text-emerald-500',
    },
    'REGISTRATION / REPORTING': {
      label: 'Registration / Reporting',
      dotClass: 'bg-emerald-500',
      textClass: 'text-emerald-500',
    }
    // Add more categories as needed
  };
  return (
    <AdaptableCard className="p-4">
      <div className="lg:flex items-center gap-2 mb-8">
        <div className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#7c828e]/30 hover:text-[#5d6169] hover:rounded-full">
          <Button
            size="sm"
            variant="plain"
            icon={<IoArrowBack className="text-[#72828e] hover:text-[#5d6169]" />}
            onClick={() => navigate(-1)}
          />
        </div>
        <h3 className="mb-2 lg:mb-0">Compliance Details</h3>
      </div>

      {/* Main compliance details */}
      <div className="border p-2 rounded-md mb-2">
        <h2 className="text-xl font-semibold mb-2">{complianceData.Compliance_Header}</h2>
        <p className="text-sm mb-2"><strong>Legislation:</strong> {complianceData.Legislation}</p>
        <p className="text-sm mb-2"><strong>Compliance Status:</strong> {complianceData.Status}</p>
      </div>

      {/* Description and Bare Act Text side by side */}
      <div className="flex gap-6 mb-2">
        {/* Description box */}
        <div className="border p-4 rounded-md w-1/2">
          <h3 className="text-base font-semibold mb-2">Description</h3>
          <p className="text-sm">{complianceData.Compliance_Description}</p>
        </div>
        {/* Bare Act Text box */}
        <div className="border p-4 rounded-md w-1/2">
          <h3 className="text-base font-semibold mb-2">Bare Act Text</h3>
          <p className="text-sm">{complianceData.Bare_Act_Text}</p>
        </div>
      </div>

      {/* Compliance Information box */}
      <div className="border p-4 rounded-md">
        <h3 className="text-xl font-semibold mb-4">Compliance Information</h3>
        <div className="flex gap-6">
          {/* First inner box */}
          <div className="w-1/2">
            <p className="text-sm mb-2"><strong>Compliance ID:</strong> {complianceData.Compliance_ID}</p>
            <p className="text-sm mb-2"><strong>Compliance Instance ID:</strong> {complianceData.Compliance_Instance_ID}</p>
            <p className="text-sm mb-2"><strong>Compliance Applicability:</strong> {complianceData.Compliance_Applicability}</p>
            <p className="text-sm mb-2"><strong>Compliance Clause:</strong> {complianceData.Compliance_Clause}</p>
            <p className="text-sm mb-2"><strong>Compliance Type:</strong> {complianceData.Compliance_Type}</p>
            <p className="text-sm mb-2"><strong>Compliance Frequency:</strong> {complianceData.Compliance_Frequency}</p>
            <p className="text-sm mb-2"><strong>Criticality:</strong> {complianceData.Criticality}</p>
          </div>
          {/* Second inner box */}
          <div className="w-1/2">
            <p className="text-sm mb-2"><strong>Owner:</strong> {complianceData.Owner_Name}</p>
            <p className="text-sm mb-2"><strong>Approver:</strong> {complianceData.Approver_Name}</p>
            <p className="text-sm mb-2"><strong>Proof:</strong> {complianceData.Proof}</p>
            <p className="text-sm mb-2"><strong>Remark:</strong> {complianceData.Remark}</p>
          </div>
        </div>
      </div>
    </AdaptableCard>
  );
};

export default ComplianceDetails;