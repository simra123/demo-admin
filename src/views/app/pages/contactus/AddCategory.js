// importing statements
import React, { useState } from 'react'
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomSelectInput from 'components/common/CustomSelectInput';
import Select from 'react-select';
import { Colxx } from 'components/common/CustomBootstrap';
import { Button, FormGroup, Label, CustomInput, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { LoadingButton } from '../../../reuseable'
import { PostMethods, Function, Validators } from '../../../../utils'

const AddCategory = ({ isOpen, toggle, setLoading, loading, allKeywords, selectedOptions, handleKeywords, keywordsArray }) => {
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
                    title: '',
                } }
                validator={ Yup.object({
                    title: Validators.Required
                }) }
                onSubmit={ (value) => {
                    // set spinner true
                    setLoading(true)
                    const obj = {
                        title: value.title,
                        status: statusBtn,
                        keywords: keywordsArray
                    }
                    // post api function
                    PostMethods.PostCategory(obj)
                        .then(() => {
                            setLoading(false)
                            toggle()
                            Function.ShowAlert('success', 'Category created successfully', 'Success')
                        })
                        .catch((err) => {
                            setLoading(false)
                            Function.ShowAlert('error', err, 'Error')
                        })
                } }>{ ({ handleSubmit }) => (
                    <Form onSubmit={ handleSubmit }>

                        <ModalHeader>
                            Add new Category
                        </ModalHeader>
                        <ModalBody>
                            <FormGroup row>
                                <Colxx sm={ 12 }>
                                    <FormGroup>
                                        <Label for="title">
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
                                        <CustomInput
                                            type="checkbox"
                                            id="isActive"
                                            label="Active"
                                            onChange={ () => setStatusBtn(!statusBtn) }
                                            checked={ statusBtn }
                                        />
                                    </FormGroup>

                                    <Label>
                                        Select Keywords
                                    </Label>
                                    {/* multi keywords select */ }
                                    <Select
                                        components={ { Input: CustomSelectInput } }
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        isMulti
                                        name="form-field-name"
                                        value={ selectedOptions }
                                        onChange={ (e) => handleKeywords(e) }
                                        options={ allKeywords }
                                    />
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
export default AddCategory