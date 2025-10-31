import type { VoiceOption } from './types';

export interface VoiceGroup {
  language: string;
  voices: VoiceOption[];
}

export const VOICE_GROUPS: VoiceGroup[] = [
  {
    language: 'ไทย (Thai)',
    voices: [
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
    ]
  },
  {
    language: 'English',
    voices: [
      { id: 'female-7', name: 'Warm & Gentle', gender: 'female', apiName: 'Kore' },
      { id: 'female-8', name: 'Bright & Cheerful', gender: 'female', apiName: 'Zephyr' },
      { id: 'male-9', name: 'Neutral & Clear', gender: 'male', apiName: 'Puck' },
      { id: 'male-10', name: 'Deep & Resonant', gender: 'male', apiName: 'Charon' },
    ]
  },
  {
    language: '日本語 (Japanese)',
    voices: [
      { id: 'female-9', name: '落ち着いた声 (Calm)', gender: 'female', apiName: 'Kore' },
      { id: 'male-11', name: 'ナレーター (Narrator)', gender: 'male', apiName: 'Fenrir' },
    ]
  },
  {
    language: 'Español (Spanish)',
    voices: [
      { id: 'female-10', name: 'Energética y Amable', gender: 'female', apiName: 'Zephyr' },
      { id: 'male-12', name: 'Fuerte y Autoritario', gender: 'male', apiName: 'Fenrir' },
    ]
  },
  {
    language: '한국어 (Korean)',
    voices: [
        { id: 'female-11', name: '부드러운 목소리 (Soft)', gender: 'female', apiName: 'Kore' },
        { id: 'male-13', name: '전문적인 목소리 (Professional)', gender: 'male', apiName: 'Fenrir' },
    ]
  },
  {
    language: 'Français (French)',
    voices: [
      { id: 'female-12', name: 'Douce et Chaleureuse', gender: 'female', apiName: 'Kore' },
      { id: 'male-14', name: 'Claire et Professionnelle', gender: 'male', apiName: 'Puck' },
    ]
  }
];

export const ALL_VOICES: VoiceOption[] = VOICE_GROUPS.flatMap(group => group.voices);

export const DEFAULT_FEMALE_VOICE_ID = 'female-1';
export const DEFAULT_MALE_VOICE_ID = 'male-1';
