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
/* eslint no-underscore-dangle: 0 */

const AddCategory = ({ isOpen, toggle, setLoading, loading, data, allKeywords }) => {

    // states
    const [statusBtn, setStatusBtn] = useState(data?.status)
    const [keywordsArray, setAllKeywordsArray] = useState([])
    const [selectedOptions, setSelectedOptions] = useState(data?.keywords);
    //  setAllKeywords(data)


    const handleKeywords = (e) => {
        setSelectedOptions()
        setAllKeywordsArray(e.map((id) => id._id))
    }
    return (
        <Modal
            isOpen={ isOpen }
            toggle={ () => toggle }
        >
            <Formik
                enableReinitialize
                initialValues={ {
                    title: data ? data.title : '',
                    id: data ? data._id : '',
                } }
                validator={ Yup.object({
                    title: Validators.Required
                }) }
                onSubmit={ (value) => {
                    setLoading(true)
                    const obj = {
                        id: value.id,
                        title: value.title,
                        status: statusBtn,
                        keywords: keywordsArray
                    }
                    console.log(obj)
                    PostMethods.UpdateCategory(obj)
                        .then((doc) => {
                            setLoading(false)
                            toggle()
                            Function.ShowAlert('success', doc.message, 'Success')
                        })
                        .catch((err) => {
                            setLoading(false)
                            Function.ShowAlert('error', err, 'Error')
                        })
                } }
            >{ ({ handleSubmit }) => (
                <Form onSubmit={ handleSubmit }>

                    <ModalHeader>
                        Add new Category
                    </ModalHeader>
                    <ModalBody>

                        <FormGroup row>
                            <Colxx sm={ 12 }>
                                <FormGroup>
                                    <Label for="examplePasswordGrid">
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
                        <LoadingButton title='Update' loading={ loading } type="submit" />

                        <Button
                            color="secondary"
                            onClick={ () => toggle() }>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Form>) }
            </Formik>
        </Modal>
    )
}
export default AddCategory