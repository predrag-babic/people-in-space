console.log("Sanity check");

const peopleInSpace = document.querySelector('[data-js="people-in-space"]');
const peopleList = document.querySelector('[data-js="people-list"]');
const allButton = document.querySelector('[data-filter="all"]');
const issButton = document.querySelector('[data-filter="ISS"]');
const tiangongButton = document.querySelector('[data-filter="Tiangong"]');
const url = "http://api.open-notify.org/astros.json";
async function getPeopleInSpace() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data!");
    }
    const data = await response.json();
    console.log(data);

    displayPeople(data.people);
    allButton.addEventListener("click", () => displayPeople(data.people));
    issButton.addEventListener("click", () =>
      filterBySpacecraft(data.people, "ISS")
    );
    tiangongButton.addEventListener("click", () =>
      filterBySpacecraft(data.people, "Tiangong")
    );

    const peopleCount = data.number;
    peopleInSpace.textContent = peopleCount;

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return error;
  }
}

function displayPeople(people) {
  peopleList.innerHTML = "";
  people.forEach((person) => {
    const li = document.createElement("li");
    li.textContent = `${person.name} - ${person.craft}`;
    peopleList.append(li);
  });
}

function filterBySpacecraft(people, spacecraft) {
  const filteredPeople = people.filter((person) => person.craft === spacecraft);
  displayPeople(filteredPeople);
}

getPeopleInSpace();
