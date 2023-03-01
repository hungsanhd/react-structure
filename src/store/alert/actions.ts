import { AlertActionTypes, ALERT_ERROR, CLEAR_ALERT, ALERT_SUCCESS } from './types';


const alertSuccess = (message: string): AlertActionTypes => {
	return {
		type: ALERT_SUCCESS,
		payload: {message}
	}
};

const alertError = (message: string): AlertActionTypes => {
	return {
		type: ALERT_ERROR,
		payload: {message}
	}
}

const clearAlert = (): AlertActionTypes => {
	return {type: CLEAR_ALERT};
};

export {alertSuccess, alertError, clearAlert};
