import React from 'react';
import FaceIcon from '@material-ui/icons/Face';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PhoneIcon from '@material-ui/icons/Phone';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import FormatIndentDecreaseIcon from '@material-ui/icons/FormatIndentDecrease';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import TimelineIcon from '@material-ui/icons/Timeline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
interface CompaniesValues {
  name: string;
}

// tslint:disable-next-line:cyclomatic-complexity
export const Icons: React.FunctionComponent<CompaniesValues> = ({ name= '' }) => {
  switch (name){
    case 'FaceIcon':
      return (
        <React.Fragment>
            <FaceIcon />
        </React.Fragment>
      );
    case 'LocationOnIcon':
      return (
        <React.Fragment>
            <LocationOnIcon />
        </React.Fragment>
      );
    case 'MenuBookIcon':
      return (
        <React.Fragment>
            <MenuBookIcon />
        </React.Fragment>
      );
    case 'PhoneIcon':
      return (
        <React.Fragment>
            <PhoneIcon />
        </React.Fragment>
      );
    case 'EuroSymbolIcon':
      return (
        <React.Fragment>
            <EuroSymbolIcon />
        </React.Fragment>
      );
    case 'LocalAtmIcon':
      return (
        <React.Fragment>
            <LocalAtmIcon />
        </React.Fragment>
      );
    case 'HourglassEmptyIcon':
      return (
        <React.Fragment>
            <HourglassEmptyIcon />
        </React.Fragment>
      );
    case 'FormatIndentDecreaseIcon':
      return (
        <React.Fragment>
            <FormatIndentDecreaseIcon />
        </React.Fragment>
      );
    case 'DeveloperModeIcon':
      return (
        <React.Fragment>
            <DeveloperModeIcon />
        </React.Fragment>
      );
    case 'HomeWorkIcon':
      return (
        <React.Fragment>
            <HomeWorkIcon />
        </React.Fragment>
      );
    case 'TimelineIcon':
      return (
        <React.Fragment>
            <TimelineIcon />
        </React.Fragment>
      );
    case 'AccountCircleIcon':
      return (
        <React.Fragment>
            <AccountCircleIcon />
        </React.Fragment>
      );
    default:
      return null;
  }
};
