import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Router from "next/router";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid transparent',
  borderRadius : 5,
  boxShadow: 24,
  p: 4,
};

const state = {
  competitionId : 1,
  leaderUserName: "andres123",
  teamId: 'TM000000'
}

const competitionDetails = {
  name:'',
  description:'',
  teamMembersMax:0,
  institution_city:''
}

const validationDetail = {
  validationsPassed: ''
}

const createUser = async () => {

  let config = {
    method: 'POST',
    headers: {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(state)
  }
  let r= await fetch("http://localhost:3000/api/team/enrollment", config)
  let data = await r.json()
  console.log(data);
  validationDetail.validationsPassed=data.validationsPassed;
}

let getDetails = async e => {
  var config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body : JSON.stringify(state)
  }
  let details = await fetch('http://localhost:3000/api/details',config)
  let data = await details.json();
  //console.log(data);
  competitionDetails.name = data.name;
  competitionDetails.description = data.description;
  competitionDetails.teamMembersMax = data.teamMembersMax;
  competitionDetails.institution_city = data.institution_city;
}

export default function Details() {
  const [open, setOpen] = React.useState(false);
  var details = getDetails();
  var validation = createUser();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleJoin = async e => {

    if(validationDetail.validationsPassed){
      var config = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(state)
      }
      let details = await fetch('http://localhost:3000/api/competition/join',config)
      let data = await details.json();
      console.log(data);
      Router.push('/competitions/success_register');
      
    }else{
      Router.push('/competitions/fail_register')
    }
  }

  return (
    <div>
      <div id='information'>
        <b>Competition Id: </b>
        <p id='competition-id'>{state.competitionId}</p>

        <b>Leader username: </b>
        <p id='leader-username'>{state.leaderUserName}</p>

        <b>Team Id: </b>
        <p id='team-id'>{state.teamId}</p>
      </div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-competition-name" variant="h5" component="h2">
            {competitionDetails.name}
          </Typography>

          <div id='modal-content'>

            <Typography id="modal-competition-description-head" sx={{ mt: 2, color: '#8B8B8B' }}>
                Description
            </Typography>

            <Typography id="modal-competition-description" sx={{ mt: 2 }}>
                {competitionDetails.description}
            </Typography>

            <Typography id="modal-competition-venue-head" sx={{ mt: 2, color: '#8B8B8B' }}>
                Venue/s
            </Typography>

            <Typography id="modal-competition-venue" sx={{ mt: 2 }}>
                {competitionDetails.institution_city} 
            </Typography>

            <Typography id="modal-competition-max-members-head" sx={{ mt: 2, color: '#8B8B8B' }}>
                Max. Members
            </Typography>

            <Typography id="modal-competition-max-members" sx={{ mt: 2 }}>
              {competitionDetails.teamMembersMax}
            </Typography>
          </div>

          <Box sx={{ display:'flex' ,justifyContent:'center'}}>
            <Button sx={{width:100, backgroundColor: '#01A4FF', color: '#FFFFFF', borderRadius: 2}} variant='contained    ' onClick={handleJoin}>
                Join
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}




