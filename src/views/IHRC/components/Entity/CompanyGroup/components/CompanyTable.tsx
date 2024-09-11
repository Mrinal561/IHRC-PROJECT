// import React from 'react';
// import { Table } from '@/components/ui';

// const { Tr, Th, Td, THead, TBody } = Table;

// interface CompanyTableProps {
//     data: Array<{
//         Company_Group_Name?: string;
//         Company_Name?: string;
//         State?: string;
//         Location?: string;
//         Branch?: string;
//     }>;
// }

// const CompanyTable: React.FC<CompanyTableProps> = ({ data }) => {
//     return (
//         <Table>
//             <THead>
//                 <Tr>
//                     <Th>Company Group Name</Th>
//                     {/* <Th>Company Name</Th>
//                     <Th>State</Th>
//                     <Th>Location</Th>
//                     <Th>Branch</Th> */}
//                 </Tr>
//             </THead>
//             <TBody>
//                 {data.map((item, index) => (
//                     <Tr key={index}>
//                         <Td>{item.Company_Group_Name || '-'}</Td>
//                         {/* <Td>{item.Company_Name || '-'}</Td>
//                         <Td>{item.State || '-'}</Td>
//                         <Td>{item.Location || '-'}</Td>
//                         <Td>{item.Branch || '-'}</Td> */}
//                     </Tr>
//                 ))}
//             </TBody>
//         </Table>
//     );
// };

// export default CompanyTable;

import React from 'react';
import { Table, Button } from '@/components/ui';
import { FiTrash } from 'react-icons/fi';

const { Tr, Th, Td, THead, TBody } = Table;

interface CompanyTableProps {
    data: Array<{
        Company_Group_Name?: string;
        Company_Name?: string;
        State?: string;
        Location?: string;
        Branch?: string;
    }>;
    onDelete: (index: number) => void;
}

const CompanyTable: React.FC<CompanyTableProps> = ({ data, onDelete }) => {
    return (
        <Table>
            <THead>
                <Tr>
                    <Th className="w-28">Sl No</Th>
                    <Th>Company Group Name</Th>
                    {/* <Th>Company Name</Th>
                    <Th>State</Th>
                    <Th>Location</Th>
                    <Th>Branch</Th> */}
                    <Th className="w-28">Action</Th>
                </Tr>
            </THead>
            <TBody>
                {data.map((item, index) => (
                    <Tr key={index}>
                        <Td className="w-28 text-center">{index + 1}</Td>
                        <Td>{item.Company_Group_Name || '-'}</Td>
                        {/* <Td>{item.Company_Name || '-'}</Td>
                        <Td>{item.State || '-'}</Td>
                        <Td>{item.Location || '-'}</Td>
                        <Td>{item.Branch || '-'}</Td> */}
                        <Td className="w-28">
                            <Button  
                                size="sm" 
                                onClick={() => onDelete(index)}
                                icon={<FiTrash />}
                        className='hover:bg-transparent text-red-500'
                            > 
                            </Button>
                        </Td>
                    </Tr>
                ))}
            </TBody>
        </Table>
    );
};

export default CompanyTable;