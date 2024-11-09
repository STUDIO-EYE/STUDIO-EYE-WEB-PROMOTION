import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface ImageUploadProps {
  type: 'main' | 'responsiveMain' | 'detail';
  value?: null | File | File[];
  isGetMode: boolean|undefined;
  onChange: (newImage: File | File[]) => void;
}

const ImageUpload = ({ type, value, isGetMode, onChange }: ImageUploadProps) => {
  const [images, setImages] = useState<File[]>([]);
  const [previewURLs, setPreviewURLs] = useState<string[]>([]);

  useEffect(() => {
    if (value) {
      const files = Array.isArray(value) ? value : [value];
      if (files.every((file) => file instanceof File)) {
        setImages(files);
        setPreviewURLs(files.map((file) => URL.createObjectURL(file)));
      }
    }
    console.log(previewURLs);
  }, [value]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      const maxFiles = type === 'main'||'responsiveMain' ? 1 : 3;
      const newFiles = selectedFiles.slice(0, maxFiles);

      const newPreviewURLs = newFiles.map((file) => URL.createObjectURL(file));

      if (type === 'main'||'responsiveMain') {
        setImages(newFiles);
        setPreviewURLs(newPreviewURLs);
        onChange(newFiles[0]);
      } else {
        const updatedFiles = [...images, ...newFiles];
        const updatedPreviewURLs = [...previewURLs, ...newPreviewURLs];

        while (updatedFiles.length > maxFiles) {
          updatedFiles.shift();
          updatedPreviewURLs.shift();
        }

        setImages(updatedFiles);
        setPreviewURLs(updatedPreviewURLs);
        onChange(updatedFiles);
      }
    }
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreviewURLs = previewURLs.filter((_, i) => i !== index);
    setImages(updatedImages);
    setPreviewURLs(updatedPreviewURLs);
    onChange(updatedImages);
  };

  return (
    <>
      <ImageUploadContainer>
        <UploadLabel aria-disabled={isGetMode} htmlFor={`${type}-image-upload`}>이미지 업로드</UploadLabel>
        <input
          id={`${type}-image-upload`}
          data-cy={`create_${type}_image`}
          type='file'
          accept='image/*'
          multiple={type === 'detail'}
          onChange={handleImageChange}
          style={{ display: 'none' }}
          disabled={isGetMode}
        />
      </ImageUploadContainer>
      <ImagesPreviewContainer>
        {previewURLs.map((url, index) => (
          <ImagePreviewWrapper key={index}>
            <ImagePreview src={url} alt={`${type === 'main' ? 'Main' : 'Detail'} Image ${index + 1}`} />
            <DeleteButton onClick={() => handleDeleteImage(index)}>삭제하기</DeleteButton>
          </ImagePreviewWrapper>
        ))}
      </ImagesPreviewContainer>
    </>
  );
};

export default ImageUpload;

const ImageUploadContainer = styled.div`
  display: flex;
  font-family: 'pretendard-regular';
`;

const UploadLabel = styled.label`
  cursor: pointer;
  padding: 10px 20px;
  background-color: #6c757d;
  color: white;
  border-radius: 5px;
  margin-bottom: 10px;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #5a6268;
  }

  &[aria-disabled="true"] {
    opacity: 0.5;
    cursor: default;
    &:hover {
      background-color: #6c757d;
    }
  }
`;

const ImagesPreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

const ImagePreviewWrapper = styled.div`
  position: relative;
  display: inline-block;
  max-width: 100%;
  max-height: 200px;

  &:hover button {
    display: block;
  }
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 200px;
  border-radius: 5px;
  margin-top: 5px;
`;

const DeleteButton = styled.button`
  display: none;
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'pretendard-regular';

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;
