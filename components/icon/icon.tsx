import React from 'react';
import FaceIcon from '@material-ui/icons/Face';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PhoneIcon from '@material-ui/icons/Phone';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import ForumIcon from '@material-ui/icons/Forum';
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
    case 'HomeWorkIcon':
      return (
        <React.Fragment>
            <HomeWorkIcon />
        </React.Fragment>
      );
    case 'AccountCircleIcon':
      return (
        <React.Fragment>
            <AccountCircleIcon />
        </React.Fragment>
      );
    case 'AllInboxIcon':
      return (
        <React.Fragment>
            <AllInboxIcon />
        </React.Fragment>
      );
    case 'PermContactCalendarIcon':
      return (
        <React.Fragment>
            <PermContactCalendarIcon />
        </React.Fragment>
      );
    case 'ForumIcon':
      return (
        <React.Fragment>
            <ForumIcon />
        </React.Fragment>
      );
    default:
      return null;
  }
};
