export interface IFAQData {
  errors: {
    question: {
      message: string;
    };
    answer: {
      message: string;
    };
  };
  question: string;
  answer: string;
}

export interface IEditorData {
  key: string;
  text: string;
  type: string;
  depth: number;
}
