class GlucoseRecord {
    glr_id = undefined;
    glr_mg_per_dl = undefined;
    glr_wasThereConsumption = false;
    glr_consumption = undefined;
    glr_insulinDosesUsed = undefined;
    glr_created_at = undefined;

    errors = () => {
        const errors = [];
        if (!Number.isInteger(this.glr_mg_per_dl) || this.glr_mg_per_dl <= 0 || this.glr_mg_per_dl >= 1000) {
            errors.push('Glicose deve ser um número entre 1 e 999');
        }
        if (this.glr_wasThereConsumption) {
            if (this.glr_consumption.length <= 3) {
                errors.push('Consumo deve ser melhor especificado.');
            }
            if (this.glr_insulinDosesUsed <= 0) {
                errors.push('Doses utilizadas deve ser informado');
            }
        }
        return errors;
    }
}
export default GlucoseRecord;
