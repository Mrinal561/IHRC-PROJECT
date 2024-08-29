import React, { forwardRef } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

export interface StatusFormValues {
  complianceId: string;
  complianceHeader: string;
  complianceStatus: string;
  complianceDueDate: string;
}

interface StatusEditContentProps {
  initialValues: StatusFormValues;
  onSubmit: (values: StatusFormValues) => void;
}

export type FormikRef = React.Ref<any>;

const StatusEditContent = forwardRef<FormikRef, StatusEditContentProps>(({ initialValues, onSubmit }, ref) => {
  const validationSchema = Yup.object({
    complianceId: Yup.string().required('Required'),
    complianceHeader: Yup.string().required('Required'),
    complianceStatus: Yup.string().required('Required'),
    complianceDueDate: Yup.date().required('Required'),
  });

  return (
    // <Formik
    //   innerRef={ref}
    //   initialValues={initialValues}
    //   validationSchema={validationSchema}
    //   onSubmit={onSubmit}
    // >
    //   <Form>
    //     <Field name="complianceId" type="text" placeholder="Compliance ID" />
    //     <Field name="complianceHeader" type="text" placeholder="Compliance Header" />
    //     <Field name="complianceStatus" as="select">
    //       <option value="">Select Status</option>
    //       <option value="active">Active</option>
    //       <option value="pending">Pending</option>
    //       <option value="completed">Completed</option>
    //     </Field>
    //     <Field name="complianceDueDate" type="date" />
    //     <button type="submit">Submit</button>
    //   </Form>
    // </Formik>
    <div>
        Edit Compliance
    </div>
  );
});

export default StatusEditContent;