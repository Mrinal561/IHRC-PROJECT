import { AdaptableCard } from '@/components/shared'
import React from 'react'
import UserTable from './components/userTable'
import UserTool from './components/UserTool'
const UserEntity = () => {
    return (
        
                    <AdaptableCard className="h-full" bodyClass="h-full">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10">
                            <div className="mb-4 lg:mb-0">
                                <h3 className="text-2xl font-bold">
                                    User Manager
                                </h3>
                            </div>
                            <UserTool />
                        </div>
                        <UserTable />
                    </AdaptableCard>
    )
}

export default UserEntity
