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
// export const StudentGenerateOTP = async (values) => {
// 	try {
// 		alert(`${process.env.REACT_APP_URL}/api/Auth/GenerateOTP`)
// 		 const data = await axios.post(`${process.env.REACT_APP_URL}/api/Auth/GenerateOTP`, values);
// 		 alert(`res: ${JSON.stringify(data)}`)
// 		 return data
// 	} catch(e) {
// 		alert(`catch error api - ${JSON.stringify(e)}`)
// 	}
// };
export const StudentLoginWithOTP = (values) => {
	return axios.post(`${process.env.REACT_APP_URL}/api/Auth/LoginWithOTP`, values);
};

export const QuizQuestionsList = (values) => {
	return axios.get(`${process.env.REACT_APP_URL}/api/UserAPI/GetQuizzQuestionList`, {params: values, headers: authHeader() })
}

export const SaveQuizAnswer = (values) => {
	return axios.post(`${process.env.REACT_APP_URL}/api/UserAPI/SaveQuizzResult`, values, { headers: authHeader() })
}
export const GetQuizResult = () => {
	return axios.get(`${process.env.REACT_APP_URL}/api/UserAPI/GetQuizzResult`, { headers: authHeader() })
}
export const UploadUserImage = (values) => {
	alert(`values:${JSON.stringify(values)}`)
	return axios.post(`${process.env.REACT_APP_URL}/api/UserAPI/UploadUserImage`,values, { headers: authHeader() })
}

export const GetUserDetails = () => {
	return axios.post(`${process.env.REACT_APP_URL}/api/UserAPI/GetUserDetails`,{}, { headers: authHeader() });
};
export const ResendOTP = (values) => {
	return axios.post(`${process.env.REACT_APP_URL}/api/UserAPI/ResendOTP`,values);
};

