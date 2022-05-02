// importing statements
import React from 'react'
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Colxx } from 'components/common/CustomBootstrap';
import { Button, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { LoadingButton } from '../../../reuseable'
import { PostMethods, Function, Validators } from '../../../../utils'
/* eslint no-underscore-dangle: 0 */

const AddCategory = ({ isOpen, toggle, setLoading, loading, data }) => {

    // states
    //  setAllKeywords(data)

    //  if (data?.keywords?.length) {
    //     setStatusBtn(data.status)
    //     const res = data.keywords
    //     res.forEach((keywords, i) => {
    //         res[i].label = keywords.name
    //         res[i].value = keywords._id
    //     })
    //      setSelectedOptions(res)
    // }

    return (
        <Modal
            isOpen={ isOpen }
            toggle={ () => toggle }
        >
            <Formik
                enableReinitialize
                initialValues={ {
                    pick: data?.pick,
                    id: data?._id,
                } }
                validator={ Yup.object({
                    title: Validators.Required
                }) }
                onSubmit={ (value) => {
                    setLoading(true)
                    const obj = {
                        id: value.id,
                        pick: value.pick,
                    }
                    console.log(obj)
                    PostMethods.VendorAssignPositon(obj)
                        .then((doc) => {
                            setLoading(false)
                            toggle()
                            Function.ShowAlert('success', doc.message, 'Success')
                        })
                        .catch((err) => {
                            setLoading(false)
                            console.log(err)
                            Function.ShowAlert('error', err, 'Error')
                        })
                } }
            >{ ({ handleSubmit }) => (
                <Form onSubmit={ handleSubmit }>

                    <ModalHeader>
                        Assign Position
                    </ModalHeader>
                    <ModalBody>

                        <FormGroup row>
                            <Colxx sm={ 12 }>
                                <FormGroup>
                                    <Label for="examplePasswordGrid">
                                        Pick
                                    </Label>
                                    <Field type="number" name='pick' className='form-control' />
                                    <span className='error-msg'>
                                        <ErrorMessage name="title" />
                                    </span>
                                </FormGroup>
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