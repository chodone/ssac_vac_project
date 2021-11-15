import React, { useContext, useState } from "react";
import styled from "styled-components";
import Responsive from "../../common/Responsive";
import BoldLabel from "../../common/text/BoldLabel";
import EditAvatar from "../../common/avatar/EditAvatar";
import DropDown from "../../common/dropdown/DropDown";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Radio from "../../common/radio/Radio";


import codemgmt from "../../../modules/codemgmt";
import { YearPicker, MonthPicker, DayPicker } from "react-dropdown-date";
import AuthContext from "../../../context/AuthContext";

const EditProfileWrap = styled(Responsive)``;

const EditLabelWrap = styled.div`
  margin-bottom: 2rem;
`;

const EditItemBlock = styled.div`
  & + & {
    margin-top: 2rem;
  }
`;

const DatePickerWrap = styled.div`
  display: flex;
  font-size: 1.3rem;
`;

const StyledDropDown = styled(DropDown)`
  width: 20rem;
  .DropDown_Control {
    font-size: 1.3rem !important;
  }
  .DropDown_Menu {
    font-size: 1.3rem !important;
  }
  .DropDown_Arrow {
    top: 11px !important;
  }
`;

const EditInput = styled.input`
  width: 20rem;
  box-sizing: border-box;
  font-size: 1.3rem;
  border: 1px solid #ccc;
  padding: 0.8rem 1rem;
  &:focus {
    outline: none;
  }
`;

const OptionLabel = styled.label`
  font-size: 1.3rem;
`;

const RadioButton = styled.input`
  font-size: 1.3rem;
`;


function EditProfile({
  onClickAvatar,
  profileImg,
  onChangeCalender,
  onChangeSelect,
  profileInfo,
  
}) {
  const [bDay, setbDay] = useState({
    year: "",
    month: "",
    day: "",
  });
  const {authInfo , setAuthInfo} = useContext(AuthContext)
  



  return (
    <EditProfileWrap>
      <EditItemBlock>
        <EditLabelWrap>
          <BoldLabel>프로필 이미지 선택</BoldLabel>
        </EditLabelWrap>
        <EditAvatar
          imgURL={profileImg.imgBase64}
          onClickAvatar={onClickAvatar}
        />
      </EditItemBlock>

      <EditItemBlock>
        <EditLabelWrap>
          <BoldLabel>생년월일을 입력하세요</BoldLabel>
        </EditLabelWrap>
        {/* <Calendar onChange={onChangeCalender} value={ authInfo.userInfo.bDay} /> */}
      </EditItemBlock>

      

      {/* <EditItemBlock>
        <EditLabelWrap>
          <BoldLabel>나이 입력하세요</BoldLabel>
        </EditLabelWrap>
        <EditInput type="number" />
      </EditItemBlock> */}

      <EditItemBlock>
        <EditLabelWrap>
          <BoldLabel>성별</BoldLabel>
        </EditLabelWrap>
        <Radio
            optionArray={codemgmt.genderOptions}
            onChangeSelect={onChangeSelect}
            defaultValue={authInfo.userInfo.gender}
          />
      </EditItemBlock>

      {/* <EditItemBlock>
        <EditLabelWrap>
          <BoldLabel>성별 선택</BoldLabel>
        </EditLabelWrap>
        <StyledDropDown
          onChangeDropDown={onChangeDropDown}
          options={genderOptions}
          myPlaceholder={"성별을 선택 해주세요."}
        />
      </EditItemBlock> */}

      <EditItemBlock>
        <EditLabelWrap>
          <BoldLabel>백신 선택</BoldLabel>
        </EditLabelWrap>
        <Radio
            optionArray={codemgmt.vaccineOptions}
            onChangeSelect={onChangeSelect}
            // defaultValue = {authInfo.userInfo.inoInfo[0].type}
          />
      </EditItemBlock>

      {/* <EditItemBlock>
        <EditLabelWrap>
          <BoldLabel>백신 선택</BoldLabel>
        </EditLabelWrap>
        <StyledDropDown
          options={vachineOptions}
          onChangeDropDown={onChangeDropDown}
          myPlaceholder={"백신을 선택 해주세요."}
        />
      </EditItemBlock> */}

      <EditItemBlock>
        <EditLabelWrap>
          <BoldLabel>차수 선택</BoldLabel>
        </EditLabelWrap>
        <Radio 
            optionArray={codemgmt.degreeOptions}
            onChangeSelect = {onChangeSelect}
         />
      </EditItemBlock>

      <EditItemBlock>
        <EditLabelWrap>
          <BoldLabel>백신 접종 날짜 선택</BoldLabel>
        </EditLabelWrap>
        <Calendar onChange={onChangeCalender} value={new Date()} />
      </EditItemBlock>
    
    </EditProfileWrap>
  );
}

export default EditProfile;