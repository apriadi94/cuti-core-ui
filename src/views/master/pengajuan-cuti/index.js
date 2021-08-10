import {useContext} from 'react';
import {GlobalContext} from "../../../globalState";
import PengajuanByUser from "./PengajuanByUser";
import PengajuanByAdmin from "./PengajuanByAdmin";

const PengajuanCuti = () => {
  const {User} = useContext(GlobalContext)
  return (
    User.otoritas === 1 ?
    <PengajuanByAdmin/> : <PengajuanByUser/>
  )
}

export default PengajuanCuti;
