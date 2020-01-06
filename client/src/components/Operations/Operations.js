import React, {useEffect, useState} from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CircularProgress from "@material-ui/core/CircularProgress";

import ArchivePanel from '../elements/Archive';
import OperationsPanel from '../elements/Operations';
import RecentActivities from "../elements/RecentActivities";
import OperationApi from "../../api/Operation";
import { toast } from "react-toastify";
import { login as updateUser } from '../../store/user/middleware';

function Operations({ user: { isNotAuthenticated }, dispatch }) {
  let [recentOperations, setRecentOperations] = useState(null);
  let [profit, setProfit] = useState(null);
  let [isLoading, setIsLoading] = useState(true);

  const fetchData = () => {
    setIsLoading(true);
    console.log(indexedDB);
    if (!isNotAuthenticated) {
      return Promise.all([OperationApi.recent(), OperationApi.profit()])
        .then(([recentOperations, profit]) => {
          setRecentOperations(recentOperations);
          setProfit(profit);
          return dispatch(updateUser());
        })
        .catch(err => {
          if (err.response) {
            toast.error(err.response.data.message);
          }
        }).finally(() => {
          setIsLoading(false);
        });
    }
    setIsLoading(false);
  };

  const createOperation = (type, resource, quantity) => {
    return OperationApi.create({ type, resource, quantity })
      .then(operation => {
        toast.success(`${quantity} item${quantity > 1 ? 's': ''} of ${resource.toLowerCase()} successfully sold.`);
        return fetchData();
      })
      .catch(err => {
        if (err.response) {
          toast.error(err.response.data.message);
        }
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Route path='/operations'
             render={
               ({ location }) => (
                 !isLoading ?
                   <Grid container spacing={6}>
                     <Grid item xs={12} md={8}>
                       <AppBar position="static">
                         <Tabs value={location.pathname} >
                           <Tab label="Operations" value='/operations' component={Link} to='/operations' />
                           <Tab label="Archive" value='/operations/archive' component={Link} to='/operations/archive'/>
                         </Tabs>
                       </AppBar>
                       <Box className='box'>
                         <Switch>
                           <Route exact path='/operations'>
                             <OperationsPanel profit={profit} createOperation={createOperation} />
                           </Route>
                           <Route path='/operations/archive'>
                             <ArchivePanel />
                           </Route>
                         </Switch>
                       </Box>
                     </Grid>
                     <Grid item xs={12} md={4}>
                       <RecentActivities recentOperations={recentOperations} />
                     </Grid>
                   </Grid>
                   :
                   <CircularProgress />
               )
             }
      />
    </div>
  );
}

export default Operations;