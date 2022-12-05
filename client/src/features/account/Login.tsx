import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Link ,useNavigate} from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '../../app/store/configureStore';
import { signInUser } from './accountSlice';

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

export default function Login() {
    const history = useNavigate();
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'all'
    })

    async function submitForm(data: FieldValues) {
        try {
            await dispatch(signInUser(data));
            history('/catalog');
        } catch (error) {
            console.log(error);
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
                Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    fullWidth
                    label="Username"
                    autoFocus
                    {...register('username', { required: 'username is required' })}
                    error={!!errors.username}      //make it boolean  !!
                    helperText={errors?.username?.message as string}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    {...register('password', { required: 'Password is required' })}
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
                    Sign In
                </LoadingButton>
                <Grid container>
                    <Grid item>
                        <Link to="/register">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}