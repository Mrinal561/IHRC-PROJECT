import React, { useState, useMemo } from 'react'
import { Button, Card, Dialog, Avatar, Tooltip, Dropdown, toast, Notification, Progress } from '@/components/ui'
import { HiOutlineDotsVertical, HiOutlineEye, HiOutlineUpload, HiOutlineClipboardCheck } from 'react-icons/hi'

// Define types
type User = {
  name: string;
  avatar: string;
}

type Compliance = {
  Compliance_Id: number;
  Compliance_Header: string;
  Compliance_Description: string;
  Legislation: string;
  User: User;
  progression: number;
}

const complianceData: Compliance[] = [
  {
    Compliance_Id: 3236,
    Compliance_Header: "Renewal of Registration",
    Compliance_Description: "Apply for renewal of certificate of registration in Form IA in duplicate not less than thirty days before the date on which the certificate of registration expires to the Inspecting Officer along with the prescribed fees.",
    Legislation: "Bihar Shops and Establishments Act 1953 and Bihar Shops Establishments Rules 1955/ Bihar/ IR",
    User: {
      name: "John Doe",
      avatar: "/img/avatars/thumb-1.jpg"
    },
    progression: 100
  },
  {
    Compliance_Id: 4501,
    Compliance_Header: "Annual Renewal of Licence",
    Compliance_Description: "Submit an application for the renewal of the factory license in Form 1A, at least 45 days before the expiry date, to the Factory Inspector along with the required fees.",
    Legislation: "Delhi Factories Act 1948 and Delhi Factories Rules 1950/ Delhi/ IR",
    User: {
      name: "Jane Smith",
      avatar: "/img/avatars/thumb-2.jpg"
    },
    progression: 100
  },
  {
    Compliance_Id: 5602,
    Compliance_Header: "Monthly Compliance Report",
    Compliance_Description: "File a monthly compliance report in Form IX with the Labour Department, detailing employee work hours and wages paid, by the 5th of each month.",
    Legislation: "Karnataka Shops and Commercial Establishments Act 1961 and Karnataka Shops Rules 1963/ Karnataka/ IR",
    User: {
      name: "Alice Johnson",
      avatar: "/img/avatars/thumb-3.jpg"
    },
    progression: 100
  },
  {
    Compliance_Id: 6789,
    Compliance_Header: "Quarterly Wage Report",
    Compliance_Description: "Submit a quarterly wage report in Form XIV to the Labour Commissioner by the 15th of the first month following the end of the quarter.",
    Legislation: "Maharashtra Shops and Establishments Act 1948 and Maharashtra Shops Rules 1954/ Maharashtra/ IR",
    User: {
      name: "Bob Williams",
      avatar: "/img/avatars/thumb-4.jpg"
    },
    progression: 100
  },
  {
    Compliance_Id: 7890,
    Compliance_Header: "Renewal of Trade License",
    Compliance_Description: "Apply for the renewal of the trade license in Form VII at least 30 days before the license expiry date to the Municipal Authority along with the necessary fee.",
    Legislation: "Tamil Nadu Shops and Establishments Act 1947 and Tamil Nadu Shops Rules 1959/ Tamil Nadu/ IR",
    User: {
      name: "Charlie Brown",
      avatar: "/img/avatars/thumb-5.jpg"
    },
    progression: 100
  },
  {
    Compliance_Id: 8912,
    Compliance_Header: "Annual Health and Safety Report",
    Compliance_Description: "Submit an annual health and safety report in Form V to the Labour Department by the end of the financial year.",
    Legislation: "Uttar Pradesh Shops and Establishments Act 1962 and Uttar Pradesh Shops Rules 1964/ Uttar Pradesh/ IR",
    User: {
      name: "Diana Prince",
      avatar: "/img/avatars/thumb-6.jpg"
    },
    progression: 100
  }
];


type ProgressionBarProps = {
  progression: number;
  className?: string;
}

const ProgressionBar: React.FC<ProgressionBarProps> = ({ progression, className }) => {
    const progressExtraProps = useMemo(() => {
        if (progression > 70) {
            return { color: 'green-500' }
        }

        if (progression < 40) {
            return { color: 'red-500' }
        }

        return {}
    }, [progression])

    return <Progress size="sm" percent={progression} {...progressExtraProps} className={className} />
}

