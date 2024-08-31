import React, { useMemo, useState } from 'react'
import DataTable from '@/components/shared/DataTable'
import { Checkbox, Tooltip, Button } from '@/components/ui'
import cloneDeep from 'lodash/cloneDeep'
import type { OnSortParam, ColumnDef } from '@/components/shared/DataTable'
import { useNavigate } from 'react-router-dom'
import { HiOutlineEye } from 'react-icons/hi'
import { RiDownloadLine } from 'react-icons/ri'
// Updated interface to include new fields
interface ComplianceRow {
    Compliance_Id: number;
    Legislation: string;
    Location: string;
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

const complianceData: ComplianceRow[] = [
    {
        Compliance_Id: 3236,
        Legislation: "Bihar Shops and Establishments Act 1953 and Bihar Shops Establishments Rules 1955/ Bihar/ IR",
        Location: "HMVL - Office - Muzaffarpur - sadtpur - HR/ Muzaffarpur/ Bihar/ Office",
        Compliance_Categorization: "LICENSE / REGISTRATION",
        Compliance_Header: "Renewal of Registration",
        Compliance_Description: "Apply for renewal of certificate of registration in Form IA in duplicate not less than thirty days before the date on which the certificate of registration expires to the Inspecting Officer along with the prescribed fees.",
        Penalty_Description: "Fine which may extend to Rs. 250",
        Compliance_Applicability: "EVERY EMPLOYER",
        Bare_Act_Text: "Make an application when registration certificate is lost or destroyed to the Inspecting Officer within seven days of such loss or destruction for a duplicate copy along with a payment of a fee of two rupees either by crossed Indian Postal Order or by d",
        Compliance_Clause: "Section 6 and Rule 3 A",
        Compliance_Type: "On Going",
        Compliance_Frequency: "Half Yearly",
        Compliance_Statutory_Authority: "CHIEF INSPECTOR OF SHOPS AND COMMERCIAL ESTABLISHMENTS/REGISTERING OFFICER",
        Approval_Required: "Yes",
        Criticality: "High",
        Penalty_Type: "Fine",
        Default_Due_Date: "20th July 20th Jan",
        First_Due_Date: "15-Apr-16",
        Due_Date: '14-Apr-17',
        Scheduled_Frequency: "Yearly",
        Proof_Of_Compliance_Mandatory: "Yes",
      },
      {
        Compliance_Id: 4501,
        Legislation: "Delhi Factories Act 1948 and Delhi Factories Rules 1950/ Delhi/ IR",
        Location: "HMVL - Office - Arrah - Ramana Pakri Road - HR/ Arrah/ Bihar/ Office",
        Compliance_Categorization: "LICENSE / REGISTRATION",
        Compliance_Header: "Annual Renewal of License",
        Compliance_Description: "Submit an application for the renewal of the factory license in Form 1A, at least 45 days before the expiry date, to the Factory Inspector along with the required fees.",
        Penalty_Description: "Penalty may extend up to Rs. 500",
        Compliance_Applicability: "FACTORY OWNER",
        Bare_Act_Text: "In case the factory license is lost, notify the Factory Inspector immediately and apply for a duplicate license along with a fee of ten rupees.",
        Compliance_Clause: "Section 4 and Rule 6",
        Compliance_Type: "On Going",
        Compliance_Frequency: "Annually",
        Compliance_Statutory_Authority: "FACTORY INSPECTOR",
        Approval_Required: "Yes",
        Criticality: "Medium",
        Penalty_Type: "Fine",
        Default_Due_Date: "1st March 1st September",
        First_Due_Date: "01-Jan-17",
        Due_Date: '31-Dec-17',
        Scheduled_Frequency: "Yearly",
        Proof_Of_Compliance_Mandatory: "Yes",
      },
      {
        Compliance_Id: 5602,
        Legislation: "Karnataka Shops and Commercial Establishments Act 1961 and Karnataka Shops Rules 1963/ Karnataka/ IR",
        Location: "HMVL - Office - Aurangabad - Priyavrat Path - HR/ Aurangabad/ Bihar/ Office",
        Compliance_Categorization: "REGISTRATION / REPORTING",
        Compliance_Header: "Monthly Compliance Report",
        Compliance_Description: "File a monthly compliance report in Form IX with the Labour Department, detailing employee work hours and wages paid, by the 5th of each month.",
        Penalty_Description: "Penalty up to Rs. 1000 for late submission",
        Compliance_Applicability: "SHOPS AND ESTABLISHMENTS",
        Bare_Act_Text: "Report any changes in employment status or wages to the Labour Department within seven days of occurrence, along with a fee of five rupees for each report.",
        Compliance_Clause: "Section 12 and Rule 10",
        Compliance_Type: "Ongoing",
        Compliance_Frequency: "Monthly",
        Compliance_Statutory_Authority: "LABOUR COMMISSIONER",
        Approval_Required: "No",
        Criticality: "High",
        Penalty_Type: "Fine",
        Default_Due_Date: "5th of each month",
        First_Due_Date: "01-Feb-18",
        Due_Date: '05-Feb-18',
        Scheduled_Frequency: "Monthly",
        Proof_Of_Compliance_Mandatory: "No",
      },
      {
        Compliance_Id: 6789,
        Legislation: "Maharashtra Shops and Establishments Act 1948 and Maharashtra Shops Rules 1954/ Maharashtra/ IR",
        Location: "HMVL - Office - Begusarai - Kachhari Road - HR/ Begusarai/ Bihar/ Office",
        Compliance_Categorization: "REPORTING",
        Compliance_Header: "Quarterly Wage Report",
        Compliance_Description: "Submit a quarterly wage report in Form XIV to the Labour Commissioner by the 15th of the first month following the end of the quarter.",
        Penalty_Description: "Fine up to Rs. 500 for late submission",
        Compliance_Applicability: "EMPLOYERS",
        Bare_Act_Text: "File any discrepancies in wages with the Labour Commissioner within fifteen days of detection, accompanied by a fee of ten rupees.",
        Compliance_Clause: "Section 12 and Rule 14",
        Compliance_Type: "Ongoing",
        Compliance_Frequency: "Quarterly",
        Compliance_Statutory_Authority: "LABOUR COMMISSIONER",
        Approval_Required: "No",
        Criticality: "Medium",
        Penalty_Type: "Fine",
        Default_Due_Date: "15th of January, April, July, October",
        First_Due_Date: "15-Jan-18",
        Due_Date: '15-Jan-18',
        Scheduled_Frequency: "Quarterly",
        Proof_Of_Compliance_Mandatory: "No",
      },
      {
        Compliance_Id: 7890,
        Legislation: "Tamil Nadu Shops and Establishments Act 1947 and Tamil Nadu Shops Rules 1959/ Tamil Nadu/ IR",
        Location: "HMVL - Office - Samastipur - ShivSagar Plazza -HR / Samastipur/ Bihar/ Office",
        Compliance_Categorization: "LICENSE / REGISTRATION",
        Compliance_Header: "Renewal of Trade License",
        Compliance_Description: "Apply for the renewal of the trade license in Form VII at least 30 days before the license expiry date to the Municipal Authority along with the necessary fee.",
        Penalty_Description: "Late fee up to Rs. 300",
        Compliance_Applicability: "TRADE LICENSE HOLDERS",
        Bare_Act_Text: "In case of loss of the trade license, report to the Municipal Authority within seven days and apply for a duplicate license with a fee of fifteen rupees.",
        Compliance_Clause: "Section 5 and Rule 8",
        Compliance_Type: "On Going",
        Compliance_Frequency: "Annually",
        Compliance_Statutory_Authority: "MUNICIPAL AUTHORITY",
        Approval_Required: "Yes",
        Criticality: "High",
        Penalty_Type: "Fine",
        Default_Due_Date: "1st June 1st December",
        First_Due_Date: "01-June-17",
        Due_Date: '01-June-17',
        Scheduled_Frequency: "Yearly",
        Proof_Of_Compliance_Mandatory: "No",
      }


];


const ViewDetailsButton = ({ compliance }: { compliance: ComplianceRow }) => {
    const navigate = useNavigate()

    const handleViewDetails = () => {
        navigate(`/app/IHRC/compliance-list-detail/${compliance.Compliance_Id}`, {
            state: compliance,
        })
    }

    return (
        // <Button variant="solid" size="sm" onClick={handleViewDetails}>
        //     View Detail
        // </Button>
        <div className='flex gap-2 items-center'>
        <Tooltip title="View Details" placement="top">
          <Button
            size="sm"
            className='text-[#737171]'
            icon={<HiOutlineEye />}
            onClick={handleViewDetails}
            />
        </Tooltip>
        <Tooltip title="Download">
        <Button
          size="sm"
          onClick={() => console.log('Download')}
          icon={<RiDownloadLine />}
          />
      </Tooltip>
    </div>
    )
}

const RecommendedTableContent = () => {
    const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

    const isAllSelected = useMemo(
        () => selectedItems.size === complianceData.length,
        [selectedItems, complianceData]
    );

    const handleCheckboxChange = (id: number) => {
        setSelectedItems((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id); // Deselect if already selected
            } else {
                newSet.add(id); // Select if not already selected
            }
            return newSet;
        });
    };

    const handleSelectAllChange = () => {
        if (isAllSelected) {
            setSelectedItems(new Set());
        } else {
            setSelectedItems(new Set(complianceData.map((item) => item.Compliance_Id)));
        }
    };

    const columns: ColumnDef<ComplianceRow>[] = useMemo(
        () => [
            {
                header: ({ table }) => (
                    <div className="w-2">
                        <Checkbox
                            checked={isAllSelected}
                            onChange={handleSelectAllChange}
                        />
                    </div>
                ),
                id: 'select',
    cell: ({ row }) => (
        <div className="w-2">
            <Checkbox
                checked={selectedItems.has(row.original.Compliance_Id)}
                onChange={() => handleCheckboxChange(row.original.Compliance_Id)}
            />
        </div>
    ),
            },
            {
                header: 'Compliance ID',
                accessorKey: 'Compliance_Id',
                cell: (props) => (
                    <Tooltip title={`Compliance ID: ${props.getValue()}`} placement="top">
                        <div className="w-10 truncate">{props.getValue()}</div>
                    </Tooltip>
                ),
            },
            
            
            {
                header: 'Legislation',
                accessorKey: 'Legislation',
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="top">
                            <div className="w-32 truncate">{value.length > 18 ? value.substring(0, 18) + '...' : value}</div>
                        </Tooltip>
                    );
                },
            },
            {
                header: 'Location',
                accessorKey: 'Location',
                cell: (props) => {
                  const value = props.getValue() as string;
                  return (
                    <Tooltip title={value} placement="top">
                      <div className="w-20 truncate">{value.length > 20 ? value.substring(0, 20) + '...' : value}</div>
                    </Tooltip>
                  );
                },
              },
            {
                header: 'Header',
                accessorKey: 'Compliance_Header',
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="top">
                            <div className="w-28 truncate">{value.length > 18 ? value.substring(0, 18) + '...' : value}</div>
                        </Tooltip>
                    );
                },
            },
            // {
            //     header: 'Category',
            //     accessorKey: 'Compliance_Categorization',
            //     cell: (props) => (
            //         <Tooltip title={props.getValue() as string} placement="top">
            //             <div className="w-40 truncate">{props.getValue()}</div>
            //         </Tooltip>
            //     ),
            // },
            {
                header: 'Description',
                accessorKey: 'Compliance_Description',
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="left">
                            <div className="w-40 truncate">{value.length > 30 ? value.substring(0, 30) + '...' : value}</div>
                        </Tooltip>
                    );
                },
            },
            {
                header: 'Action',
                id: 'viewDetails',
                cell: (props) => (
                    <div className="w-16 flex justify-center">
                        <ViewDetailsButton compliance={props.row.original} />
                    </div>
                ),
            }
            // {
            //     header: 'Actions',
            //     id: 'actions',
            //     cell: ({ row }) => {
            //       return (
            //         <div className="flex space-x-2">
            //           <Tooltip title="View Details" placement="top">
            //             <Button
            //               size="sm"
            //               className='text-[#737171]'
            //               icon={<HiOutlineEye />}
            //               onClick={() => handleViewDetails(row.original)}
            //             />
            //           </Tooltip>
            //           <Tooltip title="Upload" placement="top">
            //           <Button
            //             size="sm"
            //             onClick={() => handleUploadDocument(row.original)}
            //           >
            //             <BsCloudUpload />
            //           </Button>
            //         </Tooltip>
            //         </div>
            //       );
            //     },
            //   },
        ],
        [selectedItems, isAllSelected]
    )

    const [tableData, setTableData] = useState({
        total: complianceData.length,
        pageIndex: 1,
        pageSize: 10,
        query: '',
        sort: { order: '', key: '' },
    })

    const onPaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        setTableData(newTableData)
    }

    const onSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        setTableData(newTableData)
    }

    const onSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        setTableData(newTableData)
    }

    return (
        <div className="w-full overflow-x-auto">
            <DataTable
                columns={columns}
                data={complianceData}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={false}
                pagingData={{
                    total: tableData.total,
                    pageIndex: tableData.pageIndex,
                    pageSize: tableData.pageSize,
                }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
        </div>
    )
}

export default RecommendedTableContent
