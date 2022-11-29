export * from './components/demo-element.js';
export * from './components/chatElement.js';
export * from './components/joke-element';


//represent a database of questions
const questions = [
	{
		"How to raise bananas": [
			{ ans: "answer 1", votes: 1 },
			{ ans: "answer 2", votes: 11 },
			{ ans: "answer 3", votes: 12 },
			{ ans: "answer 4", votes: 221 },
		]
	},
	{
		"How to raise monkey": [
			{ ans: "answer 1", votes: 1 },
			{ ans: "answer 2", votes: 11 },
			{ ans: "answer 3", votes: 12 },
			{ ans: "answer 4", votes: 221 },
		]
	}
]

//represent new question
const newQuestion = {
	question: "how to raise a cat",
	answers: [
		{ ans: "answer 1", votes: 1 },
		{ ans: "answer 2", votes: 11 },
		{ ans: "answer 3", votes: 12 },
		{ ans: "answer 4", votes: 221 },
	]
}

const updateDatabase = (question) => {
	if (questions.find(q => q.questions === question.question)) {
		//update current question
	} else {
		//create a new question
	}

	//update answers
}

