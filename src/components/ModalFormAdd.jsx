import { DatePicker, Form, Input, Modal, Radio, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import axios from 'axios'
import { job } from '../utils'

const ModalFormAdd = ({
  open,
  onCancel,
  handleOk,
  title,
  okText,
  messageApi,
  confirmLoading,
}) => {
  const [form] = Form.useForm()

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Success Add Data',
    })
  }

  const onFinish = (values) => {
    handleOk()
    axios
      .post('https://655c1670ab37729791a9cf33.mockapi.io/users', values)
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
            form.resetFields()
            onFinish(values)
          })
          .catch((info) => {
            console.log('Validate Failed:', info)
          })
      }}
    >
      <div className="py-10">
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
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
            <DatePicker />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}

export default ModalFormAdd
