// imports 
import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import { Row, Button, Card, CardBody, CardTitle, Table, UncontrolledTooltip, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import AddCategory from './AddCategory';
import UpdateCategory from './UpdateCategory';
import { GetMethods, PostMethods, Function } from '../../../../utils'
import { PaginationSmall } from '../../../reuseable'

const itemName = "Category"
const ContactUS = ({ match }) => {
    // modal state
    const [modalDelete, setModalDelete] = useState(false);
    const [selectedOptions] = useState([]);
    const [modalPost, setModalPost] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [loading, setLoading] = useState(false)
    const [allcontact, setAllContact] = useState([])
    const [keywordsArray] = useState([])
    const [currData] = useState([])

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
        GetMethods.GetAllContact()
            .then((doc) => {
                const res = doc.data
                setAllContact(res)
            })
            .catch((err) => console.log(err))
    }, [modalDelete, modalEdit, modalPost])
    console.log(allcontact)
    // pagination algo
    const [currentPage, setCurrentPage] = useState(1)
    const dataPerPage = 6
    // setting pages into the pagination
    const indexOfLastPage = currentPage * dataPerPage// 5
    const indexOfFirstPage = indexOfLastPage - dataPerPage // 0

    const currentContact = allcontact.slice(indexOfFirstPage, indexOfLastPage)
    const totalPages = allcontact.length // 15

    // change pages onclick 
    const Paginate = (pageNumber) => { setCurrentPage(pageNumber) }

    // delete api
    const deletePayment = (categoryId) => {
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

    // DateWork
    // const dateObj =(date)=>{
    //     moment(date).format('MMMM d, YYYY');

    // }


    return (
        <>
            <AddCategory isOpen={ modalPost } toggle={ toggleModalPost } setLoading={ setLoading } loading={ loading } keywordsArray={ keywordsArray } selectedOptions={ selectedOptions } allcontact={ allcontact } />
            <Row>
                <Colxx xxs="12">
                    <Breadcrumb heading="Keywords" match={ match } />
                    <Separator className="mb-5" />
                </Colxx>
                <Colxx xxs="12">

                    <Card className="mb-4">
                        <CardBody>
                            <CardTitle>
                                All Contacts
                            </CardTitle>

                            <Table responsive hover >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Email</th>
                                        <th>FirstName</th>
                                        <th>LastName</th>
                                        <th>Message</th>
                                        <th>Phone</th>
                                        <th>Createdon</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allcontact.length ? currentContact.map((contact, index) => {
                                            return (
                                                /* eslint no-underscore-dangle: 0 */
                                                <tr key={ contact._id } >
                                                    <th scope="row">{ index + 1 }</th>
                                                    <td>{ contact.email }</td>
                                                    <td>{ contact.firstName }</td>
                                                    <td>{ contact.lastName }</td>
                                                    <td>{ contact.message }</td>
                                                    <td>{ contact.phone }</td>
                                                    <td><Moment format="YYYY/MM/DD">{ contact.createdAt }</Moment></td>
                                                    {/* <td>{dateObj(contact.createdAt)}</td> */ }
                                                    <td>
                                                        <div className='column-action d-flex align-items-center'>
                                                            <UncontrolledTooltip placement="top" target="delete">
                                                                Delete
                                                            </UncontrolledTooltip>
                                                            <div className='mx-1 cursor-pointer' id='delete' >
                                                                <RiDeleteBin6Fill size={ 20 } color="#922c88" onClick={ () => setModalDelete(contact._id) } />
                                                            </div>
                                                            <UncontrolledTooltip placement="top" target="edit">
                                                                Edit
                                                            </UncontrolledTooltip>
                                                            <div className='mx-1 cursor-pointer' id='edit'>
                                                                <FaEdit size={ 20 } color="#922c88" onClick={ () => {
                                                                    setModalEdit(contact._id)
                                                                } } />
                                                            </div>

                                                        </div>
                                                    </td>
                                                    <Modal
                                                        isOpen={ modalDelete === contact._id }
                                                        toggle={ () => toggleModalDelete(contact._id) }
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
                                                                onClick={ () => deletePayment(contact._id) }
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
                                                    <UpdateCategory isOpen={ modalEdit === contact._id } toggle={ () => toggleModalEdit(contact._id) } data={ currData } setLoading={ setLoading } loading={ loading } allcontact={ allcontact } />

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
export default ContactUS;
