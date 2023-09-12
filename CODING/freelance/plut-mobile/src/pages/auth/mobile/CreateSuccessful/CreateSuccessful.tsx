import { Success } from "../../../../components/auth";

interface CreateSuccessfulProps {
  setValue: any;
  value: string;
}

export default function CreateSuccessful({
  setValue,
  value,
}: CreateSuccessfulProps) {
  return <Success type="create" value={value} setValue={setValue} />;
}
