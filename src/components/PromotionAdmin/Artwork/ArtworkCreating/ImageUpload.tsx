import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface ImageUploadProps {
  type: 'main' | 'responsiveMain' | 'detail';
  value?: null | File | File[];
  onChange: (newImage: File | File[]) => void;
}

const ImageUpload = ({ type, value, onChange }: ImageUploadProps) => {
  const [images, setImages] = useState<File[]>([]); // 현재 이미지 파일 상태
  const [previewURLs, setPreviewURLs] = useState<string[]>([]); // 프리뷰 URL 상태

  // value prop 변화에 따라 상태 업데이트
  useEffect(() => {
    if (value) {
      const files = Array.isArray(value) ? value : [value];
      if (files.every((file) => file instanceof File)) {
        setImages(files);
        setPreviewURLs(files.map((file) => URL.createObjectURL(file)));
      }
    } else {
      setImages([]);
      setPreviewURLs([]);
    }
  }, [value]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);

      // 각 타입에 따라 최대 파일 개수 설정
      const maxFiles = type === 'main' || type === 'responsiveMain' ? 1 : 3;
      const newFiles = selectedFiles.slice(0, maxFiles);

      // 기존 URL 객체 해제
      previewURLs.forEach((url) => URL.revokeObjectURL(url));

      const uniqueFiles = newFiles; // 새 이미지로만 상태 교체
      const newPreviewURLs = uniqueFiles.map((file) => URL.createObjectURL(file));

      setImages(uniqueFiles);
      setPreviewURLs(newPreviewURLs);

      // 부모 컴포넌트로 변경된 상태 전달
      onChange(uniqueFiles.length > 1 ? uniqueFiles : uniqueFiles[0]);
    }
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreviewURLs = previewURLs.filter((_, i) => i !== index);

    // URL 객체 해제
    URL.revokeObjectURL(previewURLs[index]);

    setImages(updatedImages);
    setPreviewURLs(updatedPreviewURLs);

    // 부모 컴포넌트로 상태 전달
    onChange(updatedImages.length > 1 ? updatedImages : updatedImages[0] || null);
  };

  return (
    <>
      <ImageUploadContainer>
        <UploadLabel htmlFor={`${type}-image-upload`}>이미지 업로드</UploadLabel>
        <input
          id={`${type}-image-upload`}
          data-cy={`create_${type}_image`}
          type='file'
          accept='image/*'
          multiple={type === 'detail'}
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </ImageUploadContainer>
      <ImagesPreviewContainer>
        {previewURLs.map((url, index) => (
          <ImagePreviewWrapper key={index}>
            <ImagePreview
              src={url}
              alt={`${type === 'main' ? 'Main' : type === 'responsiveMain' ? 'ResponsiveMain' : 'Detail'} Image ${index + 1}`}
            />
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
  padding: 0.5rem;
  margin-left: auto;
  background-color: #6c757d;
  color: white;
  border-radius: 5px;
  margin-bottom: 10px;
  transition: all 0.3s ease-in-out;
  font-size: 0.7rem;
  &:hover {
    background-color: #5a6268;
  }

  &[aria-disabled='true'] {
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
  width: 100%;
  min-height: 9rem;
  height: 100%;
  box-sizing: border-box;

  background-color: #0000000f;
  padding: 0.8rem;
  border-radius: 5px;
`;

const ImagePreviewWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;

  &:hover button {
    display: block;
  }
`;

const ImagePreview = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;

  border-radius: 5px;
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
