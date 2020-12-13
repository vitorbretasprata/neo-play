import React from 'react';

import { useMusic } from "../hooks/useMusic";
import { useStorageMusic } from "../hooks/useStorageMusic";


export default function List() {

    const { state } = useMusic();
    const { storageState, storageDispatch } = useStorageMusic();

    return (
      <>
      </>
    );
}
