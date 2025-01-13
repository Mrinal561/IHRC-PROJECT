import { Button } from '@/components/ui'
import React from 'react'
import { HiPlusCircle } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

const BranchAgreementTool = () => {

    const navigate = useNavigate();


    const handleBranchAgreement = () => {
        navigate(`/branch-agreement-form`)
    }
  return (
    <div className='flex gap-2 items-center w- pb-6'>
        <div>
            <Button variant='solid' onClick={handleBranchAgreement} icon={<HiPlusCircle />} size="sm" >Add Agreement</Button>
        </div>
    </div>
  )
}

export default BranchAgreementTool