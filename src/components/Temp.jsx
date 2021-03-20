import React, { useState, useEffect } from 'react'
import { Grid, Container, Typography, InputBase, Card, CardMedia, CardContent, CardActions, ClickAwayListener } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PersonPinCircleSharpIcon from '@material-ui/icons/PersonPinCircleSharp';
import summer from '../images/summer.jpg'
import cloud from '../images/cloud.jpg'
import rain from '../images/rain.jpg'

import zIndex from '@material-ui/core/styles/zIndex';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100vw",
        height: "100vh",
        background: theme.palette.grey[300],
        padding: 50
    },


    cloud: {
        backgroundColor: "grey",
        height: 400,
        width: 400,

    },
    rain: {
        backgroundColor: "khakhi",
        height: 400,
        width: 400,

    },

    summer: {
        backgroundColor: "skyblue",
        height: 400,
        width: 400,
    },
    input: {
        // marginLeft: theme.spacing(),
        width: "100%",
        flex: 1,
        padding: 10,
        backgroundColor: "white",
    },
    typ: {
        textTransform: "capitalize",
        color: "yellow",
        fontSize: 20,
        fontWeight: 700,
        fontFamily: "pangolin",
        textShadow: "2px 3px 6px 3px",
        // padding: 5,
        // textAlign: "center"
    },




}))


export default function Temp() {
    const [city, setCity] = useState(null)
    const [search, setSearch] = useState("pune")
    const [allData, setAllData] = useState([])
    // const [weathers, setWeathers] = useState([])
    // const [cuntry, setCuntry] = useState([])

    useEffect(() => {
        try {
            const fecthApi = async () => {
                const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&appid=5449f9013b218a22dbbfffbcdcdab198`
                const response = await fetch(url);
                const resjson = await response.json()
                // console.log(resjson.weather);
                // setWeathers(resjson.weather)
                // setCity(resjson.name)
                setAllData(resjson)
                console.log(resjson);
                // console.log(resjson.sys.country);
            }
            fecthApi();
        }
        catch (err) {
            throw err.message
        }






    }, [search])

    const callApi = (e) => {
        setSearch(e.target.value)
    }
    const date = new Date().getDay()

    const fullDate = new Date().getDate() + "," + new Date().getDate() + " " + new Date().getMonth() + " " + new Date().getFullYear()

    console.log(date);



    const classes = useStyles();
    return (
        <>
            <Container className={classes.root} >

                <Grid Container>
                    <Grid item sm={3}>
                        <Card >

                            <CardMedia image={cloud} className={classes.rain} >
                                <cardActions>
                                    <InputBase

                                        className={classes.input}
                                        placeholder="Enter City Name"
                                        inputProps={{ 'aria-label': 'search google maps' }}
                                        onChange={callApi}
                                    />
                                </cardActions>

                                {
                                    (typeof allData.name != "undefined")

                                        ? (<>
                                            <CardContent>

                                                <Typography variant="body" className={classes.typ}>

                                                    {fullDate}
                                                </Typography>
                                                <Typography variant="h3" className={classes.typ}>

                                                    {allData.name}
                                                </Typography>
                                                <Typography variant="body" className={classes.typ}>

                                                    {allData.sys.country}
                                                </Typography>
                                                <div className={classes.weatherBox}>   <Typography variant="h6" className={classes.typ}>

                                                    {Math.round(allData.main.temp) - 273}°C

                                                </Typography></div>

                                                <Typography variant="h4" className={classes.typ}>

                                                    {allData.weather[0].main}
                                                </Typography>
                                            </CardContent>
                                        </>)
                                        : <Typography variant="h6" className={classes.typ}>No Data Found</Typography>}


                            </CardMedia>
                        </Card>
                    </Grid>
                </Grid>

            </Container>


        </>
    )
}












// weather:[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}]