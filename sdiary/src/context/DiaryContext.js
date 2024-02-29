import React from "react";

const DiaryContext = React.createContext({
  create: null,
  handleClick: () => {},
  clickEdit: () => {},
  id: "",
  edit: null,
  getIdfromClickedElementInDateList: () => {},
  selectedDiary: "",
  getSelectedDiaryInDiary: () => {},
  reload: "",
  reloadHandler: () => {},
  clickForDiaryOnOff: () => {},
  diaryOn: null,
  clickForAccSettingOnOff: () => {},
  accSettingOn: null,
  photo: "",
});

export default DiaryContext;
