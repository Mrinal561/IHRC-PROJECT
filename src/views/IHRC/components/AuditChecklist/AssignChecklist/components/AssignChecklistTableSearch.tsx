import Input from '@/components/ui/Input'
import { HiOutlineSearch } from 'react-icons/hi'


const AssignChecklisTableSearch = () => {

    return (
        <Input
            className="w-44"
            size="sm"
            placeholder="Search compliance"
            prefix={<HiOutlineSearch className="text-lg" />}
        />
    )
}

export default AssignChecklisTableSearch