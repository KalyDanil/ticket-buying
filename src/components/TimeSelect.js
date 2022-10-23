import { MenuItem, TextField } from '@mui/material';
import { oneWayTravelMinutes } from '../utils/constants';
import PropTypes from 'prop-types'

const TimeSelect = (props) => {

  const getTimeByTimeZone = (hour, minute) => {
    return (new Date(
      (new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate(), hour, minute
    )).toString();
  };

  if (props.isSpecial) {
    return (
      <TextField
        className="timeSelect"
        label={props.label}
        defaultValue=""
        select
        onChange={props.selectTimeFrom}
      >
        {props.timeFromTo.map((time, index) => {
          const hour = Object.keys(time)[0];
          const minute = time[hour];
          if ((new Date(getTimeByTimeZone(hour, minute)) - new Date(props.chosenTimeFromA)) >= 60000 * oneWayTravelMinutes) {
            return <MenuItem key={index} value={getTimeByTimeZone(hour, minute)}>{getTimeByTimeZone(hour, minute)}</MenuItem>
          }
          return [];
        })}
      </TextField >
    )
  }

  return (
    <TextField 
      className="timeSelect"
      label={props.label}
      defaultValue=""
      select
      onChange={props.selectTimeFrom}
    >
      {props.timeFromTo.map((time, index) => {
          const hour = Object.keys(time)[0];
          const minute = time[hour];
          return (
            <MenuItem key={index} value={getTimeByTimeZone(hour, minute)}>{getTimeByTimeZone(hour, minute)}</MenuItem>
          );
      })}
    </TextField>
  )
};

TimeSelect.propTypes = {
  timeFromTo: PropTypes.array.isRequired,
  selectTimeFrom: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  isSpecial: PropTypes.bool,
  chosenTimeFromA: PropTypes.string
};

TimeSelect.defaultProps = {
  isSpecial: false,
  chosenTimeFromA: '',
}

export default TimeSelect;