type ComplianceCardProps = {
  compliance: Compliance;
  onViewDetails: (compliance: Compliance) => void;
  onUploadDocument: (compliance: Compliance) => void;
}

const ComplianceCard: React.FC<ComplianceCardProps> = ({ compliance, onViewDetails, onUploadDocument }) => {
  const shortDescription = compliance.Compliance_Description.split(' ').slice(0, 10).join(' ') + '...'

  return (
    <Card className='h-full'>
      <div className='flex flex-col h-full'>
        <div className='flex justify-between items-center mb-4'>
          <h6 className='font-bold'>{compliance.Compliance_Header}</h6>
          <Dropdown
            placement="bottom-end"
            renderTitle={<HiOutlineDotsVertical className='text-lg cursor-pointer' />}
          >
            <Dropdown.Item eventKey="viewDetails" onClick={() => onViewDetails(compliance)}>
              <span className="flex items-center">
                <HiOutlineEye className="text-lg mr-2" />
                <span>View Details</span>
              </span>
            </Dropdown.Item>
            <Dropdown.Item eventKey="uploadDocument" onClick={() => onUploadDocument(compliance)}>
              <span className="flex items-center">
                <HiOutlineUpload className="text-lg mr-2" />
                <span>Upload Document</span>
              </span>
            </Dropdown.Item>
          </Dropdown>
        </div>
        <p className='text-sm mb-4'>{shortDescription}</p>
        <div className='mt-auto'>
          <ProgressionBar progression={compliance.progression} className="mb-2" />
          <div className='flex items-center justify-between'>
            <Avatar shape="circle" src={compliance.User.avatar} />
            <div className="flex items-center text-sm">
              <HiOutlineClipboardCheck className="mr-1" />
              <span>Completed</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

const ReuploadDocumentCards: React.FC = () => {
  const [viewDetailsDialog, setViewDetailsDialog] = useState<{ open: boolean; compliance: Compliance | null }>({ open: false, compliance: null })
  const [uploadDialog, setUploadDialog] = useState<{ open: boolean; compliance: Compliance | null }>({ open: false, compliance: null })

  const handleViewDetails = (compliance: Compliance) => {
    setViewDetailsDialog({ open: true, compliance })
  }

  const handleUploadDocument = (compliance: Compliance) => {
    setUploadDialog({ open: true, compliance })
  }

  const handleConfirmUpload = () => {
    setUploadDialog({ open: false, compliance: null })
    toast.push(
      <Notification title="Success" type="success">
        Document uploaded successfully
      </Notification>
    )
  }

  return (
    <div>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4'>
        {complianceData.map((compliance) => (
          <ComplianceCard
            key={compliance.Compliance_Id}
            compliance={compliance}
            onViewDetails={handleViewDetails}
            onUploadDocument={handleUploadDocument}
          />
        ))}
      </div>

      <Dialog
        isOpen={viewDetailsDialog.open}
        onClose={() => setViewDetailsDialog({ open: false, compliance: null })}
      >
        <h5 className="mb-4">Compliance Details</h5>
        {viewDetailsDialog.compliance && (
          <div>
            <p><strong>ID:</strong> {viewDetailsDialog.compliance.Compliance_Id}</p>
            <p><strong>Header:</strong> {viewDetailsDialog.compliance.Compliance_Header}</p>
            <p><strong>Description:</strong> {viewDetailsDialog.compliance.Compliance_Description}</p>
            <p><strong>Legislation:</strong> {viewDetailsDialog.compliance.Legislation}</p>
          </div>
        )}
      </Dialog>

      <Dialog
        isOpen={uploadDialog.open}
        onClose={() => setUploadDialog({ open: false, compliance: null })}
      >
        <h5 className="mb-4">Upload Document</h5>
        <p>Are you sure you want to upload this document?</p>
        <div className="text-right mt-6">
          <Button
            className="mr-2"
            variant="plain"
            onClick={() => setUploadDialog({ open: false, compliance: null })}
          >
            Cancel
          </Button>
          <Button variant="solid" onClick={handleConfirmUpload}>
            Confirm
          </Button>
        </div>
      </Dialog>
    </div>
  )
}

export default ReuploadDocumentCards