// imports 
import React, { useState, useEffect } from 'react';
import { Row, Button, Card, CardBody, CardTitle, Table, UncontrolledTooltip, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import AddCategory from './AddKeywords';
import UpdateCategory from './UpdateKeywords';
import { GetMethods, PostMethods, Function } from '../../../../utils'
import { PaginationSmall } from '../../../reuseable'

const itemName = "Category"
const KeywordsList = ({ match }) => {
    // modal state
    const [modalDelete, setModalDelete] = useState(false);
    const [selectedOptions] = useState([]);
    const [modalPost, setModalPost] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [loading, setLoading] = useState(false)
    const [allKeywords, setAllKeywords] = useState([])
    const [keywordsArray] = useState([])
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
    useEffect(() => {
        GetMethods.GetAllKeywords()
            .then((doc) => {
                const res = doc.data
                setAllKeywords(res)
            })
            .catch((err) => console.log(err))
    }, [modalDelete, modalEdit, modalPost])

    // pagination algo
    const [currentPage, setCurrentPage] = useState(1)
    const dataPerPage = 6
    // setting pages into the pagination
    const indexOfLastPage = currentPage * dataPerPage// 5
    const indexOfFirstPage = indexOfLastPage - dataPerPage // 0

    const currentKeywords = allKeywords.slice(indexOfFirstPage, indexOfLastPage)
    const totalPages = allKeywords.length // 15

    // change pages onclick 
    const Paginate = (pageNumber) => { setCurrentPage(pageNumber) }

    // delete api
    const deleteKeyword = (categoryId) => {
        setLoading(true)
        const obj = { id: categoryId }
        PostMethods.DeleteCategory(obj)
            .then(() => {
                setLoading(false)
                setModalDelete(null)
                Function.ShowAlert('success', 'Category Deleted Successfly', 'Success')
            })
            .catch((err) => console.log(err))
    }
    const getSingleCategory = (id) => {
        GetMethods.GetSingleKeyword(id)
            .then((doc) => setAllCurrData(doc.data))
            .catch((err) => console.log(err))
    }
    return (
        <>
            <AddCategory isOpen={ modalPost } toggle={ toggleModalPost } setLoading={ setLoading } loading={ loading } keywordsArray={ keywordsArray } selectedOptions={ selectedOptions } allKeywords={ allKeywords } />
            <Row>
                <Colxx xxs="12">
                    <Breadcrumb heading="Keywords" match={ match } />
                    <Separator className="mb-5" />
                </Colxx>
                <Colxx xxs="12">

                    <Card className="mb-4">
                        <CardBody>
                            <CardTitle>
                                All Keywords
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
                                        allKeywords.length ? currentKeywords.map((keyword, index) => {
                                            return (
                                                /* eslint no-underscore-dangle: 0 */
                                                <tr key={ keyword._id } >
                                                    <th scope="row">{ index + 1 }</th>
                                                    <td>{ keyword.name }</td>
                                                    <td>{ keyword.status === true ? "Active" : "InActive" }</td>
                                                    <td>
                                                        <div className='column-action d-flex align-items-center'>
                                                            <UncontrolledTooltip placement="top" target="delete">
                                                                Delete
                                                            </UncontrolledTooltip>
                                                            <div className='mx-1 cursor-pointer' id='delete' >
                                                                <RiDeleteBin6Fill size={ 20 } color="#922c88" onClick={ () => setModalDelete(keyword._id) } />
                                                            </div>
                                                            <UncontrolledTooltip placement="top" target="edit">
                                                                Edit
                                                            </UncontrolledTooltip>
                                                            <div className='mx-1 cursor-pointer' id='edit'>
                                                                <FaEdit size={ 20 } color="#922c88" onClick={ () => {
                                                                    setModalEdit(keyword._id)
                                                                    getSingleCategory(keyword._id)
                                                                } } />
                                                            </div>

                                                        </div>
                                                    </td>
                                                    <Modal
                                                        isOpen={ modalDelete === keyword._id }
                                                        toggle={ () => toggleModalDelete(keyword._id) }
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
                                                                onClick={ () => deleteKeyword(keyword._id) }
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
                                                    <UpdateCategory isOpen={ modalEdit === keyword._id } toggle={ () => toggleModalEdit(keyword._id) } data={ currData } setLoading={ setLoading } loading={ loading } allKeywords={ allKeywords } />

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
export default KeywordsList;
