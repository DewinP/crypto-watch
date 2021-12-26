import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import {
  IconButton,
  InputGroup,
  InputProps,
  InputRightElement,
  TextareaProps,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";
import { BiHide, BiShow } from "react-icons/bi";

type InputFieldProps = InputProps &
  TextareaProps & {
    label: string;
    limit?: number;
  };

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  limit,
  ...props
}) => {
  const [field, { error }] = useField(props.name);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <FormControl isInvalid={!!error} mt={4}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputGroup>
        <Input
          maxLength={limit}
          {...field}
          {...props}
          id={field.name}
          type={props.type === "password" && show ? "text" : props.type}
        />
        {props.type === "password" && (
          <InputRightElement width="4.5rem">
            <IconButton
              variant="link"
              onClick={handleClick}
              aria-label={show ? "Show password" : "Hide password"}
              icon={show ? <BiShow /> : <BiHide />}
            />
          </InputRightElement>
        )}
      </InputGroup>

      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default InputField;
