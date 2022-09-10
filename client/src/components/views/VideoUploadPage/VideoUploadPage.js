import React, { useState, useEffect} from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useSelector } from 'react-redux';

const { Title } = Typography;
const { TextArea } = Input;

const Private = [
    { value: 0, label:'Private'},
    { value: 1, label:'Public'}
]

const Category = [
    { value: 0, label: "Film & Animation" },
    { value: 0, label: "Autos & Vehicles" },
    { value: 0, label: "Music" },
    { value: 0, label: "Pets & Animals" },
    { value: 0, label: "Sports" },
]

function UploadVideoPage(props) {

    const user = useSelector(state => state.user); //state에서 user의 정보 
    const [VideoTitle, setVideoTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [privacy, setPrivacy] = useState(0)
    const [Category, SetCategory] = useState("Film & Animation")
    const [FilePath, setFilePath] = useState("")
    const [Duration, setDuration] = useState("")
    const [ThumbnailPath, setThumbnail] = useState("")  


    const handleChangeTitle = ( event ) => {
        setVideoTitle(event.currentTarget.value)
    }

    const handleChangeDecsription = (event) => {
        console.log(event.currentTarget.value)

        setDescription(event.currentTarget.value)
    }

    const handleChangeOne = (event) => {
        setPrivacy(event.currentTarget.value)
    }

    const handleChangeTwo = (event) => {
        setCategory(event.currentTarget.value)
    }

    const onDrop = ( files ) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        console.log(files)
        formData.append("file", files[0])

        axios.post('/api/video/uploads', formData, config)
        .then(response=> {
            if(response.data.success){

                let variable = {
                    filePath: response.data.filePath,
                    fileName: response.data.fileName
                }
                setFilePath(response.data.filePath)

                //gerenate thumbnail with this filepath ! 
                 
                axios.post('/api/video/thumbnail', variable)
                .then(response => {
                    if(response.data.success) {
                        setDuration(response.data.fileDuration)
                        setThumbnailPath(response.data.thumbsFilePath)
                    } else {
                        alert('Failed to make the thumbnails');
                    }
                })


            } else {
                alert('failed to save the video in server')
            }
        })

    }

    const onSubmit = (e) => {
        e.preverntDefault();
        
        const variables = {
          writer: user.userData._id,
          title: VideoTitle,
          description: Description,
          privacy: privacy,
          filePath: FilePath ,
          category: Category,
          duration: Duration,
          thumbnail: ThumbnailPath, 
            
        
        }
        axios.post('/api/video/Uploads', variables).then(
          response=> {
            if(response.data.success) {

              message.success('성공적으로 업로드를 했습니다.')
              setTimeout(() => {
                
              }, 3000);
              
              props.history.push('/')
            } else (
              alert('비디오 업로드에 실패했습니다')
            )
          }
        )
      }
  
    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Title level={2} > Upload Video</Title>
        </div>

        <Form onSubmit={onSubmit}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Dropzone 
                    onDrop={onDrop}
                    multiple={false}
                    maxSize={800000000}>
                    {({ getRootProps, getInputProps }) => (
                        <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            <Icon type="plus" style={{ fontSize: '3rem' }} />

                        </div>
                    )}
                </Dropzone>

                {Thumbnail !== "" &&
                    <div>
                        <img src={`http://localhost:5000/${Thumbnail}`} alt="haha" />
                    </div>
                }
            </div>

            <br /><br />
            <label>Title</label>
            <Input
                 onChange={handleChangeTitle}
                 value={VideoTitle}
            />
            <br /><br />
            <label>Description</label>
            <TextArea
                 onChange={handleChangeDecsription}
                 value={Description}
            />
            <br /><br />

            <select onChange={handleChangeOne}>
                {Private.map((item, index) => (
                    <option key={index} value={item.value}>{item.label}</option>
                ))}
            </select>
            <br /><br />

            <select onChange={handleChangeTwo}>
                {Category.map((item, index) => (
                    <option key={index} value={item.label}>{item.label}</option>
                ))}
            </select>
            <br /><br />

            <Button type="primary" size="large" onClick={onSubmit}>
                Submit
            </Button>

        </Form>
    </div>
    )
}

export default UploadVideoPage