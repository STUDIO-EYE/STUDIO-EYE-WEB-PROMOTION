// import React, { useEffect, useRef, useState } from "react";
// import styled from "styled-components";
// import Body from "../../components/Common/Body";
// import { motion } from "framer-motion";
// import axios from "axios";
// import LetterAnimation from "../../components/Common/LetterAnimation";
// import Modal from "./Components/Modal";

// // 이메일이랑 번호

// const FormBlock = styled.form`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
// `;
// const FormBlockLeft = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   margin-right: 50px;
// `;

// const FormBlockRight = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   margin-left: 50px;
// `;
// const InputBlock = styled.div`
//   position: relative;
//   margin: 14px;
// `;

// const InputFileContainer = styled.div`
//   display: inline-block;
//   margin-top: 10px;
//   margin-bottom: 10px;
// `;

// const FileLabel = styled.label`
//   display: inline-block;
//   min-width: 53px;
//   height: 32px;
//   line-height: 30px;
//   padding: 0 10px;
//   border-radius: 20px;
//   font-size: 16px;
//   background-color: #333;
//   color: #fff;
//   text-align: center;
//   margin-left: 8px;
//   cursor: pointer;
// `;

// const FileText = styled.input`
//   width: 306px;
//   background: white;
//   height: 30px;
//   line-height: 26px;
//   text-indent: 5px;
//   border: 2px solid #d9d9d9;
//   border-radius: 10px;
// `;

// const FileUploadInput = styled.input.attrs({ type: "file" })`
//   position: absolute;
//   width: 1px;
//   height: 1px;
//   padding: 0;
//   margin: -1px;
//   overflow: hidden;
//   clip: rect(0, 0, 0, 0);
//   border: 0 none;
// `;
// const RadioBlock = styled.div`
//   display: flex;
//   flex-direction: row;
//   margin-bottom: 20px;
// `;
// const RadioTitle = styled.div`
//   color: rgb(0, 0, 0, 0.6);
//   /* color: #495055; */
//   font-size: 23px;
//   margin-right: auto;
//   margin-left: 15px;
//   margin-bottom: 10px;
// `;
// const RadioBlockLeft = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-right: 10px;
// `;
// const RadioBlockRight = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-left: 20px;
// `;

// const SharedInputStyles = `
//     font-weight: 500;
//     font-size: 1.4rem;
//     color: #495055;
//     width: 350px;
//     padding: 18px 18px;
//     border-radius: 1rem;
//     border: 2px solid #D9D9D9;
//     outline: none;

//     &:valid + span,
//     &:focus + span {
//         transform: scale(0.8) translateY(-30px);
//         background: #fff;
//     }

//     &:focus {
//         color: #284B63;
//         border-color: #284B63;
//     }
// `;

// const InputField = styled.input`
//   ${SharedInputStyles}
// `;

// const TextAreaField = styled.textarea`
//   ${SharedInputStyles}
//   height: 140px;
// `;
// const CLabel = styled.label`
//   display: flex;
//   cursor: pointer;
//   font-weight: 400;
//   position: relative;
//   overflow: hidden;
//   margin-bottom: 0.375em;
// `;
// const Category = styled.input`
//   margin-bottom: 10px;
//   position: absolute;
//   left: -9999px;
//   &:checked + span {
//     background-color: rgb(219, 41, 23, 0.3);
//     &:before {
//       box-shadow: inset 0 0 0 0.4375em #000;
//     }
//   }
// `;
// const CName = styled.span`
//   display: flex;
//   align-items: center;
//   padding: 0.375em 0.75em 0.375em 0.375em;
//   border-radius: 99em;
//   transition: 0.25s ease;
//   font-size: 18px;

//   &:hover {
//     background-color: rgb(219, 41, 23, 0.2);
//   }

//   &:before {
//     display: flex;
//     flex-shrink: 0;
//     content: "";
//     background-color: #fff;
//     width: 1.5em;
//     height: 1.5em;
//     border-radius: 50%;
//     margin-right: 0.375em;
//     transition: 0.25s ease;
//     /* box-shadow: inset 0 0 0 0.125em rgb(219, 41, 23); */
//     box-shadow: inset 0 0 0 0.125em #000;
//   }
// `;

// const Placeholder = styled.span`
//   position: absolute;
//   margin-top: 17px;
//   padding: 0 4px;
//   font-family: Roboto, sans-serif;
//   color: #6c757d;
//   display: flex;
//   align-items: center;
//   font-size: 1.6rem;
//   top: 0;
//   left: 17px;
//   transition: all 0.2s;
//   transform-origin: 0% 0%;
//   background: none;
//   pointer-events: none;
// `;

// const CButton = styled(motion.button)`
//   width: 130px;
//   height: 70px;
//   border-radius: 50px;
//   background-color: white;
//   border-color: black;
//   border: 3px solid black;
//   font-size: 20px;
//   font-weight: bold;
//   text-align: center;
//   margin: 0 auto;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: black;
//   margin-bottom: 10px;
//   margin-top: 30px;
//   cursor: pointer;
// `;
// const categories_1 = [
//   "Entertainment",
//   "Drama",
//   "Documentary",
//   "Channel Operating",
// ];
// const categories_2 = [
//   "Branded",
//   "Motion Graphic",
//   "Animation",
//   "Live Commerce",
// ];

