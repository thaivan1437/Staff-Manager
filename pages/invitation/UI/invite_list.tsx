import React, { useEffect } from 'react';
import { Grid, Button, ExpansionPanelDetails, ExpansionPanel,
  ExpansionPanelSummary, Typography, Dialog, DialogContent } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { addInviteData, addRolesData, addCompanyID, addDepartmentID } from '../logic/invitation_actions';
import { createMemberInvitation } from '../logic/invitation_reducer';
import { useTranslation } from 'i18n';
import { TFunction } from 'i18next';
import { roleName } from 'helpers/name_roles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BodyCompanies from '../../companies/UI/create_companies';
import { getCompaniesThunkAction, getCompaniesPaginationThunkAction } from 'pages/companies/logic/companies_reducer';
import { Waypoint } from 'react-waypoint';
import { FieldsListInvite } from './fields_list_invite';

interface ExEmail{
  email: string;
}
interface DataType {
  t: TFunction;
}
const InviteList = () => {
  const { t }: DataType = useTranslation();
  const invite = useSelector((state) => state.invitation);
  const companies = useSelector((state) => state.companies);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const exEmail: ExEmail[] = [
    { email: 'example@gmail.com' },
  ];

  useEffect(() => {
    async function fetchDataCompanies() {
      await dispatch(getCompaniesThunkAction());
    }
    void fetchDataCompanies();
  }, []);

  const handleChangeLoadCompany = async() => {
    await dispatch(getCompaniesPaginationThunkAction());
  };

  const CreateMemeberInvite = async() => {
    await dispatch(createMemberInvitation());
  };

  const nameLoading: string = (invite.loading['loading'] === true) ? 'Sending' : 'Send';

  const handleSelectRole = (e: React.ChangeEvent<{ value: unknown}>) => {
    const RoleName = roleName(e.target.value, auth.roles);
    dispatch(addRolesData({ nameRole: RoleName, rolesID: e.target.value }));
  };

  const handleSelectDepartment = (e) => {
    dispatch(addDepartmentID({ [e.target.name] : e.target.value }));
  };

  const [expanded, setExpanded] = React.useState({ panel : '', isExpanded : false });
  const [open, setOpen] = React.useState(false);

  const handleChangeStatusExpand = (panel: string, companyID: string, department: string) => {
    dispatch(addCompanyID(companyID));
    dispatch(addDepartmentID({ departmentID: department }));
    setExpanded({ panel, isExpanded: !expanded.isExpanded });
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby='form-dialog-title' className='addCompany'>
        <DialogContent>
          <BodyCompanies/>
        </DialogContent>
      </Dialog>
      <div className='root-page'>
        <Grid container justify='space-between' alignItems='center' className='invite'>
          <Grid item xs={12} sm={12}>
            <div className='root-pages'>
              <p className='invite--title'>{t('invitation:Invitation')}</p>
              <div className='companies__btn'>
                <Button
                  className='invite--btnCreate'
                  variant='contained'
                  color='primary'
                  size='large'
                  onClick={() => setOpen(true)}
                >
                  {t('invitation:addCompany')}
                </Button>
              </div>
            </div>
          </Grid>
          {auth.access &&
            auth.isAdmin === true ?
            <Grid item xs={12} sm={12} className='invite--company'>
              {companies.list &&
                companies.list.map((item, index) => {
                  return(
                    <Grid key={index} item xs={12} sm={12} className='item--company'>
                      <ExpansionPanel
                        expanded={expanded.panel === `panel${index + 1}` ? expanded.isExpanded : false}
                        square
                        onChange={() => handleChangeStatusExpand(
                        `panel${index + 1}`,
                        item.companyID,
                        item.departmentIDs[0].departmentID,
                        )}
                        className='expand__company'
                      >
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls='panel1bh-content'
                          id='panel1bh-header'
                        >
                          <Typography className='expand--title'>{item.name}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className='exchild'>
                          {expanded.panel === `panel${index + 1}` &&
                            <FieldsListInvite
                              idEmail={`emails${index + 1}`}
                              optionsEmail={exEmail.map((option) => option.email)}
                              defaultValueEmail={[exEmail[0].email]}
                              onChangeEmail={(_, newInputValue) => {
                                dispatch(addInviteData({ ['emails']: newInputValue }));
                              }}
                              handleSelectRole={handleSelectRole}
                              optionsRoles={auth.roles}
                              valueRoleID={invite.rolesID}
                              optionsDepartment={companies.list[index].departmentIDs}
                              handleSelectDepartment={(e) => handleSelectDepartment(e)}
                              defaultValueDepartmentID={companies.list[0].departmentIDs[0].departmentID}
                              valueDepartment={invite.departmentID}
                              resultStatusInvite={invite.loading['result']}
                              nameLoading={nameLoading}
                              CreateMemeberInvite={CreateMemeberInvite}
                            />
                          }
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                      {index === companies.list.length - 1  &&
                        <Waypoint onEnter={() => handleChangeLoadCompany()} />
                      }

                    </Grid>
                  );
                })
              }
            </Grid> :
            <div className='invite--notify'>
              {t('invitation:IsAdmin')}
            </div>
          }
        </Grid>
      </div>
    </React.Fragment>
  );
};
export default InviteList;
