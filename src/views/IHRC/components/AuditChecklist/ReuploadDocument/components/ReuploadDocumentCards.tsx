import React from 'react'
import { Button, Card } from '@/components/ui';

const complianceData = [
  {
    Compliance_Id: 1001,
    Compliance_Header: "Renewal of Registration",
    Compliance_Description: "Apply for renewal of certificate of registration in Form IA in duplicate not less than thirty days before the date on which the certificate of registration expires to the Inspecting Officer along with the prescribed fees.",
    Legislation: "Gujarat Factories Act, 1948 and Gujarat Factories Rules, 1963 / Gujarat / IR",
  },
  {
    Compliance_Id: 1002,
    Compliance_Header: "Annual Renewal of License",
    Compliance_Description: "Submit an application for the renewal of the factory license in Form 1A, at least 45 days before the expiry date, to the Factory Inspector along with the required fees.",
    Legislation: "West Bengal Shops and Establishments Act, 1963 and West Bengal Shops and Establishments Rules, 1964 / West Bengal / IR",
  },
  {
    Compliance_Id: 1003,
    Compliance_Header: "Quarterly Wage Report",
    Compliance_Description: "Submit a quarterly wage report in Form XIV to the Labour Commissioner by the 15th of the first month following the end of the quarter.",
    Legislation: "Karnataka Industrial Establishments (National and Festival Holidays) Act, 1963 and Rules, 1964 / Karnataka / IR",
  },
  {
    Compliance_Id: 1004,
    Compliance_Header: "Renewal of Trade License",
    Compliance_Description: "Apply for the renewal of the trade license in Form VII at least 30 days before the license expiry date to the Municipal Authority along with the necessary fee.",
    Legislation: "Maharashtra Fire Prevention and Life Safety Measures Act, 2006 / Maharashtra / Safety",
  },
//   {
//     Compliance_Id: 1005,
//     Compliance_Header: "Annual Health and Safety Report",
//     Compliance_Description: "Submit an annual health and safety report in Form V to the Labour Department by the end of the financial year.",
//     Legislation: "Environmental Protection Act, 1986 and Environmental Audit Scheme / National / Environment",
//   },
 
];

const ReuploadDocumentCards = () => {
  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4'>
      {complianceData.map((compliance) => (
        <Card key={compliance.Compliance_Id} className='h-66 w-80'
        header={compliance.Compliance_Header}>
          <div className='flex flex-col gap-4 justify-between h-full'>
            <div className='h-32'>
              <p className='text-sm'>{compliance.Compliance_Description}</p>
            </div>
            <div>
              <Button
                variant="solid"
                color="blue"
                className='w-full'
              >
                View Document
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default ReuploadDocumentCards