import React, { useState } from 'react'
import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import RecommendedTableSearch from './RecommendedTableSearch'
import RecommendedFilter from './RecommendedFilter'
import { Link } from 'react-router-dom'
import { Dialog, toast, Notification, Select } from '../../../../../../components/ui'
import { ActionMeta, components, SingleValue } from 'react-select'
import { FaChevronDown } from 'react-icons/fa'
import DashboardFilter from '../../../Home/components/DashboardFilter'
import CustomDateRangePicker from '../../../Home/components/CustomDateRangePicker'
import Company from '../../AssignChecklist/components/Company'




const AssignChecklistButton = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    

    const handleAssignClick = () => {
        setIsDialogOpen(true);
    };

    const handleConfirm = () => {
        setIsDialogOpen(false);
        toast.push(
          <Notification
            title="Success"
            type="success"
          >
            Compliance assigned successfully!
          </Notification>,
          {
            placement: 'top-end',
          }
        );
      };

    const handleCancel = () => {
        setIsDialogOpen(false);
    };

    return (
        <>
            <Button
                block
                variant="solid"
                size="sm"
                icon={<HiPlusCircle />}
                onClick={handleAssignClick}
            >
                Assign Checklist
            </Button>

            <Dialog
                isOpen={isDialogOpen}
                onClose={handleCancel}
                width={400}
            >
                <h5 className="mb-4">Confirm Assignment</h5>
                <p>Are you sure you want to assign the checked compliances?</p>
                <div className="mt-6 text-right">
                    <Button
                        size="sm"
                        className="mr-2"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="solid"
                        size="sm"
                        onClick={handleConfirm}
                    >
                        Confirm
                    </Button>
                </div>
            </Dialog>
        </>
    );
};




const RecommendedTableTool = () => {



    
    return (
        <>
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
            <RecommendedTableSearch />
            <Company />   
            <div className="block lg:inline-block md:mb-0 mb-4">
                <AssignChecklistButton />
            </div>
        </div>
        </>
    )
}

export default RecommendedTableTool