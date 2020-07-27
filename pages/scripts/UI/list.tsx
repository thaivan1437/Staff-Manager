import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog } from '@material-ui/core';
import { getScriptsActions, getScriptPaginationAction } from '../logic/scripts_reducer';
import ScriptsItem from './item';
import { updateScript, deleteScript, statusScripts } from '../logic/scripts_actions';
import { UpdateScripts } from './update';
import Loading from '../../../components/loading/loading';
import { DeleteScript } from './delete';
import { Waypoint } from 'react-waypoint';

const ListScripts = () => {
  const dispatch = useDispatch();
  const scripts = useSelector((state) => state.scripts);
  const auth = useSelector((state) => state.auth);

  const [open, setOpen] = React.useState({ scriptsUpdate: false, scriptsDelete: false });
  const handleUpdate = async(item, index) => {
    await dispatch(updateScript(
      { updateScript: {
        index,
        title: item.title,
        content: item.content,
        scriptID: item.scriptID,
      } },
    ));
    setOpen({ ...open, scriptsUpdate: true });
    await dispatch(statusScripts({ status: 0 })); // clear notification when closed dialog
  };

  const handleDelete = async(item, index) => {
    await dispatch(deleteScript(
      { deleteScript: {
        index,
        scriptID: item.scriptID,
      } },
    ));
    setOpen({ ...open, scriptsDelete: true });
    await dispatch(statusScripts({ status: 0 })); // clear notification when closed dialog
  };

  useEffect(() => {
    void fetchListScripts(); // fetch list script
  }, [auth]);
  async function fetchListScripts() {
    await dispatch(getScriptsActions());
  }

  const handleLoadPagination = async() => {
    await dispatch(getScriptPaginationAction());
  };

  return (
    <React.Fragment>
      <Dialog
        open={open.scriptsUpdate}
        onClose={() => setOpen({ ...open, scriptsUpdate: false })}
        fullWidth={true}
        maxWidth='md'
      >
        <div className='wrap__create'>
          <UpdateScripts />
        </div>
      </Dialog>
      <Dialog
        open={open.scriptsDelete}
        onClose={() => setOpen({ ...open, scriptsDelete: false })}
        fullWidth={true}
        maxWidth='sm'
      >
        <DeleteScript />
      </Dialog>
      {scripts.list &&
        scripts.list.map((item, index) => {
          return(
            <div key={index} className='list-item'>
              <div>
                <ScriptsItem
                  item={item}
                  handleUpdate={() => handleUpdate(item, index)}
                  handleDelete={() => handleDelete(item, index)}
                />
              </div>
              {index === scripts.list.length - 1  &&
                <Waypoint onEnter={() => handleLoadPagination()} />
              }
            </div>
          );
        })
      }
      <div className='loading-scripts'>
        <Loading loading={scripts.loading.loading}/>
      </div>
    </React.Fragment>
  );
};
export default ListScripts;
