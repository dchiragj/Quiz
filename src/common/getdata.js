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

export const QuizzQuestionsList = () => {
	return axios.get(`${process.env.REACT_APP_URL}/api/UserAPI/GetQuizzQuestionList`, { headers: authHeader() })
}

