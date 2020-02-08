import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import loadable from '@loadable/component';
import Loading from 'components/Loading';
import makeStyles from '@material-ui/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useTranslation } from 'react-i18next';

const MassList = loadable(() => import('../components/MassList'), {
  fallback: <Loading />,
});

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
}));

function TabPanel(props) {
  const { children, value, index } = props;
  return (
    <div
      hidden={value !== index}
      id={`tabpanel-${index}`}
      role="tabpanel"
      aria-labelledby={`tab-${index}`}
    >
      {children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function MassPage() {
  const classes = useStyles();
  const { t } = useTranslation('mass');
  const [value, setValue] = useState(0);
  return (
    <Paper className={classes.root}>
      <Tabs
        centered
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab id="tab-0" label={t('Year A')} aria-controls="tabpanel-0" />
        <Tab id="tab-1" label={t('Year B')} aria-controls="tabpanel-1" />
        <Tab id="tab-2" label={t('Year C')} aria-controls="tabpanel-2" />
      </Tabs>
      <SwipeableViews index={value} onChangeIndex={(index) => setValue(index)}>
        <TabPanel value={value} index={0}>
          <MassList liturgicalYear="A" />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MassList liturgicalYear="B" />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MassList liturgicalYear="C" />
        </TabPanel>
      </SwipeableViews>
    </Paper>
  );
}
