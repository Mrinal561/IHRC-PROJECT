import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AdaptableCard from '@/components/shared/AdaptableCard'
import Badge from '@/components/ui/Badge'
import { Button } from '@/components/ui'
import { IoArrowBack } from 'react-icons/io5' 
interface DataRow {
  Compliance_Id: number;
  Legislation: string;
  Compliance_Categorization: string;
  Compliance_Header: string;
  Compliance_Description: string;
  Penalty_Description: string;
  Compliance_Applicability: string;
  Bare_Act_Text: string;
  Compliance_Clause: string;
  Compliance_Type: string;
  Compliance_Frequency: string;
  Compliance_Statutory_Authority: string;
  Approval_Required: string;
  Criticality: string;
  Penalty_Type: string;
  Default_Due_Date: string;
  First_Due_Date: string;
  Due_Date: string;
  Scheduled_Frequency: string;
  Proof_Of_Compliance_Mandatory: string;
}

const categorizationColor: Record<string, { label: string; dotClass: string; textClass: string }> = {
  'LICENSE / REGISTRATION': {
    label: 'License / Registration',
    dotClass: 'bg-emerald-500',
    textClass: 'text-emerald-500',
  },
  'REPORTING' : {
    label: 'Reporting',
    dotClass: 'bg-emerald-500',
    textClass: 'text-emerald-500',
  },
  'REGISTRATION / REPORTING' : {
    label: 'Registration / Reporting',
    dotClass: 'bg-emerald-500',
    textClass: 'text-emerald-500',
  }
  // Add more categories as needed
}

const ComplianceRowDetails = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const compliance = location.state as DataRow | undefined

  if (!compliance) {
    return <div>Compliance not found</div>
  }

  return (
    <AdaptableCard className="p-4">
        
        <div className="lg:flex items-center gap-2 mb-8">
  <div className='w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#7c828e]/30 hover:text-[#5d6169] hover:rounded-full'>
    <Button
      size="sm"
      variant="plain"
      icon={<IoArrowBack className="text-[#72828e] hover:text-[#5d6169]" />}
      onClick={() => navigate(-1)}
    />
  </div>
  <h3 className="mb-4 lg:mb-0">Compliance Details</h3>
</div>

      {/* First box: Full-width rectangle */}
      <div className="border p-4 rounded-md mb-6">
        <h2 className="text-xl font-semibold mb-2">{compliance.Compliance_Header}</h2>
        <p className="text-sm mb-2"><strong>Legislation:</strong> {compliance.Legislation}</p>
        <div className="flex items-center gap-2">
          <Badge className={categorizationColor[compliance.Compliance_Categorization]?.dotClass} />
          <span className={`capitalize font-semibold ${categorizationColor[compliance.Compliance_Categorization]?.textClass}`}>
            {categorizationColor[compliance.Compliance_Categorization]?.label}
          </span>
        </div>
      </div>

      {/* Two boxes side by side */}
      <div className="flex gap-6 mb-6">
        {/* Description box */}
        <div className="border p-4 rounded-md w-1/2">
          <h3 className="text-base font-semibold mb-2">Description</h3>
          <p className="text-sm">{compliance.Compliance_Description}</p>
        </div>
        {/* Bare Act Text box */}
        <div className="border p-4 rounded-md w-1/2">
          <h3 className="text-base font-semibold mb-2">Bare Act Text</h3>
          <p className="text-sm">{compliance.Bare_Act_Text}</p>
        </div>
      </div>

      {/* Box containing two inner boxes */}
      <div className="border p-4 rounded-md">
        <h3 className="text-xl font-semibold mb-4">Compliance Information</h3>
        <div className="flex gap-6">
          {/* First inner box */}
          <div className="w-1/2">
            <p className="text-sm mb-2"><strong>Compliance ID:</strong> {compliance.Compliance_Id}</p>
            <p className="text-sm mb-2"><strong>Penalty Description:</strong> {compliance.Penalty_Description}</p>
            <p className="text-sm mb-2"><strong>Applicability:</strong> {compliance.Compliance_Applicability}</p>
            <p className="text-sm mb-2"><strong>Compliance Clause:</strong> {compliance.Compliance_Clause}</p>
            <p className="text-sm mb-2"><strong>Compliance Type:</strong> {compliance.Compliance_Type}</p>
            <p className="text-sm mb-2"><strong>Compliance Frequency:</strong> {compliance.Compliance_Frequency}</p>
            <p className="text-sm mb-2"><strong>Compliance Statutory Authority:</strong> {compliance.Compliance_Statutory_Authority}</p>
            <p className="text-sm mb-2"><strong>Approval Required:</strong> {compliance.Approval_Required}</p>
          </div>
          {/* Second inner box */}
          <div className="w-1/2">
            <p className="text-sm mb-2"><strong>Criticality:</strong> {compliance.Criticality}</p>
            <p className="text-sm mb-2"><strong>Penalty Type:</strong> {compliance.Penalty_Type}</p>
            <p className="text-sm mb-2"><strong>Default Due Date:</strong> {compliance.Default_Due_Date}</p>
            <p className="text-sm mb-2"><strong>First Due Date:</strong> {compliance.First_Due_Date}</p>
            <p className="text-sm mb-2"><strong>Due Date:</strong> {compliance.Due_Date}</p>
            <p className="text-sm mb-2"><strong>Scheduled Frequency:</strong> {compliance.Scheduled_Frequency}</p>
            <p className="text-sm mb-2"><strong>Proof Of Compliance Mandatory:</strong> {compliance.Proof_Of_Compliance_Mandatory}</p>
          </div>
        </div>
      </div>
    </AdaptableCard>
  )
}

export default ComplianceRowDetails
