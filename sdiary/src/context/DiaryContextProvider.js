import { useState, useEffect } from "react";
import DiaryContext from "./DiaryContext";
import { useAuthContext } from "../hooks/useAuthcontext";

const DiaryProvider = (props) => {
  const [create, setCreate] = useState(null);
  const [edit, setEdit] = useState(null);
  const [id, setId] = useState("");
  const [selectedDiary, setSelectedDiary] = useState({});
  const [reload, setReload] = useState(1);
  const { user } = useAuthContext();
  const [diaryOn, setDiaryOn] = useState(false);
  const [accSettingOn, setAccSettingOn] = useState(false);
  const [userPhoto, setUserPhoto] = useState();

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await fetch(
          `https://s-diary-backend.vercel.app/api/v1/userphoto/${user.data.user.photo}`
          // `https://sdiary-backend.onrender.com/api/v1/userphoto/${user.data.user.photo}`
        );
        if (!response.ok) {
          throw new Error("Failer to fetch user");
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setUserPhoto(url);
      } catch (error) {
        console.error("Error fetching photo", error);
      }
    };

    if (user) {
      fetchPhoto();
    }
  }, [reload, user]);

  const handleClick = (value) => {
    setCreate(value);
    setEdit(!value);
  };
  const clickEdit = (value) => {
    setEdit(value);
    setCreate(value);
  };

  const reloadHandler = () => {
    setReload((preState) => preState + 1);
  };

  const getIdfromClickedElementInDateList = (id) => {
    setId(id);
  };

  const getSelectedDiaryInDiary = (diary) => {
    setSelectedDiary(diary);
  };

  const clickForDiaryOnOff = (value) => {
    setDiaryOn(value);
  };
  const clickForAccSettingOnOff = (value) => {
    setAccSettingOn(value);
  };

  const diaryContext = {
    create,
    handleClick,
    clickEdit,
    id,
    edit,
    getIdfromClickedElementInDateList,
    selectedDiary,
    getSelectedDiaryInDiary,
    reload,
    reloadHandler,
    clickForDiaryOnOff,
    diaryOn,
    clickForAccSettingOnOff,
    accSettingOn,
    userPhoto,
  };

  return (
    <DiaryContext.Provider value={diaryContext}>
      {props.children}
    </DiaryContext.Provider>
  );
};
export default DiaryProvider;
