import React, { useState, useContext, useEffect } from 'react';
import {API} from "../../helper";
import {GlobalContext} from "../../globalState";
import {JenisCuti} from "../master/pengajuan-cuti/helper";

const TableSedangCuti = () => {
  const { AsyncToken } = useContext(GlobalContext)

  const [Data, setData] = useState([]);

  const GetData = async () => {
    await API('get','api/beranda/sedang-cuti',null, AsyncToken)
      .then(res => {
        setData(res.data.data)
      }).catch(err => {
        console.log(err)
      })
  }

  useEffect(() => GetData(), [])

  return(
    <table className="table table-hover table-outline mb-0 d-none d-sm-table">
      <thead className="thead-light">
      <tr>
        <th className="text-center">No</th>
        <th>Nama/Nip</th>
        <th>Tanggal Cuti</th>
        <th>Jenis Cuti</th>
        <th>Alasan Cuti</th>
      </tr>
      </thead>
      <tbody>
      {
        Data.map((list, index) =>
        <tr key={index}>
          <td className="text-center">
            {index + 1}
          </td>
          <td>
            <div>{list.user.nama}</div>
            <div className="small text-muted">
              <span>NIP</span> {list.user.nip}
            </div>
          </td>
          <td>
            {
              list.lama_cuti
            }
          </td>
          <td>
            {
              JenisCuti(list.jenis_cuti)
            }
          </td>
          <td>
            {
              list.alasan_cuti
            }
          </td>
        </tr>
        )
      }
      </tbody>
    </table>
  )
}

export default React.memo(TableSedangCuti);
