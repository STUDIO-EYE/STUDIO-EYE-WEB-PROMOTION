import styled from '@emotion/styled';
import Button from './Button';

type FileButtonType = {
  width?: number;
  height?: number;
  fontSize?: number;
  description: string;
  onClick?: () => void;
  svgComponent?: React.ReactNode;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FileButton = (props: FileButtonType) => {
  return (
    <FileButtonStyle>
      <label htmlFor={props.id}>
        <Button
          as='div'
          width={props.width}
          height={props.height}
          fontSize={props.fontSize}
          description={props.description}
          onClick={props.onClick}
          svgComponent={props.svgComponent}
        />
        <input data-cy='file-input' id={props.id} type='file' accept='image/*' onChange={props.onChange} />
      </label>
    </FileButtonStyle>
  );
};

export default FileButton;

const FileButtonStyle = styled.div`
  input {
    display: none;
  }
`;
