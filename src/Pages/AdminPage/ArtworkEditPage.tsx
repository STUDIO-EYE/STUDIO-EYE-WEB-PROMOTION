import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Body from "../../components/Common/AdminBody";
import PlusArtworkModal from "./Component/PlusArtworkModal";
import EditArtWorkModal from "./Component/EditArtWorkModal";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 16px;

  td {
    padding: 15px;
    text-align: center;
  }

  tbody tr {
    background-color: #ffffff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  }

  tbody tr:hover {
    background-color: #f5f5f5;
  }
`;

const AdminDiv = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  position: relative;
`;
const Back = styled(motion(IoMdArrowRoundBack))`
  font-size: 40.5px;
  cursor: pointer;
`;
const Add = styled(motion(IoMdAddCircleOutline))`
  font-size: 40.5px;
  cursor: pointer;
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
const Buttong = styled(motion.button)`
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 400;
  margin: 0.25rem 0;
  position: absolute;
  right: 1rem;
`;
const Text = styled(motion.text)`
  font-size: 54px;
  font-weight: 750;
  color: #ff530e;
  letter-spacing: 2px;
  text-align: center;
`;

function DataTable({ data, onEdit, deleteProject }: any) {
  return (
    <div>
      <StyledTable>
        <thead>
          <tr>
            <th>번호</th>
            <th>제작부서</th>
            <th>카테고리</th>
            <th>프로젝트 이름</th>
            <th>고객사</th>
            <th>연도</th>
            {/*<th>상세 설명</th>*/}
            <th>동영상 링크</th>
            <th>편집</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.department}</td>
              <td>{item.category}</td>
              <td>{item.name}</td>
              <td>{item.client}</td>
              <td>{item.date}</td>
              {/*<td>{item.overView}</td>*/}
              <td>{item.link}</td>
              <td>
                <button onClick={() => onEdit(item)}>
                  <FaRegEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
}

const ArtworkEditPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [imgData, setImgData] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("login-token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleCreate = () => {
    setIsCreating(true);
  };

  const handleEdit = (item: any) => {
    console.log(item);
    setEditingItem(item);
    setIsEditing(true);
  };

  const handleSave = () => {
    fetchData();
    setIsEditing(false);
    setIsCreating(false);
  };

  const handleCancel = () => {
    fetchData();
    setIsEditing(false);
    setIsCreating(false);
  };

  const GoBack = () => {
    navigate(`/admin`);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    axios
      .get(`/api/projects`)
      .then((response) => {
        const data = response.data;
        const objects: any = [];

        for (let i = 0; i < data.data.length; i++) {
          const obj = {
            category: data.data[i].category,
            client: data.data[i].client,
            date: data.data[i].date,
            department: data.data[i].department,
            id: data.data[i].id,
            imageUrlList: data.data[i].imageUrlList,
            isPosted: data.data[i].isPosted,
            link: data.data[i].link,
            name: data.data[i].name,
            overView: data.data[i].overView,
          };

          objects.push(obj);
        }
        setData(objects);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      {isLoggedIn ? (
        <Body>
          <AdminDiv>
            <Button onClick={GoBack}>
              <Back />
            </Button>
            <Text>CONTENTS</Text>
            <Buttong onClick={handleCreate}>
              <Add />
            </Buttong>
          </AdminDiv>
          <DataTable data={data} onEdit={handleEdit} />
          {isEditing && (
            <EditArtWorkModal
              item={editingItem}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          )}
          {isCreating && (
            <PlusArtworkModal onSave={handleSave} onCancel={handleCancel} />
          )}
        </Body>
      ) : (
        <></>
      )}
    </>
  );
};

export default ArtworkEditPage;
