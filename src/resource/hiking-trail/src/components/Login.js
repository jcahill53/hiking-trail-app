import {
  Form,
  TextInput,
  ComposedModal,
  TextArea,
  Select,
  SelectItem,
  Button,
  Stack,
  ModalWrapper,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@carbon/react";
import React, { useState } from "react";

export const Login = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleSubmit = () => {
    console.log("Form submitted");
    setIsOpen(false);
  };

  return (
    <>
      <ComposedModal open={isOpen} onClose={() => setIsOpen(false)} size="xs">
        <ModalHeader onClick={() => setIsOpen(false)}>
          <h1>LOGIN TO HIKING TRIAL APP</h1>
        </ModalHeader>
        <ModalBody>
          <Form>
            <Stack gap={7}>
              <TextInput
                helperText=""
                id="login-username"
                invalidText="Invalid error message."
                labelText="Login"
                placeholder="Login"
              />
              <TextInput
                helperText=""
                id="login-password"
                invalidText="Invalid error message."
                labelText="Password"
                placeholder="Password"
              />
            </Stack>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button kind="tertiary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            kind="tertiary"
            onClick={handleSubmit}
            tooltipAlignment="center"
          >
            Submit
          </Button>
        </ModalFooter>
        {/* <ModalWrapper
          buttonTriggerText="Launch modal"
          modalHeading="LOGIN TO HIKING TRIAL APP"
          handleSubmit={handleSubmit}
          // onClose={() => setIsOpen(false)}
          primaryButtonText="Login"
          shouldCloseAfterSubmit={true}
          // open={isOpen}
          // onRequestClose={() => setIsOpen(false)}
          size="sm"
        > */}

        {/* </ModalWrapper> */}
      </ComposedModal>
      <Button onClick={() => setIsOpen(true)}>LOG IN</Button>
    </>
  );
};
