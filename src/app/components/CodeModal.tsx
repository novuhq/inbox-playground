"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function CodeModal({ isOpen, onClose }: CodeModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Get Code</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            You can find the code for this project on GitHub. Click the button
            below to visit the repository.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            variant="ghost"
            onClick={() =>
              window.open("https://github.com/novuhq/novu", "_blank")
            }
          >
            Go to GitHub
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CodeModal;
