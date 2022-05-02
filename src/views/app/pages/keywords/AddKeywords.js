// importing statements
import React, { useState } from 'react'
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Colxx } from 'components/common/CustomBootstrap';
import { Button, FormGroup, Label, CustomInput, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { LoadingButton } from '../../../reuseable'
import { PostMethods, Function, Validators } from '../../../../utils'

const AddKeywords = ({ isOpen, toggle, setLoading, loading }) => {
    // states
    const [statusBtn, setStatusBtn] = useState(true)

    return (
        <Modal
            isOpen={ isOpen }
            toggle={ () => toggle }
        >

            <Formik
                enableReinitialize
                initialValues={ {
                    name: '',
                } }
                validator={ Yup.object({
                    name: Validators.Required
                }) }
                onSubmit={ (value) => {
                    // set spinner true
                    setLoading(true)
                    const obj = {
                        status: statusBtn,
                        name: value.name
                    }
                    // post api function
                    PostMethods.PostKeyword(obj)
                        .then(() => {
                            setLoading(false)
                            toggle()
                            Function.ShowAlert('success', 'Keyword successfully added', 'Success')
                        })
                        .catch((err) => {
                            setLoading(false)
                            Function.ShowAlert('error', err, 'Error')
                        })
                } }>{ ({ handleSubmit }) => (
                    <Form onSubmit={ handleSubmit }>

                        <ModalHeader>
                            Add new Keyword
                        </ModalHeader>
                        <ModalBody>
                            <FormGroup row>
                                <Colxx sm={ 12 }>
                                    <FormGroup>
                                        <Label for="name">
                                            Name
                                        </Label>
                                        <Field type="text" name='name' className='form-control' />
                                        <span className='error-msg'>
                                            <ErrorMessage name="name" />
                                        </span>
                                    </FormGroup>
                                </Colxx>

                                <Colxx sm={ 12 }>

                                    <FormGroup>
                                        <CustomInput
                                            type="checkbox"
                                            id="isActive"
                                            label="Active"
                                            onChange={ () => setStatusBtn(!statusBtn) }
                                            checked={ statusBtn }
                                        />
                                    </FormGroup>
                                </Colxx>
                            </FormGroup>

                        </ModalBody>
                        <ModalFooter>
                            {/* custom spinner button */ }
                            <LoadingButton title='Add' loading={ loading } type="submit" />
                            <Button
                                color="secondary"
                                onClick={ () => toggle() } >
                                Cancel
                            </Button>

                        </ModalFooter>
                    </Form>) }
            </Formik>
        </Modal >
    )
}
export default AddKeywords