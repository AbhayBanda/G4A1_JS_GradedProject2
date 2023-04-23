var current_page = 1;
var resumesData = {};
// var resumeList = getResumeList();
const fetchResumes = (input = "") => {
  fetch("http://localhost:3000/scripts/Data.json")
    .then((response) => response.json())
    .then(({ resume } = data) => {
      if (input !== "") {
        var resumeListBasedOnSearch = [];
        Object.keys(resume).forEach((element) => {
          const { basics } = resume[element];
          const { AppliedFor } = basics;
          if (AppliedFor.toLowerCase().includes(input.toLowerCase())) {
            resumeListBasedOnSearch.push(resume[element]);
          }
        });
        if (resumeListBasedOnSearch.length === 0) {
          disabler();
          return;
        } else {
          enabler();
          current_page = 1;
          resumesData = resumeListBasedOnSearch;
        }
      } else {
        enabler();
        current_page = 1;
        resumesData = resume;
      }
      loadResumeOnScreen(resumesData[0]);
    })
    .catch((error) => console.log(error.message));
};

window.onload = function () {
  fetchResumes();
};
var input = document.getElementById("search");
addEventListener("keypress", (input) => {
  if (input.key === "Enter") {
    const resumeJobInput = input.target.value;
    fetchResumes(resumeJobInput);
    input.target.value = "";
  }
});
const loadResumeOnScreen = (resume) => {
  const {
    basics,
    skills,
    interests,
    work,
    projects,
    education,
    Internship,
    achievements,
  } = resume;
  const { phone, email, profiles, name, AppliedFor } = basics;
  const { keywords } = skills;
  const { hobbies } = interests;
  const {
    UG,
    ["Senior Secondary"]: SeniorSecondary,
    ["High School"]: HighSchool,
  } = education;
  generateHeader(name, AppliedFor);
  generatePersonalInformation(phone, email, profiles);
  generateTechnicalSkills(keywords);
  generateHobbies(hobbies);
  generateWorkExperience(work);
  generateProjects(projects);
  generateEducation(UG, SeniorSecondary, HighSchool);
  generateInternship(Internship);
  generateAchievements(achievements);

  if (current_page === 1) {
    document.getElementById("prev").style.visibility = "hidden";
  } else {
    document.getElementById("prev").style.visibility = "visible";
  }
  console.log(resumesData.length);
  if (current_page == resumesData.length) {
    document.getElementById("next").style.visibility = "hidden";
  } else {
    document.getElementById("next").style.visibility = "visible";
  }
};
const generateHeader = (name, appliedFor) => {
  const resumeHeader = document.getElementById("resume-header");
  resumeHeader.innerHTML = `
        <h2>${name}</h2>
        <h4>Applied For: ${appliedFor}</h4>
    `;
};
const generatePersonalInformation = (phone, email, profiles) => {
  const personalInfo = document.getElementById("personal-info");
  const { url, network } = profiles;
  var list = [phone, email, url, network];
  personalInfo.innerHTML = `
    <li>${phone}</li>
    <li>${email}</li>
    <li><a href=${url}>${network}</a></li>
  `;
};
const generateTechnicalSkills = (skillSet) => {
  generateLists(skillSet, "skill-set");
};

const generateHobbies = (hobbies) => {
  generateLists(hobbies, "hobbies");
};
const generateWorkExperience = (work) => {
  generateResumeBody(work, "work-experience");
};
const generateEducation = (UG, SeniorSecondary, HighSchool) => {
  let educationDoc = document.getElementById("education");
  educationDoc.innerHTML = "";
  const educationHistory = [UG, SeniorSecondary, HighSchool];
  var flag = 1;
  educationHistory.forEach((education) => {
    const p = document.createElement("p");
    const sentense = generateSentence(education);
    p.innerHTML =
      flag === 1
        ? `<span class=${"sub-heading"}>UG:</span> ${sentense}`
        : flag === 2
        ? `<span class=${"sub-heading"}>PU:</span> ${sentense}`
        : `<span class=${"sub-heading"}>High School:</span> ${sentense}`;
    educationDoc.appendChild(p);
    flag++;
  });
};
const generateInternship = (Internship) => {
  generateResumeBody(Internship, "internship");
};

const generateAchievements = (achievements) => {
  generateResumeBody(achievements, "achievement");
};

const generateProjects = (projects) => {
  const workExp = document.getElementById("summary");
  workExp.innerHTML = "";
  const p = document.createElement("p");
  p.innerHTML = `<span class=${"sub-heading"}>${projects.name}:</span> ${
    projects.description
  }`;
  workExp.appendChild(p);
};

const generateLists = (_list, id) => {
  document.getElementById(id).innerHTML = "";
  _list.forEach((item) => {
    const li = document.createElement("li");
    const value = document.createTextNode(item);
    li.appendChild(value);
    document.getElementById(id).append(li);
  });
};

const generateResumeBody = (info, id) => {
  const workExp = document.getElementById(id);
  workExp.innerHTML = "";
  for (const [key, value] of Object.entries(info)) {
    if (value === "") continue;
    const p = document.createElement("p");
    p.innerHTML = `<span class=${"sub-heading"}>${key}:</span> ${value}`;
    workExp.appendChild(p);
  }
};

const generateSentence = (education) => {
  const keys = Object.keys(education);
  var sentense = "";
  for (var i = 0; i < keys.length - 1; ++i) {
    sentense += education[keys[i]] + ", ";
  }
  sentense += education[keys[keys.length - 1]];
  return sentense;
};

const prevPage = () => {
  if (current_page > 1) {
    current_page--;
    loadResumeOnScreen(resumesData[current_page - 1]);
  }
};

const nextPage = () => {
  if (current_page < resumesData.length) {
    current_page++;
    loadResumeOnScreen(resumesData[current_page - 1]);
  }
};

const enabler = () => {
  document.getElementById("error").style.display = "none";
  document.getElementById("prev").style.visibility = "visible";
  document.getElementById("next").style.visibility = "visible";
  document.getElementById("resume-wrapper").style.display = "flex";
};

const disabler = () => {
  document.getElementById("error").style.display = "flex";
  document.getElementById("prev").style.visibility = "hidden";
  document.getElementById("next").style.visibility = "hidden";
  document.getElementById("resume-wrapper").style.display = "none";
};
