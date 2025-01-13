import { AdaptableCard } from '@/components/shared'
import React from 'react'
import BranchAgreementTool from './components/BranchAgreementTool'
import BranchAgreementTable from './components/BranchAgreementTable'

const BranchAgreements = () => {
  return (
    <AdaptableCard className='h-full' bodyClass='h-full'>
        <div className="flex flex-col justify-between gap-8 mb-2">
            <div className="mb-4 lg:mb-0 flex justify-between">
                <h3 className='text-2xl font-bold'>Branch Agreements</h3>
                <div className='flex-shrink-0'>
                    <BranchAgreementTool />
                </div>
            </div>
        </div>
        <div>
            <BranchAgreementTable />
        </div>
    </AdaptableCard>
  )
}

export default BranchAgreements