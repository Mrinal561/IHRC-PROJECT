// import Avatar from '@/components/ui/Avatar'
// import Dropdown from '@/components/ui/Dropdown'
// import withHeaderItem from '@/utils/hoc/withHeaderItem'
// import useAuth from '@/utils/hooks/useAuth'
// import { Link } from 'react-router-dom'
// import classNames from 'classnames'
// import { HiOutlineLogout, HiOutlineUser } from 'react-icons/hi'
// import type { CommonProps } from '@/@types/common'
// import { setIsAuthenticated } from '@/store/slices/login'
// import { useAppDispatch } from '@/store'
// import Cookies from 'js-cookie'

// type DropdownList = {
//     label: string
//     path: string
//     icon: JSX.Element
// }

// const dropdownItemList: DropdownList[] = []

// const _UserDropdown = ({ className }: CommonProps) => {
//     // const { signOut } = useAuth()
//     const dispatch = useAppDispatch()

//     const UserAvatar = (
//         <div className={classNames(className, 'flex items-center gap-2')}>
//             <Avatar size={32} shape="circle" icon={<HiOutlineUser />} />
//             <div className="hidden md:block">
//                 <div className="text-xs capitalize">admin</div>
//                 <div className="font-bold">User01</div>
//             </div>
//         </div>
//     )

//     return (
//         <div>
//             <Dropdown
//                 menuStyle={{ minWidth: 240 }}
//                 renderTitle={UserAvatar}
//                 placement="bottom-end"
//             >
//                 <Dropdown.Item variant="header">
//                     <div className="py-2 px-3 flex items-center gap-2">
//                         <Avatar shape="circle" icon={<HiOutlineUser />} />
//                         <div>
//                             <div className="font-bold text-gray-900 dark:text-gray-100">
//                                 User01
//                             </div>
//                             <div className="text-xs">user01@mail.com</div>
//                         </div>
//                     </div>
//                 </Dropdown.Item>
//                 <Dropdown.Item variant="divider" />
//                 {dropdownItemList.map((item) => (
//                     <Dropdown.Item
//                         key={item.label}
//                         eventKey={item.label}
//                         className="mb-1 px-0"
//                     >
//                         <Link
//                             className="flex h-full w-full px-2"
//                             to={item.path}
//                         >
//                             <span className="flex gap-2 items-center w-full">
//                                 <span className="text-xl opacity-50">
//                                     {item.icon}
//                                 </span>
//                                 <span>{item.label}</span>
//                             </span>
//                         </Link>
//                     </Dropdown.Item>
//                 ))}
//                 {/* <Dropdown.Item variant="divider" /> */}
//                 <Dropdown.Item
//                     eventKey="Sign Out"
//                     className="gap-2"
//                     onClick={() => {
//                         dispatch(setIsAuthenticated(false))
//                         Cookies.remove('token')
//                     }}
//                 >
//                     <span className="text-xl opacity-50">
//                         <HiOutlineLogout />
//                     </span>
//                     <span>Sign Out</span>
//                 </Dropdown.Item>
//             </Dropdown>
//         </div>
//     )
// }

// const UserDropdown = withHeaderItem(_UserDropdown)

// export default UserDropdown


import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { HiOutlineLogout, HiOutlineUser } from 'react-icons/hi'
import type { CommonProps } from '@/@types/common'
import { fetchAuthUser, setIsAuthenticated } from '@/store/slices/login'
import { useAppDispatch } from '@/store'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

type DropdownList = {
    label: string
    path: string
    icon: JSX.Element
}

const dropdownItemList: DropdownList[] = []

const _UserDropdown = ({ className }: CommonProps) => {
    const dispatch = useAppDispatch()
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        type: ''
    })

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await dispatch(fetchAuthUser())
                if (response.payload) {
                    setUserData({
                        name: response.payload.name || '',
                        email: response.payload.email || '',
                        type: response.payload.type || ''
                    })
                }
            } catch (error) {
                console.error('Error fetching user data:', error)
            }
        }
        fetchUser()
    }, [dispatch])

    const UserAvatar = (
        <div className={classNames(className, 'flex items-center gap-2')}>
            <Avatar size={32} shape="circle" icon={<HiOutlineUser />} />
            <div className="hidden md:block">
                <div className="text-xs capitalize">{userData.type}</div>
                <div className="font-bold">{userData.name}</div>
            </div>
        </div>
    )

    return (
        <div>
            <Dropdown
                menuStyle={{ minWidth: 240 }}
                renderTitle={UserAvatar}
                placement="bottom-end"
            >
                <Dropdown.Item variant="header">
                    <div className="py-2 px-3 flex items-center gap-2">
                        <Avatar shape="circle" icon={<HiOutlineUser />} />
                        <div>
                            <div className="font-bold text-gray-900 dark:text-gray-100">
                                {userData.name}
                            </div>
                            <div className="text-xs">{userData.email}</div>
                        </div>
                    </div>
                </Dropdown.Item>
                <Dropdown.Item variant="divider" />
                {dropdownItemList.map((item) => (
                    <Dropdown.Item
                        key={item.label}
                        eventKey={item.label}
                        className="mb-1 px-0"
                    >
                        <Link
                            className="flex h-full w-full px-2"
                            to={item.path}
                        >
                            <span className="flex gap-2 items-center w-full">
                                <span className="text-xl opacity-50">
                                    {item.icon}
                                </span>
                                <span>{item.label}</span>
                            </span>
                        </Link>
                    </Dropdown.Item>
                ))}
                <Dropdown.Item
                    eventKey="Sign Out"
                    className="gap-2"
                    onClick={() => {
                        dispatch(setIsAuthenticated(false))
                        Cookies.remove('token')
                    }}
                >
                    <span className="text-xl opacity-50">
                        <HiOutlineLogout />
                    </span>
                    <span>Sign Out</span>
                </Dropdown.Item>
            </Dropdown>
        </div>
    )
}

const UserDropdown = withHeaderItem(_UserDropdown)

export default UserDropdown