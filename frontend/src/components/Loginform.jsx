// import React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// // import '../App.css';
// import { useState } from 'react';
// import axios from "axios";
// import jss from "jss";
// // import preset frpm "jss-preset-default";
// import preset from "jss-preset-default";
// import thene from './style';
// // import ad from "@mui/icons-material/Lockou



// function Copyright() {
//     return (
//       <Typography variant="body2" color="textSecondary" align="center">
//         {'Copyright © '}
//         <Link color="inherit" href="https://mui.com/">
//           Your Website
//         </Link>{' '}
//         {new Date().getFullYear()}
//         {'.'}
//       </Typography>
//     );
//   }
  
//   // const useStyles = makeStyles((theme) => ({
//   //   root: {
//   //     height: '100vh',
//   //   },
//   //   image: {
//   //     backgroundImage: 'url(https://source.unsplash.com/random)',
//   //     backgroundRepeat: 'no-repeat',
//   //     backgroundColor:
//   //       theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
//   //     backgroundSize: 'cover',
//   //     backgroundPosition: 'center',
//   //   },
//   //   paper: {
//   //     margin: theme.spacing(8, 4),
//   //     display: 'flex',
//   //     flexDirection: 'column',
//   //     alignItems: 'center',
//   //   },
//   //   avatar: {
//   //     margin: theme.spacing(1),
//   //     backgroundColor: theme.palette.secondary.main,
//   //   },
//   //   form: {
//   //     width: '100%', // Fix IE 11 issue.
//   //     marginTop: theme.spacing(1),
//   //   },
//   //   submit: {
//   //     margin: theme.spacing(3, 0, 2),
//   //   },
//   // }));
  
  

// function Loginform() {
//   jss.setup(preset());
//   const { classes } = jss.createStyleSheet(thene).attach();

//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");

//   const handleOnSubmit = async (e) => {
//       e.preventDefault();
//       // const { name, email, password, reEnterPassword } = user
//       if( password && email){
//           axios.post("http://localhost:5000/register", { password, email })
//           .then( res => {
//               alert(res.data.message)
//               setEmail("");
//           setPassword("");
//           })
//       } else {
//           alert("invlid input")
//       }
//   }

//   // const classes =thene;
//     return (
//     <div><Grid container component="main" className={classes.root}>
//     <CssBaseline />
//     <Grid item xs={false} sm={4} md={7} className={classes.image} />
//     <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//       <div className={classes.paper}>
//         <Avatar className={classes.avatar}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Sign in
//         </Typography>
//         <form className={classes.form} noValidate>
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             autoFocus
//             onChange={(e)=>setEmail(e.target.value)}
//           />
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//             onChange={(e)=>setPassword(e.target.value)}
//           />
//           <FormControlLabel
//             control={<Checkbox value="remember" color="primary" />}
//             label="Remember me"
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             className={classes.submit}
//           >
//             Sign In
//           </Button>
//           <Grid container>
//             <Grid item xs>
//               <Link href="#" variant="body2">
//                 Forgot password?
//               </Link>
//             </Grid>
//             <Grid item>
//               <Link href="#" variant="body2">
//                 {"Don't have an account? Sign Up"}
//               </Link>
//             </Grid>
//           </Grid>
//           <Box mt={5}>
//             <Copyright />
//           </Box>
//         </form>
//       </div>
//     </Grid>
//   </Grid></div>);
// }

// export default Loginform;


