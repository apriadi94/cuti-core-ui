import React, {useContext, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import LogoGambar from '../../../assets/logo.png';
import CIcon from '@coreui/icons-react'
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import {GlobalContext} from "../../../globalState";


const Login = ({history}) => {
  const {CheckApakahLogin} = useContext(GlobalContext)
  const [Loading, setLoading] = useState(false);
  const [Form, setForm] = useState({ username : '', password : ''});

  const HandleForm = (e) => {
    setForm({...Form, [e.target.name] : e.target.value})
  }

  const CobaLogin = async () => {
    setLoading(true);
    await axios({
      method: 'post',
      url: `${process.env.REACT_APP_BASE_URL}/api/auth/login`,
      data: Form,
      config: { headers: {
          'Accept': 'application/json'
        }}
    }).then(res => {
      localStorage.setItem('login', true);
      localStorage.setItem('token', JSON.stringify(res.data.data.token));
      CheckApakahLogin(res.data.data.token);
      history.push('/')
    }).catch(function (error) {
      if(error.response && error.response.status === 401){
        swal({
          title: "Perhatian",
          text: "Username atau password salah!",
          icon: "error",
        });
      }
    });
    setLoading(false);
  }

  useEffect(() => {
    return(() => {
      setForm({ username : '', password : ''})
    })
  }, [])

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Login {process.env.REACT_APP_NAME}</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" name={'username'} value={Form.username} onChange={HandleForm} placeholder="Email / Username" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" name={'password'} value={Form.password} onChange={HandleForm} placeholder="Password" autoComplete="current-password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton disabled={Loading} onClick={CobaLogin} color="primary" className="px-4">{Loading ? 'Loading...' : 'Login'}</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Lupa Password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>{process.env.REACT_APP_NAME}</h2>
                    <p>Sistem Aplikasi Administrasi Kepegawaian Online, merupakan inovasi Pengadilan Negeri Kefamenanu, mempermudah dalam pengajuan cuti dan pembuatan formulir cuti secara otomatis.</p>
                  </div>
                  <br/>
                  <div>
                    <p>@copyright Pengadilan Negeri Kefamenanu</p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default withRouter(Login)
