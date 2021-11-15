// Front-react 전체에 코드는 다음과 같이 존재함
// 하기 array들을 통해 향후 코드는 모두 관리 가능
const category = ["접종인증", "후기", "팁", "그 외"];
const gender = ["여자", "남자"];
const vaccineType = [
  { value: "Moderna", label: "모더나" },
  { value: "Pfizer", label: "화이자" },
  { value: "AZ", label: "아스트라제네카" },
  { value: "Jonhsen", label: "얀센" },
];
const degree = ["접종안함", "1차", "2차", "3차"];

// {value : 0, lablel: "여자", key: "gender"}
const genderOptions = [];
gender.map((element) =>
  genderOptions.push({
    value: gender.indexOf(element),
    label: element,
    key: "gender",
  })
);

// {value : "Moderna", lablel: "모더나", key: "vaccine"}
const vaccineOptions = [];
vaccineType.map((element) =>
  vaccineOptions.push({
    value: element.value,
    label: element.label,
    key: "vaccine",
  })
);

//{ value: 0, label: "접종 안함", key: "degree"},
const degreeOptions = [];
degree.map((element) =>
  degreeOptions.push({
    value: degree.indexOf(element),
    label: element,
    key: "degree",
  })
);



let code;
const codemgmt = {
  category: category,
  gender: gender,
  degree:degree,
  vaccineType: vaccineType,
  genderOptions: genderOptions,
  vaccineOptions: vaccineOptions,
  degreeOptions: degreeOptions,

  //target : 코드화 대상 변수
  //value : 코드화 대상 변수의 값
  //return : 해당 코드
  codeTable: function codeTable(target, value) {
    if (target === "category") {
      code = category.indexOf(value) + 1;
      return code;
    } else if (target === "gender") {
      code = gender.indexOf(value);
      return code;
    } else return null;
  },
  reverseCodeTable: function reverseCodeTable(target, value) {
    if (target === "category") {
      return category[value - 1];
    } else if (target === "gender") {
      return gender[value];
    } else return null;
  },

  getAge : function getAge(birth) {
    const today = new Date();
    const age = today.getFullYear() - Number(birth.slice(0,4));
    return age

  }
};

export default codemgmt;