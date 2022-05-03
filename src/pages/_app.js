import '../styles/globals.css'
import { wrapper } from "../redux/store"
import { useEffect } from "react";
import MainLayout from '../layout/mainLayout';

const { io } = require('socket.io-client');
const socket = io(process.env.SERVER_URL);

function MyApp(prop) {
  useEffect(() => {
    socket.on('Greeting', (res) => {
      console.log(res, 'isi resnya');
    })
    if (window && localStorage.getItem('idMember')) {
      const idMember = localStorage.getItem('idMember')
      socket.emit('Online', {
        idMember
      })
    }
  })
  return (
    <MainLayout>
      <prop.Component {...prop.pageProps} />  
    </MainLayout>
  ) 
}

export default wrapper.withRedux(MyApp)