// const preContactPage = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const closeModal = () => setIsModalOpen(false);
//   const [fileList, setFileList] = useState([]);
//   const FileTextRef = useRef(null);
//   const [formData, setFormData] = useState({
//     category: "Entertainment",
//     description: "",
//     clientName: "",
//     organization: "",
//     contact: "",
//     email: "",
//     position: "",
//   });

//   const handleDataChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (e) => {
//     const selectedFiles = e.target.files;
//     if (selectedFiles.length > 0) {
//       // 선택된 파일 multiple 일 경우
//       const fileNames = Array.from(selectedFiles)
//         .map((file) => file.name)
//         .join(", ");
//       FileTextRef.current.value = fileNames;
//     } else {
//       FileTextRef.current.value = ""; //파일 선택되지 않았을 경우 입력 내용 지우기
//     }
//     setFileList([...fileList, ...selectedFiles]);
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     //빈값 제출 시 alert
//     for (const key in formData) {
//       if (formData[key] === "") {
//         alert(`${key}을(를) 작성해주세요!`);
//         return;
//       }
//     }

//     //5초 후 홈으로 이동 setTimeout

//     const requestData = new FormData();
//     requestData.append(
//       "request",
//       new Blob([JSON.stringify(formData)], { type: "application/json" })
//     );
//     fileList.forEach((file) => {
//       requestData.append("files", file);
//     });
//     axios
//       .post(`/api/requests`, requestData)
//       .then((response) => {
//         console.log(response.data, "임다. ");
//         setIsModalOpen(true);
//         setFormData({
//           // 폼 데이터 초기화
//           category: "Entertainment",
//           //초기화 설정..
//           description: "",
//           clientName: "",
//           organization: "",
//           contact: "",
//           email: "",
//           position: "",
//         });
//         setFileList([]);
//         FileTextRef.current.value = ""; // 파일 입력
//       })
//       .catch((error) => {
//         console.error("에러 발생", error);
//         // setIsOpen(true);
//         // setSuccess(false);
//       });
//   };
//   return (
//     <Body>
//       <LetterAnimation contact text="CONTACT US!"></LetterAnimation>
//       <FormBlock onSubmit={handleSubmit}>
//         <FormBlockLeft>
//           <RadioTitle>프로젝트 카테고리</RadioTitle>
//           <RadioBlock>
//             <RadioBlockLeft>
//               {categories_1.map((category, index) => (
//                 <CLabel key={index}>
//                   <Category
//                     type="radio"
//                     name="category"
//                     id={category}
//                     value={category}
//                     onChange={handleDataChange}
//                     checked={formData.category === category}
//                   />
//                   <CName>{category}</CName>
//                 </CLabel>
//               ))}
//             </RadioBlockLeft>
//             <RadioBlockRight>
//               {categories_2.map((category, index) => (
//                 <CLabel key={index}>
//                   <Category
//                     type="radio"
//                     name="category"
//                     id={category}
//                     value={category}
//                     onChange={handleDataChange}
//                   />
//                   <CName>{category}</CName>
//                 </CLabel>
//               ))}
//             </RadioBlockRight>
//           </RadioBlock>
//           <InputFileContainer>
//             <FileText
//               ref={FileTextRef}
//               type="text"
//               readOnly="readonly"
//             ></FileText>
//             <FileUploadInput
//               id="uploadfile"
//               type="file"
//               accept="*/*"
//               multiple
//               onChange={handleFileChange}
//             />
//             <FileLabel htmlFor="uploadfile" className="file-label">
//               upload
//             </FileLabel>
//           </InputFileContainer>
//           <InputBlock>
//             <TextAreaField
//               type="text"
//               name="description"
//               id="description"
//               required
//               spellCheck={false}
//               onChange={handleDataChange}
//             />
//             <Placeholder>프로젝트 정보</Placeholder>
//           </InputBlock>
//         </FormBlockLeft>
//         <FormBlockRight>
//           <InputBlock>
//             <InputField
//               type="text"
//               name="clientName"
//               id="성함"
//               required
//               spellCheck={false}
//               onChange={handleDataChange}
//             />
//             <Placeholder>성함</Placeholder>
//           </InputBlock>
//           <InputBlock>
//             <InputField
//               type="text"
//               name="organization"
//               id="organization"
//               required
//               spellCheck={false}
//               onChange={handleDataChange}
//             />
//             <Placeholder>기관 혹은 기업명</Placeholder>
//           </InputBlock>
//           <InputBlock>
//             <InputField
//               type="text"
//               name="contact"
//               id="contact"
//               required
//               spellCheck={false}
//               onChange={handleDataChange}
//             />
//             <Placeholder>연락처(-포함)</Placeholder>
//           </InputBlock>
//           <InputBlock>
//             <InputField
//               type="text"
//               name="email"
//               id="email"
//               required
//               spellCheck={false}
//               onChange={handleDataChange}
//             />
//             <Placeholder>이메일주소</Placeholder>
//           </InputBlock>
//           <InputBlock>
//             <InputField
//               type="text"
//               name="position"
//               id="position"
//               required
//               spellCheck={false}
//               onChange={handleDataChange}
//             />
//             <Placeholder>직책</Placeholder>
//           </InputBlock>
//         </FormBlockRight>
//       </FormBlock>
//       <CButton
//         type="submit"
//         onClick={handleSubmit}
//         whileHover={{ scale: 1.1 }}
//         transition={{ type: "spring", stiffness: 400, damping: 10 }}
//       >
//         문의하기
//       </CButton>
//       <Modal isModalOpen={isModalOpen} closeModal={closeModal}></Modal>
//     </Body>
//   );
// };

// export default preContactPage;
