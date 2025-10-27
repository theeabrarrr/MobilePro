
import { UsedDeviceGrade, RepairStatus } from './types';

export const USED_DEVICE_GRADES = Object.values(UsedDeviceGrade);
export const REPAIR_STATUSES = Object.values(RepairStatus);

export const GRADE_CRITERIA = {
  [UsedDeviceGrade.A]: {
    screen: 'Bilkul saaf, 12 inch se koi nishan nazar na aye.',
    body: 'Istemal ke bohot kam ya koi nishan nahi.',
    functionality: '100% functional.',
    battery: 'Asal capacity ka >90%.',
  },
  [UsedDeviceGrade.B]: {
    screen: 'Mamuli nishanat, jo screen on hone par nazar na ayein.',
    body: 'Halke nishanat ya ragar. Koi dent na ho.',
    functionality: '100% functional.',
    battery: 'Asal capacity ka >80%.',
  },
  [UsedDeviceGrade.C]: {
    screen: 'Wazeh nishanat, lekin koi crack na ho.',
    body: 'Istemal ke numayan nishanat, jaise scratches ya dents.',
    functionality: '100% functional.',
    battery: 'Asal capacity ka >80%.',
  },
};

export const FUNCTIONALITY_CHECKLIST = [
  'Power On/Off',
  'Screen Display (No spots/lines)',
  'Touch Screen',
  'Front Camera',
  'Rear Camera',
  'Speaker',
  'Earpiece',
  'Microphone',
  'Wi-Fi',
  'Bluetooth',
  'Cellular Signal',
  'Charging Port',
  'Volume Buttons',
  'Power Button',
  'Fingerprint/Face ID',
];
