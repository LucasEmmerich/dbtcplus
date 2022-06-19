class GlucoseRecord {
    id = undefined;
    mg_per_dl = undefined;
    wasThereConsumption = false;
    consumption = undefined;
    insulinDosesUsed = undefined;
    created_at = undefined;

    constructor({ mg_per_dl, wasThereConsumption, consumption, insulinDosesUsed }) {
        this.mg_per_dl = parseInt(mg_per_dl);
        this.wasThereConsumption = wasThereConsumption;
        this.consumption = consumption;
        this.insulinDosesUsed = parseInt(insulinDosesUsed);

    };


    errors = () => {
        console.log(this, !Number.isInteger(this.mg_per_dl), this.mg_per_dl <= 0, this.mg_per_dl >= 1000)
        const errors = [];

        if (!Number.isInteger(this.mg_per_dl) || this.mg_per_dl <= 0 || this.mg_per_dl >= 1000) {
            errors.push('Glicose deve ser um número entre 1 e 999.');
        }
        if (this.wasThereConsumption) {

            if (!this.consumption) {
                errors.push('A consumação é obrigatória caso esteja marcada que teve.')
            } else if (this.consumption.length <= 3) {
                errors.push('Consumo deve ser melhor especificado.');
            }
            if (!this.insulinDosesUsed) {
                errors.push('A quantidade de doses utilizada é obrigatória caso esteja marcada que teve.')
            } else if (this.insulinDosesUsed <= 0) {
                errors.push('Doses utilizadas deve ser informado.');
            }
        }
        return errors;
    }
}
export default GlucoseRecord;
