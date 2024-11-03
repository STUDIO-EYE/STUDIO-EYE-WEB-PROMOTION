import styled from 'styled-components';

type ButtonType = {
  width?: number;
  height?: number;
  fontSize?: number;
  description: string;
  onClick?: () => void;
  svgComponent?: React.ReactNode;
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  id?: string;
  dataCy?: string;
};

const Button = (props: ButtonType) => {
  return (
    <ButtonStyle
      data-cy='dataEdit-Button'
      width={props.width}
      height={props.height}
      description={props.description}
      onClick={props.onClick}
      as={props.as}
      id={props.id}
    >
      {props.svgComponent}
      {props.description}
    </ButtonStyle>
  );
};

export default Button;

const ButtonStyle = styled.button<ButtonType>`
  width: ${(props) => (props.width ? props.width + 'px;' : '180px;')};
  height: ${(props) => (props.height ? props.height + 'px;' : '40px;')};
  font-size: ${(props) => (props.fontSize ? props.fontSize + 'px;' : '14px;')};

  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.color.white.bold};
  font-family: ${(props) => props.theme.font.medium};
  color: #494845;
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;

  &:hover {
    background-color: ${(props) => props.theme.color.yellow.light};
    transition: 0.2s;
  }

  svg {
    padding-right: 10px;
  }
`;
