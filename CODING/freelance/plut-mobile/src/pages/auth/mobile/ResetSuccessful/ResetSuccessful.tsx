import { Success } from "../../../../components/auth";

interface ResetSuccessfulProps {
  setValue: any;
  value: string;
}

export default function ResetSuccessful({
  setValue,
  value,
}: ResetSuccessfulProps) {
  return <Success type="reset" value={value} setValue={setValue} />;
}
