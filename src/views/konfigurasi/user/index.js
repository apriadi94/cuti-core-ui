import React, {useContext} from 'react';
import UserAdmin from './admin';
import UserBiasa from "./user";
import {GlobalContext} from "../../../globalState";

const UserKonfigurasi = () => {
  const {User} = useContext(GlobalContext)
  return(
    User.otoritas === 1 ?
    <UserAdmin/> : <UserBiasa/>
  )
}

export default UserKonfigurasi;
