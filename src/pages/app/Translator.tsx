import { Typography, Box } from '@mui/material';
import { Main, Options, Record } from '.';

import { useState } from 'react';

import { useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/userSlice/thunks';

import useSpeechToText from '../../hooks/useSpeechToText';
import useTextToSpeech from '../../hooks/useTextToSpeech';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import React from 'react';
import { Page, UserProfile } from '../../types/app';

const Translator: React.FC<{ user: UserProfile }> = (): JSX.Element => {
  const userDispatch = useAppDispatch();
  const [page, setPage] = useState(Page.MAIN);

  const {
    speechToTextAvailable,
    microphone,
    options: micOptions,
  } = useSpeechToText();

  const {
    textToSpeechAvailable,
    speaker,
    options: speakOptions,
  } = useTextToSpeech();

  const handleLogout = () => {
    userDispatch(logout());
  };

  if (!speechToTextAvailable || !textToSpeechAvailable) {
    return (
      <>
        {!speechToTextAvailable && (
          <Typography>Speech to Text not supported on this browser</Typography>
        )}
        {!textToSpeechAvailable && (
          <Typography>Text to Speech not supported on this browser</Typography>
        )}
      </>
    );
  }

  return (
    <Box width={'100%'} height={'100%'}>
      <Header handleLogout={handleLogout} setPage={setPage} />
      {page === Page.MAIN && <Main speaker={speaker} microphone={microphone} />}
      {page === Page.OPTIONS && (
        <Options
          micOptions={micOptions}
          speakOptions={speakOptions}
          getVoices={speaker.getVoiceMap}
        />
      )}
      {page === Page.HISTORY && <Record />}
      <Footer page={page} setPage={setPage} />
    </Box>
  );
};

export default Translator;
