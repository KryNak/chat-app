import {useEffect, useState} from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Link as RouterLink} from "react-router-dom"
import {Link} from "@mui/material"
import {Alert, Collapse} from "@mui/material";
import * as React from "react";
import {LoginOutlined} from "@mui/icons-material";
import {useNavigate} from "react-router";

export function Login(){
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const errorStr = params.get('error')
        if (errorStr && Boolean(errorStr)) {
            setError(true)
        }

        const success = params.get('success')
        if (success && Boolean(success)) {
            setSuccess(true)
        }

        const path = params.get('path')
        if(path && path === 'register'){
            navigate("/register", {replace: true})
        }
    }, [])

    const handleClose = () => {
        setError(false)
    }

    const theme = createTheme();
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LoginOutlined/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form action={'/performLogin'} method={'post'} style={{marginTop: 1}}>
                        <TextField margin="normal" required fullWidth id="username" label="Login" name="username" autoComplete="username" autoFocus/>
                        <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password"/>
                        <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
                            Sign In
                        </Button>
                        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                            <Link component={RouterLink} to={'/register'} variant="body2">
                                Don't have an account? Sign Up
                            </Link>
                            <Collapse in={error}>
                                <Alert onClose={handleClose} severity="error" sx={{width: '100%', mt: 3}}>
                                    Invalid username or password
                                </Alert>
                            </Collapse>
                            <Collapse in={success}>
                                <Alert onClose={handleClose} severity="success" sx={{width: '100%', mt: 3}}>
                                    You have successfully sign up
                                </Alert>
                            </Collapse>
                        </Box>
                    </form>
                </Box>
            </Container>
        </ThemeProvider>
    );
}