import React from 'react'
import moment from 'moment';


const TableAkanNaikPangkatKomponent = ({Data}) => {

  return(

        <table className="table table-bordered">
          <thead>
            <tr>
              <td>No.</td>
              <td>Nama</td>
              <td>Tmt CPNS</td>
              <td>Pangkat</td>
              <td>Golongan</td>
            </tr>
          </thead>
          <tbody>
          {
            Data.map((list, index) =>
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{list.user.nama}</td>
                <td>{moment(list.user.tmt_cpns).format('DD/MM/YYYY')}</td>
                <td>{list.user.pangkat}</td>
                <td>{list.user.golongan}</td>
              </tr>
            )
          }
          </tbody>
        </table>

  )
}

const TableAkanNaikPangkat = React.memo(TableAkanNaikPangkatKomponent)
export default TableAkanNaikPangkat;
