import {GlobalMetadataModel} from '../Models/GlobalMetadata';
import {loginModel} from '../Models/login';

interface LoginRecord {
  mid: string;
  name: string;
  password: string;
  role: string;
  dep: string;
}

interface HelperRecord {
  name: string;
  content: string[] | number;
}

const records1: LoginRecord[] = [
  { mid: 'admin', name: 'admin', password: 'admin', role: 'admin', dep: 'admin' },
  { mid: 'opd2', name: 'opd2', password: 'opd2', role: 'opd2', dep: 'orthopedic' },
];

const records2: HelperRecord[] = [
  { name: 'roles', content: ['doctor', 'laboratorist', 'nurse', 'pharmacist','reception1','reception2','biller','QueueScreen','patient'] },
  { name: 'pid', content: 1 },
  { name: 'eid', content: 1 },
  { name: 'dep', content: ['orthopedic', 'neurologist', 'cardiologist', 'endocrinologist', 'gynecologist'] },
  { name: 'medicineType', content: ['tablet', 'capsule', 'injection', 'ointment', 'drop', 'inhaler', 'cream', 'gel', 'lotion', 'shampoo', 'spray', 'powder', 'mouthwash', 'paste', 'emulsion', 'bar', 'soap'] },
];

export const insertData = async (): Promise<void> => {
  try {

    for (const record of records1) {
      const exists = await loginModel.findOne({ mId: record.mid });
      if (!exists) {
        await loginModel.create(record);
        console.log(`Inserted login record: ${record.mid}`);
      } else {
        console.log(`Login record already exists: ${record.mid}`);
      }
    }

    for (const record of records2) {
      const exists = await GlobalMetadataModel.findOne({ name: record.name });
      if (!exists) {
        await GlobalMetadataModel.create(record);
        console.log(`Inserted helper record: ${record.name}`);
      } else {
        console.log(`Helper record already exists: ${record.name}`);
      }
    }

    console.log('Setup data insertion completed!');
  } catch (error) {
    console.error('Error inserting setup data.', error);
  }
};
