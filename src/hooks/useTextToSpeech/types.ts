import TextToSpeech from "./TextToSpeech";

export type TextToSpeechState = {
  textToSpeech: TextToSpeech | null;
  speaking: boolean;
  language: string;
  selectedVoice: SpeechSynthesisVoice | null;
  voices: SpeechSynthesisVoiceMap;
  volume: number | number[];
  rate: number | number[];
  pitch: number | number[];
};

export type Speaker = {
  speaking: boolean;
  language: string;
  voices: TextToSpeechVoiceArray;
  dispatch: React.Dispatch<TextToSpeechReducerAction>;
  speak: (script: string) => void;
  pause: (() => void) | undefined;
  resume: (() => void) | undefined;
  cancel: (() => void) | undefined;
};

export type TextToSpeechOptions = {
  dispatch: React.Dispatch<TextToSpeechReducerAction>;
  selectedVoice: SpeechSynthesisVoice | null;
  language: string;
  volume: number | number[]; // between 0 (lowest) and 1 (highest)
  pitch: number | number[]; // range between 0 (lowest) and 2 (highest)
  rate: number | number[]; // between 0.1 (lowest) and 10 (highest)
};

export type SpeechSynthesisVoiceMap = {
  [langCode: string]: {
    code: string;
    endonym: string;
    exonyms: { [langCode: string]: string };
    countries: {
      code: string;
      name_en: string;
      voices: SpeechSynthesisVoice[];
    }[];
  };
};

export type TextToSpeechVoiceArray = {
  code: string;
  endonym: string;
  exonyms: { [langCode: string]: string };
  countries: {
    code: string;
    name_en: string;
    voices: SpeechSynthesisVoice[];
  }[];
}[];

export type UseTextToSpeechReturn = {
  textToSpeechAvailable: boolean;
  speaker: Speaker;
  options: TextToSpeechOptions;
};

export enum TextToSpeechActions {
  SET_VOICES,
  SET_SELECTED_VOICE,
  SET_VOLUME,
  SET_RATE,
  SET_PITCH,
  SET_SPEAKING,
  SET_LANGUAGE,
}

export type BooleanPayloadAction = {
  type: TextToSpeechActions.SET_SPEAKING;
  payload: boolean;
};

export type StringPayloadAction = {
  type: TextToSpeechActions.SET_LANGUAGE;
  payload: string;
};

export type NumberPayloadAction = {
  type:
    | TextToSpeechActions.SET_VOLUME
    | TextToSpeechActions.SET_RATE
    | TextToSpeechActions.SET_PITCH;
  payload: number;
};

export type SelectedVoicePayloadAction = {
  type: TextToSpeechActions.SET_SELECTED_VOICE;
  payload: SpeechSynthesisVoice;
};

export type VoicesPayloadAction = {
  type: TextToSpeechActions.SET_VOICES;
  payload: SpeechSynthesisVoiceMap;
};

export type TextToSpeechReducerAction =
  | StringPayloadAction
  | VoicesPayloadAction
  | SelectedVoicePayloadAction
  | NumberPayloadAction
  | BooleanPayloadAction;
