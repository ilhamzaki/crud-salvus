import { Button, message, Modal, Table } from 'antd'
import axios from 'axios'
import { CloseCircleTwoTone, PlusOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import ModalFormAdd from './components/ModalFormAdd'
import ModalFormEdit from './components/ModalFormEdit'
import { columnsTableEmployee } from './utils'

function App() {
  const [usersData, setUsersData] = useState([])
  const [messageApi, contextHolder] = message.useMessage()

  const getUsersData = () => {
    axios
      .get('https://655c1670ab37729791a9cf33.mockapi.io/users')
      .then((res) => setUsersData(res.data))
  }

  useEffect(() => {
    getUsersData()
  }, [])

  // START handle modal add
  const [openFormAdd, setOpenFormAdd] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const showModal = () => {
    setOpenFormAdd(true)
  }
  // END handle modal add

  // START handle modal edit
  const [openFormEdit, setOpenFormEdit] = useState(false)
  const [id, setId] = useState('')

  const showModalEdit = (id) => {
    setOpenFormEdit(true)
    setId(id)
  }
  // END handle modal edit

  // START handle delete
  const { confirm } = Modal
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Success Delete Data',
    })
  }
  const showPropsConfirm = (id) => {
    confirm({
      title: 'Are you sure delete this employee?',
      icon: <CloseCircleTwoTone twoToneColor="#f5222d" />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        axios
          .delete(`https://655c1670ab37729791a9cf33.mockapi.io/users/${id}`)
          .then(() => getUsersData())
        success()
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }
  // END handle delete

  // START handle ok & close form
  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setConfirmLoading(false)
      handleClose()
      getUsersData()
    }, 1000)
  }

  const handleClose = () => {
    setOpenFormAdd(false)
    setOpenFormEdit(false)
  }
  // END handle ok & close form

  return (
    <>
      {contextHolder} {/* Message Container */}
      <div className="container max-h-[100vh] px-0 lg:px-[15rem]">
        <div className="py-[3rem] flex justify-between ">
          <h1 className="text-2xl sm:text-4xl">👨🏻‍💼 Employee 👩🏻‍💼</h1>
        </div>
        <div className="flex justify-end mb-5">
          <Button onClick={showModal} type="primary">
            <PlusOutlined /> Add Employee
          </Button>
        </div>
        <div>
          <Table
            columns={columnsTableEmployee(showModalEdit, showPropsConfirm)}
            dataSource={usersData}
          />
        </div>
        {openFormAdd && (
          <ModalFormAdd
            title="Add Employee"
            open={openFormAdd}
            confirmLoading={confirmLoading}
            handleOk={handleOk}
            onCancel={handleClose}
            messageApi={messageApi}
            okText="Add"
          />
        )}
        {openFormEdit && (
          <ModalFormEdit
            title="Edit Employee"
            open={openFormEdit}
            confirmLoading={confirmLoading}
            handleOk={handleOk}
            onCancel={handleClose}
            messageApi={messageApi}
            id={id}
            okText="Update"
          />
        )}
      </div>
    </>
  )
}

export default App
