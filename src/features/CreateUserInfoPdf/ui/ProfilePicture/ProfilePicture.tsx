import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { FC, memo, useRef } from "react";
import { UseFormRegister } from "react-hook-form";
import { CreateUserInfoPdfInputs } from "../CreateUserInfoPdf";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface ProfilePictureProps {
  register: UseFormRegister<CreateUserInfoPdfInputs>;
  setPreview: React.Dispatch<React.SetStateAction<string | undefined>>;
  preview: string | undefined;
}

const ProfilePicture: FC<ProfilePictureProps> = memo((props) => {
  const { register, setPreview, preview } = props;

  const hiddenInputRef = useRef<any>();

  const { ref: registerRef, ...rest } = register("avatar");

  const handleUploadedFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const urlImage = URL.createObjectURL(file);
      setPreview(urlImage);
    }
  };

  const uploadButtonLabel = preview
    ? "Загрузить новое изображение"
    : "Загрузить изображение";

  return (
    <div>
      <Button component="label" role={undefined} variant="text">
        {uploadButtonLabel}
        <VisuallyHiddenInput
          id="avatar"
          type="file"
          {...rest}
          onChange={handleUploadedFile}
          ref={(e) => {
            registerRef(e);
            hiddenInputRef.current = e;
          }}
        />
      </Button>
    </div>
  );
});

export { ProfilePicture };
