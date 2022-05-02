// imports 
import React, { useState, useEffect } from 'react';
import ReactPaginate from "react-paginate";
import { Row, Button, Card, CardBody, CardTitle, Table, UncontrolledTooltip, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { FaEdit } from 'react-icons/fa'
// import { RiDeleteBin6Fill } from 'react-icons/ri'
import AddCategory from './AddCategory';
import UpdateUser from './UpdateUser';
import { GetMethods, PostMethods, Function } from '../../../../utils'

const itemName = "User"
const Categortlist = ({ match }) => {
    // modal state
    const [modalDelete, setModalDelete] = useState(false);
    const [modalPost, setModalPost] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(900)
    const [currData, setAllCurrData] = useState([])
    const dataPerPage = 30

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
    const [allUsers, setAllUsers] = useState([])
    useEffect(() => {
        GetMethods.GetAllUsers(`limit=${ dataPerPage }&page=${ currentPage }`)
            .then((doc) => {
                setAllUsers(doc.data)
                setTotalPages(Math.ceil(doc.data.total / dataPerPage))
            })
            .catch((err) => console.log(err))

    }, [modalDelete, modalEdit, modalPost])



    console.log(allUsers.vendors)

    // change pages onclick 
    const Paginate = (pageNumber) => { setCurrentPage(pageNumber.selected + 1) }

    // delete api
    const deleteUser = (categoryId) => {
        setLoading(true)
        const obj = { id: categoryId }
        PostMethods.DeleteSubscription(obj)
            .then(() => {
                setLoading(false)
                setModalDelete(null)
                Function.ShowAlert('success', 'Category Deleted Successfly', 'Success')
            })
            .catch((err) => console.log(err))
    }


    const getSingleUser = (data) => {
        setAllCurrData(data)
    }
    return (
        <>
            <AddCategory isOpen={ modalPost } toggle={ toggleModalPost } setLoading={ setLoading } loading={ loading } />
            <Row>
                <Colxx xxs="12">
                    <Breadcrumb heading="Users" match={ match } />
                    <Separator className="mb-5" />
                </Colxx>
                <Colxx xxs="12">

                    <Card className="mb-4">
                        <CardBody>
                            <CardTitle>
                                All Users
                                {/* <Button className='float-right' color="primary" onClick={ () => toggleModalPost() }>
                                    Add new
                                </Button> */}
                            </CardTitle>

                            <Table responsive hover >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Type</th>
                                        <th>Email</th>
                                        <th>Business</th>
                                        <th>Subscription</th>
                                        <th>Position</th>
                                        <th>Pick</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allUsers.vendors ? allUsers.vendors.map((user, index) => {
                                            return (
                                                /* eslint no-underscore-dangle: 0 */
                                                <tr key={ user._id } >
                                                    <th scope="row">{ index + 1 }</th>
                                                    <td>{ user.type }</td>
                                                    <td>{ user.email }</td>

                                                    <td className='d-dlex'>
                                                        { user.pic_path ? <img src={ `https://massi-bucket.s3.amazonaws.com/${ user.pic_path }` } height={ 40 } width={ 40 } alt="user_image" className="rounded mr-2" /> : null }
                                                        { user.business }
                                                    </td>
                                                    <td>
                                                        { user.isPaid ? "Paid" : "Free" }
                                                    </td>
                                                    <td>{ user.position }</td>
                                                    <td>{ user.pick }</td>

                                                    <td>
                                                        <div className='column-action d-flex align-items-center'>
                                                            {/* <UncontrolledTooltip placement="top" target="delete">
                                                                Delete
                                                            </UncontrolledTooltip>
                                                            <div className='mx-1 cursor-pointer' id='delete' >
                                                                <RiDeleteBin6Fill size={ 20 } color="#922c88" onClick={ () => setModalDelete(user._id) } />
                                                            </div> */}
                                                            <UncontrolledTooltip placement="top" target="edit">
                                                                assign position
                                                            </UncontrolledTooltip>
                                                            <div className='mx-1 cursor-pointer' id='edit'>
                                                                <FaEdit size={ 20 } color="#922c88" onClick={ () => {
                                                                    setModalEdit(user._id)
                                                                    getSingleUser(user)
                                                                } } />
                                                            </div>

                                                        </div>
                                                    </td>
                                                    <Modal
                                                        isOpen={ modalDelete === user._id }
                                                        toggle={ () => toggleModalDelete(user._id) }
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
                                                                onClick={ () => deleteUser(user._id) }
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
                                                    <UpdateUser isOpen={ modalEdit === user._id } toggle={ () => toggleModalEdit(user._id) } data={ currData } setLoading={ setLoading } loading={ loading } />

                                                </tr>
                                            )
                                        }) : "no list found"
                                    }
                                </tbody>
                            </Table>

                            {
                                totalPages > dataPerPage ? <ReactPaginate
                                    previousLabel={ <i className="simple-icon-arrow-left" /> }
                                    nextLabel={ <i className="simple-icon-arrow-right" /> }
                                    breakLabel="...."
                                    pageCount={ totalPages }
                                    marginPagesDisplayed='1'
                                    pageRangeDisplayed=' 3 '
                                    onPageChange={ Paginate }
                                    containerClassName="pagination justify-content-center"
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="prev page-item"
                                    previousLinkClassName=" prev page-link"
                                    nextClassName="page-item"
                                    nextLinkClassName="next page-link"
                                    breakClassName="page-item"
                                    breakLinkClassName="page-link"
                                    activeClassName="active"
                                /> : null
                            }
                        </CardBody>
                    </Card>
                </Colxx>
            </Row>


        </>
    )
}
export default Categortlist;
