// importing statements
import React, { useState } from 'react'
import { Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import CustomSelectInput from 'components/common/CustomSelectInput';
// import Select from 'react-select';
import { Colxx } from 'components/common/CustomBootstrap';
import { Button, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, CustomInput, InputGroupAddon } from 'reactstrap';
import { LoadingButton } from '../../../reuseable'
import { PostMethods, Function, Validators } from '../../../../utils'

const AddCategory = ({ isOpen, toggle, setLoading, loading }) => {
    // states
    const [file, setFile] = useState("")
    const [response, setResponse] = useState('')

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
                onSubmit={ () => {
                    // set spinner true
                    setLoading(true)

                    // post api image
                    const data = new FormData()
                    data.append("image", file)
                    PostMethods.PostImage(data)
                        .then((res) => {
                            setResponse(res.imagePath)
                        })
                        .catch((err) => {
                            console.log(err)
                        })

                    // post api function
                    PostMethods.PostSlider({ imagePath: response })
                        .then(() => {
                            setLoading(false)
                            toggle()
                            Function.ShowAlert('success', 'Slider created successfully', 'Success')
                        })
                        .catch((err) => {
                            setLoading(false)
                            Function.ShowAlert('error', err, 'Error')
                        })
                }
                }>{ ({ handleSubmit }) => (
                    <Form onSubmit={ handleSubmit }>

                        <ModalHeader>
                            Add new Slider
                        </ModalHeader>
                        <ModalBody>
                            <FormGroup row>
                                <Colxx sm={ 12 }>
                                    <FormGroup>
                                        <Label for="title">
                                            Title
                                        </Label>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">Upload</InputGroupAddon>
                                            <CustomInput
                                                type="file"
                                                id="exampleCustomFileBrowser1"
                                                name="customFile"
                                                // value={file}
                                                onChange={ (e) => { setFile(e.target.files[0]) } }
                                            />
                                        </InputGroup>
                                        <span className='error-msg'>
                                            <ErrorMessage name="customFile" />
                                        </span>
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
export default AddCategory