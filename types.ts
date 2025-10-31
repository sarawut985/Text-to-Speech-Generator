
export type Gender = 'male' | 'female';

export interface VoiceOption {
  id: string;
  name: string;
  gender: Gender;
  apiName: string;
}
