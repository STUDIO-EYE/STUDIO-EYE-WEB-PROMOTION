import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

interface ITextEditorProps {
  editorState: string;
  onEditorStateChange: (state: string) => void;
  attribute: string;
  charLimit: number;
}

function TextColorEditor({ editorState, onEditorStateChange, attribute, charLimit }: ITextEditorProps) {
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const plainText = editorState.replace(/<[^>]+>/g, '');
    setCharCount(plainText.length);
  }, [editorState]);

  const handleEditorStateChange = (value: string) => {
    const plainText = value.replace(/<[^>]+>/g, '');
    // 글자수 제한을 초과하지 않을 경우에만 상태 업데이트
    if (plainText.length <= charLimit) {
      onEditorStateChange(value);
      setCharCount(plainText.length);
    } else {
      alert(`${attribute}의 글자수 제한을 초과하였습니다. \n최대 ${charLimit}자까지 입력 가능합니다.`);
    }
  };

  return (
    <EditorWrapper attribute={attribute}>
      <ReactQuill
        data-cy={`editor-${attribute.toLowerCase().replace(/\s+/g, '')}`}
        value={editorState}
        onChange={handleEditorStateChange}
        placeholder={`${attribute}을(를) 작성해주세요`}
        modules={quillModules}
      />
      <CharCountWrapper>
        {charCount}/{charLimit}자
      </CharCountWrapper>
    </EditorWrapper>
  );
}

export default TextColorEditor;

const textEditorColorPalette = [
  '#141414',
  '#8A8A8A',
  '#C4C4C4',
  '#FBFBFB',
  '#ffffff',
  '#FF0000',
  '#C40C0C',
  '#FF6500',
  '#FF8A08',
  '#FFA900',
  '#FFF0D1',
  '#800080',
  '#9932CC',
  '#DDA0DD',
  '#850F8D',
  '#C738BD',
  '#E49BFF',
  '#006769',
  '#40A578',
  '#9DDE8B',
  '#E6FF94',
  '#228B22',
  '#32CD32',
  '#ADFF2F',
  '#007BFF',
  '#0056B3',
  '#003366',
  '#FF69B4',
  '#FFB6C1',
  '#FFC0CB',
  '#A52A2A',
  '#D2691E',
  '#8B4513',
  '#FFD700',
  '#FFFF00',
  '#FFFACD',
];

export const quillModules = {
  toolbar: {
    container: [[{ color: textEditorColorPalette }, { background: textEditorColorPalette }]],
  },
};

const CharCountWrapper = styled.div`
  text-align: right;
  font-size: 12px;
  color: gray;
  margin-top: 5px;
`;

const EditorWrapper = styled.div<{ attribute: string }>`
  width: ${(props) => (props.attribute === 'CEO Introduction' ? '80%' : '100%')};
  .ql-toolbar {
    background-color: ${(props) => props.theme.color.white.bold};
  }
  .ql-editor {
    min-height: ${(props) => (props.attribute === 'CEO Introduction' ? '150px' : '100px')};
    max-height: 350px;
    font-family: ${(props) => props.theme.font.light};
    font-size: 13px;
    background-color: ${(props) => props.theme.color.background};
    overflow: auto;
    color: white;

    &::before {
      color: #999; /* Placeholder 색상 지정 */
      font-family: ${(props) => props.theme.font.light};
      font-size: 15px;
    }
  }
`;
