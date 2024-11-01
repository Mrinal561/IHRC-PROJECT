import { AdaptableCard } from '@/components/shared'
import React, { useState } from 'react'
import OutputRegisterFilter from './components/OutputRegisterFilter'
import OutputRegisterTable from './components/OutputRegisterTable'
import OutputTableSearch from './components/OutputTableSearch'
// import SalaryFilter from './components/SalaryFilter';
// import SalaryRegisterTable from './components/SalaryRegisterTable';

const OutputRegisters = () => {
        const [searchTerm, setSearchTerm] = useState('');


        const handleSearch = (term: string) => {
                setSearchTerm(term);
              };
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="flex flex-col gap-10 mb-10">

            <div className="flex justify-between">
                    <h3 className="text-2xl font-bold">Output Registers</h3>
                    <OutputTableSearch onSearch={handleSearch}/>
            </div>
            <div>
            <OutputRegisterFilter/>
            </div>
            </div>
                <OutputRegisterTable />
        </AdaptableCard>
  )
}

export default OutputRegisters