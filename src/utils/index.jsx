import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Space, Tag } from 'antd'

export const columnsTableEmployee = (showModalEdit, showPropsConfirm) => {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Job',
      dataIndex: 'job',
      key: 'job',
      render: (text) => <Tag color={'blue'}>{text}</Tag>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <Button onClick={() => showModalEdit(record.id)}>
            <EditOutlined /> Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => showPropsConfirm(record.id)}
          >
            <DeleteOutlined /> Delete
          </Button>
        </Space>
      ),
    },
  ]

  return columns
}

export const job = [
  'Finance',
  'IT Developer',
  'Project Management',
  'Human Resource',
  'Administrative',
  'Business Operation',
  'Consultant',
]
