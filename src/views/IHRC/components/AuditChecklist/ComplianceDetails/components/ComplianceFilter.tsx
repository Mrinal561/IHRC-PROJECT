import React, { useState, useRef, forwardRef } from 'react'
import { HiOutlineFilter, HiOutlineSearch } from 'react-icons/hi'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import Drawer from '@/components/ui/Drawer'
import { Field, Form, Formik, FormikProps, FieldProps } from 'formik'
import type { MouseEvent } from 'react'

type FormModel = {
  complianceId: string
  complianceCategorization: string[]
  location: string[]
}

type FilterFormProps = {
  onSubmitComplete?: () => void
}

type DrawerFooterProps = {
  onSaveClick: (event: MouseEvent<HTMLButtonElement>) => void
  onCancel: (event: MouseEvent<HTMLButtonElement>) => void
}

const FilterForm = forwardRef<FormikProps<FormModel>, FilterFormProps>(
  ({ onSubmitComplete }, ref) => {
    const handleSubmit = (values: FormModel) => {
      onSubmitComplete?.()
      console.log(values) // Replace with your filter logic
    }

    const initialValues: FormModel = {
      complianceId: '',
      complianceCategorization: [],
      location: [],
    }

    return (
      <Formik
        enableReinitialize
        innerRef={ref}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ values, touched, errors }) => (
          <Form>
            <FormContainer>
              <FormItem
                invalid={errors.complianceId && touched.complianceId}
                errorMessage={errors.complianceId}
              >
                <h6 className="mb-4">Compliance ID</h6>
                <Field
                  type="text"
                  autoComplete="off"
                  name="complianceId"
                  placeholder="Enter Compliance ID"
                  component={Input}
                  prefix={<HiOutlineSearch className="text-lg" />}
                />
              </FormItem>
              <FormItem
                invalid={errors.complianceCategorization && touched.complianceCategorization}
                errorMessage={errors.complianceCategorization as string}
              >
                <h6 className="mb-4">Compliance Categorization</h6>
                <Field name="complianceCategorization">
                  {({ field, form }: FieldProps) => (
                    <Checkbox.Group
                      vertical
                      value={values.complianceCategorization}
                      onChange={(options) =>
                        form.setFieldValue(field.name, options)
                      }
                    >
                      <Checkbox className="mb-3" name={field.name} value="LICENSE / REGISTRATION">
                        LICENSE / REGISTRATION
                      </Checkbox>
                      {/* Add more categories as needed */}
                    </Checkbox.Group>
                  )}
                </Field>
              </FormItem>
              <FormItem
                invalid={errors.location && touched.location}
                errorMessage={errors.location as string}
              >
                <h6 className="mb-4">Location</h6>
                <Field name="location">
                  {({ field, form }: FieldProps) => (
                    <Checkbox.Group
                      vertical
                      value={values.location}
                      onChange={(options) =>
                        form.setFieldValue(field.name, options)
                      }
                    >
                      <Checkbox className="mb-3" name={field.name} value="Muzaffarpur">
                        Muzaffarpur
                      </Checkbox>
                      <Checkbox className="mb-3" name={field.name} value="Arrah">
                        Arrah
                      </Checkbox>
                      {/* Add more locations as needed */}
                    </Checkbox.Group>
                  )}
                </Field>
              </FormItem>
            </FormContainer>
          </Form>
        )}
      </Formik>
    )
  }
)

const DrawerFooter = ({ onSaveClick, onCancel }: DrawerFooterProps) => {
  return (
    <div className="text-right w-full">
      <Button size="sm" className="mr-2" onClick={onCancel}>
        Cancel
      </Button>
      <Button size="sm" variant="solid" onClick={onSaveClick}>
        Apply Filters
      </Button>
    </div>
  )
}

const ComplianceFilter: React.FC = () => {
  const formikRef = useRef<FormikProps<FormModel>>(null)
  const [isOpen, setIsOpen] = useState(false)

  const openDrawer = () => setIsOpen(true)
  const onDrawerClose = () => setIsOpen(false)

  const formSubmit = () => {
    formikRef.current?.submitForm()
  }

  return (
    <>
      <Button
        size="sm"
        className="block md:inline-block ltr:md:ml-2 rtl:md:mr-2 md:mb-0 mb-4"
        icon={<HiOutlineFilter />}
        onClick={openDrawer}
      >
        Filter
      </Button>
      <Drawer
        title="Compliance Filters"
        isOpen={isOpen}
        footer={
          <DrawerFooter
            onCancel={onDrawerClose}
            onSaveClick={formSubmit}
          />
        }
        onClose={onDrawerClose}
        onRequestClose={onDrawerClose}
      >
        {/* <FilterForm ref={formikRef} onSubmitComplete={onDrawerClose} /> */}
      </Drawer>
    </>
  )
}

FilterForm.displayName = 'FilterForm'

export default ComplianceFilter