import { Input, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';
import { Appstyle } from './App.style';
import TimeSelect from './components/TimeSelect';
import { oneWayTravelMinutes, timeFromAtoB, timeFromBtoA } from './utils/constants';

function App() {
  const [chosenPath, setChosenPath] = useState('');
  const [chosenTimeFromA, setChosenTimeFromA] = useState(''); 
  const [chosenTimeFromB, setChosenTimeFromB] = useState('');
  const [timeIsChosen, setTimeIsChosen] = useState(false);
  const [departureTime, setDepartureTime] = useState(''); 
  const [travelTime, setTravelTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [ticketsNumber, setTicketsNumber] = useState('');
  const [sum, setSum] = useState(0);

  const selectPath = (e) => {
    setChosenPath(e.target.value);
    setChosenTimeFromA('');
    setChosenTimeFromB('');
    setTimeIsChosen(false);
    setSum(0);
    setTicketsNumber('');
  };

  const selectTimeFromA = (e) => {
    setChosenTimeFromA(e.target.value);
    setSum(0);
    switch (chosenPath) {
      case 'из A в B':
        setTimeIsChosen(true);
        break;
      case 'из B в A':
        break;
      case 'из A в B и обратно в А':
        if(chosenTimeFromB !== '') {
          setTimeIsChosen(true);
        }
        break;
      default:
        break;
    }
  };

  const selectTimeFromB = (e) => {
    setChosenTimeFromB(e.target.value);
    setSum(0);
    switch (chosenPath) {
      case 'из A в B':
        break;
      case 'из B в A':
        setTimeIsChosen(true);
        break;
      case 'из A в B и обратно в А':
        if(chosenTimeFromA !== '') {
          setTimeIsChosen(true);
        }
        break;
      default:
        break;
    }
  };

  const inputTicketsNumber = (e) => {
    setSum(0);
    setTicketsNumber(e.target.value);
  };

  const getOneWayTripMilliseconds = (startTime) => {
    return new Date(startTime).getTime() + 60000 * oneWayTravelMinutes;
  };

  const getResult = (e) => {
    e.preventDefault();
    switch (chosenPath) {
      case 'из A в B':
        setDepartureTime(chosenTimeFromA);
        setSum(ticketsNumber * 700);
        setArrivalTime(new Date(getOneWayTripMilliseconds(chosenTimeFromA)).toString());
        setTravelTime(`${oneWayTravelMinutes} минут`);
        break;
      case 'из B в A':
        setDepartureTime(chosenTimeFromB);
        setSum(ticketsNumber * 700);
        setArrivalTime(new Date(getOneWayTripMilliseconds(chosenTimeFromB)).toString());
        setTravelTime(`${oneWayTravelMinutes} минут`);
        break;
      case 'из A в B и обратно в А':
        const hours = ( (getOneWayTripMilliseconds(chosenTimeFromB) - new Date(chosenTimeFromA).getTime())/ 60000 )/ 60;
        setDepartureTime(chosenTimeFromA);
        setArrivalTime(new Date(getOneWayTripMilliseconds(chosenTimeFromB)).toString());
        setTravelTime(`${Math.floor(hours)} часов ${Math.round(60 * (hours - Math.floor(hours)))} минут`)
        setSum(ticketsNumber * 1200);
        break;
      default:
        break; 
    }
  };

  return (
    <Appstyle>
      <TextField 
        className="pathSelect"
        label="Направление"
        defaultValue=""
        select
        onChange={(e) => selectPath(e)}
      >
        <MenuItem value="из A в B">из A в B</MenuItem>
        <MenuItem value="из B в A">из B в A</MenuItem>
        <MenuItem value="из A в B и обратно в А">из A в B и обратно в А</MenuItem>
      </TextField >
      {chosenPath === 'из A в B' 
      && <TimeSelect label="Время отправления из А в В" timeFromTo={timeFromAtoB} selectTimeFrom={(e) => selectTimeFromA(e)}/>
      }
      {chosenPath === 'из B в A'
      && <TimeSelect label="Время отправления из В в А" timeFromTo={timeFromBtoA} selectTimeFrom={(e) => selectTimeFromB(e)}/>
      }
      {chosenPath === 'из A в B и обратно в А'
      && 
      <>
        <TimeSelect label="Время отправления из А в В" timeFromTo={timeFromAtoB} selectTimeFrom={(e) => selectTimeFromA(e)}/>
        <TimeSelect 
          label="Время отправления из В в А" 
          timeFromTo={timeFromBtoA} 
          selectTimeFrom={(e) => selectTimeFromB(e)}
          isSpecial={true}
          chosenTimeFromA={chosenTimeFromA}
        />
      </>
      }
      {timeIsChosen 
      &&  <form className="sumСalculation" onSubmit={(e) => getResult(e)}>
            <TextField label="Количество билетов" onInput={(e) => inputTicketsNumber(e)} value={ticketsNumber}/>
            <Input className="sumСalculation__inputSubmit" type="submit" variant="contained"  value="Посчитать" />
          </form>
      }
      {sum !== 0
       && <p>
          Вы выбрали {ticketsNumber} билета по маршруту {chosenPath}, сумма покупки {sum} р.
          Это путешествие займет у вас {travelTime}. 
          Теплоход отправляется в {departureTime}, а прибудет в пункт назначения в {arrivalTime}.
          </p>
      }
      
    </Appstyle>
  );
}

export default App;
