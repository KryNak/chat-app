import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import {Link as RouterLink} from "react-router-dom"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import {useState} from "react";
import {Alert, Collapse} from "@mui/material";
import {useNavigate} from "react-router";


const theme = createTheme();

export function Register() {

    let [error, setError] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        axios.post('/api/register', {
            username: data.get('login'),
            password: data.get('password'),
            passwordRepetition: data.get('password-repetition')
        })
            .then(e => {
                navigate("/login?success=true", {replace: true})
            })
            .catch(e => {
                if(e.response.status === 400){
                    setError(true)
                }
            })
    };

    const handleClose = () => {
        setError(false)
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField required fullWidth id="login" label="Login" name="login" type="text" autoComplete="login"/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password"/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required fullWidth name="password-repetition" label="Repeat Password" type="password" id="password-repetition" autoComplete="new-password-repetition"/>
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign Up
                        </Button>
                        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                            <Link component={RouterLink} to={'/login'} variant="body2">
                                Already have an account? Sign in
                            </Link>
                            <Collapse in={error}>
                                <Alert onClose={handleClose} severity="error" sx={{width: '100%', mt: 3}}>
                                    Invalid username or password
                                </Alert>
                            </Collapse>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}