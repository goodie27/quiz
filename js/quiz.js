const fetchUsers = () => {
  axios
    .get("https://opentdb.com/api.php?amount=10")
    .then(response => {
      const quiz = response.data.results;
      console.log(quiz);
      const test = [];
      const correct = [];
      const put = [];
      for (let i = 0; i < quiz.length; i++) {
        const question = document.getElementById("display");
        const element = `
        <div class=" container" id="question">
          <h3>question</h3>
        <div id="question-box">${quiz[i].question}</div>
          <hr />
    ${quiz[i].incorrect_answers.map(
      answer =>
        `<div id="answer" class="answer-holder">
          <div class="input-text-wrap">
            <input type="radio" id="add${i}" name="question${i}" value="${answer}" class="check-box" />
              <h4>${answer}</h4>
            </div>`
    )}    
        <div class="input-text" >
            <input type="radio" id="add${i}" name="question${i}" value="${
          quiz[i].correct_answer
        }" class="check-box" />
          <h4>${quiz[i].correct_answer}</h4>
        </div>
      </div>
    </div>
        `;
        const postion = "beforeend";
        question.insertAdjacentHTML(postion, element);
        let forms = document.getElementById("forms");
        forms.onsubmit = e => {
          e.preventDefault();
          const body = new FormData(forms);
          for (let i = 0; i < quiz.length; i++) {
            let answers = body.getAll(`question${i}`);
            test.push(...answers);
            correct.push(quiz[i].correct_answer);
          }
          // console.log(test);
          // console.log(correct);
          if (test.length !== correct.length) {
            return false;
          } else {
            for (let i = 0; i < test.length; i++) {
              if (test[i] === correct[i]) {
                put.push(test[i]);
              } else {
                console.log(false);
              }
            }
            document.getElementById("displays").value = put.length;
            // console.log(put.length);
          }
        };
      }
    })
    .catch(error => console.error(error));
};

fetchUsers();
