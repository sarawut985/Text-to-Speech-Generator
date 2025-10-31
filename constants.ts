import type { VoiceOption } from './types';

export const ALL_VOICES: VoiceOption[] = [
  { id: 'female-1', name: 'อบอุ่นและอ่อนโยน', gender: 'female', apiName: 'Kore' },
  { id: 'female-2', name: 'สดใสและร่าเริง', gender: 'female', apiName: 'Zephyr' },
  { id: 'female-3', name: 'เป็นทางการและน่าเชื่อถือ', gender: 'female', apiName: 'Kore' },
  { id: 'female-4', name: 'กระซิบและนุ่มนวล', gender: 'female', apiName: 'Zephyr' },
  { id: 'female-5', name: 'หุ่นยนต์หรือเสียงสังเคราะห์', gender: 'female', apiName: 'Zephyr' },
  { id: 'female-6', name: 'ผู้เล่านิทาน', gender: 'female', apiName: 'Kore' },
  { id: 'male-1', name: 'เป็นกลางและชัดเจน', gender: 'male', apiName: 'Puck' },
  { id: 'male-2', name: 'ทุ้มและกังวาน', gender: 'male', apiName: 'Charon' },
  { id: 'male-3', name: 'แข็งแกร่งและหนักแน่น', gender: 'male', apiName: 'Fenrir' },
  { id: 'male-4', name: 'เป็นมิตรและเข้าถึงง่าย', gender: 'male', apiName: 'Puck' },
  { id: 'male-5', name: 'ตื่นเต้นและมีพลัง', gender: 'male', apiName: 'Puck' },
  { id: 'male-6', name: 'สงบและผ่อนคลาย', gender: 'male', apiName: 'Charon' },
  { id: 'male-7', name: 'ผู้บรรยายสารคดี', gender: 'male', apiName: 'Charon' },
  { id: 'male-8', name: 'ผู้ประกาศข่าว', gender: 'male', apiName: 'Fenrir' },
];

export const DEFAULT_FEMALE_VOICE_ID = 'female-1';
export const DEFAULT_MALE_VOICE_ID = 'male-1';