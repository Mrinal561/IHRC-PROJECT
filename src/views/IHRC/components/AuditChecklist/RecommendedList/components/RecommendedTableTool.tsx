

import React, { useState } from 'react'
import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import RecommendedTableSearch from './RecommendedTableSearch'
import { Dialog, toast, Notification, Select } from '../../../../../../components/ui'
import { useDispatch } from 'react-redux'
import { 
    assignCompliancesToBranch,
} from '@/store/slices/compliance/ComplianceApiSlice'

interface AssignChecklistButtonProps {
    selectedComplianceIds: number[];
    branchValue?: string;
    onAssignSuccess?: () => void;
}

const AssignChecklistButton = ({ 
    selectedComplianceIds, 
    branchValue,
    onAssignSuccess 
}: AssignChecklistButtonProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isAssigning, setIsAssigning] = useState(false);
    const dispatch = useDispatch();
    
    const handleAssignClick = () => {
        if (!branchValue) {
            toast.push(
                <Notification title="Empty" type="danger">
                    Please select a branch first
                </Notification>
            );
            return;
        }
        
        if (selectedComplianceIds.length === 0) {
            toast.push(
                <Notification title="Empty" type="danger">
                    Please select at least one compliance
                </Notification>
            );
            return;
        }

        setIsDialogOpen(true);
    };

    const handleConfirm = async () => {
        if (!branchValue || selectedComplianceIds.length === 0) return;

        setIsAssigning(true);
        
        const assignData = {
            branch_id: parseInt(branchValue),
            compliance_id: selectedComplianceIds // Using the array of selected IDs
        };

        try {
            await dispatch(assignCompliancesToBranch(assignData)).unwrap();
            toast.push(
                <Notification title="Success" type="success">
                    {selectedComplianceIds.length} compliance(s) assigned successfully
                </Notification>
            );
            onAssignSuccess?.(); // Notify parent of successful assignment
            setIsDialogOpen(false);
        } catch (error) {
            console.error('Failed to assign compliances:', error);
            toast.push(
                <Notification title="Failed" type="danger">
                    Failed to assign compliances
                </Notification>
            );
        } finally {
            setIsAssigning(false);
        }
    };

    const handleCancel = () => {
        setIsDialogOpen(false);
    };

    return (
        <>
            <Button
                variant="solid"
                size="sm"
                icon={<HiPlusCircle />}
                onClick={handleAssignClick}
                disabled={selectedComplianceIds.length === 0 || !branchValue || isAssigning}
            >
                {isAssigning ? 'Assigning...' : 'Assign Checklist'}
            </Button>

            <Dialog
                isOpen={isDialogOpen}
                onClose={handleCancel}
                width={400}
            >
                <h5 className="mb-4">Confirm Assignment</h5>
                <p>
                    Are you sure you want to assign {selectedComplianceIds.length} compliance(s) to branch ID: {branchValue}?
                </p>
                <div className="mt-6 text-right">
                    <Button
                        size="sm"
                        className="mr-2"
                        onClick={handleCancel}
                        disabled={isAssigning}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="solid"
                        size="sm"
                        onClick={handleConfirm}
                        loading={isAssigning}
                    >
                        {isAssigning ? 'Assigning...' : 'Confirm'}
                    </Button>
                </div>
            </Dialog>
        </>
    );
};

interface RecommendedTableToolProps {
    selectedComplianceIds: number[];
    branchValue?: string;
    onAssignSuccess?: () => void;
}

const RecommendedTableTool = ({ 
    selectedComplianceIds, 
    branchValue,
    onAssignSuccess 
}: RecommendedTableToolProps) => {
    return (
        <>
            <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                <RecommendedTableSearch />
                <div className="block lg:inline-block md:mb-0 mb-4">
                    <AssignChecklistButton 
                        selectedComplianceIds={selectedComplianceIds} 
                        branchValue={branchValue}
                        onAssignSuccess={onAssignSuccess}
                    />
                </div>
            </div>
        </>
    )
}

export default RecommendedTableTool