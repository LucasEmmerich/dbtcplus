class GlucoseRecord {
    id = undefined;
    mg_per_dl = undefined;
    was_there_consumption = false;
    consumption = undefined;
    insulin_doses_used = undefined;
    created_at = undefined;

    constructor({ mg_per_dl, was_there_consumption, consumption, insulin_doses_used }) {
        this.mg_per_dl = parseInt(mg_per_dl);
        this.was_there_consumption = was_there_consumption;
        this.consumption = consumption;
        this.insulin_doses_used = parseInt(insulin_doses_used);

    };

    getDataToService = () => {
        return {
            mg_per_dl: this.mg_per_dl,
            was_there_consumption: this.was_there_consumption,
            consumption: this.consumption,
            insulin_doses_used: this.insulin_doses_used
        }
    };


    errors = () => {
        const errors = [];

        if (!Number.isInteger(this.mg_per_dl) || this.mg_per_dl <= 0 || this.mg_per_dl >= 1000) {
            errors.push('Glicemia deve estar entre 1 e 999.');
        }
        if (this.was_there_consumption) {
            if (!this.consumption) {
                errors.push('A consumação é obrigatória.')
            } else if (this.consumption.length <= 3) {
                errors.push('Consumo deve ser melhor especificado.');
            }
            if (!this.insulin_doses_used) {
                errors.push('Dose aplicada deve ser maior que 0.');
            }
        }
        return errors;
    }
}
export default GlucoseRecord;
