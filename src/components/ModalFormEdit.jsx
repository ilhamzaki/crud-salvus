import { DatePicker, Form, Input, Modal, Radio, Select, Spin } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import axios from 'axios'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { job } from '../utils'

const ModalFormEdit = ({
  open,
  onCancel,
  handleOk,
  id,
  title,
  okText,
  confirmLoading,
  messageApi,
}) => {
  const [form] = Form.useForm()
  const dateFormat = 'YYYY/MM/DD'
  const [initValue, setInitValue] = useState(null)

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Success Update Data',
    })
  }

  useEffect(() => {
    axios
      .get(`https://655c1670ab37729791a9cf33.mockapi.io/users/${id}`)
      .then((res) => setInitValue(res.data))
  }, [id])

  const onFinish = (values) => {
    handleOk()
    axios
      .put(`https://655c1670ab37729791a9cf33.mockapi.io/users/${id}`, values)
      .then(function () {
        success()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <Modal
      open={open}
      title={title}
      okText={okText}
      cancelText="Cancel"
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onFinish(values, id)
          })
          .catch((info) => {
            console.log('Validate Failed:', info)
          })
      }}
    >
      <div className="py-10">
        {initValue === null ? (
          <div className="flex justify-center">
            <Spin />
          </div>
        ) : (
          <Form
            form={form}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            initialValues={{
              name: initValue?.name,
              gender: initValue?.gender?.toLowerCase(),
              email: initValue?.email,
              phone: initValue?.phone,
              address: initValue?.address,
              job: initValue?.job,
              joinDate: dayjs(
                initValue?.joinDate?.replaceAll('-', '/').slice(0, 10),
                dateFormat
              ),
            }}
            style={{ maxWidth: 600 }}
          >
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="gender" label="Gender">
              <Radio.Group>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Phone">
              <Input />
            </Form.Item>
            <Form.Item name="address" label="Address">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item name="job" label="Job">
              <Select>
                {job.map((item, idx) => (
                  <Select.Option key={idx} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="joinDate" label="Join Date">
              <DatePicker dateFormat={dateFormat} />
            </Form.Item>
          </Form>
        )}
      </div>
    </Modal>
  )
}

export default ModalFormEdit
