import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Tags from '@yaireo/tagify/dist/react.tagify';
import '@yaireo/tagify/dist/tagify.css';
import styled from 'styled-components';
import { uploadSnacks } from '../../features/snacks/snacksActions';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
// import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .upload-icon {  
    width: 15rem;
    height: 15rem;
    margin: 3rem auto 0;
    cursor: pointer;
    opacity: 0.7;
    transition: 300ms;
    :hover {
      opacity: 1;
    }
  }
  .upload-msg {
    position: relative;
    top: -2rem;
    text-align: center;
    font-size: 2rem;
    font-weight: bold
    margin: 1rem 0;
  }
  .upload-input {
    display: none;
  }
`

const SnacksUploadForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 30%;
  margin: 0 auto;
  .upload-ttl {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 3rem;
    width: 100%;
    margin-bottom: 2rem;
  }
  .upload-tag {
    border: none;
    width: 100%;
    :hover {
      border-bottom: #ff2c55 0.08rem solid;
    }
  }
  .upload-tag > tag > div > span {
    color: black;
  }
  .tag-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 3rem;
    width: 100%;
  }
  .tags {
    height: 3rem;
  }
  .tags-input {
    width: 83%;
  }
`;

const StyledInput = styled.input`
  font-size: 1.5rem;
  color: #ffffff;
  border: none;
  padding: 0.5rem 0.5rem;
  outline-color: #ffffff;
  display: inline;
  background-color: #0b0b0b;
  :hover {
    border-bottom: #ff2c55 0.08rem solid;
  }
`;

const StyledLabel = styled.label`
  font-size: 1.5rem;
  display: inline;
  line-height: 3rem;
  min-width: 3rem;
`;

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  margin-top: 2.5rem;
  background-color: #ff2c55;
  color: #ffffff;
  outline: none;
  cursor: pointer;
  opacity: 0.5;
  transition: 500ms;
  :hover {
    opacity: 1;
    font-weight: bold;
  }
`;

const UploadPage = () => {
  const [uploadInputs, setuploadInputs] = useState({
    snacksTitle: '',
    snacksTag: null,
  });

  const [video, setVideo] = useState(null);

  const dispatch = useDispatch();

  const onClickUpload = () => {
    document.getElementById('file').click();
  }

  const onChangeTitle = (e) => {
    const { value } = e.target;
    const nextInputs = {
      ...uploadInputs,
      ['snacksTitle']: value,
    };
    setuploadInputs(nextInputs);
  };

  const onChangeTag = (e) => {
    const tags = e.detail.tagify.getCleanValue();
    const nextInputs = {
      ...uploadInputs,
      ['snacksTag']: tags,
    };
    setuploadInputs(nextInputs);
  };

  const onChangeVideo = (e) => {
    setVideo(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(uploadSnacks({ uploadInputs, video }));
  };

  return (
    <Wrapper>
      <VideoCallOutlinedIcon className="upload-icon" onClick={onClickUpload}/>
      <p className='upload-msg'>SELECT YOUR SNACKS</p>
      <SnacksUploadForm onSubmit={onSubmit}>
        <input type="file" onChange={onChangeVideo} accept="video/*" className='upload-input' id="file" />
        <div className="upload-ttl">
          <StyledLabel for="title">제목</StyledLabel>
          <StyledInput id="title" value={uploadInputs.title} onChange={onChangeTitle} placeholder="제목을 입력하세요"/>
        </div>
        <div class="tag-container">
          <StyledLabel for="tag">태그</StyledLabel>
          <Tags value={uploadInputs.hashTag} onChange={onChangeTag} className="upload-tag"/>
        </div>
        <StyledButton>UPLOAD</StyledButton>
      </SnacksUploadForm>
    </Wrapper>
  );
};

export default UploadPage;
