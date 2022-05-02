// importing statements
import React, { useState } from 'react'
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Colxx } from 'components/common/CustomBootstrap';
import { Button, FormGroup, Label, CustomInput, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { LoadingButton } from '../../../reuseable'
import { PostMethods, Function, Validators } from '../../../../utils'

const UpdateFAQ = ({ isOpen, toggle, setLoading, loading, data }) => {
    // states
    const [statusBtn, setStatusBtn] = useState(true)
    console.log(data)
    return (
        <Modal
            isOpen={ isOpen }
            toggle={ () => toggle }
        >

            <Formik
                enableReinitialize
                initialValues={ {
                    /* eslint no-underscore-dangle: 0 */

                    title: data ? data.title : '',
                    description: data ? data.description : '',
                    id: data ? data._id : ''
                } }
                validator={ Yup.object({
                    name: Validators.Required
                }) }
                onSubmit={ (value) => {
                    // set spinner true
                    setLoading(true)
                    const obj = {
                        id: value.id,
                        title: value.title,
                        status: statusBtn,
                        description: value.description
                    }
                    // post api function
                    PostMethods.UpdateFAQ(obj)
                        .then((doc) => {
                            setLoading(false)
                            toggle()
                            Function.ShowAlert('success', doc.message, 'Success')
                        })
                        .catch((err) => {
                            setLoading(false)
                            Function.ShowAlert('error', err, 'Error')
                        })
                } }>{ ({ handleSubmit }) => (
                    <Form onSubmit={ handleSubmit }>

                        <ModalHeader>
                            Add new FAQ
                        </ModalHeader>
                        <ModalBody>
                            <FormGroup row>
                                <Colxx sm={ 12 }>
                                    <FormGroup>
                                        <Label >
                                            Title
                                        </Label>
                                        <Field type="text" name='title' className='form-control' />
                                        <span className='error-msg'>
                                            <ErrorMessage name="title" />
                                        </span>
                                    </FormGroup>
                                </Colxx>
                                <Colxx sm={ 12 }>
                                    <FormGroup>
                                        <Label >
                                            Description
                                        </Label>
                                        <Field
                                            className="form-control"
                                            name="description"
                                            component="textarea"
                                            rows={ 4 }
                                        />
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
                                onClick={ () => toggle() }
                            >
                                Cancel
                            </Button>

                        </ModalFooter>
                    </Form>) }
            </Formik>
        </Modal >
    )
}
export default UpdateFAQ