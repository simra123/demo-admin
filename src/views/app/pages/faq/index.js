// imports 
import React, { useState, useEffect } from 'react';
import { Row, Button, Card, CardBody, CardTitle, Table, UncontrolledTooltip, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import AddCategory from './AddFaq';
import UpdateCategory from './UpdateFaq';
import { GetMethods, PostMethods, Function } from '../../../../utils'
import { PaginationSmall } from '../../../reuseable'

const itemName = "FAQ"
const Categortlist = ({ match }) => {
    // modal state
    const [modalDelete, setModalDelete] = useState(false);
    const [modalPost, setModalPost] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [loading, setLoading] = useState(false)
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
    // console.log(selectedOptions)
    // get api categries
    const [allFaqs, setAllFaqs] = useState([])
    useEffect(() => {
        GetMethods.GetAllFAQS()
            .then((doc) => setAllFaqs(doc.data))
            .catch((err) => console.log(err))

    }, [modalDelete, modalEdit, modalPost])
    console.log(allFaqs)
    // pagination algo
    const [currentPage, setCurrentPage] = useState(1)
    const dataPerPage = 6
    // setting pages into the pagination
    const indexOfLastPage = currentPage * dataPerPage// 5
    const indexOfFirstPage = indexOfLastPage - dataPerPage // 0

    const currentCategories = allFaqs.slice(indexOfFirstPage, indexOfLastPage)
    const totalPages = allFaqs.length // 15

    // change pages onclick 
    const Paginate = (pageNumber) => { setCurrentPage(pageNumber) }

    // delete api
    const deleteCategory = (categoryId) => {
        setLoading(true)
        const obj = { id: categoryId }
        PostMethods.DeleteFAQ(obj)
            .then((doc) => {
                setLoading(false)
                setModalDelete(null)
                Function.ShowAlert('success', doc.message, 'Success')
            })
            .catch((err) => console.log(err))
    }


    const getSingleCategory = (id) => {


        GetMethods.GetSingleFAQ(id)
            .then((doc) => setAllCurrData(doc.data))
            .catch((err) => console.log(err))
    }
    return (
        <>
            <AddCategory isOpen={ modalPost } toggle={ toggleModalPost } setLoading={ setLoading } loading={ loading } />
            <Row>
                <Colxx xxs="12">
                    <Breadcrumb heading="Subscriptions" match={ match } />
                    <Separator className="mb-5" />
                </Colxx>
                <Colxx xxs="12">

                    <Card className="mb-4">
                        <CardBody>
                            <CardTitle>
                                All Subscriptions
                                <Button className='float-right' color="primary" onClick={ () => toggleModalPost() }>
                                    Add new
                                </Button>
                            </CardTitle>

                            <Table responsive hover >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Title</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allFaqs.length ? currentCategories.map((category, index) => {
                                            return (
                                                /* eslint no-underscore-dangle: 0 */
                                                <tr key={ category._id } >
                                                    <th scope="row">{ index + 1 }</th>
                                                    <td>{ category.title }</td>
                                                    <td>{ category.status === true ? "Active" : "InActive" }</td>
                                                    <td>
                                                        <div className='column-action d-flex align-items-center'>
                                                            <UncontrolledTooltip placement="top" target="delete">
                                                                Delete
                                                            </UncontrolledTooltip>
                                                            <div className='mx-1 cursor-pointer' id='delete' >
                                                                <RiDeleteBin6Fill size={ 20 } color="#922c88" onClick={ () => setModalDelete(category._id) } />
                                                            </div>
                                                            <UncontrolledTooltip placement="top" target="edit">
                                                                Edit
                                                            </UncontrolledTooltip>
                                                            <div className='mx-1 cursor-pointer' id='edit'>
                                                                <FaEdit size={ 20 } color="#922c88" onClick={ () => {
                                                                    setModalEdit(category._id)
                                                                    getSingleCategory(category._id)
                                                                    console.log(category._id)
                                                                } } />
                                                            </div>

                                                        </div>
                                                    </td>
                                                    <Modal
                                                        isOpen={ modalDelete === category._id }
                                                        toggle={ () => toggleModalDelete(category._id) }
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
                                                                onClick={ () => deleteCategory(category._id) }
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
                                                    <UpdateCategory isOpen={ modalEdit === category._id } toggle={ () => toggleModalEdit(category._id) } data={ currData } setLoading={ setLoading } loading={ loading } />

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
