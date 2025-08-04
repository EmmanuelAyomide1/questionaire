const API_URL = "https://small-small-be.onrender.com";

export async function postAnswers(answeredQuestions) {
  const unwantedAnswers = ["impact", "suicide_plan"];
  const cleanedSections = ["phq9", "gad7", "whodas", "freeform"];
  const cleanedAnswer = answeredQuestions.reduce((acc, question) => {
    if (
      question.answer !== undefined &&
      !unwantedAnswers.some((q) => q === question.questionId)
    ) {
      const section = cleanedSections[question.sectionNumber];
      const sectionExist = acc[section];
      if (sectionExist) {
        sectionExist[question.questionId] = question.answer;
      } else {
        acc[section] = {};
        acc[section][question.questionId] = question.answer;
      }
    }
    return acc;
  }, {});

  console.log({ cleanedAnswer });
  const res = await fetch(`${API_URL}/survey/submit`, {
    method: "POST",
    body: JSON.stringify(cleanedAnswer),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw Error("Failed getting questions");

  await res.json();
  return true;
}
