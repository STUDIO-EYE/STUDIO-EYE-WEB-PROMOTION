import React, { useEffect, useState } from "react";
import axios from "axios";
import Body from "../../components/Common/AdminBody";
import styled from "styled-components";
import { motion } from "framer-motion";
import EditAboutModal from "./Component/EditAboutModal";
import PlusAboutModal from "./Component/PlusAboutModal";
import { AiFillDelete } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const BoxContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const AdminDiv = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  position: relative;
`;
const Delete = styled(motion(AiFillDelete))`
  font-size: 2.25rem;
  cursor: pointer;
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

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 16px;
  text-align: center;

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

const Img = styled.img`
  width: 20%;
`;

function DataTable({ data, onEdit, deleteProject }: any) {
  return (
    <StyledTable>
      <thead>
        <tr>
          <th>번호</th>
          <th>이미지</th>
          <th>삭제</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item: any) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>
              <Img src={item.logoImageUrl} />
            </td>
            <td>
              <Delete onClick={() => onEdit(item)}></Delete>
            </td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
}

const AdminEditPage = () => {
  const AdminEditPageContent = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [isPlus, setIsPlus] = useState(false);

    const handleEdit = (item: any) => {
      setEditingItem(item);
      setIsEditing(true);
    };

    const BackAbout = () => {
      navigate(`/admin`);
    };
    const AddAbout = () => {
      setIsPlus(true);
    };

    const handleCancel = () => {
      setIsEditing(false);
      setIsPlus(false);
    };

    useEffect(() => {
      fetchData();
    }, []);

    useEffect(() => {
      const token = sessionStorage.getItem("login-token");
      if (token) {
        setIsLoggedIn(true);
      }
    }, []);

    const fetchData = () => {
      axios
        .get(`/api/partners`)

        .then((response) => {
          const data = response.data;
          console.log(data);
          console.log(data.data[0]);
          const objects: any = [];

          for (let i = 0; i < data.data.length; i++) {
            if (data.data[i].is_main) {
              const obj = {
                id: data.data[i].id,
                logoImageUrl: data.data[i].logoImageUrl,
                link: data.data[i].link,
                is_main: "Main CoOp.",
              };

              console.log("여기");
              console.log(obj);
              objects.push(obj);
            } else {
              const obj = {
                id: data.data[i].id,
                logoImageUrl: data.data[i].logoImageUrl,
                link: data.data[i].link,
                is_main: "Sub CoOp.",
              };

              console.log("여기22");
              console.log(obj);
              objects.push(obj);
            }
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
          <BoxContainer>
            <AdminDiv>
              <Button onClick={BackAbout}>
                <Back />
              </Button>
              <Text>협력사 목록</Text>
              <Buttong onClick={AddAbout}>
                <Add />
              </Buttong>
            </AdminDiv>
            <DataTable data={data} onEdit={handleEdit} />
            {isEditing && (
              <EditAboutModal item={editingItem} onCancel={handleCancel} />
            )}
            {isPlus && <PlusAboutModal onCancel={handleCancel} />}
          </BoxContainer>
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <Body>
      <AdminEditPageContent />
    </Body>
  );
};
export default AdminEditPage;
