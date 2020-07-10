import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TFunction } from 'next-i18next';
import { getMemberProfilesAction, departmentMembersPaginationAction, getListDpMembersAction } from '../logic/departments_reducer';
import { TableContainer, Table, TableBody, TableRow, TableCell, TableHead } from '@material-ui/core';
import { getDpMemberProfiles, showLoaderListMember, showLoaderMemberProfiles } from '../logic/departments_action';
import { convertDateFormat } from 'helpers/date';
import { useTranslation } from 'i18n';
import Loading from '../../../components/loading/loading';
import { Waypoint } from 'react-waypoint';

interface DataType {
  t: TFunction;
}

const MemberList: React.FunctionComponent = () => {
  const { t }: DataType = useTranslation();
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.departments);
  const auth = useSelector((state) => state.auth);
  const loadingList = departments.loadingList;

  const departmentsList = departments && departments.list && Array.isArray(departments.list)
  ?  departments.list.map((each) => each) : [];

  const handleMemberItem = async (e) => {
    await dispatch(getDpMemberProfiles(
      { newMemberItem: {
        id: e.currentTarget.id,
      } },
    ));
    await dispatch(showLoaderMemberProfiles());
    await dispatch(getMemberProfilesAction());
  };

  const handleLoadMember = async() => {
    await dispatch(departmentMembersPaginationAction());
  };
  useEffect(() => {
    if (!auth.companyID || !auth.departmentID) {
      return;
    }
    void fetchDataDepartment();
  }, [auth]);

  const fetchDataDepartment = async() => {
    await dispatch(getListDpMembersAction());
    await dispatch(showLoaderListMember());
  };

  return (
    <div className='departments_table'>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('departments:member')}</TableCell>
              <TableCell align='left'>{t('departments:point')}</TableCell>
              <TableCell align='left'>{t('departments:createdAt')}</TableCell>
              <TableCell align='left'>{t('departments:status')}</TableCell>
            </TableRow>
          </TableHead>
          {departmentsList.map((item, index) => {
            return (
              <TableBody
                key={item.userID.userID}
                id={item.userID.userID}
                onClick={handleMemberItem}
              >
                <TableRow>
                  <TableCell align='left'>
                    <div className='departments__item'>
                      <img
                        src='../../../static/images/avatar.jpg'
                        className='departments__photo'
                      />
                      <div>
                        <p className='departments__name'>{item.roleID.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align='left'>{item.point}</TableCell>
                  <TableCell align='left'>{convertDateFormat(new Date(item.createdAt))}</TableCell>
                  <TableCell align='left'>{item.userID.status}</TableCell>
                  {index === departmentsList.length - 1  &&
                    <td className='h-100'><Waypoint onEnter={() => handleLoadMember()} /></td>
                  }
                </TableRow>
              </TableBody>
            );
          })
          }
        </Table>
      </TableContainer>
      <div className='item__table'>
        <Loading loading={loadingList}/>
      </div>
    </div>
  );
};

export default(MemberList);
