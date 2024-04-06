import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
// import Data from "bootstrap/js/src/dom/data";
import Body from "../../components/Common/AdminBody";
import ShowContactModal from "./Component/ShowContactModal";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 16px;

  th,
  td {
    padding: 15px;
    text-align: center;
  }

  th:last-child {
    display: flex;
  }

  tbody tr {
    background-color: #ffffff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  }

  tbody tr:hover {
    background-color: #f5f5f5;
  }
`;
const Back = styled(motion(IoMdArrowRoundBack))`
  font-size: 40.5px;
  cursor: pointer;
`;
const AdminDiv = styled(motion.div)`
  background: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  position: relative;
`;
const Button = styled(motion.button)`
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 400;
  margin: 0.25rem 0;
  position: absolute;
  left: 1rem;
`;
const Text = styled(motion.text)`
  font-size: 54px;
  font-weight: 750;
  color: #ff530e;
  letter-spacing: 2px;
  text-align: center;
`;

function DataTable({ data, onEdit }: any) {
  return (
    <StyledTable>
      <thead>
        <tr>
          <th>번호</th>
          <th>카테고리</th>
          <th>고객이름</th>
          <th>소속</th>
          <th>연락처</th>
          <th>이메일</th>
          <th>지위</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item: any) => (
          <tr key={item.id} onClick={() => onEdit(item)}>
            <td>{item.id}</td>
            <td>{item.category}</td>
            <td>{item.clientName}</td>
            <td>{item.organization}</td>
            <td>{item.contact}</td>
            <td>{item.email}</td>
            <td>{item.position}</td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
}

const ContactEditPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("login-token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const GoBack = () => {
    navigate(`/admin`);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setIsModalOpen(true); // 모달 열기
  };

  const handleCloseModal = () => {
    fecthData();
    setIsModalOpen(false);
  };

  useEffect(() => {
    fecthData();
  }, []);

  const fecthData = () => {
    axios
      .get(`/api/requests`)
      .then((response) => {
        const data = response.data;

        console.log(data.data[1]);
        const objects: any = [];
        const imgObjects = [];

        for (let i = 0; i < data.data.length; i++) {
          const obj = {
            category: data.data[i].category,
            clientName: data.data[i].clientName,
            organization: data.data[i].organization,
            contact: data.data[i].contact,
            id: data.data[i].id,
            email: data.data[i].email,
            position: data.data[i].position,
            description: data.data[i].description,
            fileUrlList: data.data[i].fileUrlList,
          };

          objects.push(obj);
        }
        setData(objects);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteContact = (deletedContactId: any) => {
    // Update the data state by filtering out the deleted contact
    setData((prevData) =>
      prevData.filter((contact: any) => contact.id !== deletedContactId)
    );
  };

  return (
    <>
      {isLoggedIn ? (
        <Body>
          <div>
            <AdminDiv>
              <Button onClick={GoBack}>
                <Back />
              </Button>
              <Text>문의 목록</Text>
            </AdminDiv>
            <DataTable data={data} onEdit={handleEdit}></DataTable>
            {isModalOpen && (
              <ShowContactModal
                item={editingItem}
                onClose={handleCloseModal}
                onDelete={handleDeleteContact}
              />
            )}
          </div>
        </Body>
      ) : (
        <></>
      )}
    </>
  );
};

export default ContactEditPage;
