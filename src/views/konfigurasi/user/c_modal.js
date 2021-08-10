import { useState, useCallback } from 'react';

const CustomModal = () => {

  const [Modal, setModal] = useState(false);
  const ToggleModal = useCallback(() => {
    setModal(!Modal)
  }, [Modal])

  return [Modal, ToggleModal];
}

export default CustomModal;
