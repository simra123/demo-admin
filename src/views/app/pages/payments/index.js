// imports 
import React, { useState, useEffect } from 'react';
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
const PaymentList = ({ match }) => {
    // modal state
    const [modalDelete, setModalDelete] = useState(false);
    const [selectedOptions] = useState([]);
    const [modalPost, setModalPost] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [loading, setLoading] = useState(false)
    const [allPayments, setAllPayments] = useState([])
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
        GetMethods.GetAllPayments()
            .then((doc) => {
                const res = doc.data
                setAllPayments(res)
            })
            .catch((err) => console.log(err))
    }, [modalDelete, modalEdit, modalPost])

    // pagination algo
    const [currentPage, setCurrentPage] = useState(1)
    const dataPerPage = 6
    // setting pages into the pagination
    const indexOfLastPage = currentPage * dataPerPage// 5
    const indexOfFirstPage = indexOfLastPage - dataPerPage // 0

    const currentPayments = allPayments.slice(indexOfFirstPage, indexOfLastPage)
    const totalPages = allPayments.length // 15

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
            <AddCategory isOpen={modalPost} toggle={toggleModalPost} setLoading={setLoading} loading={loading} keywordsArray={keywordsArray} selectedOptions={selectedOptions} allPayments={allPayments} />
            <Row>
                <Colxx xxs="12">
                    <Breadcrumb heading="Keywords" match={match} />
                    <Separator className="mb-5" />
                </Colxx>
                <Colxx xxs="12">

                    <Card className="mb-4">
                        <CardBody>
                            <CardTitle>
                                All Payments
                            </CardTitle>

                            <Table responsive hover >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Email</th>
                                        <th>Amount</th>
                                        <th>Interval</th>
                                        <th>User</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allPayments.length ? currentPayments.map((payment, index) => {
                                            return (
                                                /* eslint no-underscore-dangle: 0 */
                                                <tr key={payment._id} >
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{payment.email}</td>
                                                    <td>{payment.amount}</td>
                                                    <td>{payment.interval}</td>
                                                    <td>{payment.user}</td>
                                                    <td>{payment.status === true ? "Active" : "InActive"}</td>
                                                    <td>
                                                        <div className='column-action d-flex align-items-center'>
                                                            <UncontrolledTooltip placement="top" target="delete">
                                                                Delete
                                                            </UncontrolledTooltip>
                                                            <div className='mx-1 cursor-pointer' id='delete' >
                                                                <RiDeleteBin6Fill size={20} color="#922c88" onClick={() => setModalDelete(payment._id)} />
                                                            </div>
                                                            <UncontrolledTooltip placement="top" target="edit">
                                                                Edit
                                                            </UncontrolledTooltip>
                                                            <div className='mx-1 cursor-pointer' id='edit'>
                                                                <FaEdit size={20} color="#922c88" onClick={() => {
                                                                    setModalEdit(payment._id)
                                                                }} />
                                                            </div>

                                                        </div>
                                                    </td>
                                                    <Modal
                                                        isOpen={modalDelete === payment._id}
                                                        toggle={() => toggleModalDelete(payment._id)}
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
                                                                onClick={() => deletePayment(payment._id)}
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
                                                    <UpdateCategory isOpen={modalEdit === payment._id} toggle={() => toggleModalEdit(payment._id)} data={currData} setLoading={setLoading} loading={loading} allPayments={allPayments} />

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
export default PaymentList;
