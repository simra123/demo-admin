// importing statements
import React, { useState, useEffect } from 'react'
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';
import { Colxx } from 'components/common/CustomBootstrap';
import { Button, FormGroup, Label, Modal, Row, ModalHeader, CustomInput, ModalBody, ModalFooter } from 'reactstrap';
import { LoadingButton } from '../../../reuseable'
import { PostMethods, GetMethods, Function, Validators } from '../../../../utils'

const AddSubscription = ({ isOpen, toggle, setLoading, data, loading }) => {
    // states
    // strip products
    const [allProducts, setAllProducts] = useState([]);
    // strip prices
    const [allPrices, setAllPrices] = useState('');
    // seleted package
    const [selectedOption, setSelectedOption] = useState(null)
    // repeating forms
    const [formValues, setFormValues] = useState([])
    // filtered strip products
    const [filteredPackages, setFilteredPackages] = useState([])
    // existining subscription
    const [allSubscriptions, setAllSubscriptions] = useState(null)


    useEffect(() => {

        if (data) {
            setFormValues(data.services)
        }
        // getting all existing data
        GetMethods.GetAllSubscriptions()
            .then((doc) => {
                setAllSubscriptions(doc.data)
            })
            .catch((err) => console.log(err))

        // getting all strip products
        GetMethods.GetStripProducts()
            .then((doc) => {
                // checking if the product is already added
                if (allSubscriptions) {
                    const allData = doc.data.data
                    const activeData = allData.filter((val) => val.active === true)
                    const filteredProducts = activeData.filter((obj) => !allSubscriptions.some((obj2) => obj.id === obj2.product_id))
                    setAllProducts(filteredProducts)

                }
            })
            .catch((err) => console.log(err))

        // getting all strip product prices
        GetMethods.GetStripPrices()
            .then((doc) => {
                setAllPrices(doc.data.data)
            })
            .catch((err) => console.log(err))
    }, [data])

    // handling values of multiple forms
    const handleChange = (i, e) => {
        const newFormValues = [...formValues]

        // check if the triggered element is an input field or check box
        if (e.target.value !== "on") {
            newFormValues[i].description = e.target.value

        } else {
            newFormValues[i].valid = !newFormValues[i].valid

        }
        setFormValues(newFormValues);
    }
    // adding forms on click
    const addFormFields = () => {
        setFormValues([...formValues, { description: "", valid: false }])
    }

    // removing forms 
    const removeFormFields = (i) => {
        const newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    // filter seleted price on onChange
    const handleOptions = (e) => {
        setSelectedOption()
        setFilteredPackages(allPrices.filter((prices) => prices.product === e.id))

    }
    // hard coding the packges array for api
    const packagesArray = filteredPackages.map(value => (
        {
            name: value.recurring.interval === "month" ? "Monthly" : "Anually ",
            price_id: value.id,
            price: value.unit_amount / 100

        }
    ))
    // making products render in selete
    if (allProducts) {
        allProducts.forEach((products, i) => {
            if (products.active) {
                allProducts[i].label = products.name
                allProducts[i].value = products.id
            }
        })
    }
    return (
        // open modal on props
        <Modal
            isOpen={ isOpen }
            toggle={ () => toggle }
            size='lg'
        >
            <Formik
                enableReinitialize
                initialValues={ {
                    name: data ? data.name : '',
                    id: data ? data.id : ''
                } }
                validator={ Yup.object({
                    name: Validators.Required
                }) }
                onSubmit={ (value) => {
                    // set spinner true
                    setLoading(true)
                    const obj = {
                        id: value.id,
                        name: value.name,
                        packages: packagesArray,
                        services: formValues,
                        product_id: filteredPackages ? filteredPackages[0]?.product : data.product_id,
                    }
                    // post api function
                    PostMethods.UpdateSubscription(obj)
                        .then(() => {
                            setLoading(false)
                            toggle()
                            Function.ShowAlert('success', 'Subscription created successfully', 'Success')
                        })
                        .catch((err) => {
                            setLoading(false)
                            Function.ShowAlert('error', err, 'Error')
                        })
                } }>{ ({ handleSubmit }) => (
                    <Form onSubmit={ handleSubmit }>

                        <ModalHeader>
                            Add new Subscription
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
                                            <ErrorMessage name="title" />
                                        </span>
                                    </FormGroup>
                                </Colxx>

                                <Colxx sm={ 12 }>

                                    <h5>Services</h5>
                                    { formValues?.length ? formValues.map((element, index) => (
                                        <Row className='mt-3' key={ index.toString() }>
                                            <Colxx sm={ 9 }>
                                                <FormGroup>
                                                    <Label>Description</Label>
                                                    <input type="text" name="name" className='form-control' value={ element.description || "" } onChange={ e => handleChange(index, e) } />
                                                </FormGroup>
                                            </Colxx>
                                            <Colxx sm={ 2 }>
                                                <FormGroup className="mt-4">

                                                    <CustomInput
                                                        type="checkbox"
                                                        id={ `isActive-${ index }` }
                                                        label="Valid"
                                                        onChange={ (e) => handleChange(index, e) }
                                                        checked={ formValues[index].valid }
                                                    />
                                                </FormGroup>

                                            </Colxx>
                                            <Colxx sm={ 1 }>
                                                {
                                                    index ?
                                                        // single field can be removed
                                                        <span><AiFillMinusCircle size={ 30 } color='purple' className="mt-3" onClick={ () => removeFormFields(index) } /></span>

                                                        : <span ><AiFillPlusCircle size={ 30 } className="mt-3" color='purple' onClick={ () => addFormFields() } /></span>
                                                }
                                            </Colxx>
                                        </Row>

                                    )) : null }

                                </Colxx>

                            </FormGroup>
                            <Label>Select Subscription Type</Label>
                            {/* single select */ }
                            <Select
                                components={ { Input: CustomSelectInput } }
                                className="react-select"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={ selectedOption }
                                disable
                                onChange={ (e) => handleOptions(e) }
                                options={ allProducts }
                            />
                            <h5 className='my-3'> Packages</h5>
                            {
                                // show packages on change
                                filteredPackages.length ? filteredPackages.map((val) => {
                                    return (
                                        <div key={ val.id }>
                                            <i>name : { val?.recurring.interval === "month" ? "Montly" : "Anually " }</i> <br />
                                            <i>price : { val?.unit_amount / 100 }</i><br />
                                        </div>
                                    )
                                }) : data.packages && data.packages.map((val) => {
                                    return (
                                        /* eslint no-underscore-dangle: 0 */
                                        <div key={ val?._id }>
                                            <i>name : { val?.name }</i> <br />
                                            <i>price : { val?.price }</i><br />
                                        </div>
                                    )
                                })
                            }
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
export default AddSubscription