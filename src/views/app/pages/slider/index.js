// imports 
import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import { Row, Button, Card, CardBody, CardTitle, Table, UncontrolledTooltip, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import AddCategory from './AddSlider';
import UpdateCategory from './UpdateSlider';
import { GetMethods, PostMethods, Function, BaseURL } from '../../../../utils'
import { PaginationSmall } from '../../../reuseable'

const itemName = "Slider"
const Categortlist = ({ match }) => {
    // modal state
    const [modalDelete, setModalDelete] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [modalPost, setModalPost] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [loading, setLoading] = useState(false)
    // const [allKeywords, setAllKeywords] = useState([])
    const [keywordsArray, setAllKeywordsArray] = useState([])
    const [currData, setAllCurrData] = useState([])

    // toggle modal on specific id
    const toggleModalDelete = id => {
        if (modalDelete !== id) {
            setModalDelete(id)
        } else {
            setModalDelete(null)
        }
    }
    // post modal
    const toggleModalPost = () => {
        setModalPost(!modalPost)
    }
    // edit modal
    const toggleModalEdit = id => {
        if (modalEdit !== id) {
            setModalEdit(id)
        } else {
            setModalEdit(null)
        }
    }
    // get api categries
    const [allSLiders, setAllSliders] = useState([])
    useEffect(() => {
        GetMethods.GetAllSlider()
            .then((doc) => setAllSliders(doc.data))
            .catch((err) => console.log(err))

    }, [modalDelete, modalEdit, modalPost])

    // pagination algo
    const [currentPage, setCurrentPage] = useState(1)
    const dataPerPage = 6
    // setting pages into the pagination
    const indexOfLastPage = currentPage * dataPerPage// 5
    const indexOfFirstPage = indexOfLastPage - dataPerPage // 0

    const currentSlider = allSLiders.slice(indexOfFirstPage, indexOfLastPage)
    const totalPages = allSLiders.length // 15

    // change pages onclick 
    const Paginate = (pageNumber) => { setCurrentPage(pageNumber) }

    // delete api
    const deleteSlider = (sliderId) => {
        setLoading(true)
        const obj = { id: sliderId }
        PostMethods.DeleteSlider(obj)
            .then(() => {
                setLoading(false)
                setModalDelete(null)
                Function.ShowAlert('success', 'Slider Deleted Successfly', 'Success')
            })
            .catch((err) => console.log(err))
    }

    const handleKeywords = (e) => {
        setSelectedOptions()
        setAllKeywordsArray(e.map((id) => id._id))
    }
    const getSingleSlider = (id) => {
        GetMethods.GetSingleSlider(id)
            .then((doc) => setAllCurrData(doc.data))
            .catch((err) => console.log(err))
    }
    return (
        <>
            <AddCategory isOpen={ modalPost } toggle={ toggleModalPost } setLoading={ setLoading } loading={ loading } keywordsArray={ keywordsArray } selectedOptions={ selectedOptions } handleKeywords={ handleKeywords } />
            <Row>
                <Colxx xxs="12">
                    <Breadcrumb heading="Categories" match={ match } />
                    <Separator className="mb-5" />
                </Colxx>
                <Colxx xxs="12">

                    <Card className="mb-4">
                        <CardBody>
                            <CardTitle>
                                All Sliders
                                <Button className='float-right' color="primary" onClick={ () => toggleModalPost() }>
                                    Add new
                                </Button>
                            </CardTitle>

                            <Table responsive hover >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>createdat</th>
                                        <th>Image</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allSLiders.length ? currentSlider.map((slider, index) => {
                                            return (
                                                /* eslint no-underscore-dangle: 0 */
                                                <tr key={ slider._id } >
                                                    <th scope="row">{ index + 1 }</th>
                                                    <td><Moment format="YYYY/MM/DD">{ slider.createdAt }</Moment></td>
                                                    <td> { slider.imagePath ? <img src={ `${ BaseURL }${ slider.imagePath }` } height={ 150 } width="auto" alt="slider_image" className="mr-2" /> : null }</td>
                                                    <td>
                                                        <div className='column-action d-flex align-items-center'>
                                                            <UncontrolledTooltip placement="top" target="delete">
                                                                Delete
                                                            </UncontrolledTooltip>
                                                            <div className='mx-1 cursor-pointer' id='delete' >
                                                                <RiDeleteBin6Fill size={ 20 } color="#922c88" onClick={ () => setModalDelete(slider._id) } />
                                                            </div>
                                                            <UncontrolledTooltip placement="top" target="edit">
                                                                Edit
                                                            </UncontrolledTooltip>
                                                            <div className='mx-1 cursor-pointer' id='edit'>
                                                                <FaEdit size={ 20 } color="#922c88" onClick={ () => {
                                                                    setModalEdit(slider._id)
                                                                    getSingleSlider(slider._id)
                                                                } } />
                                                            </div>

                                                        </div>
                                                    </td>
                                                    <Modal
                                                        isOpen={ modalDelete === slider._id }
                                                        toggle={ () => toggleModalDelete(slider._id) }
                                                    >
                                                        <ModalHeader>
                                                            Delete
                                                        </ModalHeader>
                                                        <ModalBody>
                                                            Are you sure you want to delete this { itemName }?
                                                        </ModalBody>
                                                        <ModalFooter>
                                                            <Button
                                                                color="primary"
                                                                onClick={ () => deleteSlider(slider._id) }
                                                            >
                                                                Allow
                                                            </Button>{ ' ' }
                                                            <Button
                                                                color="secondary"
                                                                onClick={ () => {
                                                                    setModalDelete(false)
                                                                } }
                                                            >
                                                                Cancel
                                                            </Button>
                                                            { loading ? <Spinner color=' dark ' /> : null }
                                                        </ModalFooter>
                                                    </Modal>
                                                    <UpdateCategory isOpen={ modalEdit === slider._id } toggle={ () => toggleModalEdit(slider._id) } data={ currData } setLoading={ setLoading } loading={ loading } />

                                                </tr>
                                            )
                                        }) : "no list found"
                                    }
                                </tbody>
                            </Table>

                            {
                                totalPages > dataPerPage ? <PaginationSmall dataPerPage={ dataPerPage } currentPage={ currentPage } Paginate={ Paginate } totalPages={ totalPages } /> : null
                            }
                        </CardBody>
                    </Card>
                </Colxx>
            </Row>


        </>
    )
}
export default Categortlist;
