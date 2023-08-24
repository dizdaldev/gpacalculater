document.addEventListener("DOMContentLoaded", () => {
  const gradesSelect = document.getElementById("grades");
  const creditsInput = document.getElementById("credits");
  const calculateButton = document.getElementById("calculate");
  const resetButton = document.getElementById("reset");
  const weightedCheckbox = document.getElementById("weighted");
  const courseList = document.getElementById("courseList");
  const resultDiv = document.getElementById("result");
  const summaryDiv = document.getElementById("summary");
  let totalCredits = 0;
  let totalGradePoints = 0;
  let isWeighted = false;

  calculateButton.addEventListener("click", () => {
    const selectedGrade = parseFloat(gradesSelect.value);
    const credits = parseFloat(creditsInput.value);

    if (isNaN(selectedGrade) || isNaN(credits)) {
      return;
    }

    const courseGpa = selectedGrade * credits;
    totalGradePoints += courseGpa;
    totalCredits += credits;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "remove-course";

    const li = document.createElement("li");
    li.innerHTML = `<span>Grade: ${selectedGrade.toFixed(2)} | Credits: ${credits}</span>`;
    li.appendChild(removeButton);
    courseList.appendChild(li);

    removeButton.addEventListener("click", () => {
      totalGradePoints -= courseGpa;
      totalCredits -= credits;
      courseList.removeChild(li);
      recalculateGPA();
    });

    gradesSelect.value = "4.0";
    creditsInput.value = "";
    recalculateGPA();
    animateElement(li, "fade-in");
  });

  calculateButton.addEventListener("click", () => {
    isWeighted = weightedCheckbox.checked;
    recalculateGPA();
  });

  resetButton.addEventListener("click", () => {
    totalCredits = 0;
    totalGradePoints = 0;
    courseList.innerHTML = "";
    summaryDiv.innerHTML = "";
    resultDiv.textContent = "GPA: 0.00";
    isWeighted = false;
    weightedCheckbox.checked = false;
  });

  function recalculateGPA() {
    const gpa = totalCredits !== 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0.00;
    resultDiv.textContent = isWeighted ? `Weighted GPA: ${gpa}` : `Unweighted GPA: ${gpa}`;
    updateSummary();
  }

  function updateSummary() {
    summaryDiv.innerHTML = `
      <h2>Summary</h2>
      <p>Total Credits: ${totalCredits.toFixed(2)}</p>
      <p>Total Grade Points: ${totalGradePoints.toFixed(2)}</p>
    `;
  }

  function animateElement(element, animationClass) {
    element.classList.add(animationClass);
    element.addEventListener("animationend", () => {
      element.classList.remove(animationClass);
    });
  }
});
