import Button from "@mui/material/Button";
import {Logout} from "@mui/icons-material";
import Box from "@mui/material/Box";
import {Divider} from "@mui/material";

export function LogoutBar() {

    const boxStyle = {
        width: '100%'
    }

    function logout(e) {
        window.location.assign('/logout')
    }

    return (
        <Box display={'flex'} flexDirection={'column'} sx={boxStyle}>
            <Button startIcon={<Logout/>} onClick={logout} variant="text">Logout</Button>
            <Divider sx={{width: '100%'}}/>
        </Box>
    )
}