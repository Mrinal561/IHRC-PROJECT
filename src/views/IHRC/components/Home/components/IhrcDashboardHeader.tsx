import Company from './Company';

interface OptionType {
    value: string;
    label: string;
}

const IhrcDashboardHeader = () => {


  
    return (
        <div className="w-full">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                <div className="mb-4 lg:mb-0">
                    <h3 className="text-2xl font-bold">DASHBOARD</h3>
                    <p className="text-gray-600">View your company's compliance statistics</p>
                </div>
                <Company />
            </div>
        </div>
    );
};

export default IhrcDashboardHeader;

