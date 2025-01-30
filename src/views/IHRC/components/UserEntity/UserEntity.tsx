import { AdaptableCard } from '@/components/shared'
import React, { useState } from 'react'
import UserTable from './components/userTable'
import UserTool from './components/UserTool'
import OutlinedInput from '@/components/ui/OutlinedInput';
const UserEntity = () => {
    const [searchTerm, setSearchTerm] = useState('')

    const handleSearch = (value: string) => {
        setSearchTerm(value)
    }
    return (
        
        <AdaptableCard className="h-full" bodyClass="h-full">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10">
            <div className="flex items-center justify-between w-full">
                <h3 className="text-2xl font-bold">
                    User Manager
                </h3>
                <div className="flex items-center gap-4">
                    <OutlinedInput
                        label="Search User"
                        value={searchTerm}
                        onChange={(e) => handleSearch(e)}
                    />
                    <div className="flex-shrink-0">
                        <UserTool/>
                    </div>
                </div>
            </div>
        </div>
        <UserTable search={searchTerm} />
    </AdaptableCard>
    )
}

export default UserEntity
