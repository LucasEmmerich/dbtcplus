class GlucoseRecord {
    constructor( glr_id = 0, glr_mg_per_dl = '', glr_wasThereConsumption = false, glr_consumption = '', glr_insulinDosesUsed = '', glr_created_at = '' ) {
        this.glr_id = glr_id;
        this.glr_mg_per_dl = glr_mg_per_dl;
        this.glr_wasThereConsumption = glr_wasThereConsumption;
        this.glr_consumption = glr_consumption;
        this.glr_insulinDosesUsed = glr_insulinDosesUsed;
        this.glr_created_at = glr_created_at;
    }
}
export default GlucoseRecord;
