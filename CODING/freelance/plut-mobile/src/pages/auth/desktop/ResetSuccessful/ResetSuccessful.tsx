import { SuccessDesktop } from "../../../../components/auth/Desktop";

interface ResetSuccessfulProps {
  setValue: any;
  value: string;
  text: string;
}

export default function ResetSuccessful({
  setValue,
  value,
  text,
}: ResetSuccessfulProps) {
  return (
    <SuccessDesktop
      type="reset"
      value={value}
      setValue={setValue}
      text={text}
    />
  );
}
