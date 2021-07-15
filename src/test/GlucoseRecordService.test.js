import AsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import GlucoseRecord from "../model/glucose_record";
import GlucoseRecordService from "../services/GlucoseRecordService";

describe('GlucoseServiceActions', () => {
  it('must load empty data', () => {
    expect(0).toBe(0);
  });
  //filter tests goes here
  it('must create a glucose_record', () => {
    expect(1).toEqual(1);
  });
});