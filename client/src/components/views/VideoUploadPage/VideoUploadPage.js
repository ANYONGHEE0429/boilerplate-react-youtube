import React from 'react'
import  {Typogrphy, Button, Form, message, Input, Icon } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

const { TextArea } = Input;
const { Title } = Typogrphy;

function ViedoUploadPage() {
  return (
    <div style={{ maxwidth: '700px', margin: '2rem auto'}}>
      <div style={{ textAlign: 'center', marginBottom: '2rem'}}>
        <Title level={2}>Upload Video</Title>
      </div>
      <Form onSubmit>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          
          <div>
            <img src alt />
          </div>
        </div>
        <br />
        <br />
        <label>Title</label>
      <input
        onChange
        value
      /> 
      <br />
      <br />
      <label>Description</label> 
      <TextArea
        onChange
        value
      />
      </Form>
      <br />
      <br />

      <select onChange>
        <option key value></option>
      </select>

      <Button type='primary' size='large' onClick >

      </Button>
    </div>
  )
}

export default ViedoUploadPageP