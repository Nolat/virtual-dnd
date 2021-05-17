import { Modal, ModalContent, ModalOverlay, ModalProps, useColorModeValue } from "@chakra-ui/react";

export const ModalContainer: React.FC<ModalContainerProps> = ({
  children,
  isOpen,
  onClose,
  ...rest
}) => {
  const bgColor = useColorModeValue("white", "black");
  const overlayColor = useColorModeValue("blackAlpha.300", "whiteAlpha.300");

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" {...rest}>
      <ModalOverlay bg={overlayColor} />
      <ModalContent bg={bgColor} alignSelf="center">
        {children}
      </ModalContent>
    </Modal>
  );
};

interface ModalContainerProps extends ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
