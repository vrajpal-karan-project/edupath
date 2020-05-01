import React, { useState } from 'react';
import Header from '../../components/Header';
import Drawer from '../../components/Drawer';
import { Backdrop } from '@material-ui/core';
import LoginDialog from '../../components/LoginDialog';
import RegisterDialog from '../../components/RegisterDialog';

const Home = () => {
  const [searching, setSearching] = useState(false);
  const [dialog, setDialog] = useState({});
  const [drawer, setDrawer] = useState(false);

  const handleDialog = (type, open = true) => {
    setDialog({ [type]: open });
    if (drawer)
      setDrawer(false);
  };

  return (
    <>
      <Backdrop open={searching} onClick={() => setSearching(false)} />
      <Header setDrawer={setDrawer} searching={searching} setSearching={setSearching} handleDialog={handleDialog} />
      <Drawer drawer={drawer} setDrawer={setDrawer} handleDialog={handleDialog} />
      <LoginDialog dialog={dialog['login']} handleDialog={handleDialog} />
      <RegisterDialog dialog={dialog['register']} handleDialog={handleDialog} />
    </>
  );
}

export default Home;