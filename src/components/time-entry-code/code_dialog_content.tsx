import React, { useState, useRef, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SimpleSelect from '../common/dropdown'
import Typography from '@material-ui/core/Typography';

interface CodeContentProps {
    text: string,
    data: any[],
    currentVal: string,
    prop: string,
    isPrimary?: boolean,
    defaultText?: string,
    onChange: (val: string, keyProp: string) => void,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            'border-radius': theme.spacing(0),
            border: '1px solid #FFFFFF',
            padding: theme.spacing(0),
            paddingLeft: theme.spacing(1),
            height: theme.spacing(6),
            display: 'flex',
            'justify-content': 'center',
            'flex-direction': 'column'
        },
        primaryRow: {
            backgroundColor: '#FFFFFF'
        },
        secondryRow: {
            backgroundColor: '#FFFFFF'
        }

    }),
);

export default function CodeContent(props: CodeContentProps) {
    const classes = useStyles();
    const {
        text,
        data,
        currentVal,
        prop,
        isPrimary = true,
        defaultText = "",
        onChange,
    } = props;

    const getStyle = () => {
        return isPrimary ? `${classes.paper} ${classes.primaryRow}` :
            `${classes.paper} ${classes.secondryRow}`;
    }

    const onSelect = (val: string) => {
        onChange(val, prop);
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={0}>
                <Grid item xs={3}>
                    <div className={getStyle()}>
                        {/* <Paper className={classes.paper}> */}
                        <Typography variant="h6" gutterBottom>{text}</Typography>
                    </div>
                    {/* </Paper> */}
                </Grid>
                <Grid item xs={9}>
                    {/* <Paper className={classes.paper}> */}
                    <div className={getStyle()}>
                        <SimpleSelect
                            elements={data}
                            onSelect={onSelect}
                            selectedVal={currentVal}
                            defaultText={defaultText}
                        ></SimpleSelect>
                    </div>
                    {/* </Paper> */}
                </Grid>
            </Grid>
        </div>
    );
}
