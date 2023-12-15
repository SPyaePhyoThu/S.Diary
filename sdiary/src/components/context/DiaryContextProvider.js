import { useState, useEffect } from "react";
import DiaryContext from "./DiaryContext";
import { useAuthContext } from "../hooks/useAuthcontext";

const DiaryProvider = (props) => {
  const [create, setCreate] = useState(null);
  const [edit, setEdit] = useState(null);
  const [id, setId] = useState("");
  const [selectedDiary, setSelectedDiary] = useState({});
  const [reload, setReload] = useState(1);
  const [defaultDiary, setDefaultDiary] = useState([]);
  const { user } = useAuthContext();
  const [diaryOn, setDiaryOn] = useState(false);
  const [accSettingOn, setAccSettingOn] = useState(false);
  const [userPhoto, setUserPhoto] = useState();

  // fetch for Default diary
  useEffect(() => {
    const fetchDiary = async () => {
      const res = await fetch("/api/v1/diary");

      const json = await res.json();

      if (res.ok) {
        setDefaultDiary(json.data.data[0]);
      }
    };
    const fetchPhoto = async () => {
      try {
        const response = await fetch(
          `https://sdiary-backend.onrender.com/api/v1/userphoto/${user.data.user.photo}`
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
      fetchDiary();
      fetchPhoto();
    }
  }, [setDefaultDiary, reload, user]);

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
    defaultDiary,
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
