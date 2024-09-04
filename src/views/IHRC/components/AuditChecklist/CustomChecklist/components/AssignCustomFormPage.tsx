

import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Input, Button, FormItem, FormContainer } from '@/components/ui';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

// Define the validation schema
const validationSchema = Yup.object({
    Compliance_Id: Yup.number().required('Required'),
    Compliance_Categorization: Yup.string().required('Required'),
    Compliance_Header: Yup.string().required('Required'),
    Compliance_Description: Yup.string().required('Required'),
    Compliance_Applicability: Yup.string().required('Required'),
    Compliance_Clause: Yup.string().required('Required'),
    Compliance_Type: Yup.string().required('Required'),
    Compliance_Frequency: Yup.string().required('Required'),
    Compliance_Statutory_Authority: Yup.string().required('Required'),
});

// Define the initial values for the form fields
const initialValues = {
    Compliance_Id: '',
    Compliance_Categorization: '',
    Compliance_Header: '',
    Compliance_Description: '',
    Compliance_Applicability: '',
    Compliance_Clause: '',
    Compliance_Type: '',
    Compliance_Frequency: '',
    Compliance_Statutory_Authority: '',
};

type FormValues = typeof initialValues;

const AssignCustomFormPage: React.FC = () => {
    const handleSubmit = (values: FormValues) => {
        console.log(values); // Replace with your submit logic
    };

    const size = 'sm'; // Set the size to 'md' for medium
    const navigate = useNavigate();
    return (
        <div className="p-0">
            <div className='flex gap-2 items-center mb-6'>
            <Button
            size="sm"
            variant="plain"
            icon={<IoArrowBack className="text-[#72828e] hover:text-[#5d6169]" />}
            onClick={() => navigate(-1)}
          />
            <h3 className="text-2xl font-semibold">Assign Compliance</h3>
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form>
                        {/* First FormContainer */}
                        <FormContainer size={size} className="mb-3 space-y-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormItem
                                    label="Compliance ID"
                                    invalid={errors.Compliance_Id && touched.Compliance_Id}
                                    errorMessage={errors.Compliance_Id}
                                >
                                    <Field
                                        name="Compliance_Id"
                                        type="number"
                                        placeholder="Enter Compliance ID"
                                        component={Input}
                                        size={size}
                                        className="w-full"
                                    />
                                </FormItem>
                                <FormItem
                                    label="Compliance Header"
                                    invalid={errors.Compliance_Header && touched.Compliance_Header}
                                    errorMessage={errors.Compliance_Header}
                                >
                                    <Field
                                        name="Compliance_Header"
                                        type="text"
                                        placeholder="Enter Compliance Header"
                                        component={Input}
                                        size={size}
                                        className="w-full"
                                    />
                                </FormItem>
                            </div>
                        </FormContainer>

                        {/* Second FormContainer */}
                        <FormContainer size={size} className="mb-3 space-y-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormItem
                                    label="Compliance Categorization"
                                    invalid={errors.Compliance_Categorization && touched.Compliance_Categorization}
                                    errorMessage={errors.Compliance_Categorization}
                                >
                                    <Field
                                        name="Compliance_Categorization"
                                        type="text"
                                        placeholder="Enter Compliance Categorization"
                                        component={Input}
                                        size={size}
                                        className="w-full"
                                    />
                                </FormItem>
                                <FormItem
                                    label="Compliance Applicability"
                                    invalid={errors.Compliance_Applicability && touched.Compliance_Applicability}
                                    errorMessage={errors.Compliance_Applicability}
                                >
                                    <Field
                                        name="Compliance_Applicability"
                                        type="text"
                                        placeholder="Enter Compliance Applicability"
                                        component={Input}
                                        size={size}
                                        className="w-full"
                                    />
                                </FormItem>
                            </div>
                        </FormContainer>

                        {/* Third FormContainer */}
                        <FormContainer size={size} className="mb-3">
                            <FormItem
                                label="Compliance Description"
                                invalid={errors.Compliance_Description && touched.Compliance_Description}
                                errorMessage={errors.Compliance_Description}
                            >
                                <Field
                                    name="Compliance_Description"
                                    type="text"
                                    placeholder="Enter Compliance Description"
                                    component={Input}
                                    size={size}
                                    className="w-full"
                                />
                            </FormItem>
                        </FormContainer>

                        {/* Fourth FormContainer */}
                        <FormContainer size={size} className="mb-3 space-y-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormItem
                                    label="Compliance Clause"
                                    invalid={errors.Compliance_Clause && touched.Compliance_Clause}
                                    errorMessage={errors.Compliance_Clause}
                                >
                                    <Field
                                        name="Compliance_Clause"
                                        type="text"
                                        placeholder="Enter Compliance Clause"
                                        component={Input}
                                        size={size}
                                        className="w-full"
                                    />
                                </FormItem>
                                <FormItem
                                    label="Compliance Type"
                                    invalid={errors.Compliance_Type && touched.Compliance_Type}
                                    errorMessage={errors.Compliance_Type}
                                >
                                    <Field
                                        name="Compliance_Type"
                                        type="text"
                                        placeholder="Enter Compliance Type"
                                        component={Input}
                                        size={size}
                                        className="w-full"
                                    />
                                </FormItem>
                            </div>
                        </FormContainer>

                        {/* Fifth FormContainer */}
                        <FormContainer size={size} className="mb-2 space-y-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormItem
                                    label="Compliance Frequency"
                                    invalid={errors.Compliance_Frequency && touched.Compliance_Frequency}
                                    errorMessage={errors.Compliance_Frequency}
                                >
                                    <Field
                                        name="Compliance_Frequency"
                                        type="text"
                                        placeholder="Enter Compliance Frequency"
                                        component={Input}
                                        size={size}
                                        className="w-full"
                                    />
                                </FormItem>
                                <FormItem
                                    label="Compliance Statutory Authority"
                                    invalid={errors.Compliance_Statutory_Authority && touched.Compliance_Statutory_Authority}
                                    errorMessage={errors.Compliance_Statutory_Authority}
                                >
                                    <Field
                                        name="Compliance_Statutory_Authority"
                                        type="text"
                                        placeholder="Enter Compliance Statutory Authority"
                                        component={Input}
                                        size={size}
                                        className="w-full"
                                    />
                                </FormItem>
                            </div>
                        </FormContainer>

                        <FormItem>
                            <Button type="submit" variant="solid" size={size} className="m-inline-block w-auto">
                                Save
                            </Button>
                        </FormItem>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AssignCustomFormPage;
