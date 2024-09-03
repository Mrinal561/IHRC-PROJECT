import React, { useState } from 'react'
import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import RecommendedTableSearch from './RecommendedTableSearch'
import RecommendedFilter from './RecommendedFilter'
import { Link } from 'react-router-dom'
import { Dialog, toast, Notification } from '../../../../../../components/ui'




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
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleAssignClick = () => {
        setIsDialogOpen(true)
    }

    const handleDialogClose = () => {
        setIsDialogOpen(false)
    }

    const handleConfirmAssign = () => {
        setIsDialogOpen(false)
        // Here you would typically call an API to assign the checklist
        // For this example, we'll just show a success toast
        toast.push(
            <div className="flex items-center gap-2">
                <span className="text-emerald-600">
                    <HiPlusCircle />
                </span>
                <span>Compliance assigned successfully!</span>
            </div>,
            { placement: 'top-center' }
        )
    }

    return (
        <>
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
            <RecommendedTableSearch />
            {/* <RecommendedFilter />
            <Link
                download
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/product-list.csv"
                target="_blank"
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Export
                </Button>
            </Link> */}
            <div className="block lg:inline-block md:mb-0 mb-4">
                <AssignChecklistButton />
            </div>
        </div>
        </>
    )
}

export default RecommendedTableTool