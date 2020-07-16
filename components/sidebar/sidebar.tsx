import React, { useState } from 'react';
import { Link } from 'i18n';
import { listCard } from '../../constants/sidebar_tab';
import { Button, Collapse, List, ListItem } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Icons } from '@components/icon/icon';

const Sidebar: React.FunctionComponent = () => {
  const [isCollapse, setIsCollapse] = useState('');
  const sateCollapse = (tab) => {
    isCollapse === '' ?
    setIsCollapse(tab) :
    setIsCollapse('');
  };

  return (
    <div className='app-sidebar'>
        <div className='sidebar__user'>
          <img src='../../static/images/bg_conversations.jpg' alt=''/>
          <p className='sidebar_name'>Emma Taylor</p>
          <p className='sidebar_desc'>Senior Web Developer</p>
          <Button>View profile</Button>
        </div>
        <List
          component='nav'
        >
          {listCard.map((item, index) => (
            <div key={index}>
              {item.object.map((value, indexP) => (
                <div className='sidebar__item' key={indexP}>
                  <ListItem button onClick={() => sateCollapse(value.tab)} className='sidebar_list'>
                    <ListItem className='sidebar_link'>
                      <Icons name={value.icon} />
                      <Link href={value.router}>
                        <a>{value.name}</a>
                      </Link>
                    </ListItem>
                    {value.tab === isCollapse ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={true} timeout='auto'>
                    <List
                      component='div'
                      disablePadding
                      className={`sidebar__collapse ${value.tab === isCollapse ? 'show' : ''}`}
                    >
                      <ListItem button disableGutters={true}>
                        {value.objectChild.map((obj, indexChild) => (
                          <Link href={obj.router} key={indexChild}>
                            <a className='sidebar__label'>{obj.name}</a>
                          </Link>
                        ))}
                      </ListItem>
                    </List>
                  </Collapse>
                </div>
              ))}
            </div>
          ))}
        </List>
    </div>
  );
};

export default Sidebar;
