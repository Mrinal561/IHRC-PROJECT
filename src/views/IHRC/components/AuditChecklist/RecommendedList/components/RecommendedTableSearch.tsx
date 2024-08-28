import Input from '@/components/ui/Input'
import { HiOutlineSearch } from 'react-icons/hi'


const RecommendedTableSearch = () => {

    return (
        <Input
            className="max-w-md md:w-52 md:mb-0 mb-4"
            size="sm"
            placeholder="Search compliance"
            prefix={<HiOutlineSearch className="text-lg" />}
        />
    )
}

export default RecommendedTableSearch