import { memo, useCallback, useState } from 'react';
import styles from './CreateUserInfoPdf.module.scss';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Avatar, Button, TextField } from '@mui/material';
import { pdf } from '@react-pdf/renderer';
import { UserInfoDocument } from './UserInfoDocument/UserInfoDocument';
import { saveAs } from 'file-saver';
import { ProfilePicture } from './ProfilePicture/ProfilePicture';

export interface CreateUserInfoPdfInputs {
  name: string;
  surname: string;
  age: string;
  avatar: FileList;
}

const CreateUserInfoPdf = memo(() => {
  const [preview, setPreview] = useState<string>();

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isDirty, isValid }
  } = useForm<CreateUserInfoPdfInputs>({
    defaultValues: {
      age: '',
      name: '',
      surname: '',
      avatar: undefined
    }
  });

  const resetForm = useCallback(() => {
    setPreview('');
    reset();
  }, [reset]);

  const onSubmit: SubmitHandler<CreateUserInfoPdfInputs> = async ({ age, name, surname, avatar }) => {
    const file = avatar[0];
    const src = URL.createObjectURL(file);

    try {
      const blob = await pdf(<UserInfoDocument name={name} surname={surname} age={age} avatar={src} />).toBlob();

      saveAs(blob, 'yourData.pdf');
    } catch (e) {}
  };

  return (
    <div className={styles.createUserInfoPdf}>
      <form className={styles.createUserInfoPdfForm} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              id="name"
              label="Имя"
              variant="standard"
              inputProps={{ 'data-testid': 'name-input' }}
              {...field}
            />
          )}
        />
        <Controller
          name="surname"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              id="surname"
              label="Фамилия"
              variant="standard"
              inputProps={{ 'data-testid': 'surname-input' }}
              {...field}
            />
          )}
        />
        <Controller
          name="age"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              id="age"
              label="Возраст"
              variant="standard"
              inputProps={{ 'data-testid': 'age-input' }}
              {...field}
            />
          )}
        />

        <Avatar src={preview} sx={{ width: 80, height: 80 }} />

        <ProfilePicture register={register} setPreview={setPreview} preview={preview} />

        <Button type="reset" variant="contained" onClick={resetForm} disabled={!isDirty} data-testid="reset-btn">
          Отмена
        </Button>
        <Button type="submit" variant="contained" disabled={!isValid}>
          Создать PDF файл
        </Button>
      </form>
    </div>
  );
});

export { CreateUserInfoPdf };
