import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';

function App() {

  return (
    <MantineProvider >
    <>
      {/* <Login/> */}
      <Dashboard/>
    </>
    </MantineProvider>
  )
}

export default App
