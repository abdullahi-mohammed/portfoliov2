import { SuccessDesktop } from "../../../../components/auth/Desktop";

interface CreateSuccessfulProps {
  setValue: any;
  value: string;
  text: string;
}

export default function CreateSuccessful({
  setValue,
  value,
  text,
}: CreateSuccessfulProps) {
  return (
    <SuccessDesktop
      type="create"
      value={value}
      setValue={setValue}
      text={text}
    />
  );
}
