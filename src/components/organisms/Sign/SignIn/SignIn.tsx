import { useFormik } from "formik";

import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import getUsersApi from "../../../../services/api/getUsersApi";
import store from "../../../../store";
import { setDataUserLogged } from "../../../../store/user/action";
import { User } from "../../../../types/user.interface";
import ButtonForm from "../../../atoms/ButtonForm";
import FormField from "../../../molecules/FormField";
import { StyleForm } from "../styles";

const SignIn = () => {
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup
                .string()
                .email("This email is invalid.")
                .required("This field is required"),
            password: yup.string().required("This field is required"),
        }),
        onSubmit: async (values) => {
            const { users } = await getUsersApi();
            const authenticatedUser = users.find(
                ({ email, password }: User) => email === values.email && password === values.password
            );
            if (authenticatedUser) {
                const { email, id, name, phone, picture } = authenticatedUser;
                store.dispatch(setDataUserLogged({ email, id, name, phone, picture }));
                navigate('/')
            } else {
                alert(
                    "Email ou senha incorreto, lembre-se de se cadastrar no nosso sistema."
                );
            }
        },
    });

    return (
        <div>
            <StyleForm onSubmit={formik.handleSubmit}>
                <h1>Log in</h1>
                <FormField
                    label="Email Adress"
                    name="email"
                    onChange={formik.handleChange}
                    placeholder="your e-mail"
                    value={formik.values.email}
                    error={formik.errors.email}
                />
                <FormField
                    label="Password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    placeholder="your password"
                    value={formik.values.password}
                    error={formik.errors.password}
                />
                <ButtonForm textContent="Log in" handleClick={formik.submitForm} />
            </StyleForm>
        </div>
    );
};

export default SignIn;

