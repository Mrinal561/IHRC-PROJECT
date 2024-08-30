
import React, { useMemo, useState } from 'react';
import DataTable from '@/components/shared/DataTable';
import { Checkbox, Tooltip, Button, Dialog } from '@/components/ui'; // Import Dialog
import cloneDeep from 'lodash/cloneDeep';
import type { OnSortParam, ColumnDef } from '@/components/shared/DataTable';
import { useNavigate } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';
import { FiTrash } from 'react-icons/fi';

// Define the interface with the specified fields
interface ComplianceRow {
    Compliance_Id: number;
    Compliance_Categorization: string;
    Compliance_Header: string;
    Compliance_Description: string;
    Compliance_Applicability: string;
    Compliance_Clause: string;
    Compliance_Type: string;
}

const complianceData: ComplianceRow[] = [
  {
      Compliance_Id: 3236,
      Compliance_Categorization: "LICENSE / REGISTRATION",
      Compliance_Header: "Renewal of Registration",
      Compliance_Description: "Apply for renewal of certificate of registration in Form IA in duplicate not less than thirty days before the date on which the certificate of registration expires.",
      Compliance_Applicability: "EVERY EMPLOYER",
      Compliance_Clause: "Section 6 and Rule 3 A",
      Compliance_Type: "On Going",
  },
  {
      Compliance_Id: 3237,
      Compliance_Categorization: "LABOR LAW",
      Compliance_Header: "Employee Grievance Redressal",
      Compliance_Description: "Ensure proper grievance redressal mechanism is in place to address employee concerns promptly.",
      Compliance_Applicability: "ALL ORGANIZATIONS",
      Compliance_Clause: "Section 10",
      Compliance_Type: "Periodic",
  },
  {
      Compliance_Id: 3238,
      Compliance_Categorization: "ENVIRONMENTAL",
      Compliance_Header: "Hazardous Waste Disposal",
      Compliance_Description: "Ensure proper disposal of hazardous waste as per the Environmental Protection Act.",
      Compliance_Applicability: "INDUSTRIAL UNITS",
      Compliance_Clause: "Section 8",
      Compliance_Type: "On Going",
  },
  {
      Compliance_Id: 3239,
      Compliance_Categorization: "FIRE SAFETY",
      Compliance_Header: "Fire Safety Drills",
      Compliance_Description: "Conduct fire safety drills for all employees at least twice a year.",
      Compliance_Applicability: "ALL ORGANIZATIONS",
      Compliance_Clause: "Section 5 and Rule 4",
      Compliance_Type: "Annual",
  },
];

const ViewDetailsButton = ({ compliance }: { compliance: ComplianceRow }) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/app/IHRC/compliance-list-detail/${compliance.Compliance_Id}`, {
            state: compliance,
        });
    };

    return (
        <Button size="sm" onClick={handleViewDetails}>
            <MdEdit size={24} />
        </Button>
    );
};

const CustomChecklistTable = () => {
    const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<ComplianceRow | null>(null);

    const isAllSelected = useMemo(
        () => selectedItems.size === complianceData.length,
        [selectedItems]
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

    const handleDeleteClick = (item: ComplianceRow) => {
        setItemToDelete(item);
        setDialogIsOpen(true);
    };

    const handleConfirmDelete = () => {
        if (itemToDelete) {
            // Implement your delete logic here
            console.log('Deleting:', itemToDelete);
        }
        setDialogIsOpen(false);
        setItemToDelete(null);
    };

    const handleCancelDelete = () => {
        setDialogIsOpen(false);
        setItemToDelete(null);
    };

    const EditIcon = () => (
        <span className="text-[#7c828e] hover:text-indigo-600">
            <svg
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                ></path>
            </svg>
        </span>
    );

    const columns: ColumnDef<ComplianceRow>[] = useMemo(
        () => [
            {
                header: 'Compliance ID',
                accessorKey: 'Compliance_Id',
                cell: (props) => (
                    <Tooltip title={`Compliance ID: ${props.getValue()}`} placement="top">
                        <div className="w-14 truncate">{props.getValue()}</div>
                    </Tooltip>
                ),
            },
            {
                header: 'Header',
                accessorKey: 'Compliance_Header',
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="top">
                            <div className="w-38 truncate">{value.length > 25 ? value.substring(0, 25) + '...' : value}</div>
                        </Tooltip>
                    );
                },
            },
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
                header: 'Clause',
                accessorKey: 'Compliance_Clause',
                cell: (props) => (
                    <Tooltip title={props.getValue() as string} placement="top">
                        <div className="w-40 truncate">{props.getValue()}</div>
                    </Tooltip>
                ),
            },
            {
                header: 'Actions',
                id: 'actions',
                cell: ({ row }) => {
                    const value1= "Edit"
                    const value2= "Delete"
                    return(

                    <div className='flex space-x-2'>
                    <Tooltip title={value1} placement="top">
                    <Button
                        size="sm"
                        variant="plain"
                        onClick={() => handleEditClick(row.original)}
                        icon={<EditIcon />}
                        className='hover:bg-transparent'
                        />
                    </Tooltip>
                    <Tooltip title={value2} placement="top">
                    <Button
                        size="sm"
                        variant="plain"
                        onClick={() => handleDeleteClick(row.original)}
                        icon={<FiTrash />}
                        className='hover:bg-transparent text-red-500'
                        />
                    </Tooltip>
                </div>
                )
                },
            },
        ],
        [selectedItems, isAllSelected]
    );

    return (
        <div className="w-full overflow-x-auto">
            <DataTable
                columns={columns}
                data={complianceData}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={false}
            />
            <Dialog
                isOpen={dialogIsOpen}
                onClose={handleCancelDelete}
                onRequestClose={handleCancelDelete}
            >
                <h5 className="mb-4">Confirm Delete</h5>
                <p>
                    Are you sure you want to delete the compliance: {itemToDelete?.Compliance_Header}?
                </p>
                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={handleCancelDelete}
                    >
                        Cancel
                    </Button>
                    <Button variant="solid" color="red-600" onClick={handleConfirmDelete}>
                        Confirm
                    </Button>
                </div>
            </Dialog>
        </div>
    );
};

export default CustomChecklistTable;
