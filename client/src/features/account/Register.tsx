import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert, AlertTitle, List, ListItem, ListItemText, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import agent from '../../app/api/agent';
import { useState } from 'react';
import { toast } from 'react-toastify';

//REACT virtual domu  gercek doma aktarir tek yonlü calisir
// benim grdigim degerler gercek doma girilir, text vb girdiler virtual doma yansıtılmazsa silinir
//virtual dom surekli olarak gercek doma aktarma yapar bos deger varsa yazilanlar silinir
// values.username  olmadan TextField daki value deger alamaz
//handleInputChnge olmadan TextFielda girilen degeri event olarak alamazdin
// const [values, setValues] = useState({
//     username: '',
//     password: ''
// })
// const handleSubmit = (event: any) => {
//     event?.preventDefault();
//     agent.Account.login(values);
// };
// function handleInputChange(event: any) {    // tek fonksiyonla iki kus vurdu // gercek domdaki eventi aldı
//     const { name, value } = event.target;   //name ve value event.target  = girilen element
//     // setValues stateimi guncelliyor; ayri bir is
//     setValues({ ...values, [name]: value }) // state ve name aynı isimle username/password olarak yapildi
// }                         // name="username" e  username valuesu geldi
// // name="password" e  password valuesu geldi

export default function Register() {
    //const history = useNavigate();
    const { register, handleSubmit, setError, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'all'
    })

    function handleApiErrors(errors: any) {
        if (errors) {
            errors.forEach((error: string) => {
                if(error.includes('Password')) {
                    setError('password', {message:error})
                }else if(error.includes('Email')) {
                    setError('email', {message: error})
                }else if(error.includes('Username')) {
                    setError('username', {message: error})
                }
            })
        }
    }

    return (
        <Container
            component={Paper} maxWidth="sm"
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Register
            </Typography>
            <Box component="form"
                onSubmit={handleSubmit((data) => agent.Account.register(data)
                    .then(() => {
                        toast.success('Registration successful- you can now login');
                    })
                    .catch(error => handleApiErrors(error)))}
                noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    fullWidth
                    label="Username"
                    autoFocus
                    {...register('username', { required: 'Username is required' })}
                    error={!!errors.username}      //make it boolean  !!
                    helperText={errors?.username?.message as string}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Email address"
                    {...register('email', {
                        required: 'Email is required' ,
                        pattern: {
                            value:/^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
                            message:'Not a valid email address'
                        }})}
                    error={!!errors.email}      //make it boolean  !!
                    helperText={errors?.email?.message as string}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    {...register('password', {
                        required: 'Password is required',
                        pattern:{
                            value: /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                            message: 'password does not meet complexity requirements'
                        }
                    })}
                    error={!!errors.password} //make it boolean  !!
                    helperText={errors?.password?.message as string}
                />
                <LoadingButton loading={isSubmitting}
                    disabled={!isValid}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Register
                </LoadingButton>
                <Grid container>
                    <Grid item>
                        <Link to="/login">
                            {"Already have an account? Sign In"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}