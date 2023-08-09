import { useState } from "react";
import {
    Box,
    Typography,
    Button,
    TextField,
    useMediaQuery,
    useTheme
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik"; // used for form library
import * as yup from "yup"; //validation library
import { useNavigate } from "react-router-dom"; //navigate when they register
import { useDispatch } from "react-redux"; //react-redux to store student info
import { setLogin } from "state"; 
import Dropzone from "react-dropzone"; // for student to be able to uopload image
import FlexLayout from "components/FlexLayout"; // reusable component
import { Login } from "@mui/icons-material";

// Creating yup validation Schema - determines shape on how the form library is going to save this info
const registerSchema = yup.object.shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    address: yup.string().required("required"),
    profileImage: yup.string().required("required"),
});

// for login
const loginSchema = yup.object.shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required")
});

// set of initial values
const initialRegisterValues = yup.object.shape({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    profileImage: ""
});

const intialLoginValues = yup.object.shape({
    firstName: "",
    lastName: "",
});

// Creating Form component
const Form = () => {
    const [ pageType, setPageType ] = useState("login");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile =  useMediaQuery("(min-width: 600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const registerStudent = async (values, properties) => {
        // Using FormData - JavaScript API - allows to send form info with image
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]) //todo : understand this
        }
        formData.append("imagePath", values.profileImage.name)

        // making a call to backend API and fetching the response
        const response = await fetch(
            "http://localhost:3001/auth/register",
            {
                method: "POST",
                body: formData,
            }
        );

        // Parsible form JSON
        const savedStudent = await response.json();

        // Reset the form - properties passed down from Formik 
        properties.resetForm();

        if (savedStudent){
            setPageType("login");
        }

    }; 

    // funtcion
    const formSubmitHandler = async (values, properties) => {
        if (isLogin) await loginStudent(values, properties);
        if (isRegister) await registerStudent(values, properties);
    };

    // return Formik component
    return (
    <Formik
        onSubmit={formSubmitHandler}
        initialValues={isLogin ? intialLoginValues : initialRegisterValues}
        validationSchema={isLogin ? loginSchema : registerSchema}>
         
         
         {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm

         }) => (
            <form onSubmit={handleSubmit}>
             <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0,1fr))"
              sx={{
                "& > div" : {gridColumn: isNonMobile ? undefined : "span 4"},
              }}>

                {isRegister && (
                    <>
                     <TextField
                       label="First Name"
                       onBlur={handleBlur}
                       onChange={handleChange}
                       value={values.firstName}
                       name="firstName"
                       error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                       helperText = {touched.firstName && errors.firstName}
                       sx={{ gridColumn : "span 2" }} 
                       />
                       <TextField
                       label="Last Name"
                       onBlur={handleBlur} 
                       onChange={handleChange}
                       value={values.lastName}
                       name="lastName"
                       error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                       helperText = {touched.lastName && errors.lastName}
                       sx={{ gridColumn : "span 2" }} 
                       />
                       <TextField
                       label="Address"
                       onBlur={handleBlur} 
                       onChange={handleChange}
                       value={values.address}
                       name="address"
                       error={Boolean(touched.address) && Boolean(errors.address)}
                       helperText = {touched.address && errors.address}
                       sx={{ gridColumn : "span 4" }} 
                       />
                       <Box
                         gridColumn="span 4"
                         border={`1px solid ${palette.neutral.medium}`}
                         borderRadius="5px"
                         p="1rem">
                            <Dropzone
                              acceptedFiles=".jpg,.jpeg,png"
                              multiple={false}
                              onDrop={(acceptedFiles) => 
                                setFieldValue("profileImage", acceptedFiles[0])}
                            >
                                {({ getRootProps, getInputProps}) => (
                                    <Box 
                                        {...getRootProps()}
                                        border={`2px dashed ${palette.primary.main}`}
                                        p="1rem"
                                        sx = {{ "&:hover" : {cursor: "pointer"}}}>
                                      <input {...getInputProps()} />
                                      {!values.profileImage ? (<p>Upload your profile image here</p>):
                                      (<FlexLayout>
                                        <Typography>{values.profileImage.name}</Typography>
                                        <EditOutlinedIcon/> 
                                      </FlexLayout>)
                                      }

                                    </Box> 
                                )}
                            </Dropzone>
                       </Box>    
                    </>
                )}

                    <TextField
                       label="Email"
                       onBlur={handleBlur} 
                       onChange={handleChange} 
                       value={values.email}
                       name="email"
                       error={Boolean(touched.email) && Boolean(errors.email)}
                       helperText = {touched.email && errors.email}
                       sx={{ gridColumn : "span 2" }} 
                       />
                 <TextField
                       label="Password"
                       type="password "
                       onBlur={handleBlur} 
                       onChange={handleChange} 
                       value={values.password}
                       name="password"
                       error={Boolean(touched.password) && Boolean(errors.password)}
                       helperText = {touched.password && errors.password} 
                       sx={{ gridColumn : "span 2" }} 
                       />  
             </Box>

             {/** Button */}
             <Box>
                <Button
                    fullWidth
                    type="submit"
                    sx={{
                        m:"2rem 0",
                        p:"1rem",
                        backgroundColor: palette.primary.main,
                        color: palette.primary.alt,
                        "&:hover" : {color: palette.primary.main},
                    }}>
                      {isLogin ? "LOGIN" : "REGISTER"}  
                </Button>
                <Typography
                    onClick={() => {
                        setPageType(isLogin ? "register" : "login");
                        resetForm();
                    }}>
                    {isLogin ?  "Don't have a account ? Sign Up" : "Already have an account ? Login" }
                </Typography>
                 
             </Box>

            </form>

         )}

    </Formik>)


}

export default Form;
 
 