import React, { useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import * as Icon from 'react-feather';
import { useNavigate, useParams } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import ComponentCardV2 from '../../components/ComponentCardV2';
import message from '../../components/Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import DeleteButton from '../../components/DeleteButton';
import AttachmentModalV2 from '../../components/tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';


const BlogEdit = () => {
  //All state variable
  const [blog, setblog] = useState();
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const[roomName,setRoomName]=useState('')
  const[fileTypes,setFileTypes]=useState();




  //navigation and parameters
  const { id } = useParams();
  const navigate = useNavigate();

  const applyChanges = () => {};
  const backToList = () => {
    navigate('/Blog');
  };
  //blog data in blog
  const handleInputs = (e) => {
    setblog({ ...blog, [e.target.name]: e.target.value });
  };
  //  blog data in Description Modal contentDetails
   const handleDataEditor = (e, type) => {
    setblog({
      ...blog,
      [type]: draftToHtml(convertToRaw(e.getCurrentContent())),
    });
  };
  //Description Modal
  const convertHtmlToDraft = (existingQuoteformal) => {
    const contentBlock = htmlToDraft(existingQuoteformal && existingQuoteformal);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      setDescription(editorState);
    }
  };
  //getting data from blog by Id
  const getBlogById = () => {
    api
      .post('/blog/getBlogById', { blog_id: id })
      .then((res) => {
        setblog(res.data.data[0]);
        convertHtmlToDraft(res.data.data[0].description);
      
      })
      .catch(() => {
        message('blog Data Not Found', 'info');
      });
  };
   // Gettind data from category 
   const editCategory = () => {
    api
      .get('/category/getCategory')
      .then((res) => {
        console.log(res.data.data);
        setCategory(res.data.data);
      })
      .catch(() => {});
  };
  //Update blog
  const editBlogs = () => {
    blog.modification_date = creationdatetime;
      api
        .post('/blog/editBlog', blog)
        .then(() => {
          message('Record editted successfully', 'success');
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    
  };
  //attachments
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
    console.log('inside DataForAttachment');
  };
  //delete blog
  // const deleteblogData = () => {
  //   api.post('/blog/deleteblog', { blog_id: id })
  //     .then(() => {
  //       message('Record delete successfully', 'success');
  //       navigate('/blog');
  //     })
  //     .catch(() => {
  //       message('Unable to delete record.', 'error');
  //     });
  // };
  useEffect(() => {
    getBlogById();
    editCategory();
  }, [id]);

  return (
    <>
      <BreadCrumbs />
      <Form>
        <FormGroup>
          <ToastContainer></ToastContainer>
          <ComponentCardV2>
            <Row>
              <Col>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    editBlogs();
                    navigate('/blog');
                    
                  }}
                >
                  Save
                </Button>
              </Col>
              <Col>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    editBlogs();
                    applyChanges();
                  }}
                >
                  Apply
                </Button>
              </Col>
              <Col>
                <Button
                  type="submit"
                  className="btn btn-dark shadow-none"
                  onClick={(e) => {
                    if (window.confirm('Are you sure you want to cancel? ')) {
                      navigate('/blog');
                    } else {
                      e.preventDefault();
                    }
                  }}
                >
                  Cancel
                </Button>
              </Col>
              <Col>
                <DeleteButton id={id} columnname="blog_id" tablename="blog"></DeleteButton>
              </Col>
              <Col>
                <Button
                  className="shadow-none"
                  color="dark"
                  onClick={() => {
                    backToList();
                  }}
                >
                  Back to List
                </Button>
              </Col>
            </Row>
          </ComponentCardV2>
        </FormGroup>
      </Form>
      {/* blog Details */}
      <Form>
        <FormGroup>
          <ComponentCard title="Blog Details" creationModificationDate={blog}>
            {' '}
            <ToastContainer></ToastContainer>
           
            <div>
    <BreadCrumbs />

<ComponentCard title="blog">
<Form>
  <Row>
  <Col md="3">
  <FormGroup>
 
    <Label>Title</Label>
    <Input
                    type="text"
                    onChange={handleInputs}
                    value={blog && blog.title}
                    name="title"/>
  </FormGroup>
  </Col>
  <Col md="3">
  <FormGroup>
                  <Label>Category </Label>
                  <Input
                    type="select"
                    name="category_id"
                    onChange={handleInputs}
                    value={blog && blog.category_id}
                    >
                     <option defaultValue="selected">
            Please Select
          </option>
          {category &&
                      category.map((e) => {
                        return <option key={e.category_id} value={e.category_id}>{e.category_title}</option>;
                      })}
                  </Input>
                  </FormGroup>
                 </Col>
                 <Col md="3">
                  <FormGroup>
    <Label>author</Label>
    <Input
                    type="text"
                    onChange={handleInputs}
                    value={blog && blog.author}
                    name="author"/>
  </FormGroup>
</Col>
                  </Row>
                  </Form>
                  </ComponentCard>
 
  {/* <FormGroup> */}
    {/* <Label>description</Label>
    <Input
                    type="textarea"
                    onChange={handleInputs}
                    value={blog && blog.description}
                    name="description"/> */}
  {/* </FormGroup> */}
 {/* Description form */}
 <ComponentCard title="Description">
                <Editor
                  editorState={description}
                  wrapperClassName="demo-wrapper mb-0"
                  editorClassName="demo-editor border mb-4 edi-height"
                  onEditorStateChange={(e) => {
                    handleDataEditor(e, 'description');
                    setDescription(e);
                  }}
                /> 
              </ComponentCard>
  <Form>
        <FormGroup>
        <ComponentCard title="Attachments">
            <Row>
              <Col xs="12" md="3" className="mb-3">
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    setRoomName('Blog')
                    setFileTypes(["JPG", "PNG", "GIF","PDF"]);
                    dataForAttachment();
                    setAttachmentModal(true);
                  }}><Icon.File className="rounded-circle" width="20" /></Button>
              </Col>
            </Row>
            <AttachmentModalV2
            moduleId={id}
            roomName={roomName}
            fileTypes={fileTypes}
            altTagData="BlogRelated Data"
            recordType="RelatedPicture"
            desc="BlogRelated Data"
            modelType={attachmentData.modelType}
            attachmentModal={attachmentModal}
            setAttachmentModal={setAttachmentModal}
          />
          <ViewFileComponentV2
            moduleId={id}
            roomName="Blog"
            recordType="RelatedPicture"
          />
        
          </ComponentCard>
        </FormGroup>
      </Form>
  </div>  
          </ComponentCard>
        </FormGroup>
      </Form>

      {/* <blogCreationModification blog={blog}></blogCreationModification> */}
    </>
  );
};

export default BlogEdit;
