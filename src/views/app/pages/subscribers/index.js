// imports 
import React, { useState, useEffect } from 'react';
import { Row, Button, Card, CardBody, CardTitle, Table, UncontrolledTooltip, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import AddCategory from './Addsubsecribers';
import UpdateCategory from './Updatesubsecribers';
import { GetMethods, PostMethods, Function } from '../../../../utils'
import { PaginationSmall } from '../../../reuseable'

const itemName = "Subsecriber"
const Subscribers = ({ match }) => {
    // modal state
    const [modalDelete, setModalDelete] = useState(false);
    const [selectedOptions] = useState([]);
    const [modalPost, setModalPost] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [loading, setLoading] = useState(false)
    const [allsubscribers, setsubscribers] = useState([])
    const [keywordsArray] = useState([])
    const [currData] = useState([])
  console.log(allsubscribers)
    // toggle modal on specific id
    const toggleModalDelete = id => {
        console.log("id",id)
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
        GetMethods.GetAllSubscribers()
            .then((doc) => {
                const res = doc.data
                setsubscribers(res)
            })
            .catch((err) => console.log(err))
    }, [modalDelete, modalEdit, modalPost])

    // pagination algo
    const [currentPage, setCurrentPage] = useState(1)
    const dataPerPage = 6
    // setting pages into the pagination
    const indexOfLastPage = currentPage * dataPerPage// 5
    const indexOfFirstPage = indexOfLastPage - dataPerPage // 0

    const currentSubsecribers = allsubscribers.slice(indexOfFirstPage, indexOfLastPage)
    const totalPages = allsubscribers.length // 15

    // change pages onclick 
    const Paginate = (pageNumber) => { setCurrentPage(pageNumber) }

    // delete api
    const deleteSubsecriber = (subsecriberId) => {
        setLoading(true)
        const obj = { id: subsecriberId }
        PostMethods.DeleteSubscribers(obj)
            .then(() => {
                setLoading(false)
                setModalDelete(null)
                Function.ShowAlert('success', 'Category Deleted Successfly', 'Success')
            })
            .catch((err) => console.log(err))
    }
console.log("allsubscribers",allsubscribers)
    return (
        <>
            <AddCategory isOpen={modalPost} toggle={toggleModalPost} setLoading={setLoading} loading={loading} keywordsArray={keywordsArray} selectedOptions={selectedOptions} allsubscribers={allsubscribers} />
            <Row>
                <Colxx xxs="12">
                    <Breadcrumb heading="Keywords" match={match} />
                    <Separator className="mb-5" />
                </Colxx>
                <Colxx xxs="12">

                    <Card className="mb-4">
                        <CardBody>
                            <CardTitle>
                                All Subscribers
                            </CardTitle>

                            <Table responsive hover >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Email</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allsubscribers.length ? currentSubsecribers.map((subscribers, index) => {
                                            return (
                                                /* eslint no-underscore-dangle: 0 */
                                                <tr key={subscribers._id} >
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{subscribers.email}</td>
                                                    <td>
                                                        <div className='column-action d-flex align-items-center'>
                                                            <UncontrolledTooltip placement="top" target="delete">
                                                                Delete
                                                            </UncontrolledTooltip>
                                                            <div className='mx-1 cursor-pointer' id='delete' >
                                                                <RiDeleteBin6Fill size={20} color="#922c88" onClick={() => setModalDelete(subscribers._id)} />
                                                            </div>
                                                            <UncontrolledTooltip placement="top" target="edit">
                                                                Edit
                                                            </UncontrolledTooltip>
                                                            <div className='mx-1 cursor-pointer' id='edit'>
                                                                <FaEdit size={20} color="#922c88" onClick={() => {
                                                                    setModalEdit(subscribers._id)
                                                                }} />
                                                            </div>

                                                        </div>
                                                    </td>
                                                    <Modal
                                                        isOpen={modalDelete === subscribers._id}
                                                        toggle={() => toggleModalDelete(subscribers._id)}
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
                                                                onClick={() => deleteSubsecriber(subscribers._id)}
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
                                                    <UpdateCategory isOpen={modalEdit === subscribers._id} toggle={() => toggleModalEdit(subscribers._id)} data={currData} setLoading={setLoading} loading={loading} allsubscribers={allsubscribers} />

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
export default Subscribers;
