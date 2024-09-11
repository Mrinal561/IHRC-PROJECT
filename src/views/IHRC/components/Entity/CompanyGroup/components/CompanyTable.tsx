// // import React from 'react';
// // import { Table } from '@/components/ui';

// // const { Tr, Th, Td, THead, TBody } = Table;

// // interface CompanyTableProps {
// //     data: Array<{
// //         Company_Group_Name?: string;
// //         Company_Name?: string;
// //         State?: string;
// //         Location?: string;
// //         Branch?: string;
// //     }>;
// // }

// // const CompanyTable: React.FC<CompanyTableProps> = ({ data }) => {
// //     return (
// //         <Table>
// //             <THead>
// //                 <Tr>
// //                     <Th>Company Group Name</Th>
// //                     {/* <Th>Company Name</Th>
// //                     <Th>State</Th>
// //                     <Th>Location</Th>
// //                     <Th>Branch</Th> */}
// //                 </Tr>
// //             </THead>
// //             <TBody>
// //                 {data.map((item, index) => (
// //                     <Tr key={index}>
// //                         <Td>{item.Company_Group_Name || '-'}</Td>
// //                         {/* <Td>{item.Company_Name || '-'}</Td>
// //                         <Td>{item.State || '-'}</Td>
// //                         <Td>{item.Location || '-'}</Td>
// //                         <Td>{item.Branch || '-'}</Td> */}
// //                     </Tr>
// //                 ))}
// //             </TBody>
// //         </Table>
// //     );
// // };

// // export default CompanyTable;

// import React from 'react';
// import { Table, Button } from '@/components/ui';
// import { FiTrash } from 'react-icons/fi';

// const { Tr, Th, Td, THead, TBody } = Table;

// interface CompanyTableProps {
//     data: Array<{
//         Company_Group_Name?: string;
//         Company_Name?: string;
//         State?: string;
//         Location?: string;
//         Branch?: string;
//     }>;
//     onDelete: (index: number) => void;
// }

// const CompanyTable: React.FC<CompanyTableProps> = ({ data, onDelete }) => {
//     return (
//         <Table>
//             <THead>
//                 <Tr>
//                     <Th className="w-28">Sl No</Th>
//                     <Th>Company Group Name</Th>
//                     {/* <Th>Company Name</Th>
//                     <Th>State</Th>
//                     <Th>Location</Th>
//                     <Th>Branch</Th> */}
//                     <Th className="w-28">Action</Th>
//                 </Tr>
//             </THead>
//             <TBody>
//                 {data.map((item, index) => (
//                     <Tr key={index}>
//                         <Td className="w-28 text-center">{index + 1}</Td>
//                         <Td>{item.Company_Group_Name || '-'}</Td>
//                         {/* <Td>{item.Company_Name || '-'}</Td>
//                         <Td>{item.State || '-'}</Td>
//                         <Td>{item.Location || '-'}</Td>
//                         <Td>{item.Branch || '-'}</Td> */}
//                         <Td className="w-28">
//                             <Button  
//                                 size="sm" 
//                                 onClick={() => onDelete(index)}
//                                 icon={<FiTrash />}
//                         className='hover:bg-transparent text-red-500'
//                             > 
//                             </Button>
//                         </Td>
//                     </Tr>
//                 ))}
//             </TBody>
//         </Table>
//     );
// };

// export default CompanyTable;
import React, { useState } from 'react';
import { Table, Button, Dialog } from '@/components/ui'; // Adjust import path as needed
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
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);

    const openDialog = (index: number) => {
        setItemToDelete(index);
        setDialogIsOpen(true);
    };

    const handleDialogClose = () => {
        setDialogIsOpen(false);
        setItemToDelete(null);
    };

    const handleDialogOk = () => {
        if (itemToDelete !== null) {
            onDelete(itemToDelete);
            setDialogIsOpen(false);
            setItemToDelete(null);
        }
    };

    return (
        <>
            <Table>
                <THead>
                    <Tr>
                        <Th>Company Group Name</Th>
                        {/* Uncomment these lines if needed */}
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
                            <Td>{item.Company_Group_Name || '-'}</Td>
                            {/* Uncomment these lines if needed */}
                            {/* <Td>{item.Company_Name || '-'}</Td>
                            <Td>{item.State || '-'}</Td>
                            <Td>{item.Location || '-'}</Td>
                            <Td>{item.Branch || '-'}</Td> */}
                            <Td className="w-28">
                                <Button  
                                    size="sm" 
                                    onClick={() => openDialog(index)}
                                    icon={<FiTrash />}
                                    className='hover:bg-transparent text-red-500'
                                > 
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </TBody>
            </Table>

            {/* Confirmation Dialog */}
            <Dialog
                isOpen={dialogIsOpen}
                onClose={handleDialogClose}
                onRequestClose={handleDialogClose}
            >
                <h5 className="mb-4">Confirm Deletion</h5>
                <p>
                    Are you sure you want to delete this company group? This action cannot be undone.
                </p>
                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={handleDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={handleDialogOk}>
                        Delete
                    </Button>
                </div>
            </Dialog>
        </>
    );
};

export default CompanyTable;
