// imports 
import React, { useState, useEffect } from 'react';
import { Row, Button, Card, CardBody, CardTitle, Table, UncontrolledTooltip, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import AddCategory from './AddContactvendor';
import UpdateCategory from './UpdateContactvendor';
import { GetMethods, PostMethods, Function } from '../../../../utils'
import { PaginationSmall } from '../../../reuseable'

const itemName = "contactvendor"
const ContactVendor = ({ match }) => {
    // modal state
    const [modalDelete, setModalDelete] = useState(false);
    const [selectedOptions] = useState([]);
    const [modalPost, setModalPost] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [loading, setLoading] = useState(false)
    const [allContactVendor, setAllContactVendor] = useState([])
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
        GetMethods.GetAllContactVendor()
            .then((doc) => {
                const res = doc.data
                setAllContactVendor(res)
            })
            .catch((err) => console.log(err))
    }, [modalDelete, modalEdit, modalPost])

    // pagination algo
    const [currentPage, setCurrentPage] = useState(1)
    const dataPerPage = 6
    // setting pages into the pagination
    const indexOfLastPage = currentPage * dataPerPage// 5
    const indexOfFirstPage = indexOfLastPage - dataPerPage // 0

    const currentContactVendor = allContactVendor.slice(indexOfFirstPage, indexOfLastPage)
    const totalPages = allContactVendor.length // 15

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

    return (
        <>
            <AddCategory isOpen={modalPost} toggle={toggleModalPost} setLoading={setLoading} loading={loading} keywordsArray={keywordsArray} selectedOptions={selectedOptions} allContactVendor={allContactVendor} />
            <Row>
                <Colxx xxs="12">
                    <Breadcrumb heading="Keywords" match={match} />
                    <Separator className="mb-5" />
                </Colxx>
                <Colxx xxs="12">

                    <Card className="mb-4">
                        <CardBody>
                            <CardTitle>
                                All Contact Vendor
                            </CardTitle>

                            <Table responsive hover >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Message</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allContactVendor.length ? currentContactVendor.map((contactvendor, index) => {
                                            return (
                                                /* eslint no-underscore-dangle: 0 */
                                                <tr key={contactvendor._id} >
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{contactvendor.name}</td>
                                                    <td>{contactvendor.email}</td>
                                                    <td>{contactvendor.phone}</td>
                                                    <td>{contactvendor.message}</td>
                                                    <td>
                                                        <div className='column-action d-flex align-items-center'>
                                                            <UncontrolledTooltip placement="top" target="delete">
                                                                Delete
                                                            </UncontrolledTooltip>
                                                            <div className='mx-1 cursor-pointer' id='delete' >
                                                                <RiDeleteBin6Fill size={20} color="#922c88" onClick={() => setModalDelete(contactvendor._id)} />
                                                            </div>
                                                            <UncontrolledTooltip placement="top" target="edit">
                                                                Edit
                                                            </UncontrolledTooltip>
                                                            <div className='mx-1 cursor-pointer' id='edit'>
                                                                <FaEdit size={20} color="#922c88" onClick={() => {
                                                                    setModalEdit(contactvendor._id)
                                                                }} />
                                                            </div>

                                                        </div>
                                                    </td>
                                                    <Modal
                                                        isOpen={modalDelete === contactvendor._id}
                                                        toggle={() => toggleModalDelete(contactvendor._id)}
                                                    >
                                                        <ModalHeader>
                                                            Delete
                                                        </ModalHeader>
                                                        <ModalBody>
                                                            Are you sure you want to delete this {itemName}?
                                                        </ModalBody>
                                                        <ModalFooter>
                                                            <Button
                                                                color="primary"
                                                                onClick={() => deletePayment(contactvendor._id)}
                                                            >
                                                                Allow
                                                            </Button>{' '}
                                                            <Button
                                                                color="secondary"
                                                                onClick={() => {
                                                                    setModalDelete(false)
                                                                }}
                                                            >
                                                                Cancel
                                                            </Button>
                                                            {loading ? <Spinner color=' dark ' /> : null}
                                                        </ModalFooter>
                                                    </Modal>
                                                    <UpdateCategory isOpen={modalEdit === contactvendor._id} toggle={() => toggleModalEdit(contactvendor._id)} data={currData} setLoading={setLoading} loading={loading} allContactVendor={allContactVendor} />

                                                </tr>
                                            )
                                        }) : "no list found"
                                    }
                                </tbody>
                            </Table>

                            {
                                totalPages > dataPerPage ? <PaginationSmall dataPerPage={dataPerPage} currentPage={currentPage} Paginate={Paginate} totalPages={totalPages} /> : null
                            }
                        </CardBody>
                    </Card>
                </Colxx>
            </Row>


        </>
    )
}
export default ContactVendor;
