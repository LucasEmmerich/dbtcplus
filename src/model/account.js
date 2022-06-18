import validateEmail from "../helpers/validators/validateEmail";

class Account {
	email = undefined;
	password = undefined;

	errors = () => {
		const errors = [];
		if (!validateEmail(this.email)) {
			errors.push('Deve utilizar um e-mail válido.')
		}
		if (this.password <= 0) {
			errors.push('Senha deve ser preenchida.')
		}
	}
}

export default Account;