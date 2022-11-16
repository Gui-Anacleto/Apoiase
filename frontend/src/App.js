import React,{useState} from 'react';
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Container  from "@mui/material/Container"
import TextareaAutosize from "@mui/material/TextareaAutosize"
import "react-datepicker/dist/react-datepicker.css"
import api from './services/api'
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';


var moment = require('moment');



function App() {

  var dateNow = Date.now()
  console.log(dateNow)//1668452195529

  var d = moment(dateNow).format('YYYY-MM-DD[T]HH:mm:ss')
  //var d = moment(dateNow).format('YYYY-MM-DD[T]HH:mm:ss')
  //console.log(d.format('YYYY-MM-DD[T]HH:mm:ss'));
  //console.log(d)

  const [name, setName] = useState('')
  const [body, setBody] = useState('')
  const [data, setValue] = useState(d);
  
  const handleChange = (newValue) => {
    setValue(newValue);
    
  }

  var dateNowStr= new Date(dateNow)
  //console.log(dateNowStr)//Mon Nov 14 2022 15:56:35 GMT-0300 (Horário Padrão de Brasília)

  let formatDateNow = new Date(dateNowStr).toISOString();
  console.log(formatDateNow)//2022-11-14T18:56:35.529Z


async function handleSubmit(e){
  e.preventDefault();


    const response = await api.post('/campanhas', {
      name,
      body,
      data
    })
    
    setName('')
    setBody('')
    setValue(d)
    
}

function valida(){
  
  if((data === d) || (data < d)){
    limpa()
    return alert("Não foi possível agendar sua postagem - Por favor, selecione um horário pelo menos 5 minutos no futuro.")
    
  }else{
    return alert(`Tudo pronto! - Sua postagem está agendada para ${dateNowStr}`)
  }
}

function limpa(){
  setName('')
  setBody('')
  setValue(d)
    
}

  return (
    
    <div id="app">
      
      <main>
        <Container maxWidth="xs">
        <Box mb={1}>
          <Typography variant="h3" component="h2" >
            Campanhas
          </Typography>
        </Box>
          <form onSubmit={handleSubmit}>
      
            <Box mb={1}>
              <TextField 
                variant="outlined" 
                label="Digite o nome" 
                margin="none"
                fullWidth
                value={name}
                required
                onChange={e => setName(e.target.value)}

              />
            </Box>
            <Box mb={1}>
              <TextareaAutosize
                
                aria-label="empty textarea"
                minRows={20}
                placeholder="Digite o corpo da campanha"
                style={{ width: 390}}
                value={body}
                required
                onChange={e => setBody(e.target.value)}
              />
            </Box>
            
         
            <Box mb={1}>
              <Typography variant="h5" mb={2}>
                Escolher data
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
        
              <Box mb={1}>
                  
                <Stack spacing={3}>
                  <DesktopDatePicker
                    label="Date desktop"
                    inputFormat="DD/MM/YYYY"
                    value={data}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                    
                  />
                  <TimePicker
                    label="Time"
                    value={data}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                    
                  />

                </Stack>
              </Box>
              </LocalizationProvider>
            </Box>
            
            <Stack spacing={1} direction="row">
                <Button type="reset" color="error" onClick={limpa}> Cancelar</Button>
                <Button variant="contained" type="submit" onClick={valida}> Agendar</Button>

            </Stack>
            
              
            
            <Box>
            
            </Box>
          </form>
        </Container>
      </main>
    </div>
  );
}

export default App;
