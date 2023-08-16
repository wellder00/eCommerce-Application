import { useState, useEffect } from 'react';
import { Button, IconButton, InputAdornment } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import { Link } from 'react-router-dom';
import { TextField as FormikTextField } from 'formik-material-ui';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import classNames from 'classnames';

import { validate } from '../../utils/validate/signUp';
import { Data } from '../../pages/Registration/Registration.interface';
import { ShowValidate } from '../ShowValidate';
import { Message, RegistrationFormValues, FieldInput } from './Registration.interface';
import styles from './Registration.module.scss';

const initialValues: RegistrationFormValues = {
  email: '',
  password: '',
  checkPassword: '',
};

interface LoginProps {
  userData: {
    setWindowPage: React.Dispatch<React.SetStateAction<number>>;
    setData: React.Dispatch<React.SetStateAction<Data>>;
  };
}

const RegistrationForm: React.FC<LoginProps> = ({ userData }) => {
  const { setData, setWindowPage } = userData;
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const [message, setMessage] = useState<Message>({});
  const [messagePassword, setMessagePassword] = useState<Message>({});
  const [messagePasswordCheck, setMessagePasswordCheck] = useState<Message>({});

  const [inputStartedEmail, setInputStartedEmail] = useState(false);
  const [inputStartedPassword, setInputStartedPassword] = useState(false);
  const [inputStartedCheckPassword, setInputStartedCheckPassword] = useState(false);

  const [allFieldsValid, setAllFieldsValid] = useState(false);

  const handleClickShowPassword = (
    isShow: boolean,
    setPasswordState: React.Dispatch<React.SetStateAction<boolean>>
  ): void => {
    setPasswordState(!isShow);
  };

  const updateMessage = (type: FieldInput, key: string, value: boolean): void => {
    let setter: React.Dispatch<React.SetStateAction<Message>> | null = null;

    switch (type) {
      case 'email':
        setter = setMessage;
        break;
      case 'password':
        setter = setMessagePassword;
        break;
      case 'checkPassword':
        setter = setMessagePasswordCheck;
        break;

      default:
        break;
    }
    if (setter) {
      setter((prevMessage) => ({
        ...prevMessage,
        [key]: value,
      }));
    }
  };

  const areAllValuesFalse = (obj: Record<string, boolean>): boolean => {
    if (Object.keys(obj).length === 0) {
      return false;
    }
    return Object.values(obj).every((value) => value === false);
  };

  useEffect(() => {
    if (areAllValuesFalse(message) && areAllValuesFalse(messagePassword) && areAllValuesFalse(messagePasswordCheck)) {
      setAllFieldsValid(true);
    } else setAllFieldsValid(false);
  }, [message, messagePassword, messagePasswordCheck]);

  return (
    <>
      <Formik
        initialValues={initialValues}
        validate={(values): Partial<RegistrationFormValues> => {
          const errors = validate(values, updateMessage);
          return errors;
        }}
        onSubmit={(values, { setSubmitting }): void => {
          setData((prevData) => ({
            ...prevData,
            ...values,
          }));
          setSubmitting(false);
        }}
      >
        {({ submitForm, isSubmitting }): JSX.Element => (
          <Form>
            <div className={classNames(styles.inputContainer)}>
              <Field
                component={FormikTextField}
                name="email"
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                onFocus={(): void => setInputStartedEmail(true)}
              />
              {inputStartedEmail && <ShowValidate validate={message} />}
            </div>

            <div className={classNames(styles.inputContainer)}>
              <Field
                component={FormikTextField}
                type={showPassword ? 'text' : 'password'}
                label="Your password"
                name="password"
                variant="standard"
                fullWidth
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={(): void => handleClickShowPassword(showPassword, setShowPassword)}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onFocus={(): void => setInputStartedPassword(true)}
              />

              {inputStartedPassword && <ShowValidate validate={messagePassword} />}
            </div>

            <div className={classNames(styles.inputContainer)}>
              <Field
                component={FormikTextField}
                type={showPasswordCheck ? 'text' : 'password'}
                label="Repeat password"
                name="checkPassword"
                variant="standard"
                fullWidth
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={(): void => handleClickShowPassword(showPasswordCheck, setShowPasswordCheck)}
                      >
                        {showPasswordCheck ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onFocus={(): void => setInputStartedCheckPassword(true)}
              />

              {inputStartedCheckPassword && <ShowValidate validate={messagePasswordCheck} />}
            </div>
            <div className={classNames(styles.progressContainer)}>
              <div className={classNames(styles.progress, styles.progressActive)}></div>
              <div className={classNames(styles.progress)}></div>
              <div className={classNames(styles.progress)}></div>
            </div>
            <div className={classNames(styles.btnLogin)}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting || !allFieldsValid}
                onClick={(): void => {
                  submitForm();
                  setWindowPage((prev) => prev + 1);
                }}
              >
                Continue
              </Button>
            </div>
            <div className={classNames(styles.lineContainer)}>
              <div className={classNames(styles.line)}></div>
              <div className={classNames(styles.text)}>Or already have an account?</div>
            </div>
            <Link to="/login">
              <Button sx={{ fontSize: '1.2rem' }} variant="text" fullWidth color="primary">
                Login
              </Button>
            </Link>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegistrationForm;
