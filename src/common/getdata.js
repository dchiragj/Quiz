import axios from 'axios';
const authHeader = () => {
	const user = JSON.parse(localStorage.getItem('user'));
	if (user && user.token) {
		return { Authorization: 'Bearer ' + user.token };
	} else {
		return {};
	}
};
export const StudentGenerateOTP = (values) => {
	return axios.post(`${process.env.REACT_APP_URL}/api/Auth/GenerateOTP`, values);
};

export const StudentLoginWithOTP = (values) => {
	return axios.post(`${process.env.REACT_APP_URL}/api/Auth/LoginWithOTP`, values);
};

export const QuizQuestionsList = () => {
	return axios.get(`${process.env.REACT_APP_URL}/api/UserAPI/GetQuizzQuestionList`, { headers: authHeader() })
}

export const SaveQuizAnswer = (values) => {
	return axios.post(`${process.env.REACT_APP_URL}/api/UserAPI/SaveQuizzResult`, values, { headers: authHeader() })
}
export const GetQuizResult = () => {
	return axios.get(`${process.env.REACT_APP_URL}/api/UserAPI/GetQuizzResult`, { headers: authHeader() })
}

